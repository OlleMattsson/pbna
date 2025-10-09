/*

DocumentParser by chatGPT-5
    
const parser = new DocumentParser({ logger: console.log });
const parser = new DocumentParser();
const res = await parser.parse("/path/to/file.pdf"); // or .png/.jpg
console.log(res.method, res.meta, res.pages.length);
console.log(res.combinedText);

*/

// src/DocumentParser.ts
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

import { onResult } from "../common/onResult";
import { Message } from "redis-smq";
import { config, queueNames } from "../common/redis-smq-config";
import { smqRun } from "../common/smq";
import { cleanPdfText } from "./cleanPdfText";

const execFileP = promisify(execFile);

export type PageResult = {
  page: number;
  text: string;
  source: "pdftotext" | "tesseract";
  imagePath?: string; // set when OCR fallback rasterizes a page
};

export type ParseResult = {
  method: "image-tesseract" | "pdf-pdftotext" | "pdf-ocr-fallback";
  pages: PageResult[];
  combinedText: string;
  meta: { pageCount: number; dpi?: number };
};

export type DocumentParserOptions = {
  tesseractLangs?: string; // e.g. "eng+fin+swe"
  rasterDpi?: number; // e.g. 300–400
  minTextProbeChars?: number; // detect weak text layer
  logger?: (msg: string) => void;
};

const DEFAULTS: Required<DocumentParserOptions> = {
  tesseractLangs: "eng+fin+swe",
  rasterDpi: 300,
  minTextProbeChars: 20,
  logger: () => {},
};

const IMAGE_EXTS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".tif",
  ".tiff",
  ".webp",
  ".bmp",
]);
const isImagePath = (p: string) => IMAGE_EXTS.has(extname(p).toLowerCase());
const isPdfPath = (p: string) => extname(p).toLowerCase() === ".pdf";

export class DocumentParser {
  constructor(private opts: DocumentParserOptions = {}) {
    this.opts = { ...DEFAULTS, ...opts };
  }

  async parse(filePath: string, mimeType?: string): Promise<ParseResult> {
    const { logger } = this.opts;

    // keystones files folder is mounted in in docparser's container
    const mountPath = "./files/";

    const _filePath = filePath;
    filePath = mountPath + filePath;

    // --- Route by type (path ext OR provided mimetype) ---
    const looksImage = mimeType?.startsWith("image/") || isImagePath(filePath);
    const looksPdf = mimeType === "application/pdf" || isPdfPath(filePath);

    if (looksImage) {
      logger(`DocumentParser: image detected → Tesseract (scaffold).`);
      const text = await this.ocrImageWithYourExistingCode(_filePath); // scaffold
      return {
        method: "image-tesseract",
        pages: [{ page: 1, text, source: "tesseract", imagePath: filePath }],
        combinedText: text,
        meta: { pageCount: 1 },
      };
    }

    if (!looksPdf) {
      throw new Error(`Unsupported file type for: ${filePath}`);
    }

    // --- PDF path ---
    const pageCount = await this.getPdfPageCount(filePath);
    this.opts.logger(`PDF detected with ${pageCount} page(s).`);

    // Quick probe: try to extract page 1 with pdftotext
    const probe = (await this.pdftotextPage(filePath, 1)).trim();
    const goodTextLayer = probe.length >= this.opts.minTextProbeChars;

    if (goodTextLayer) {
      // Use pdftotext per page
      const pages: PageResult[] = [];
      for (let p = 1; p <= pageCount; p++) {
        const text = await this.pdftotextPage(filePath, p);
        // clean up the result
        const cleanedText = cleanPdfText(text);
        pages.push({ page: p, text: cleanedText, source: "pdftotext" });
      }
      return {
        method: "pdf-pdftotext",
        pages,
        combinedText: this.joinPages(pages),
        meta: { pageCount },
      };
    }

    // Fallback: OCR each page separately
    this.opts.logger(`Weak/missing text layer → OCR fallback.`);
    return await this.ocrPdfFallback(filePath, pageCount);
  }

  // ---------- Internals ----------

  private joinPages(pages: PageResult[]): string {
    return pages.map((p) => `---- PAGE ${p.page} ----\n${p.text}`).join("\n\n");
  }

  private async getPdfPageCount(pdfPath: string): Promise<number> {
    const { stdout } = await execFileP("pdfinfo", [pdfPath]);
    const m = stdout.match(/Pages:\s+(\d+)/i);
    if (!m) throw new Error("Unable to determine page count");
    return parseInt(m[1], 10);
  }

  private async pdftotextPage(pdfPath: string, page: number): Promise<string> {
    // -layout keeps columns aligned which is valuable for statements
    const args = [
      "-layout",
      "-enc",
      "UTF-8",
      "-f",
      String(page),
      "-l",
      String(page),
      pdfPath,
      "-",
    ];
    const { stdout } = await execFileP("pdftotext", args, {
      maxBuffer: 50 * 1024 * 1024,
    });
    return stdout ?? "";
  }

  private async ocrPdfFallback(
    pdfPath: string,
    pageCount: number
  ): Promise<ParseResult> {
    const tmp = await mkdtemp(join(tmpdir(), "pbna-raster-"));
    try {
      // Rasterize all pages → out like: tmp/page-1.pgm, page-2.pgm, …
      await execFileP("pdftoppm", [
        "-gray",
        "-r",
        String(this.opts.rasterDpi),
        pdfPath,
        join(tmp, "page"),
      ]);

      const pages: PageResult[] = [];
      for (let p = 1; p <= pageCount; p++) {
        const img = join(tmp, `page-${p}.pgm`);
        const text = await this.ocrImagePageWithYourExistingCode(img); // scaffold
        pages.push({ page: p, text, source: "tesseract", imagePath: img });
      }

      return {
        method: "pdf-ocr-fallback",
        pages,
        combinedText: this.joinPages(pages),
        meta: { pageCount, dpi: this.opts.rasterDpi },
      };
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  }

  // ---------- Scaffold points (plug your existing OCR here) ----------

  /** Plug your existing single-image OCR here (returns plain text). */
  private async ocrImageWithYourExistingCode(
    imagePath: string
  ): Promise<string> {
    console.log("[Tesseract OCR text for image]");

    const IDENTIFYER = "caller_id"; // hmmm...
    const resultPromise = onResult(IDENTIFYER);
    const msg = new Message();
    msg
      .setBody({
        imagePath: imagePath,
        language: "fin", // TODO: maybe use fin+eng+swe or something like that
        agentId: IDENTIFYER,
      })
      .setTTL(1000 * 60) // in millis
      .setQueue(queueNames.tesseract);

    // send work to tesseract queue
    smqRun(msg, config);

    // listener resolves the result
    const result = await resultPromise;

    console.log(`[DocParser} tesseract result: `, result);

    return JSON.stringify(result.ocrData);
  }

  /** Plug your existing per-page OCR here (returns plain text). */
  private async ocrImagePageWithYourExistingCode(
    imagePath: string
  ): Promise<string> {
    // TODO: call your current Tesseract pipeline for a single page image.
    // e.g., return await myTesseract.run({ imagePath, langs: this.opts.tesseractLangs, psm: 4 });
    return `[Tesseract OCR text for ${imagePath}]`;
  }
}
