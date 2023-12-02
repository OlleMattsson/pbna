import { Account, AccountType } from "./Account";

interface AMInterface {
  getAccounts(): Account[];
  getAccountById(id: number): Account | undefined;
  put(a: Account): void;
  delete(a: Account): void;
  isUniqueAccountId(id: number): boolean;
}

export class AccountManager implements AMInterface {
  private accounts: Account[];
  constructor() {
    this.accounts = [];
  }

  getAccounts = (): Account[] => this.accounts;

  getAccountById = (id: number): Account | undefined => {
    return this.accounts.find((a) => {
      return a.getId() === id;
    });
  };

  put = (a: Account): void => {
    this.accounts.push(a);
  };

  delete = (a: Account): void => {
    const filteredAccounts = this.accounts.filter((account) => {
      const { id: accountToDelete } = a.get();
      const { id: currentAccount } = account.get();
      if (currentAccount !== accountToDelete) {
        return account;
      }
    }, []);

    this.accounts = filteredAccounts;
    return;
  };

  isUniqueAccountId = (id: number): boolean => {
    const result = this.accounts.findIndex((a: Account) => {
      const { id: existingId } = a.get();
      return id === existingId;
    });

    if (result === -1) {
      return true;
    } else {
      return false;
    }
  };

  getAccountName = (idQuery: number): string => {
    const account = this.accounts.find((a: Account) => {
      const { id } = a.get();
      if (idQuery === id) {
        return a;
      }
    });

    if (account) {
      const { name } = account.get();
      return name;
    } else {
      return "";
    }
  };

  getIncomeStatementAccounts = () => {
    return this.accounts.filter((account) => {
      const { type } = account.get();

      if (type == AccountType.IncomeStatement) {
        return account;
      }
    });
  };

  getLiabilityAccounts = () => {
    return this.accounts.filter((account) => {
      const { type } = account.get();

      if (type == AccountType.Liability) {
        return account;
      }
    });
  };

  getAssetAccounts = () => {
    return this.accounts.filter((account) => {
      const { type } = account.get();

      if (type == AccountType.Asset) {
        return account;
      }
    });
  };
}
