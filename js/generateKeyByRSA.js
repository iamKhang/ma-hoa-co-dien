function generateRSAKeys(p, q, e) {
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let d = 0;
  for (let i = 1; i < phi; i++) {
    if ((i * e) % phi === 1) {
      d = i;
      break;
    }
  }
  return {
    publicKey: { n, e },
    privateKey: { n, d },
  };
}

// Hàm kiểm tra số nguyên tố
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Hàm tìm 20 số nguyên tố cùng nhau với (p-1)*(q-1)
function btnGetListPrime() {
  // Lấy giá trị của p và q từ textarea
  const pValue = document.getElementById("text-p-search").value.trim();
  const qValue = document.getElementById("text-q-search").value.trim();

  // Kiểm tra xem p và q có giá trị hợp lệ không
  if (!pValue || !qValue) {
    alert("Vui lòng nhập giá trị cho p và q.");
    return;
  }

  // Chuyển đổi giá trị p và q thành số nguyên
  const p = parseInt(pValue);
  const q = parseInt(qValue);

  // Tính giá trị (p-1)*(q-1)
  const phi = (p - 1) * (q - 1);

  // Tìm 20 số nguyên tố cùng nhau với (p-1)*(q-1)
  const primes = [];
  let currentNumber = 2;

  while (primes.length < 20 && currentNumber <= phi) {
    if (isPrime(currentNumber) && phi % currentNumber === 0) {
      primes.push(currentNumber);
      console.log(currentNumber);
    }
    currentNumber++;
  }

  // Hiển thị kết quả trong textarea
  document.getElementById("list-e").value = primes.join(", ");
}
