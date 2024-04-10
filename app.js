document.addEventListener('DOMContentLoaded', function () {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#reader'), // Assurez-vous que cet élément existe dans votre HTML
            constraints: {
                facingMode: "environment"
            },
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "upc_reader",
                "upc_e_reader",
                "codabar_reader",
                "i2of5_reader",
                "2of5_reader",
                "code_93_reader",
                // Ajoutez d'autres lecteurs de codes-barres selon vos besoins
            ]
        },
        locate: true // Utilisez l'emplacement pour afficher visuellement où le code-barres est détecté
    }, function (err) {
        if (err) {
            console.error(err);
            document.getElementById('error-message').textContent = "Erreur : Impossible de démarrer la caméra."; // Affiche un message d'erreur
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function (data) {
        console.log(data.codeResult.code);
        document.getElementById('scanned-result').textContent = `Code scanné : ${data.codeResult.code}`; // Affiche le résultat du scan
        // Traitez le code détecté ici.
    });
});
