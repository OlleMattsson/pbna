import { Account, AccountType } from "./Account";

const account1 = new Account({
  id: 1000,
  type: AccountType.asset,
  name: "kassa",
  description: "Cash money"
});

const account2 = new Account({
  id: 2000,
  type: AccountType.liability,
  name: "inkomster",
  description: "In kommer ting",
  vatAccountId: 5001
});

const account3 = new Account({
  id: 4000,
  type: AccountType.liability,
  name: "utgifter",
  description: "Gotta spend money to make money",
  vatAccountId: 5000
});

const account4 = new Account({
  id: 5000,
  type: AccountType.liability,
  name: "momsfordran-24",
  description: "valtio on mulle velkaa",
  vatAmount: 24
});

const account5 = new Account({
  id: 5001,
  type: AccountType.liability,
  name: "momsskuld-24",
  description: "minimera!",
  vatAmount: 24
});

export { account1, account2, account3, account4, account5 };
