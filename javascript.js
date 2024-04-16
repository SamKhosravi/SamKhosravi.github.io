function onScanSuccess(decodedText, decodedResult) {
    // Insérer le code scanné dans le champ de saisie manuelle.
    document.getElementById('manual-input').value = decodedText;
}

function onScanFailure(error) {
    // Gestion des erreurs de scan (facultatif)
    console.warn(`Scan échoué: ${error}`);
}

// Fonctions pour calculer la taille de qrbox pour les codes-barres et QR Codes
let qrboxBarcodeFunction = function(viewfinderWidth, viewfinderHeight) {
    // Utilise une largeur de 70% et une hauteur fixe pour les codes-barres
    let width = viewfinderWidth * 0.7;
    let height = Math.min(200, viewfinderHeight * 0.25); // Hauteur de 150px ou 20% de la hauteur du flux vidéo
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
const config = {
    fps: 10, 
    qrbox: currentQrboxFunction,
    facingMode: "environment",
};

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
    // Utiliser uniquement la valeur du champ de saisie manuelle pour l'envoi.
    const barcode = document.getElementById('manual-input').value.trim();
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
    // Exemple d'utilisation dans sendBarcode après un envoi réussi
    .then(data => {
        console.log('Réponse du serveur :', data);
        // Afficher les informations nutritionnelles
        updateProductDetails(data.data);
        // Message personnalisé selon le résultat du serveur
        const successMessage = `Code ${barcode} envoyé avec succès !`;
        updateHistory(barcode, "success", successMessage);
        document.getElementById('manual-input').value = ""; // Effacer le champ après l'envoi réussi.
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi:', error);
        const errorMessage = `Erreur lors de l'envoi du code.`; // Message d'erreur générique
        updateHistory(barcode, "error", errorMessage);
    });
}


function updateProductDetails(details) {
    document.getElementById('product-name').textContent = details.product_name;
    document.getElementById('brands').textContent = details.brands;
    document.getElementById('categories').textContent = details.categories;
    document.getElementById('labels').textContent = details.labels;
    document.getElementById('quantity').textContent = details.quantity;
    document.getElementById('manufacturing_places').textContent = details.manufacturing_places;
    document.getElementById('countries').textContent = details.countries;
    document.getElementById('allergens').textContent = details.allergens.join(', ');
    document.getElementById('nova-group').textContent = details.nova_group;
    document.getElementById('nutrition-score-fr').textContent = details.nutrition_score_fr;

    document.getElementById('energy-kj').textContent = details.energy_kj;
    document.getElementById('energy-kcal').textContent = details.energy_kcal;
    document.getElementById('proteins').textContent = details.proteins;
    document.getElementById('carbohydrates').textContent = details.carbohydrates;
    document.getElementById('sugars').textContent = details.sugars;
    document.getElementById('fat').textContent = details.fat;
    document.getElementById('saturated-fat').textContent = details.saturated_fat;
    document.getElementById('fiber').textContent = details.fiber;
    document.getElementById('sodium').textContent = details.sodium;
    document.getElementById('salt').textContent = details.salt;

    document.getElementById('serving_size').textContent = details.serving_size;
    document.getElementById('ingredients_text').textContent = details.ingredients_text;
    document.getElementById('traces').textContent = details.traces;
    document.getElementById('nutrition_grade_fr').textContent = details.nutrition_grade_fr;
    document.getElementById('nutrient_levels').textContent = details.nutrient_levels;
    document.getElementById('vitamins').textContent = details.vitamins;
    document.getElementById('minerals').textContent = details.minerals;
    document.getElementById('eco_score').textContent = details.eco_score;
    document.getElementById('additives').textContent = details.additives;

    
}

// Mettre à jour l'historique avec plus de détails
function updateHistory(barcode, status, message) {
    const scannedList = document.getElementById('scanned-list');
    const newItem = document.createElement("li");

    // Obtenir l'horodatage actuel
    const timestamp = new Date().toLocaleString();

    // Créer le contenu de l'élément historique
    newItem.innerHTML = `<strong>${timestamp}</strong> - <span class="${status}">${message}</span>`;

    // Ajouter l'élément à la liste
    scannedList.prepend(newItem); // Utilisez prepend pour ajouter le dernier scan en haut de la liste
}

// Démarrage du scanner lors du chargement de la page
document.addEventListener('DOMContentLoaded', startScanner);
