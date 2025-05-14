
import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',

  sessionData: 'name role id email organization { id }',
  secretField: 'password',
  initFirstItem: {
    fields: ['email', 'password']
  },
});

const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.SESSION_SECRET,
  sameSite: 'none',   // allow sending cookie on cross-site requests
  secure: true,       // required by browsers when sameSite='none'
});

export { withAuth, session };
