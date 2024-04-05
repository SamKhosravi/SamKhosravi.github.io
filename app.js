function sendBarcode() {
    const barcode = document.getElementById('barcodeInput').value;
    if (barcode) {
        fetch('http://127.0.0.1:5000/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                barcode: barcode,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Barcode sent successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to send barcode.');
            });
    } else {
        alert('Please enter a barcode.');
    }
}
