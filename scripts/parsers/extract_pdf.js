const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('Cap I y II MATEMÁTICA-1 (1).pdf');

// Options to limit pages
const options = {
    max: 50 // Extract up to page 50
};

pdf(dataBuffer, options).then(function(data) {
    fs.writeFileSync('extracted_text.txt', data.text);
    console.log(`Extracted ${data.numpages} pages into extracted_text.txt`);
}).catch(function(error) {
    console.error('Error parsing PDF:', error);
});
