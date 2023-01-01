import { Transaction } from "./../Transaction";
import {
  RowComponent,
  EditableRowComponent
} from "./../../Row/UI/RowComponent";
import { solidBlackBorder1px } from "./../../styles";
import { AccountManager } from "./../../Account/AccountManager";
import { Row } from "./../../Row/Row";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sv from "date-fns/locale/sv";
registerLocale("sv", sv);

export const TransactionComponent: Function = ({
  transaction,
  accountManager,
  transactionNumber
}: {
  transaction: Transaction;
  accountManager: AccountManager;
  transactionNumber: number;
}) => {
  const [startDate, setStartDate] = useState(new Date(transaction.getDate()));

  return (
    <div style={{ ...solidBlackBorder1px, textAlign: "left", padding: "10px" }}>
      <p>{transactionNumber + 1}</p>
      <div>
        date:
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            transaction.setDate(date);
          }}
          locale="sv"
          dateFormat={"dd.MM.yyyy"}
        />
      </div>
      <div style={{ margin: "10px 0px 10px 0px" }}>
        <span>description:</span>
        <br />
        <input
          style={{ width: "400px" }}
          defaultValue={transaction.getDescription()}
          onChange={(e) => {
            transaction.setDescription(e.target.value);
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <td>account</td>
            <td>debit</td>
            <td>credit</td>
          </tr>
        </thead>
        <tbody>
          {transaction.getRows().map((row: Row, i) => {
            // account name lookup
            const { account } = row.get();
            const accountName = accountManager.getAccountName(
              parseInt(account, 10) // TODO: we're storing the account as a String in the Row which causes this tiny mess
            );

            return (
              <EditableRowComponent
                row={row}
                accountName={accountName}
                key={i}
              />
            );
          })}
        </tbody>
      </table>
      <p>cratedAt: {new Date(transaction.getCreatedAt()).toISOString()} </p>
    </div>
  );
};
