
import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',

  // The fields in sessionData is serialized into the cookie, so we want to keep it small
  // and only include non-sensitive information
  // important userdata is loaded by the backend as needed
  // TODO: remove sensitive fields role and organization id from the sessionData
  // Update the client to not rely on them being available, all requests can be done with userId only
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
