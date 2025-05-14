export const entryChanged = {
    subscribe: (_root, _args, context) => {
        try {
            return context.pubsub.asyncIterableIterator('ENTRY_CHANGED')
          } catch (err) {
            console.error('Failed in subscribe resolver', err);
            throw err; // or return EMPTY async iterator
          }
    } 
}