// Reuse the app's configured Apollo client so cookies, hosts and WS settings match.
// This avoids cross-origin cookie issues (e.g., https://api.localhost vs http://localhost:3000)
// and keeps credentials: 'include' consistent.
import { client } from '../dataProviders/apolloClient';

export const apolloClient = client;
