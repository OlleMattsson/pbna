import "./styles.css";
import { useState } from "react";
import { Transaction } from "./Transaction/Transaction";
import { AddTransactionComponent } from "./Transaction/UI/AddTransactionComponent";
import { TransactionManager } from "./Transaction/TransactionManager";
import { TransactionComponent } from "./Transaction/UI/TransactionComponent";
import { AccountManager } from "./Account/AccountManager";
import { AccountsComponent } from "./Account/UI/AccountsComponent";
import { SaveRestoreComponent } from "./SaveRestoreComponent";
import { margin30px } from "./styles";
import { IncomeStatementUI } from "./IncomeStatement";
import { LedgerUI, Ledger } from "./Ledger";
import { TogglableVisibility } from "./ReactComponents";
import { BalanceSheetUI } from "./BalanceSheet";

const am = new AccountManager();
const tm = new TransactionManager();
const ledger = new Ledger({ transactionManager: tm, accountManager: am });

export default function App() {
  const [transactionsUI, setTransactionsUI] = useState<Transaction[]>([]);

  const addTransactionHandler = (t: Transaction) => {
    tm.addTransaction(t);
    setTransactionsUI([...tm.getTransactions()]);
  };

  return (
    <div className="App">
      <h1>PBN Accounting</h1>

      <hr style={margin30px} />
      <SaveRestoreComponent
        transactionManager={tm}
        accountManager={am}
        uiSetTransactionState={setTransactionsUI}
      />

      <hr style={margin30px} />
      <h3>Income Statement</h3>
      <TogglableVisibility>
        <IncomeStatementUI ledger={ledger} />
      </TogglableVisibility>

      <hr style={margin30px} />
      <h3>Balance Sheet</h3>
      <TogglableVisibility>
        <BalanceSheetUI ledger={ledger} />
      </TogglableVisibility>

      <hr style={margin30px} />
      <h3>Ledger</h3>
      <TogglableVisibility>
        <LedgerUI ledger={ledger} />
      </TogglableVisibility>

      <hr style={margin30px} />
      <h3>Accounts</h3>
      <TogglableVisibility>
        <AccountsComponent AccountManager={am} />
      </TogglableVisibility>

      <hr style={margin30px} />
      <h3>Transactions</h3>
      <TogglableVisibility>
        {transactionsUI.map((t: Transaction, i) => (
          <TransactionComponent
            transaction={t}
            accountManager={am}
            transactionNumber={i}
            key={i}
          />
        ))}
      </TogglableVisibility>

      <hr style={margin30px} />
      <h3>New Transaction</h3>
      <TogglableVisibility>
        <AddTransactionComponent
          addTransaction={addTransactionHandler}
          accountManager={am}
        />
      </TogglableVisibility>
    </div>
  );
}
