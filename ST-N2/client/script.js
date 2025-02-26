// Funkcija za generiranje Canvas Fingerprint
function getCanvasFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    var txt = 'CANVAS_FINGERPRINT';
    ctx.font = "14px Arial";
    ctx.textBaseline = "alphabetic";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "rgba(102,204,0, 0.7)";
    ctx.fillText(txt, 4, 17);
    return canvas.toDataURL();
}

// Funkcija za generiranje Font Fingerprint
function getFontFingerprint() {
    const h = document.body;
    const d = document.createElement("div");
    const s = document.createElement("span");
    d.appendChild(s);
    d.style.fontFamily = "Arial";
    s.style.fontFamily = "Arial";
    s.style.fontSize = "72px";
    s.innerHTML = "font_detection";
    h.appendChild(d);

    const textWidth = s.offsetWidth;
    const textHeight = s.offsetHeight;
    h.removeChild(d);
    return `${textWidth}>.<${textHeight}`;
}

// Funkcija za User-Agent Fingerprint
function getUserAgentFingerprint() {
    return navigator.userAgent;
}

// Funkcija za prikaz trenutne teme
function getThemeFingerprint() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Funkcija za pridobitev ločljivosti zaslona
function getScreenResolutionFingerprint() {
    return `|${window.screen.width}>.<${window.screen.height}|`;
}

// Funkcija za pridobitev časovnega pasa
function getTimezoneFingerprint() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Funkcija za generiranje in združitev vseh prstnih odtisov
async function generateFingerprintData() {
    const canvasFingerprint = getCanvasFingerprint();
    const fontFingerprint = getFontFingerprint();
    const userAgentFingerprint = getUserAgentFingerprint();
    const themeFingerprint = getThemeFingerprint();
    const screenResolutionFingerprint = getScreenResolutionFingerprint();
    const timezoneFingerprint = getTimezoneFingerprint();

    return `${canvasFingerprint}|${fontFingerprint}|${userAgentFingerprint}|${themeFingerprint}|${screenResolutionFingerprint}|${timezoneFingerprint}+yippee*`;
}

async function generateHash(data) { // hash maker
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Funkcija za generiranje prstnega odtisa, izračun hash vrednosti in pošiljanje na strežnik prek GET zahtevka
async function generateAndSendFingerprint() {
    try {
        const fingerprint = await generateHash(generateFingerprintData);
        const url = `http://localhost:3000/track?fingerprint=${fingerprint}`;

        const response = await fetch(url
        //     , {
        //     mode: 'no-cors'
        // }
        );

        if (response.ok) {
            const text = await response.text();
            if (text === 'true') {
                displayMessage("You've visited this site before :-)");
            } else if (text === 'false') {
                displayMessage("This is your first visit. ty for your data B)");
            } else {
                displayMessage("Unexpected response from the server.");
            }
        } else {
            displayMessage("Server error: " + response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Error: " + error.message);
    }
}

// On load
generateAndSendFingerprint();

// Funkcija za ponastavitev DB
async function resetDatabase() {
    try {
        const response = await fetch("http://localhost:3000/reset");

        if (response.ok) {
            const message = await response.text();
            displayMessage(message);
        } else {
            displayMessage("Failed to reset the database");
        }
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Error: " + error.message);
    }
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

