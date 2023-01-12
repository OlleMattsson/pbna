import { Row, RowType } from "./../Row/Row";
import { Attachment } from "./UI/Attachments";

interface TransactionInterface {
  get(pretty?: boolean): Transaction | string;
  getRow(rowId: number): Row | null;
  getRows(): Row[];
  getDescription(): string;
  setDescription(d: string): void;
}

class TransactionError extends Error {
  public message;
  public transaction;
  public type;
  constructor({
    message,
    transaction
  }: {
    message: string;
    transaction: Transaction;
  }) {
    super();
    this.message = message;
    this.transaction = transaction;
    this.type = "transactionError";
  }
}

class Transaction implements TransactionInterface {
  // TODO Implement being able to manually assigning a number to a transaction since it's expected by the end user for practical accounting purposes
  private id: number;
  private attachments: Attachment[]
  
  private rows: Row[];
  constructor(rows: Row[] = []) {
    this.rows = rows;
    this.id = 0 
    this.attachments = []

    /*
    if (!this.doesBalance()) {
      throw new TransactionError({
        message: "did not balance",
        transaction: this
      });
    }
    */
  }

  get = (pretty = true) => {
    if (pretty) {
      return this.rows.reduce((acc, Row) => {
        const { date, account, type } = Row.get();
        acc += `${date.toISOString()}: ${account} | ${Row.getAmount()} | ${type}\n`;
        return acc;
      }, "");
    }
    return this;
  };

  getRow = (rowId: number) => {
    const foundRow = this.rows.filter((row) => {
      return row.getId() === rowId;
    });

    if (foundRow.length === 1) {
      return foundRow[0];
    }

    console.log(`no row found with id: ${rowId}`);
    return null;
  };

  getRows = () => this.rows;

  putRow = (r: Row) => {
    this.rows.push(r);
  };

  removeRow = (rowId: number) => {
    const filteredRows = this.getRows().filter((row) => {
      if (row.getId() !== rowId) {
        return row;
      }
    }, []);

    this.rows = filteredRows;
    return;
  };

  private getBalance = () =>
    this.rows.reduce(
      (acc, row) => {
        if (row.getType() === RowType.Debit) {
          acc.debit += row.getAmount();
        }

        if (row.getType() === RowType.Credit) {
          acc.credit += row.getAmount();
        }

        return acc;
      },
      { debit: 0, credit: 0 }
    );

  public doesBalance = () => {
    const balance = this.getBalance();
    if (balance.debit === balance.credit) {
      return true;
    } else {
      return false;
    }
  };

  public getDescription = (): string => {
    const rows = this.getRows();
    return rows[0].getDescription();
  };

  public setDescription = (d: string): void => {
    const rows = this.getRows();

    rows.forEach((row) => {
      row.setDescription(d);
    });
  };

  public getDate = (): Date => {
    const rows = this.getRows();
    return rows[0].getDate();
  };

  public setDate = (d: Date): void => {
    const rows = this.getRows();

    rows.forEach((row) => {
      row.setDate(d);
    });
  };

  public getCreatedAt = (): Date => {
    const rows = this.getRows();
    return rows[0].getCreatedAt();
  };

  public setAttachments = (a: Attachment[]): void => {
    this.attachments = a
  }

  public putAttachment = (a: Attachment): void =>{
    this.attachments.push(a)
  }

  public getAttachments = (): Attachment[] =>{
    return this.attachments
  }

  // n:th attachment in list
  public deleteAttachment = (a: Attachment): void => {
    const keyToDelete = Object.keys(a)[0]

    const filteredAttachments = this.attachments.filter(curr => {
      const key = Object.keys(curr)[0]

      if (key !== keyToDelete) {
        return curr
      }
    })

    this.setAttachments(filteredAttachments)
  }
}

export { Transaction, TransactionError };
