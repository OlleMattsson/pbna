// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';


export default 
//withAuth(
  config({
    db: {
      provider: 'postgresql',

      // url should come from env
      url: process.env.DATABASE_URL as string,
      enableLogging: true,
      idField: { kind: 'uuid' }
    },
    lists,
    //session,
    storage: {
      journal_item_files: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `http://localhost:${process.env.PORT}/files${path}`,
        serverRoute: {
          path: '/files',
        },
        storagePath: 'public/files'
      }
    }
  })
//);
