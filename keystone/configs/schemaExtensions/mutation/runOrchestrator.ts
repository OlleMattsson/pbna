export const verifyInvitation = async (root, {name}, context) => {

    const orchestrator = await context.db.Orchestrator.findMany({name: {equals: name}})

}