function onScanSuccess(decodedText, decodedResult) {
    // Utiliser `decodedText` pour obtenir le texte du code QR/Code-barres scanné.
    console.log(`Code QR/Code-barres scanné = ${decodedText}`, decodedResult);
    alert(`Code QR/Code-barres scanné: ${decodedText}`);
    // Arrêter le scanner une fois qu'un code est scanné. Retirer si vous souhaitez continuer à scanner.
    html5QrcodeScanner.clear();
}

function onScanFailure(error) {
    // Ecrire le traitement en cas d'erreur de scan.
    console.warn(`Échec de scan QR/Code-barres: ${error}`);
}

// Configurer les options du scanner. Vérifier la documentation pour plus d'options.
let config = { fps: 10, qrbox: { width: 250, height: 250 } };

// Créer une nouvelle instance de `Html5QrcodeScanner`
let html5QrcodeScanner = new Html5QrcodeScanner("reader", config, false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);