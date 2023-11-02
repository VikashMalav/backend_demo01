import qrcode from 'qrcode';
import fs from 'fs'

export const qrCodeGenerator = async (req, res, next) => {
    // Data you want to encode in the QR code
    const data = [req.body];

    // Options for generating the QR code (e.g., size, error correction level, format)
    const options = {
        type: 'image/png', // Output format (you can use 'image/svg' for SVG)
        errorCorrectionLevel: 'H', // Error correction level (L, M, Q, H)
        version: 10, // QR code version (1 to 40)
        margin: 5, // Margin around the QR code\
        color: "#000000ff",
        small: true
    };
const filePath =`./qrCode/${Date.now()}.png`
    // Generate the QR code and save it as a file
    qrcode.toFile(filePath, data, options, (err) => {
        if (err) {
            console.error(err);
            next(err)
        } else {

            console.log('QR code saved as .png');
            const qrcode = fs.readFileSync(filePath,"utf8")
            res.setHeader('Content-Type', 'image/png')
            res.send(qrcode)
        }


    });



}