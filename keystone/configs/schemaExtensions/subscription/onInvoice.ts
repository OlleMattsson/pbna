export const onInvoice = {
  subscribe: (_root, _args, ctx) => {
    try {
      console.log("[subscribe:onInvoice] userId", ctx.session.data.id);

      return ctx.pubsub.asyncIterableIterator(
        `ON_INVOICE:${ctx.session.data.id}`
      );
    } catch (err) {
      console.error("Error in resolver: ", err);
      throw err;
    }
  },
};
