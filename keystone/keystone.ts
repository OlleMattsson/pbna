import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

export default 
//withAuth(
  config({
    server: {
      cors: { 
        origin: [
          'http://localhost:8080'
        ], 
        credentials: true 
      }
    },
    db: {
      provider: 'postgresql',
      url: "postgres://pbna_pguser:pbna_pgpw@postgres/pbna_pgdb", 
      //url: process.env.DATABASE_URL as string,
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
