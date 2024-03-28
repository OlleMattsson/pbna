interface AccountConstructorProps {
  id: number;
  account: number;
  type: AccountType;
  name: string;
  description?: string;
  vatAmount?: number;
  vatAccountId?: number;
}

interface AccountInterface {
  get(): {};
  getId(): number;
}

export enum AccountType {
  Asset,
  Liability,
  Vat,
  IncomeStatement,
  Noop
}

class Account implements AccountInterface {
  private id: number;      // system id
  private account: number; // the account id used to identify it in traditional book keeping, eg. "1000" or "1234"
  private type: AccountType;
  private name: string;
  private description: string;
  private vatAmount: number; // if > 0 this account is regarded to be a VAT account
  private vatAccountId: number; // reference to account that has positive vatAmount

  public constructor({
    id,
    account,
    type,
    name,
    description,
    vatAmount,
    vatAccountId
  }: AccountConstructorProps) {
    this.id = id;
    this.account = account
    this.type = type;
    this.name = name;
    this.description = description || "";
    this.vatAmount = vatAmount || 0;
    this.vatAccountId = vatAccountId || 0;
  }

  public get = () => {
    const { id, account, type, name, description, vatAmount, vatAccountId } = this;
    return { id, account, type, name, description, vatAmount, vatAccountId };
  };

  public getId = (): number => this.id;

  public getAccountNumber = (): number => this.account

  public getType = () => this.type;

  public getName = () => this.name;

  public put = ({
    id,
    account,
    type,
    name,
    description,
    vatAmount,
    vatAccountId
  }: {
    id?: number;
    account?: number;
    type?: AccountType;
    name?: string;
    description?: string;
    vatAmount?: number;
    vatAccountId?: number;
  }) => {
    if (id) {
      this.id = id;
    }
    if (account) {
      this.account = account;
    }
    if (type) {
      this.type = type;
    }
    if (name) {
      this.name = name;
    }
    if (description) {
      this.description = description;
    }
    if (vatAmount) {
      this.vatAmount = vatAmount;
    }
    if (vatAccountId) {
      this.vatAccountId = vatAccountId;
    }
  };
}

export { Account };
