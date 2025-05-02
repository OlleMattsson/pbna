import { Account, AccountType } from "./Account";

interface AMInterface {
  getAccounts(): Account[];
  put(a: Account): void;
  delete(a: Account): void;
}

export class AccountManager implements AMInterface {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  getAccounts = (): Account[] => this.accounts;

  put = (a: Account): void => {
    this.accounts.push(a);
  };

  delete = (a: Account): void => {
    const filteredAccounts = this.accounts.filter((account) => {
      const { id: accountToDelete } = a;
      const { id: currentAccount } = account;
      if (currentAccount !== accountToDelete) {
        return account;
      }
    }, []);

    this.accounts = filteredAccounts;
    return;
  };

  getIncomeStatementAccounts = () => {
    return this.accounts.filter((account) => {
      if (account.type == AccountType.IncomeStatement) {
        return account;
      }
    });
  };

  getLiabilityAccounts = () => {
    return this.accounts.filter((account) => {
      if (account.type == AccountType.Liability) {
        return account;
      }
    });
  };

  getAssetAccounts = () => {
    return this.accounts.filter((account) => { 
      if (account.type == AccountType.Asset) {
        return account;
      }
    });
  };

  getNoopAccounts = () => {
    return this.accounts.filter((a) => { 
      if (a.type == AccountType.Noop) {
        return a;
      }
    });
  };
}
