document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const convertBtn = document.getElementById('convert-btn');
    const apiUrl = 'https://md-to-pdf.fly.dev';

    convertBtn.addEventListener('click', async () => {
        if (!markdownInput.value.trim()) {
            alert('Please enter some Markdown text');
            return;
        }

        try {
            convertBtn.disabled = true;
            convertBtn.textContent = 'Converting...';

            // Create form data
            const formData = new FormData();
            formData.append('markdown', markdownInput.value);

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Conversion failed: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document.pdf';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to convert to PDF: ' + error.message);
        } finally {
            convertBtn.disabled = false;
            convertBtn.textContent = 'Convert to PDF';
        }
    });
});
