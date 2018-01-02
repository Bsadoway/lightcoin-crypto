class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  getBalance() {
    this.balance = 0;
    this.transactions.forEach((item) => {
      this.balance += item.value;
    })
    return this.balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    }
  }

  isAllowed() {
    if (this.account.getBalance() + this.value < 0) {
      return false;
    }
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("My account");

console.log(`Starting balance: $${myAccount.getBalance()}`);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();

t2 = new Withdrawal(9.99, myAccount);
t2.commit();

t3 = new Deposit(120.00, myAccount);
t3.commit();

t4 = new Withdrawal(9.99, myAccount);
t4.commit();

t5 = new Deposit(56.00, myAccount);
t5.commit();


console.log(`Number of Transactions: ${myAccount.transactions.length}`);
console.log(`Ending balance: $${myAccount.getBalance()}`);
