import { Account, AccountType } from "./../Account";
import { AccountManager } from "./../AccountManager";
import { useState } from "react";

const AccountIdUI = ({
  account,
  am,
  sort
}: {
  account: Account;
  am: AccountManager;
  sort: Function;
}) => {
  const { id } = account.get();
  return (
    <input
      type="text"
      defaultValue={id}
      onChange={(e) => {
        const value = parseInt(e.target.value, 10);
        if (am.isUniqueAccountId(value)) {
          account.put({ id: value });
        } else {
          account.put({ id: 999999 });
          console.warn("Account ID must be unique.");
        }
      }}
      onKeyUp={(e) => {
        // Changing the sort of the account list when enter is pressed feels like a
        // better UX than sorting onChange, because the latter causes us to loose
        // focus of the field
        if (e.key === "Enter") {
          sort(new Date());
        }
      }}
      onBlur={(e) => {
        sort(new Date());
      }}
      style={{ width: "50px" }}
    />
  );
};

const AccountNameUI = ({ account }: { account: Account }) => {
  const { name } = account.get();
  return (
    <input
      type="text"
      defaultValue={name}
      onChange={(e) => {
        account.put({ name: e.target.value });
      }}
      style={{ width: "200px" }}
    />
  );
};

const AccountDescriptionUI = ({ account }: { account: Account }) => {
  const { description } = account.get();
  return (
    <input
      type="text"
      defaultValue={description}
      onChange={(e) => {
        account.put({ description: e.target.value });
      }}
      style={{ width: "300px" }}
    />
  );
};

const AccountVatAmountUI = ({ account }: { account: Account }) => {
  const { vatAmount } = account.get();
  return (
    <input
      type="text"
      defaultValue={vatAmount}
      onChange={(e) => {
        account.put({ vatAmount: parseInt(e.target.value, 10) });
      }}
      style={{ width: "50px" }}
    />
  );
};

const AccountVatAccountIdUI = ({ account }: { account: Account }) => {
  const { vatAccountId } = account.get();
  return (
    <input
      type="text"
      defaultValue={vatAccountId}
      onChange={(e) => {
        account.put({ vatAccountId: parseInt(e.target.value, 10) });
      }}
      style={{ width: "50px" }}
    />
  );
};

const AccountTypeUI = ({ account }: { account: Account }) => {
  const { type } = account.get();
  const [selectedAccountType, setSelectedAccountType] = useState(type);
  return (
    <select
      onChange={(e) => {
        setSelectedAccountType(e.target.value);
        account.put({ type: (e.target.value as unknown) as AccountType });
        console.log(account.get());
      }}
      value={selectedAccountType}
    >
      <option value={AccountType.noop}>Group Header</option>
      <option value={AccountType.asset}>Asset</option>
      <option value={AccountType.liability}>Liability</option>
      <option value={AccountType.vat}>VAT</option>
      <option value={AccountType.incomeStatement}>Income Statement</option>
    </select>
  );
};

const AccountUI = ({
  account,
  am,
  sort
}: {
  account: Account;
  am: AccountManager;
  sort: Function;
}) => {
  return (
    <div>
      <AccountIdUI account={account} sort={sort} am={am} />
      <AccountTypeUI account={account} />
      <AccountNameUI account={account} />
      <AccountDescriptionUI account={account} />
      <AccountVatAmountUI account={account} />
      <AccountVatAccountIdUI account={account} />
      <button
        onClick={(e) => {
          am.delete(account);
          sort(new Date());
        }}
      >
        X
      </button>
    </div>
  );
};

export const AccountsComponent = ({
  AccountManager
}: {
  AccountManager: AccountManager;
}) => {
  const [sorted, setSorted] = useState(new Date());

  return (
    <div>
      <div>
        {AccountManager.getAccounts()
          .sort((a1: Account, a2: Account) => {
            const { id: id1 } = a1.get();
            const { id: id2 } = a2.get();
            return id1 - id2;
          })
          .map((a: Account) => {
            const { id } = a.get();

            return (
              <AccountUI
                account={a}
                key={id}
                sort={setSorted}
                am={AccountManager}
              />
            );
          })}
      </div>
      <div>
        <button
          onClick={(e) => {
            AccountManager.put(
              new Account({
                id: 99999,
                type: AccountType.liability,
                name: "",
                description: "",
                vatAccountId: 0
              })
            );
            setSorted(new Date());
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
