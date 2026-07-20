const fs = require('fs');
const pdfjsLib = require('pdfjs-dist');

async function extract() {
    try {
        const data = new Uint8Array(fs.readFileSync('Cap I y II MATEMÁTICA-1 (1).pdf'));
        const doc = await pdfjsLib.getDocument({ data }).promise;
        
        let text = '';
        // Extract pages 10 to 15 assuming there are problems there
        const startPage = Math.min(10, doc.numPages);
        const endPage = Math.min(15, doc.numPages);
        
        for (let i = startPage; i <= endPage; i++) {
            const page = await doc.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ');
            text += '\n\n--- PAGE ' + i + ' ---\n\n';
        }
        
        fs.writeFileSync('extracted_text.txt', text);
        console.log('Extracted text successfully');
    } catch (e) {
        console.error(e);
    }
}
extract();
