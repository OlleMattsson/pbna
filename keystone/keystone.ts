import { config } from '@keystone-6/core';
import { lists } from './configs/schema';
import { withAuth, session } from './configs/auth';

export default 
withAuth(
  config({
    server: {
      cors: { 
        origin: [
          'http://localhost:8080',
          'http://localhost:5173'
        ], 
        credentials: true 
      }
    },
    db: {
      provider: 'postgresql',
      url: "postgres://pbna_pguser:pbna_pgpw@postgres/pbna_pgdb", 
      enableLogging: ['warn', 'error'],
      idField: { kind: 'uuid' }
    },
    lists,
    session,
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
);
