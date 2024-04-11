function onScanSuccess(decodedText, decodedResult) {
    // Afficher le texte décodé
    document.getElementById('scanned-text').innerText = decodedText;
    // Optionnel : Arrêter le scanner après le premier scan réussi
    // html5QrCode.stop().then(ignore => {}).catch(err => {});
}

function onScanFailure(error) {
    // Gestion des erreurs de scan (facultatif)
    console.warn(`Scan échoué: ${error}`);
}

// Configuration de la caméra et du scanner
let html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox:  { width: 400, height: 150 }};

function startScanner() {
    // Démarrage du scanner
    html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess)
    .catch(err => {
        // Gestion de l'erreur si la caméra n'est pas accessible
        document.getElementById('result').innerText = "Erreur : Impossible de démarrer la caméra.";
        console.error(`Impossible de démarrer le scanner: ${err}`);
    });
}

// Envoi du code au serveur Flask
function sendBarcode() {
    const barcode = document.getElementById('scanned-text').innerText || document.getElementById('manual-input').value;
    if (!barcode) {
        alert("Aucun code à envoyer.");
        return;
    }
    
    fetch("https://samkhosravi.pythonanywhere.com/scan", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode: barcode })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Réponse du serveur :', data);
        alert("Code envoyé avec succès !");
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi:', error);
        alert("Erreur lors de l'envoi du code.");
    });
}

// Démarrage du scanner lors du chargement de la page
document.addEventListener('DOMContentLoaded', startScanner);
