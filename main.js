class WordMemorizer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.words = JSON.parse(localStorage.getItem('word-memorizer-words')) || [];
    this.cycleQueue = [];
    this.currentWord = '';
    this.totalWordsCount = this.words.length;
    this.shownCount = 0;
  }

  connectedCallback() {
    this.render();
    this.updateStatus();
  }

  shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  addWord() {
    const input = this.shadowRoot.querySelector('#word-input');
    const word = input.value.trim();
    if (word) {
      this.words.push(word);
      localStorage.setItem('word-memorizer-words', JSON.stringify(this.words));
      this.totalWordsCount = this.words.length;
      input.value = '';
      this.updateStatus();
    }
  }

  showNextWord() {
    if (this.words.length === 0) {
      alert('Please add some words first!');
      return;
    }

    if (this.cycleQueue.length === 0) {
      this.cycleQueue = this.shuffle(this.words);
      this.shownCount = 0;
    }

    this.currentWord = this.cycleQueue.pop();
    this.shownCount++;
    this.renderCard();
    this.updateStatus();
  }

  resetWords() {
    if (confirm('Are you sure you want to delete all words? This action cannot be undone.')) {
        this.words = [];
        this.cycleQueue = [];
        this.currentWord = '';
        this.totalWordsCount = 0;
        this.shownCount = 0;
        localStorage.removeItem('word-memorizer-words');
        this.render();
        this.updateStatus();
    }
  }

  updateStatus() {
    const status = this.shadowRoot.querySelector('.status');
    const cycleStatus = this.shadowRoot.querySelector('.cycle-status');
    
    status.textContent = `Total words: ${this.totalWordsCount}`;
    
    if (this.shownCount > 0) {
        cycleStatus.textContent = `Cycle: ${this.shownCount} / ${this.totalWordsCount}`;
    } else if (this.totalWordsCount > 0) {
        cycleStatus.textContent = 'Click Next to start';
    } else {
        cycleStatus.textContent = 'Add words and click Next to start';
    }
  }

  renderCard() {
    const cardContent = this.shadowRoot.querySelector('.card-content');
    cardContent.innerHTML = `<h2>${this.currentWord}</h2>`;
    cardContent.classList.remove('fade-in');
    void cardContent.offsetWidth; // Trigger reflow
    cardContent.classList.add('fade-in');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: inherit;
        }

        .card {
          background: var(--card-bg, #fff);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          text-align: center;
          transition: transform 0.3s ease;
          border: 1px solid oklch(0.9 0.01 200);
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .card-content {
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .card-content h2 {
          font-size: 3rem;
          margin: 0;
          color: var(--primary-color);
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0 1rem;
        }

        input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 2px solid oklch(0.9 0.01 200);
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        input:focus {
          border-color: var(--primary-color);
        }

        button {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-add {
          background-color: var(--secondary-color);
          color: white;
        }

        .btn-add:hover {
          filter: brightness(0.9);
        }

        .btn-next {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          width: 100%;
          font-size: 1.2rem;
          margin-top: 1rem;
          box-shadow: 0 4px 15px oklch(0.6 0.15 250 / 0.3);
        }

        .btn-next:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px oklch(0.6 0.15 250 / 0.4);
        }

        .btn-next:active {
          transform: scale(0.98);
        }

        .btn-reset {
            background-color: transparent;
            color: oklch(0.6 0.15 250);
            border: 2px solid oklch(0.9 0.01 200);
            width: 100%;
            margin-top: 0.5rem;
        }

        .btn-reset:hover {
            background-color: oklch(0.95 0.01 200);
            border-color: oklch(0.8 0.05 250);
        }

        .status-container {
            display: flex;
            justify-content: space-between;
            padding: 0 1rem;
            font-size: 0.9rem;
            opacity: 0.7;
            margin-top: 1rem;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @container (max-width: 400px) {
          .card-content h2 {
            font-size: 2rem;
          }
          .input-group {
            flex-direction: column;
          }
        }
      </style>
      <div class="card">
        <div class="input-group">
          <input type="text" id="word-input" placeholder="Type an English word..." />
          <button class="btn-add">Add</button>
        </div>
        
        <div class="card-content">
          <p>Your words will appear here</p>
        </div>

        <button class="btn-next">Next Word</button>
        <button class="btn-reset">Reset All Words</button>

        <div class="status-container">
            <span class="status">Total words: 0</span>
            <span class="cycle-status">Add words and click Next to start</span>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.btn-add').addEventListener('click', () => this.addWord());
    this.shadowRoot.querySelector('#word-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addWord();
    });
    this.shadowRoot.querySelector('.btn-next').addEventListener('click', () => this.showNextWord());
    this.shadowRoot.querySelector('.btn-reset').addEventListener('click', () => this.resetWords());
  }
}

customElements.define('word-memorizer', WordMemorizer);
