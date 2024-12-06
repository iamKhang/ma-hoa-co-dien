// Sử dụng thư viện JSEncrypt
let jsEncrypt = new JSEncrypt();

function generateRSAKeys() {
    jsEncrypt.getKey(); // Tạo cặp khóa mới
    const publicKey = jsEncrypt.getPublicKey();
    const privateKey = jsEncrypt.getPrivateKey();
    
    document.getElementById('publicKeyRSA').value = publicKey;
    document.getElementById('privateKeyRSA').value = privateKey;
    document.getElementById('errorMsgRSA').innerHTML = '';
}

function btnEncryptRSA() {
    const plaintext = document.getElementById('plaintextRSA').value;
    const publicKey = document.getElementById('publicKeyRSA').value;
    
    if (!plaintext || !publicKey) {
        document.getElementById('errorMsgRSA').innerHTML = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }

    try {
        jsEncrypt.setPublicKey(publicKey);
        const encrypted = jsEncrypt.encrypt(plaintext);
        document.getElementById('ciphertextRSA').value = encrypted;
        document.getElementById('errorMsgRSA').innerHTML = '';
    } catch (error) {
        document.getElementById('errorMsgRSA').innerHTML = 'Lỗi khi mã hóa: ' + error.message;
    }
}

function btnDecryptRSA() {
    const ciphertext = document.getElementById('ciphertextRSA').value;
    const privateKey = document.getElementById('privateKeyRSA').value;
    
    if (!ciphertext || !privateKey) {
        document.getElementById('errorMsgRSA').innerHTML = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }

    try {
        jsEncrypt.setPrivateKey(privateKey);
        const decrypted = jsEncrypt.decrypt(ciphertext);
        document.getElementById('plaintextRSA').value = decrypted;
        document.getElementById('errorMsgRSA').innerHTML = '';
    } catch (error) {
        document.getElementById('errorMsgRSA').innerHTML = 'Lỗi khi giải mã: ' + error.message;
    }
} 