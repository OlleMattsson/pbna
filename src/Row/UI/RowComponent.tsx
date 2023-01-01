import { Row, RowType } from "./../Row";
import { AccountManager } from "./../../Account/AccountManager";
import { useState } from "react";

//import { Accounts as AccountDropdown } from "./../../Transaction/UI/AddTransactionRowComponent";

export const AccountDropdown = ({
  row,
  accountManager
}: {
  row: Row;
  accountManager: AccountManager;
}) => {
  const [selectedAccount, setSelectedAccount] = useState(row.getAccount());

  return (
    <select
      onChange={(e) => {
        row.setAccount(e.target.value);
        setSelectedAccount(e.target.value);
      }}
      value={selectedAccount}
    >
      {accountManager.getAccounts().map((account) => {
        const { id, name } = account.get();
        return (
          <option value={id} key={id}>
            {id} - {name}
          </option>
        );
      })}
    </select>
  );
};

export const RowComponent: Function = ({
  row,
  accountName
}: {
  row: Row;
  accountName: string;
}) => {
  const { account, type } = row.get();
  const value = row.getAmount();
  return (
    <p>
      {account} - {accountName} | {value} € | {type}
    </p>
  );
};

export const EditableRowComponent: Function = ({ row, accountManager }) => {
  const type = row.getType();
  const value = row.getAmount();
  const debitVal = type === RowType.Debit ? value : "";
  const creditVal = type === RowType.Credit ? value : "";

  const setAmountAndType = (amount: number, type: RowType) => {
    row.setAmount(amount);
    row.setType(type);
  };

  return (
    <tr>
      <td>
        <AccountDropdown row={row} accountManager={accountManager} />
      </td>
      <td>
        <input
          defaultValue={debitVal}
          onChange={(e) => {
            setAmountAndType(e.target.value, RowType.Debit);
          }}
        />
      </td>
      <td>
        <input
          defaultValue={creditVal}
          onChange={(e) => {
            setAmountAndType(e.target.value, RowType.Credit);
          }}
        />
      </td>
    </tr>
  );
};
