const generateLottoNumbers = () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers);
};

document.getElementById('generate-lotto-numbers').addEventListener('click', () => {
  const lottoNumbers = generateLottoNumbers();
  const lottoNumbersDiv = document.getElementById('lotto-numbers');
  lottoNumbersDiv.innerHTML = '';
  lottoNumbers.forEach(number => {
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('lotto-number');
    numberDiv.textContent = number;
    lottoNumbersDiv.appendChild(numberDiv);
  });
});
