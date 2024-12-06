// Hàm tạo salt ngẫu nhiên
function generateSalt(length = 10) {
    const chars = './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '$2a$10$';
    for(let i = 0; i < length; i++) {
        salt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return salt;
}

// Hàm mô phỏng Bcrypt hash
function bcryptHash(password, salt) {
    // Trong thực tế, đây sẽ là một hàm phức tạp hơn
    // Đây chỉ là mô phỏng đơn giản để demo
    const hash = btoa(password + salt); // Base64 encode
    return `${salt}${hash}`;
}

function btnBcryptHash() {
    const plaintext = document.getElementById('plaintextBcrypt').value;
    if (!plaintext) {
        document.getElementById('errorMsgBcrypt').innerHTML = 'Vui lòng nhập mật khẩu!';
        return;
    }

    const salt = generateSalt();
    const hash = bcryptHash(plaintext, salt);
    
    document.getElementById('saltBcrypt').value = salt;
    document.getElementById('hashBcrypt').value = hash;
    document.getElementById('errorMsgBcrypt').innerHTML = '';
}

function btnBcryptVerify() {
    const plaintext = document.getElementById('plaintextBcrypt').value;
    const hash = document.getElementById('hashBcrypt').value;
    
    if (!plaintext || !hash) {
        document.getElementById('errorMsgBcrypt').innerHTML = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }

    const salt = hash.substring(0, hash.indexOf('$', 3) + 22); // Lấy phần salt
    const newHash = bcryptHash(plaintext, salt);
    
    const isMatch = (newHash === hash);
    document.getElementById('verifyResult').innerHTML = isMatch ? 
        '<span class="text-success">✓ Mật khẩu khớp!</span>' : 
        '<span class="text-danger">✗ Mật khẩu không khớp!</span>';
} 