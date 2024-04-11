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

// Fonctions pour calculer la taille de qrbox pour les codes-barres et QR Codes
let qrboxBarcodeFunction = function(viewfinderWidth, viewfinderHeight) {
    // Utilise une largeur de 70% et une hauteur fixe pour les codes-barres
    let width = viewfinderWidth * 0.7;
    let height = Math.min(150, viewfinderHeight * 0.15); // Hauteur de 150px ou 20% de la hauteur du flux vidéo
    return { width: width, height: height };
};

let qrboxQrCodeFunction = function(viewfinderWidth, viewfinderHeight) {
    // Utilise 70% de la plus petite arête pour les QR Codes
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let size = Math.floor(minEdgeSize * 0.7);
    return { width: size, height: size };
};

// Définir la fonction qrbox initiale à utiliser pour les codes-barres
let currentQrboxFunction = qrboxBarcodeFunction;

// Configuration initiale de la caméra et du scanner
let html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: currentQrboxFunction };

function startScanner() {
    // Démarrage du scanner
    html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess)
    .catch(err => {
        // Gestion de l'erreur si la caméra n'est pas accessible
        document.getElementById('result').innerText = "Erreur : Impossible de démarrer la caméra.";
        console.error(`Impossible de démarrer le scanner: ${err}`);
    });
}

// Fonction pour changer la taille de la qrbox
function setQrboxSize(qrboxFunction) {
    currentQrboxFunction = qrboxFunction;
    // Vous devrez peut-être arrêter et redémarrer le scanner pour appliquer le changement
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            config.qrbox = currentQrboxFunction;
            startScanner();
        });
    }
}

// Boutons pour changer la qrbox
document.getElementById('barcode-btn').addEventListener('click', () => setQrboxSize(qrboxBarcodeFunction));
document.getElementById('qrcode-btn').addEventListener('click', () => setQrboxSize(qrboxQrCodeFunction));


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
    //.then(response => response.json())
    .then(response => {
        if (!response.ok) {
            // Générer une erreur si la réponse n'est pas OK pour entrer dans le catch.
            throw new Error(`Échec de l'envoi avec le statut: ${response.status}`);
        }
        return response.json(); // Continuez avec le traitement de la réponse JSON
    })
    .then(data => {
        // Traitez la réponse de votre serveur Flask ici
        console.log('Réponse du serveur :', data);
        updateHistory(`Code ${barcode} envoyé avec succès !`, "success");
        // Ne pas redémarrer le scanner ici, car cela pourrait réinitialiser la page / l'interface.
    })
    .catch(error => {
        // Gestion des erreurs
        console.error('Erreur lors de l\'envoi:', error);
        updateHistory(`Erreur lors de l'envoi du code ${barcode}.`, "error");
    });
}

// Mettre à jour l'historique
function updateHistory(message, status) {
    const scannedList = document.getElementById('scanned-list');
    const newItem = document.createElement("li");
    newItem.textContent = message;
    newItem.className = status; // Ajoutez une classe pour le style
    scannedList.appendChild(newItem);
}

// Démarrage du scanner lors du chargement de la page
document.addEventListener('DOMContentLoaded', startScanner);
