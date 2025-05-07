
    let mode = 'encrypt';

    function toggleMode() {
  mode = mode === 'encrypt' ? 'decrypt' : 'encrypt';
  document.getElementById('mode').textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
  document.getElementById('resultText').textContent = '';
  document.getElementById('messageInput').value = '';

  const selectBox = document.getElementById("codingMethod");
  if (mode === 'decrypt') {
    selectBox.style.display = "none";
  } else {
    selectBox.style.display = "block";
  }
}


function caesarCipher(str, shift) {
  return str.split('').map(char => {
    const isUpper = char >= 'A' && char <= 'Z';
    const isLower = char >= 'a' && char <= 'z';
    const base = isUpper ? 65 : isLower ? 97 : null;
    if (base !== null) {
      return String.fromCharCode(((char.charCodeAt(0) - base + shift + 26) % 26) + base);
    }
    return char;
  }).join('');
}

function a1z26Encode(text) {
  return text.toUpperCase().split('').map(c => {
    const code = c.charCodeAt(0);
    return code === 32 ? '/' : (code >= 65 && code <= 90 ? (code - 64) : c);
  }).join(' ');
}

function a1z26Decode(text) {
  return text.trim().split(/\s+/).map(n => {
    if (n === '/') return ' ';
    const num = parseInt(n);
    return isNaN(num) ? '' : String.fromCharCode(num + 64);
  }).join('');
}

function patriEncode(text) {
  return text.toUpperCase().split('').map(c => {
    const code = c.charCodeAt(0);
    if (code === 32) return '/';
    if (code >= 65 && code <= 90) return '.'.repeat(code - 64);
    return c;
  }).join(' ');
}

function patriDecode(text) {
  return text.trim().split(/\s+/).map(symbol => {
    if (symbol === '/') return ' ';
    const len = symbol.length;
    return (symbol[0] === '.') ? String.fromCharCode(len + 64) : symbol;
  }).join('');
}

function binaryEncode(text) {
  return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function binaryDecode(binary) {
  return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

function hexEncode(text) {
  return text.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
}

function hexDecode(hex) {
  return hex.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
}

const morseCode = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-",
  R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....",
  7: "--...", 8: "---..", 9: "----."
};

const morseReverse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));

function morseEncode(text) {
  return text.toUpperCase().split('').map(c => c === ' ' ? '/' : morseCode[c] || '').join(' ');
}

function morseDecode(code) {
  return code.split(' ').map(s => s === '/' ? ' ' : morseReverse[s] || '').join('');
}

function reverseText(text) {
  return text.split('').reverse().join('');
}

function base64Encode(text) {
  return btoa(text);
}

function base64Decode(text) {
  return atob(text);
}

function leetEncode(text) {
  const leet = { A: '4', E: '3', I: '1', O: '0', S: '5', T: '7' };
  return text.toUpperCase().split('').map(c => leet[c] || c).join('');
}

function leetDecode(text) {
  const reverseLeet = { '4': 'A', '3': 'E', '1': 'I', '0': 'O', '5': 'S', '7': 'T' };
  return text.split('').map(c => reverseLeet[c] || c).join('');
}

function vigenereCipher(text, key, encrypt = true) {
  const a = 'A'.charCodeAt(0);
  text = text.toUpperCase();
  key = key.toUpperCase();
  let result = '', j = 0;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c < 'A' || c > 'Z') {
      result += c;
      continue;
    }
    const shift = key[j++ % key.length].charCodeAt(0) - a;
    const code = encrypt ? (c.charCodeAt(0) - a + shift) % 26 : (c.charCodeAt(0) - a - shift + 26) % 26;
    result += String.fromCharCode(code + a);
  }
  return result;
}

function rot13(text) {
  return text.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
  });
}

function processMessage() {
  const text = document.getElementById('messageInput').value.trim();
  const method = document.getElementById('codingMethod').value;
  let result = '';

  if (mode === 'encrypt') {
    switch(method) {
      case 'caesar': result = caesarCipher(text, 3); break;
      case 'a1z26': result = a1z26Encode(text); break;
      case 'patri': result = patriEncode(text); break;
      case 'binary': result = binaryEncode(text); break;
      case 'hex': result = hexEncode(text); break;
      case 'morse': result = morseEncode(text); break;
      case 'reverse': result = reverseText(text); break;
      case 'base64': result = base64Encode(text); break;
      case 'leet': result = leetEncode(text); break;
      case 'vigenere': result = vigenereCipher(text, 'KEY', true); break;
      case 'rot13': result = rot13(text); break;
    }
  } else {
    switch(method) {
      case 'caesar': result = caesarCipher(text, -3); break;
      case 'a1z26': result = a1z26Decode(text); break;
      case 'patri': result = patriDecode(text); break;
      case 'binary': result = binaryDecode(text); break;
      case 'hex': result = hexDecode(text); break;
      case 'morse': result = morseDecode(text); break;
      case 'reverse': result = reverseText(text); break;
      case 'base64': result = base64Decode(text); break;
      case 'leet': result = leetDecode(text); break;
      case 'vigenere': result = vigenereCipher(text, 'KEY', false); break;
      case 'rot13': result = rot13(text); break;
      default: result = text; break;
    }
  }

  document.getElementById('resultText').textContent = result;
  document.getElementById('messageInput').value = '';
}

function copyToClipboard() {
  const resultText = document.getElementById('resultText').textContent;
  navigator.clipboard.writeText(resultText).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    alert("Failed to copy: " + err);
  });
}

  
    let isEncrypt = true;
    
    function toggleMode() {
  mode = mode === 'encrypt' ? 'decrypt' : 'encrypt';
  document.getElementById('mode').textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
  document.getElementById('resultText').textContent = '';
  document.getElementById('messageInput').value = '';

  const selectBox = document.getElementById("codingMethod");
  if (mode === 'decrypt') {
    selectBox.style.display = "none";
  } else {
    selectBox.style.display = "block";
  }
}

  
    
  
    // Existing JavaScript functions for encoding/decoding stay here
    // Copy your previous <script> content here (the logic functions)

    // Matrix Background Effect
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({length: columns}).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#33ff00";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 33);
