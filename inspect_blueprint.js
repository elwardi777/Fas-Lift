import { Jimp } from 'jimp';

async function main() {
  const image = await Jimp.read('public/images/Gemini_Generated_Image_73we9t73we_3d.png');
  const width = image.width;
  const height = image.height;
  const cx = 512;
  const cy = 512;
  
  let maxD = 0;
  
  // Find max distance of non-transparent pixel
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = image.getPixelColor(x, y);
      const a = color & 0xff;
      if (a > 50) {
        const dx = x - cx;
        const dy = y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > maxD) {
          maxD = d;
        }
      }
    }
  }
  
  console.log('Max distance of colored pixel from center:', maxD);
}

main().catch(console.error);
