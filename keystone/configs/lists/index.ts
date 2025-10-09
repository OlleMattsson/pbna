import type { Lists } from ".keystone/types";
import { Entry } from "./entry";
import { LineItem } from "./lineitem";
import { User } from "./user";
import { Attachment } from "./attachment";
import { AccountChart } from "./accountChart";
import { Account } from "./account";
import { AccountingPeriod } from "./accountingPeriod";
import { Organization } from "./organization";
import { Agent } from "./Agent";
import { Orchestrator } from "./Orchestrator";
import { OrchestrationStep } from "./OrchestrationStep";
import { AgentOutput } from "./AgentOutput";
import { Invoice } from "./Invoice";
import { InvoiceVerification } from "./InvoiceVerification";
import { Transaction } from "./Transaction";
import { TransactionVerification } from "./TransactionVerification";

const lists: Lists = {
  Entry,
  LineItem,
  User,
  Attachment,
  AccountChart,
  Account,
  AccountingPeriod,
  Organization,
  Agent,
  Orchestrator,
  OrchestrationStep,
  AgentOutput,
  Invoice,
  InvoiceVerification,
  Transaction,
  TransactionVerification,
};

export default lists;
