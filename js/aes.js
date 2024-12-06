// Sử dụng thư viện CryptoJS
function btnEncryptAES() {
    const plaintext = document.getElementById('plaintextAES').value;
    const key = document.getElementById('keyAES').value;
    
    if (!plaintext || !key) {
        document.getElementById('errorMsgAES').innerHTML = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }
    
    if (key.length !== 16) {
        document.getElementById('errorMsgAES').innerHTML = 'Khóa phải có độ dài 16 ký tự cho AES-128!';
        return;
    }

    try {
        const encrypted = CryptoJS.AES.encrypt(plaintext, key).toString();
        document.getElementById('ciphertextAES').value = encrypted;
        document.getElementById('errorMsgAES').innerHTML = '';
    } catch (error) {
        document.getElementById('errorMsgAES').innerHTML = 'Lỗi khi mã hóa: ' + error.message;
    }
}

function btnDecryptAES() {
    const ciphertext = document.getElementById('ciphertextAES').value;
    const key = document.getElementById('keyAES').value;
    
    if (!ciphertext || !key) {
        document.getElementById('errorMsgAES').innerHTML = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }

    try {
        const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        document.getElementById('plaintextAES').value = plaintext;
        document.getElementById('errorMsgAES').innerHTML = '';
    } catch (error) {
        document.getElementById('errorMsgAES').innerHTML = 'Lỗi khi giải mã: ' + error.message;
    }
} 