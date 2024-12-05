
// Wallet Class with methods to make transactions and save them to storage
class Wallet {
  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    this.balance = parseFloat(localStorage.getItem('balance')) || 0;
  }

  saveToStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    localStorage.setItem('balance', this.balance.toString());
  }

  
  deposit(amount, description) {
    const transaction = { amount, description, date: new Date().toString() };
    this.transactions = [...this.transactions, transaction];
    this.balance += amount;
    this.saveToStorage(); 
    return transaction;
  }

  withdraw(amount, description) {
    amount = -amount;
    const transaction = { amount, description, date: new Date().toString() };
    this.transactions.push(transaction);
    this.balance += amount;
    this.saveToStorage(); 
    return transaction;
  }
  getTransactions() {
    return this.transactions;
  }
  
  getBalance() {
    return this.balance;
  }
  }




// Currency Converter Class to convert money
class CurrencyConverter {
  static async fetchRates() {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/CAD');
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
    
  static convert(amount, rate) {
    return amount * rate;
  }
}



// Initializing Wallet
const wallet = new Wallet();



const balanceElement = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');
const currencyDropdown = document.getElementById('currency');
const convertedAmount = document.getElementById('converted-amount');
  
  // Loading data
(async function init() {
  const rates = await CurrencyConverter.fetchRates();
  if (rates) {
    for (const currency in rates.rates) {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      currencyDropdown.appendChild(option);
    }
  }
  updateUI();
})();
  


// Updating the user interface
function updateUI() {
  balanceElement.textContent = `$${wallet.getBalance().toFixed(2)}`;
  transactionList.innerHTML = wallet.getTransactions()
    .map(t => `<li>${t.date}: ${t.description} - $${t.amount.toFixed(2)}</li>`)
    .join('');
}
  


//Adding transactions (deposit/withdraw)
document.getElementById('deposit-btn').addEventListener('click', () => {
  const amount = parseFloat(prompt('Enter transaction amount:'));
  const description = prompt('Enter transaction description:');
  if (!isNaN(amount) && description) {
    wallet.deposit(amount, description);
    updateUI();
  }
});
  
document.getElementById('withdraw-btn').addEventListener('click', () => {
  const amount = parseFloat(prompt('Enter transaction amount:'));
  const description = prompt('Enter transaction description:');
  if (!isNaN(amount) && description) {
    wallet.withdraw(amount, description);
    updateUI();
  }
});



// Converting currency
document.getElementById('convert-btn').addEventListener('click', async () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const selectedCurrency = document.getElementById('currency').value;
  
  if (!isNaN(amount) && selectedCurrency) {
    const rates = await CurrencyConverter.fetchRates();
    if (rates) {
      const rate = rates.rates[selectedCurrency];
      const result = CurrencyConverter.convert(amount, rate);
      convertedAmount.textContent = `$${amount} to ${selectedCurrency}: ${result.toFixed(2)} ${selectedCurrency}`;
    }
  }
});
  



const ratesBtn = document.getElementById('rates-btn');
const ratesDisplay = document.getElementById('rates-display');
const ratesList = document.getElementById('rates-list');


//Displaying exchange rates
ratesBtn.addEventListener('click', async () => {
  const rates = await CurrencyConverter.fetchRates();
  if (ratesDisplay.style.display === 'block') {
    ratesDisplay.style.display = 'none';
    ratesBtn.textContent = 'Show Exchange Rates';
  } else {

    const rates = await CurrencyConverter.fetchRates();
    if (rates) {
      ratesList.innerHTML = ''; 
      for (const [currency, rate] of Object.entries(rates.rates)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${currency}: ${rate.toFixed(2)}`;
        ratesList.appendChild(listItem);
      }
      ratesDisplay.style.display = 'block';
      ratesBtn.textContent = 'Hide Exchange Rates'; 
    } else {
      alert('Failed to load exchange rates. Please try again later.');
    }
  }
});