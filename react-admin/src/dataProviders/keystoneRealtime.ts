import {
    gql,
    Observable,
    ApolloError,
} from '@apollo/client';
import { client } from "./apolloClient"

const VEHICLE_UPDATED_SUBSCRIPTION = gql`
    subscription VehicleUpdated($id: ID!) {
        vehicleUpdated(id: $id) {
            id
        }
    }
`;

const ON_ORDER_SUBSCRIPTION = gql`
    subscription OnOrder {
        onOrder {
            id
            pCompanyName,
            owner {
              id
            }
        }
    }
`;

const INVOICE_UPDATE_SUBSCRIPTION = gql`
    subscription InvoiceUpdate($id: ID!) {
        invoiceUpdate(id: $id) {
            id
        }
    }
`;

const ON_INVOICE = gql`
    subscription OnInvoice {
        onInvoice {
            id
        }
    }
`;


type SubscriptionInfo = {
  doc: any;                          // your gql`subscription …` document
  makeVariables: (id: string) => {}  // turns the record ID into GraphQL vars
  makeTopic: (id: string) => string
  makePayload: (id: string) => {}
};


const registry: Record<string, SubscriptionInfo> = {

/*
  Vehicle: {
    doc: VEHICLE_UPDATED_SUBSCRIPTION,
    makeVariables: (id) => ({ id }),
    makeTopic: (id) => `/resource/Vehicle/${id}`,
    makePayload: (data) => ({ id: [data?.vehicleUpdated?.id]})
  },

  VehicleList : {
    doc: VEHICLE_UPDATED_SUBSCRIPTION,
    makeVariables: (id) => ({ id }),
    makeTopic: (id) => `/resource/Vehicle`,
    makePayload: (data) => ({ id: [data?.vehicleUpdated?.id]})
  },

  OrderList : {
    doc: ON_ORDER_SUBSCRIPTION,
    makeVariables: async () => null,
    makeTopic: () => `/resource/Order`,
    makePayload: (data) => { 
      console.log(data)
      return {ids: [data?.onOrder?.id]}
    }
  }  
*/

  InvoiceList : {
    doc: ON_INVOICE,
    makeVariables: async () => null,
    makeTopic: () => `/resource/Order`,
    makePayload: (data) => { 
      console.log(data)
      return {ids: [data?.onInvoice?.id]}
    }
  } 

};

function parseTopic(topic: string): { resource: string; id: string | null } {

  const parts = topic.split('/');

  if (parts.length == 3) {
    const [, resource, id] = parts;
    return { resource, id };
  }

  if (parts.length === 2) {
    const [, resource] = parts;
    return { resource: `${resource}List`, id: null}
  }


  throw new Error(`Invalid topic format "${topic}", expected "resource/Name/id"`);
  

}


//  3) Keep track of active subscriptions so we can unsubscribe later
const subscriptionMap = new Map<
  { topic: string; callback: (event: any) => void },
  { unsubscribe: () => void }
>();



//  4) Build the real-time methods
const subscribe = async (
  topic: string,
  subscriptionCallback: (event: any) => void
) => {

  console.log('[realtime] ', topic);

  const { resource, id: resourceId } = parseTopic(topic);
  
  const info = registry[resource];

  console.log(resource)
  //console.log(info)


  if (!info) {
    throw new Error(`No real-time subscription configured for resource "${resource}"`);
  }


  // Kick off the GraphQL subscription
  const observable: Observable<any> = client.subscribe({
    query: info.doc,
    variables: await info.makeVariables(resourceId),
  });

  // Handle update events
  const sub = observable.subscribe({
    next({ data }) {

      console.log("update event DATA", data)

      subscriptionCallback({
        type: 'updated',
        topic: info.makeTopic(resourceId),
        payload: info.makePayload(data)
      })

    },
    error(err: ApolloError) {
      console.error(`[realtime][${topic}] subscription error`, err);
    },
  });

  subscriptionMap.set({ topic, subscriptionCallback }, sub);
  return { data: null };
};



const unsubscribe = async (
  topic: string,
  subscriptionCallback: (event: any) => void
) => {
  const key = Array.from(subscriptionMap.keys()).find(
    k => k.topic === topic && k.subscriptionCallback === subscriptionCallback
  );
  if (key) {
    const sub = subscriptionMap.get(key)!;
    sub.unsubscribe();
    subscriptionMap.delete(key);
  }
  return { data: null };
};

// You generally don’t need to implement “publish” on the client side, but ra-realtime expects it:
const publish = async (topic: string, event: any) => {
  // no-op or forward to a mutation if you like:
  // await client.mutate({ mutation: YOUR_PUBLISH_MUTATION, variables: { topic, event } })
  return { data: null };
};

export const keystoneRealtimeDataProvider: {
  subscribe: typeof subscribe;
  unsubscribe: typeof unsubscribe;
  publish: typeof publish;
} = {
  subscribe,
  unsubscribe,
  publish,
};

export default keystoneRealtimeDataProvider;