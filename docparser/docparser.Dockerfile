# docker/doc-ingest/Dockerfile
FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    poppler-utils qpdf \
    tesseract-ocr tesseract-ocr-eng tesseract-ocr-fin tesseract-ocr-swe \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /code
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
