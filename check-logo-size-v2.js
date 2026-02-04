/* eslint-disable */
const sharp = require('sharp');
const path = require('path');

const lightLogo = path.join(process.cwd(), 'public/assist/images/movix-logo-light-mood.png');
const darkLogo = path.join(process.cwd(), 'public/assist/images/movix-logo-dark-mood.png');

async function checkDimensions(filePath, name) {
    try {
        const metadata = await sharp(filePath).metadata();
        console.log(`${name}: ${metadata.width}x${metadata.height}`);
    } catch (error) {
        console.error(`Error reading ${name}:`, error.message);
    }
}

async function run() {
    await checkDimensions(lightLogo, 'Light Mode Logo');
    await checkDimensions(darkLogo, 'Dark Mode Logo');
}

run();
