interface AccountConstructorProps {
  id: number;
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
  asset,
  liability,
  vat,
  incomeStatement,
  noop
}

export enum AccountType2 {
  Asset = "asset",
  Liability = "liability",
  VAT = "vat",
  IncomeStatement = "incomeStatement",
  NoOp = "noop"
}

class Account implements AccountInterface {
  private id: number;
  private type: AccountType;
  private name: string;
  private description: string;
  private vatAmount: number; // if > 0 this account is regarded to be a VAT account
  private vatAccountId: number; // reference to account that has positive vatAmount

  public constructor({
    id,
    type,
    name,
    description,
    vatAmount,
    vatAccountId
  }: AccountConstructorProps) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.description = description || "";
    this.vatAmount = vatAmount || 0;
    this.vatAccountId = vatAccountId || 0;
  }

  public get = () => {
    const { id, type, name, description, vatAmount, vatAccountId } = this;
    return { id, type, name, description, vatAmount, vatAccountId };
  };

  public getId = (): number => this.id;

  public getType = () => this.type;

  public getName = () => this.name;

  public put = ({
    id,
    type,
    name,
    description,
    vatAmount,
    vatAccountId
  }: {
    id?: number;
    type?: AccountType;
    name?: string;
    description?: string;
    vatAmount?: number;
    vatAccountId?: number;
  }) => {
    if (id) {
      this.id = id;
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
