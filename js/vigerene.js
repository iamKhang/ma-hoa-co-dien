// Thêm vào đầu file js/vigerene.js

// Tạo bảng Vigenère khi trang được load
document.addEventListener('DOMContentLoaded', function() {
  createVigenereTable();
});

function createVigenereTable() {
  const table = document.querySelector('.vigenere-table tbody');
  if (!table) return;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Chỉ tạo 7 hàng đầu tiên
  for (let i = 0; i < 7; i++) {
    const row = document.createElement('tr');
    
    // Thêm chữ cái đầu hàng
    const firstCell = document.createElement('td');
    firstCell.textContent = alphabet[i];
    row.appendChild(firstCell);
    
    // Thêm 7 ô trong mỗi hàng
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      const shift = (i + j) % 26;
      cell.textContent = alphabet[shift];
      row.appendChild(cell);
    }
    
    table.appendChild(row);
  }
}

function cryptVigerane(text, key, isDecrypt = false) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var codeTxt = text.charCodeAt(i);
    var codeKey = key.charCodeAt(i % key.length) - 65;
    if (isDecrypt == true) {
      codeKey = 26 - codeKey;
    }
    if (codeTxt >= 65 && codeTxt <= 90) {
      let resultCode = (codeTxt - 65 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 65);
    } else if (codeTxt >= 97 && codeTxt <= 122) {
      let resultCode = (codeTxt - 97 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 97);
    } else {
      result += text.charAt();
    }
  }
  return result;
}

function isKeyValid(key) {
  for (var i = 0; i < key.length; i++) {
    codeKey = key.charCodeAt(i);
    if (codeKey < 65 || codeKey > 90) {
      return false;
    }
  }
  return true;
}

function btnEncryptVigerane() {
  var plainText = document.getElementById("plainTextVigerane").value;
  if (plainText.length == 0) {
    document.getElementById("errorMsgVigerane").innerHTML =
      "Chưa nhập Plain text kìa! :D";
    return;
  }
  var key = document.getElementById("keyVigerane").value.toUpperCase();
  if (key.length == 0) {
    document.getElementById("errorMsgVigerane").innerHTML =
      "Khóa K không được để trống";
    return;
  } else if (isKeyValid(key) == false) {
    document.getElementById("errorMsgVigerane").innerHTML =
      "Khóa K chứa kí tự không hợp lệ";
    return;
  }
  document.getElementById("keyVigerane").value = key;
  var cipherText = cryptVigerane(plainText, key);
  document.getElementById("cipherTextVigerane").value = cipherText;
  document.getElementById("errorMsgVigerane").innerHTML = "";
}

function btnDecryptVigerane() {
  var cipherText = document.getElementById("cipherTextVigerane").value;
  if (cipherText.length == 0) {
    document.getElementById("errorMsgVigerane").innerHTML =
      "Chưa nhập Cipher text kìa!";
    return;
  }
  document.getElementById("cipherTextVigerane").value = cipherText;
  var key = document.getElementById("keyVigerane").value.toUpperCase();
  if (key.length == 0) {
    document.getElementById("errorMsgVigerane").innerHTML =
      "Khóa K không được để trống nhé!";
    return;
  } else if (isKeyValid(key) == false) {
    document.getElementById("errorMsgVigerane").innerHTML =
      "Khóa K chứa kí tự không hợp lệ";
    return;
  }
  document.getElementById("keyVigerane").value = key;
  var plainText = cryptVigerane(cipherText, key, true);
  document.getElementById("plainTextVigerane").value = plainText;

  document.getElementById("errorMsgVigerane").innerHTML = "";
}
