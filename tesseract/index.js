import Tesseract from 'tesseract.js';

Tesseract.recognize(
  'http://localhost:3000/files/lasku-test-png-1-8xITjUzKvBIn.png',
  'fin',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})