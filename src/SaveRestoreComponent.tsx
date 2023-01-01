import { restoreAppStateFromJson, dataToJson } from "./helpers";
import { TransactionManager } from "./Transaction/TransactionManager";
import { AccountManager } from "./Account/AccountManager";

export const SaveRestoreComponent = ({
  accountManager,
  transactionManager,
  uiSetTransactionState
}: {
  accountManager: AccountManager;
  transactionManager: TransactionManager;
  uiSetTransactionState: Function;
}) => {
  return (
    <div>
      <div>
        <h3>Save / Restore</h3>
        <button
          onClick={() => {
            const e = document.getElementById("jsonData") as HTMLInputElement
            
            e.value = dataToJson({
              accountManager,
              transactionManager
            });
          }}
        >
          Export to JSON
        </button>
        <input id="jsonData" type="text" />
        <button
          onClick={() => {

            const e = document.getElementById("jsonData") as HTMLInputElement
            const json = e.value;

            restoreAppStateFromJson({
              json,
              transactionManager,
              uiSetTransactionState,
              accountManager
            });
          }}
        >
          Restore From JSON
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.setItem(
              "pbna_data",
              dataToJson({
                accountManager,
                transactionManager
              })
            );
          }}
        >
          Save To Localstorage
        </button>
        <button
          onClick={() => {
            const json = localStorage.getItem("pbna_data") || "";
            restoreAppStateFromJson({
              json,
              transactionManager,
              uiSetTransactionState,
              accountManager
            });
          }}
        >
          Load from Localstorage
        </button>
      </div>
    </div>
  );
};
