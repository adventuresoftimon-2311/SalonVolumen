const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const images = [
    { url: 'https://salonvolumen.de/wp-content/uploads/2021/07/hair7.jpg', name: 'hair-style-1.jpg' },
    { url: 'https://salonvolumen.de/wp-content/uploads/2021/07/hair3.jpg', name: 'hair-style-2.jpg' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2020/09/salonvolumen7.jpg', name: 'salon-interior.jpg' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2020/10/salonvolumen-5sterne.jpg', name: 'awards.jpg' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2022/05/WhatsApp-Image-2022-01-25-at-09.15.57.jpeg', name: 'team-halil.jpg' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2020/09/salonvolumen11.jpg', name: 'team-group.jpg' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2021/08/hair1.jpg', name: 'gallery-1.jpg' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2021/08/hair8.jpg', name: 'gallery-2.jpg' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2021/07/calligraph-e1629281902736.jpg', name: 'calligraphy.jpg' },
    { url: 'https://salonvolumen.de/wp-content/uploads/2021/08/CalligraphyCut1.png', name: 'calligraphy-logo.png' },
    { url: 'http://salonvolumen.de/wp-content/uploads/2022/05/schulung.jpg', name: 'workshop.jpg' }
];

const downloadImage = (url, filename) => {
    const protocol = url.startsWith('https') ? https : http;
    const dest = path.join(__dirname, 'assets', 'images', filename);

    // Check if file exists to avoid re-downloading unnecessary
    if (fs.existsSync(dest)) {
        console.log(`File ${filename} already exists.`);
        return;
    }

    const file = fs.createWriteStream(dest);
    protocol.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => { }); // Delete the file async. (But we don't check the result)
        console.error(`Error downloading ${url}: ${err.message}`);
    });
};

images.forEach(img => {
    downloadImage(img.url, img.name);
});
