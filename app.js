document.addEventListener('DOMContentLoaded', function () {
    // Initialise QuaggaJS
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'), // Cible le div pour le flux vidéo
            constraints: {
                facingMode: "environment" // Utilise la caméra arrière si disponible
            },
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader"
            ]
        },
        locate: true // Active la localisation visuelle du code-barres
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Initialisation de Quagga réussie");
        Quagga.start();
    });

    // Écoute l'événement de détection de Quagga
    Quagga.onDetected(function (data) {
        const barcode = data.codeResult.code;
        console.log(`Code-barres détecté : ${barcode}`);
        sendBarcode(barcode); // Appelle la fonction `sendBarcode` avec le code détecté
    });
});

// Envoie le code-barres au serveur Flask
function sendBarcode(barcode) {
    if (barcode) {
        fetch('https://samkhosravi.pythonanywhere.com/scan', {
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
            alert('Barcode sent successfully! Response: ' + JSON.stringify(data));
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send barcode. Check the console for error details.');
        });
    } else {
        alert('Barcode detection failed.');
    }
}