import { AccountManager } from "./../../Account/AccountManager";
import { RowType } from "./../../Row/Row";

export const Accounts = ({
  handleUpdateRow,
  accountManager,
  transactionId
}: {
  handleUpdateRow: Function;
  accountManager: AccountManager;
  transactionId: number;
}) => {
  return (
    <select
      onChange={(e) => {
        handleUpdateRow({ id: transactionId, account: e.target.value });
      }}
    >
      <option>----</option>

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

export const AddTransactionRowComponent: Function = ({
  id,
  handleUpdateRow,
  handleRemoveRow,
  accountManager
}: {
  id: number;
  handleUpdateRow: Function;
  handleRemoveRow: Function;
  accountManager: AccountManager;
}) => {
  return (
    <div>
      <Accounts
        handleUpdateRow={handleUpdateRow}
        accountManager={accountManager}
        transactionId={id}
      />
      <select
        onChange={(e) => {
          handleUpdateRow({ id, type: e.target.value });
        }}
      >
        <option value={RowType.Debit}>Debit</option>
        <option value={RowType.Credit}>Credit</option>
      </select>
      <input
        type="text"
        placeholder="amount"
        onChange={(e) => {
          const value = e.target.value;
          const split = value.split(",");
          const amount = parseInt(split.join(""), 10) || 0;
          const precision = split.length === 2 ? split[1].length : 0;
          handleUpdateRow({ id, amount, precision });
        }}
      />
      <button
        onClick={() => {
          handleRemoveRow(id);
        }}
      >
        remove
      </button>
    </div>
  );
};
