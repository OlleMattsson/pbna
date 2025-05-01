interface AccountConstructorProps {
  id: string;
  account: number;
  type: AccountType;
  name: string;
  description?: string;
  vatAmount?: number;
  vatAccountId?: number;
}

interface AccountInterface {
  get(): {};
  getId(): string; // deprecated
}

export enum AccountType {
  Asset,
  Liability,
  Vat,
  IncomeStatement,
  Noop
}

class Account implements AccountInterface {
  public id: string;      // system id
  public account: number; // the account id used to identify it in traditional book keeping, eg. "1000" or "1234"
  public name: string;
  private description: string;
  private vatAmount: number; // if > 0 this account is regarded to be a VAT account
  private vatAccountId: number; // reference to account that has positive vatAmount
  
  private _type!: AccountType;

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

  /**
  * @deprecated Use the property accessor `account.type` instead.
  */
  public getId = (): string =>  {
    console.warn("getId() is deprecated, use account.id instead")
    return this.id;
  }

  public getAccountNumber = (): number => {
    console.warn("getAccount() is deprecated, use account.account instead")
    return this.account
  }

   /**
   * @deprecated Use the property accessor `account.type` instead.
   */
  public getType = () => {
    console.warn("getType() is deprecated, use account.type instead")
    return this.type;
  }
  

  public getName = () => {
    console.warn("getName() is deprecated, use account.name instead")
    return this.name;
  }

  /*
  
  */
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

    console.warn("Account.put() is deprecated, use account.name instead")


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

  /*
    type
  */
   public set type(raw: string | number) {

    // Normalize string -> number
    const parsed = typeof raw === 'number'
      ? raw
      : parseInt(raw, 10);

    // extra layer of protection against out of range or NaN values
    if (!(parsed in AccountType)) {
      throw new Error(`Invalid AccountType: ${raw}`);
    }

    this._type = parsed as AccountType;
  } 

  public get type(): AccountType {
    return this._type;
  }

}

export { Account };
