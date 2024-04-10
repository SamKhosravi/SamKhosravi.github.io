// Fonction pour initialiser le scanner QR
function setupScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    function onScanSuccess(decodedText, decodedResult) {
        // Affiche le résultat dans l'input
        document.getElementById("scan-result").value = decodedText;
        // Arrête le scanner
        html5QrCode.stop().then(ignore => {
            // Scanner arrêté.
            // Vous pouvez ici redémarrer le scanner si nécessaire
        }).catch(err => {
            // Erreur à l'arrêt du scanner
            console.error("Impossible d'arrêter le scanner.", err);
        });
    }
    
    function onScanError(errorMessage) {
        // Erreur durant le scan
        console.error("Erreur durant le scan.", errorMessage);
    }
    
    // Démarre le scanner
    html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, onScanError)
        .catch(err => {
            // Gestion des erreurs, par exemple si aucun appareil n'est trouvé
            document.getElementById("error-message").textContent = "Erreur : Impossible d'accéder à la caméra.";
            console.error("Erreur lors du démarrage du scanner.", err);
        });
}

// Fonction pour envoyer le résultat scanné au serveur Flask
function sendResult() {
    const scanResult = document.getElementById("scan-result").value;
    if (scanResult) {
        fetch('https://votreServeurFlask.com/scan', { // Remplacez avec votre URL Flask
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ barcode: scanResult })
        })
        .then(response => response.json())
        .then(data => console.log("Réponse du serveur :", data))
        .catch(error => console.error("Erreur d'envoi :", error));
    } else {
        alert("Aucun code QR/code-barres scanné.");
    }
}

// Exécute le setup du scanner au chargement du document
document.addEventListener('DOMContentLoaded', setupScanner);
