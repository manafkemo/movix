/* eslint-disable */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(process.cwd(), 'public/assist/images/movix-logo-light-mood.png');
const tempPath = path.join(process.cwd(), 'public/assist/images/movix-logo-light-mood-trimmed.png');

async function processImage() {
    try {
        const original = sharp(inputPath);
        const meta = await original.metadata();
        console.log(`Original Dimensions: ${meta.width}x${meta.height}`);

        // Trim with a threshold to catch near-transparent pixels if any
        await original.trim({ threshold: 10 }).toFile(tempPath);

        const trimmed = sharp(tempPath);
        const newMeta = await trimmed.metadata();
        console.log(`Trimmed Dimensions: ${newMeta.width}x${newMeta.height}`);

        fs.renameSync(tempPath, inputPath);
        console.log('Successfully updated logo file.');
    } catch (error) {
        console.error('Error:', error);
    }
}

processImage();
