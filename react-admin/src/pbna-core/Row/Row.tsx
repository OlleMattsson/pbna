import { generateRandomInteger } from "../helpers";
import { Account } from '../Account/Account'

enum RowType {
  Debit = "debit",
  Credit = "credit"
}

interface RowObject {
  id?: number;
  createdAt?: Date;
  date: Date;
  account: Account;
  amount?: number;
  type?: RowType;
  precision?: number; // number decimals
  description?: string;
  debit?: number;
  credit?: number;
}

interface RowInterface {
  /**
   * get everything, useful when wanting to fetch multiple
   * properties in one go without having to call each getter separately.
   * Fetching sinuglar props is more convenient with the specific getters.
   * hint: avoid getting amount and precision this way, instead prefer getAmount()
   *
   * usage:
   *
   * const {id. type, description} = row.get()
   */
  get(): RowObject;

  getId(): number;

  getCreatedAt(): Date;

  getDate(): Date;
  setDate(d: Date): void;

  getAccount(): number;
  setAccount(a: number): void;

  // return amount including the precision
  // ie. amount: 12350, precision: 2 => 123,50
  // if the raw amount is needed for some reason, use the get() method
  getAmount(): number;

  // preferred
  // set the amount, calculate and set the precision in on go
  setAmount(a: number): void;

  // avoid these two, prefer setAmount()
  // TODO: remove from the public interface
  setRawAmount(a: number): void; // set the amount only. number _must_ be an integer!!
  setPrecision(t: number): void; // set precision only

  getType(): RowType | null;
  setType(t: RowType): void;

  getDescription(): string;
  setDescription(d: string): void;
}

class Row implements RowInterface {
  private id;
  private createdAt;
  private date;
  private account; // an Account object
  private amount; // deprecated
  private type; // deprecated
  private precision; // maybe deprecated... what is the precision of k6 decimal?
  private description;
  private debit
  private credit

  constructor(r: RowObject) {
    if (r.id === undefined) {
      this.id = generateRandomInteger();
    } else {
      this.id = r.id;
    }

    if (r.createdAt === undefined) {
      this.createdAt = new Date();
    } else {
      this.createdAt = r.createdAt;
    }
    this.date = r.date;
    this.account = r.account;
    this.amount = r.amount || 0;
    this.type = r.type;
    this.precision = r.precision;
    this.description = r.description;
    this.debit = r.debit || 0;
    this.credit = r.credit || 0;
  }

  get = (): RowObject => {
    return {
      id: this.id,
      createdAt: this.createdAt,
      date: this.date,
      account: this.account,
      type: this.type,
      amount: this.amount,
      precision: this.precision,
      description: this.description,
      debit: this.debit,
      credit: this.credit
    };
  };

  /**
   * id
   */
  getId = (): number => this.id;

  /**
   * createdAt
   */
  getCreatedAt = (): Date => this.createdAt;
  
  getDebit = (): number => this.debit;
  
  getCredit = (): number => this.credit;

  

  /**
   * date
   */
  getDate = (): Date => this.date;
  setDate = (d: Date) => {
    this.date = d;
  };

  /**
   * account
   * Return the account number of Acount instance
   */
  getAccount = (): number => parseInt(this.account.account, 10);
  setAccount = (a: string): void => {
    this.account = a;
  };

  /**
   * amount & precision
   */

  getAmount = (): number => {
    if (this.amount && this.precision && this.precision >= 1) {
      return this.amount / 10 ** this.precision;
    }

    if (this.amount && this.precision === 0) {
      return this.amount;
    }

    return 0;
  };

  setAmount = (a: number): void => {
    const value: string = a.toString(10);
    const split = value.split(".");
    const amount = parseInt(split.join(""), 10) || 0;
    const precision = split.length === 2 ? split[1].length : 0;
    this.setRawAmount(amount);
    this.setPrecision(precision);
  };

  setRawAmount = (a: number) => (this.amount = a);

  setPrecision = (p: number) => (this.precision = p);
  getPrecision = () => this.precision

  /**
   * type
   */
  getType = (): RowType | null => {

    console.log("")

    if (this.credit && this.credit > 0) {
      return RowType.Credit
    }

    if (this.debit && this.debit > 0) {
      return RowType.Debit
    }

    /*
    if (this.type) {
      return this.type;
    }
    */

    return null;
  };
  setType = (t: RowType) => (this.type = t);

  /**
   * description
   */
  getDescription = (): string => this.description || "";
  setDescription = (d: string) => (this.description = d);
}


export type {RowObject}

export { Row, RowType };

