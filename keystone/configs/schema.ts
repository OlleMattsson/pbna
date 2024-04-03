import type { Lists } from '.keystone/types';
import { Entry, LineItem, User, Attachment, Account, AccountChart, AccountingPeriod, Organization } from './lists';

export const lists: Lists = {
  User: User,
  Entry: Entry,
  LineItem: LineItem,
  Attachment: Attachment,
  Account: Account,
  AccountChart: AccountChart,
  AccountingPeriod: AccountingPeriod,
  Organization: Organization
};
