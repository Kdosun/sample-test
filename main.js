const generateLottoNumbers = () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
};

// Initialize Theme
setTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

document.getElementById('generate-lotto-numbers').addEventListener('click', () => {
  const lottoNumbers = generateLottoNumbers();
  const lottoNumbersDiv = document.getElementById('lotto-numbers');
  lottoNumbersDiv.innerHTML = '';
  lottoNumbers.forEach((number, index) => {
    setTimeout(() => {
      const numberDiv = document.createElement('div');
      numberDiv.classList.add('lotto-number');
      numberDiv.textContent = number;
      lottoNumbersDiv.appendChild(numberDiv);
    }, index * 100);
  });
});
