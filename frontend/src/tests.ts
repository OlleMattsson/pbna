import "./styles.css";
import { Row, RowType } from "./Row/Row";
import { Transaction, TransactionError } from "./Transaction/Transaction";
// Tests

// Create new Row with value 100.01
const r1 = new Row({
  date: new Date(),
  account: "1",
  type: RowType.Debit,
  amount: 10001,
  precision: 2
});

// create a few more transactions
const r2 = new Row({
  date: new Date(),
  account: "2",
  type: RowType.Credit,
  amount: 10001,
  precision: 2
});

const r3 = new Row({
  date: new Date(),
  account: "2",
  type: RowType.Credit,
  amount: 10002,
  precision: 2
});

// Row.get()
// it should return the RowObject
console.log(r1.get());

// Row.getValue()
// it should return the value 100.01
console.log(r1.getAmount());

try {
  // should throw because r1 and r3 does not balance
  const transaction = new Transaction([r1, r3]);
  console.log(transaction.get()); // this never happens because the above will throw
} catch (e) {
  console.error(e);
  if (e instanceof TransactionError) {
    console.error(e.transaction);
  }
}

try {
  // should be ok
  const transaction = new Transaction([r1, r2]);
  console.log(transaction.get()); // prettyprint
  console.log(transaction.get(false)); // raw transaction object
} catch (e) {
  console.error(e);
  if (e instanceof TransactionError) {
    console.error(e.transaction);
  }
}
