import Tesseract from 'tesseract.js';

type ocrServiceOpts = {
    imagePath: string,
    language: string
}

export function ocrService(opts: ocrServiceOpts) {

    const {imagePath, language} = opts;

    return new Promise((resolve, reject) => {
        Tesseract.recognize(
            imagePath,
            language,
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            resolve(text)
        }).catch(err => {
            console.log("CAUGHT!")
            console.log(err)
            reject(err)
        })
    })
}