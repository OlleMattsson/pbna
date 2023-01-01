import { Transaction } from "./Transaction";
import { Account } from "./../Account/Account";

interface TransatctionManagerInterface {
  getTransactions(): Transaction[];
  addTransaction(t: Transaction): void;
}

export class TransactionManager implements TransatctionManagerInterface {
  private transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  getTransactions() {
    return this.transactions;
  }

  addTransaction(t: Transaction) {
    this.transactions = [...this.transactions, t];
  }

  clear(): void {
    this.transactions = [];
  }

  getTransactionsForAccount(a: Account) {}
}
