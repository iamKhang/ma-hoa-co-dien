function btnEncryptCaesar() {
  document.getElementById("resultBruteforceCaesar").innerHTML = "";
  var plainText = document.getElementById("plainTextCaesar").value;
  if (plainText.length == 0) {
    document.getElementById("errorMsgCaesar").innerHTML =
      "Chưa nhập Plain text kìa! :D";
    return;
  }
  var key = document.getElementById("keyCaesar").value.toUpperCase();
  if (
    (isNaN(key) && key.length > 1) ||
    (!isNaN(key) && key.length > 2) ||
    key.length == 0
  ) {
    document.getElementById("errorMsgCaesar").innerHTML =
      "Khóa K bị rỗng hoặc sai!";
    return;
  }
  if (!isKeyValidCeaser(key)) {
    document.getElementById("errorMsgCaesar").innerHTML =
      "Khóa K không hợp lệ.";
    return;
  }
  if (!isNaN(key)) {
    if (parseInt(key) < 0 || parseInt(key) > 26) {
      document.getElementById("errorMsgCaesar").innerHTML =
        "Khóa K chỉ từ 0 đến 26";
      return;
    }
    key = String.fromCharCode(parseInt(key) + 65);
  }
  //document.getElementById("key").value = key;
  var cipherText = crypt(plainText, key);
  document.getElementById("cipherTextCaesar").value = cipherText;
  document.getElementById("errorMsgCaesar").innerHTML = "";
}

function crypt(text, key, isDecrypt = false) {
  var codeKey = key.charCodeAt() - 65;
  if (isDecrypt == true) {
    codeKey = 26 - codeKey;
  }
  var result = "";
  for (let i = 0; i < text.length; i++) {
    var codeTxt = text.charCodeAt(i);
    if (codeTxt >= 65 && codeTxt <= 90) {
      let resultCode = (codeTxt - 65 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 65);
    } else if (codeTxt >= 97 && codeTxt <= 122) {
      let resultCode = (codeTxt - 97 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 97);
    } else {
      result += text.charAt(i);
    }
  }
  return result;
}

function decryptCaesar(cipherText, key) {
  var codeKey;
  if (!isNaN(key)) {
    codeKey = 26 - parseInt(key);
  } else {
    codeKey = 26 - (key.charCodeAt() - 65);
  }
  var result = "";
  for (let i = 0; i < cipherText.length; i++) {
    var codeTxt = cipherText.charCodeAt(i);
    if (codeTxt >= 65 && codeTxt <= 90) {
      let resultCode = (codeTxt - 65 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 65);
    } else if (codeTxt >= 97 && codeTxt <= 122) {
      let resultCode = (codeTxt - 97 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 97);
    } else {
      result += cipherText.charAt(i);
    }
  }
  return result;
}

function btnDecryptCaesar() {
  document.getElementById("resultBruteforceCaesar").innerHTML = "";
  var cipherText = document.getElementById("cipherTextCaesar").value;
  if (cipherText.length == 0) {
      document.getElementById("errorMsgCaesar").innerHTML = 'Chưa nhập Cipher text kìa!';
      return;
  }
  document.getElementById("cipherTextCaesar").value = cipherText;
  var key = document.getElementById("key").value.toUpperCase();
  if (key.length > 1) {
      document.getElementById("errorMsg").innerHTML = 'Khóa K chỉ một ký tự thôi nhé';
      return;
  } else if (key.length == 0) {
      document.getElementById("plainText").value = "";
      var result = "<b>Tổng hợp các trường hợp phá mã:</b><br/><table><tr><th><b>Key K</b></th><th><b>PlainText</b></th></tr>";
      for (let i = 65; i <= 90; i++) {
          result += "<tr><td>" + String.fromCharCode(i) + "</td><td>" + crypt(cipherText, String.fromCharCode(i), true) + "</td></tr>";
      }
      result += "</table>";
      document.getElementById("resultBruteforce").innerHTML = result;
  } else {
      document.getElementById("key").value = key;
      var plainText = decryptCaesar(cipherText, key);
      document.getElementById("plainText").value = plainText;
  }

  document.getElementById("errorMsg").innerHTML = "";
}

function isKeyValidCeaser(key) {
  for (let i = 0; i < key.length; i++) {
    codeKey = key.charCodeAt(i);
    if (
      !((codeKey >= 65 && codeKey <= 90) || (codeKey >= 48 && codeKey <= 57))
    ) {
      return false;
    }
  }
  return true;
}

// Cập nhật Caesar shift khi thay đổi key
document.addEventListener('DOMContentLoaded', function() {
  const keyInput = document.getElementById('keyCaesar');
  if (keyInput) {
    keyInput.addEventListener('input', function() {
      const key = this.value;
      if (key.match(/^[0-9]+$/)) {
        const shift = parseInt(key) % 26;
        updateCaesarShift(shift);
      } else if (key.match(/^[A-Za-z]$/)) {
        const shift = key.toUpperCase().charCodeAt(0) - 65;
        updateCaesarShift(shift);
      }
    });
  }
});

function updateCaesarShift(shift) {
  const alphabet = 'ABCDEFGHIJ';
  const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);
  const shiftedElement = document.querySelector('.alphabet.shifted');
  if (shiftedElement) {
    shiftedElement.textContent = shiftedAlphabet.split('').join(' ');
  }
}

// Khởi tạo với shift mặc định là 3
document.addEventListener('DOMContentLoaded', function() {
  updateCaesarShift(3);
});
