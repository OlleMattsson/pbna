import { useState } from "react";
import { AddTransactionRowComponent } from "./AddTransactionRowComponent";
import { Row, RowType } from "./../../Row/Row";
import { Transaction } from "../Transaction";
import { AccountManager } from "./../../Account/AccountManager";
import "react-datepicker/dist/react-datepicker.css";
import sv from "date-fns/locale/sv";
import DatePicker, { registerLocale } from "react-datepicker";
import { Attachment, Attachments } from "./Attachments";

registerLocale("sv", sv);



export const AddTransactionComponent: Function = ({
  addTransaction,
  accountManager
}: {
  addTransaction: Function;
  accountManager: AccountManager;
}) => {
  const [transaction, setTransaction] = useState(new Transaction());
  const [startDate, setStartDate] = useState(new Date());

  const handleAddRow = () => {
    const existingRows = transaction.getRows();

    const updatedTransaction = new Transaction([...existingRows]);
    updatedTransaction.putRow(
      new Row({
        createdAt: new Date(),
        date: new Date(),
        account: "1000",
        type: RowType.Debit,
        amount: 0,
        precision: 0,
        description: ""
      })
    );

    setTransaction(updatedTransaction);
  };

  const handleRemoveRow = (id: number) => {
    transaction.removeRow(id);
    const updatedTransaction = new Transaction([...transaction.getRows()]);
    setTransaction(updatedTransaction);
  };

  const handleUpdateRow = ({
    id,
    account,
    type,
    amount,
    precision
  }: {
    id: number;
    account: string;
    type: RowType;
    amount: number;
    precision: number;
  }) => {
    const row = transaction.getRow(id);

    if (account) {
      row?.setAccount(account);
    }
    if (type) {
      row?.setType(type);
    }
    if (amount) {
      row?.setRawAmount(amount);
    }

    if (precision || precision === 0) {
      row?.setPrecision(precision);
    }

    const updatedTransaction = new Transaction([...transaction.getRows()]);
    setTransaction(updatedTransaction);
  };

  
  const handleAddAttachment = (a: Attachment) => {
    const updatedTransaction = new Transaction([...transaction.getRows()]);
    updatedTransaction.setAttachments(transaction.getAttachments())
    updatedTransaction.putAttachment(a)
    setTransaction(updatedTransaction);
  }

  const handleRemoveAttachment = (a: Attachment) => {
    const updatedTransaction = new Transaction([...transaction.getRows()]);
    updatedTransaction.setAttachments(transaction.getAttachments())
    updatedTransaction.deleteAttachment(a)
    setTransaction(updatedTransaction);
  }
  

  return (
    <>
      {transaction.getRows().length > 0 && (
        <>
          <input
            type="text"
            defaultValue="description"
            onChange={(e) => {
              console.log(e.target.value)
              transaction.setDescription(e.target.value);
            }}
          />
          date:
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              transaction.setDate(date);
              setStartDate(new Date(date));
            }}
            locale="sv"
            dateFormat={"dd.MM.yyyy"}
          />
        </>
      )}
      <br />
      {transaction.getRows().map((row, i) => (
        <AddTransactionRowComponent
          handleRemoveRow={handleRemoveRow}
          handleUpdateRow={handleUpdateRow}
          key={row.getId()}
          id={row.getId()}
          accountManager={accountManager}
        />
      ))}
      <button onClick={() => handleAddRow()}>add row</button>
      <Attachments 
        attachments={transaction.getAttachments()} 
        addHandler={handleAddAttachment} 
        removeHandler={handleRemoveAttachment}/>
      <button
        onClick={() => {
          addTransaction(transaction);
          setTransaction(new Transaction());
        }}
      >
        save transaction
      </button>
    </>
  );
};
