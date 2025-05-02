interface AccountConstructorProps {
  id: string;
  account: number;
  type: AccountType;
  name: string;
  description?: string;
  vatAmount?: number;
  vatAccountId?: number;
}

interface AccountInterface {}

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
  public description: string;
  public vatAmount: number; // if > 0 this account is regarded to be a VAT account
  public vatAccountId: number; // reference to account that has positive vatAmount
  
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
