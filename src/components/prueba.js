function printToPDF(contentId, headerImageUrl, footerImageUrl, sizeImageHader, sizeImageFooter, paddingImagenHeader, paddingImagenFooter) {
    const printWindow = window.open('', '_blank');
    const content = document.getElementById(contentId);
    const textarea = document.getElementById('userInput');
    
    // Create a copy of the content
    const contentCopy = content.cloneNode(true);
    
    // Find the textarea in the copy and update its value
    const textareaCopy = contentCopy.querySelector('#userInput');
    if (textareaCopy && textarea) {
        textareaCopy.textContent = textarea.value;
    }

    const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
            try {
                return Array.from(styleSheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
            } catch (e) {
                console.log('Error accessing styleSheet', e);
                return '';
            }
        })
        .join('\n');

    const headerImagen = headerImageUrl !== null ? `<img src="${headerImageUrl}" alt="Header">` : "";
    const footerImagen = footerImageUrl !== null ? `<img src="${footerImageUrl}" alt="Footer">` : "";

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Imprimir a PDF</title>
            <style>
                ${styles}
                @media print {
                    /* ... (rest of your styles) ... */
                }
            </style>
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <td class="print-header">
                            ${headerImagen}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="print-content">
                            ${contentCopy.innerHTML}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="print-footer">
                            ${footerImagen}
                            <div class="page-number"></div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <script>
                function addPageNumbers() {
                    var totalPages = Math.ceil(document.body.scrollHeight / 1123); // A4 height in pixels at 96 DPI
                    for (var i = 1; i <= totalPages; i++) {
                        var pageNumberDiv = document.createElement('div');
                        pageNumberDiv.className = 'page-number';
                        pageNumberDiv.innerHTML = 'Página ' + i + ' de ' + totalPages;
                        pageNumberDiv.style.top = (i * 1123 - 30) + 'px';
                        document.body.appendChild(pageNumberDiv);
                    }
                }

                window.onload = function() {
                    setTimeout(function() {
                        addPageNumbers();
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        };
                    }, 1000);
                };
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}