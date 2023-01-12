import { useState } from "react";
import { AddTransactionRowComponent } from "./AddTransactionRowComponent";
import { Row, RowType } from "./../../Row/Row";
import { Transaction } from "../Transaction";
import { AccountManager } from "./../../Account/AccountManager";
import "react-datepicker/dist/react-datepicker.css";
import sv from "date-fns/locale/sv";
import DatePicker, { registerLocale } from "react-datepicker";
import { generateRandomInteger } from "./../../helpers/generateRandomInt";


registerLocale("sv", sv);

type Attachment = {[key:string]: {name: string, data:string} }

const AttachmentList: Function = ({
  attachments, 
  removeAttachment
} : {
  attachments: Attachment[], 
  removeAttachment: Function
}) => { 

  const styles = {
    deleteAttachmentAnchor:{textDecoration: "underline", cursor: "pointer"}
  }

  const handleOnDelete = (key: string) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    removeAttachment(key)
  }

  return (
    <>
      {attachments.length ? attachments.map((a) => {
        const key = Object.keys(a)[0]
        const data = a[key].data
        const name = a[key].name
        return (
          <div key={key}>
            <img className="thumb" src={`${[data]}`}/>
            <p>remove{" "} 
              <a style={styles.deleteAttachmentAnchor} 
                onClick={handleOnDelete(key)}
              >
                {name}
              </a>
            </p>
          </div>
        )
      }): <p>No attachments</p>}
    </>
  )
}


const Attachments: Function = () => {

  const [attachments, setAttachments] = useState<Attachment[]>([])

  const removeAttachment = (keyToDelete: String) => {
    
    const filteredAttachments = attachments.filter(a => {
      const key = Object.keys(a)[0]

      if (key !== keyToDelete) {
        return a
      }
    })

    localStorage.setItem("images", JSON.stringify(filteredAttachments));
    setAttachments(filteredAttachments)
  }

  return(
    <div>
      <p>Attachments</p>
      <input type="file" id="attachmentInput" onChange={(evt) => {

        if ( evt.target.files ) {

          Array.from(evt.target.files).forEach((file) => {

            // early escape hatch for non image files
            if (!file.type.match('image.*')) {
              return
            }
  
            var r = new FileReader();

            r.onload = (({name}) =>
              (e) => {
                if (e.target && typeof e.target.result === "string") {
                  const newAttachment = {
                    [generateRandomInteger()]: {name, data: e.target.result}
                  }
                  const newAttachments = [...attachments, newAttachment]
                  setAttachments(newAttachments)
                  localStorage.setItem("images", JSON.stringify(newAttachments));
                }
              }
            )(file); // scope File inside the FileReader.onload event

            r.readAsDataURL(file);        
          })
        }
      }}/>
      <AttachmentList attachments={attachments} removeAttachment={removeAttachment} />
    </div>
  )
}

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
      <Attachments />
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
