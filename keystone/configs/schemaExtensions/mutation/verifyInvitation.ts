
/*
    The signup flow email sender created a new user and set the invitation token

    Verify invitation checks an incoming invitationToken and sets the password for the first time
*/

export const verifyInvitation = async (root, {data}, context) => {

    const {password, invitationToken} = data

    try {       
        // 🔥 danger! only allow sudo in this very specific case
        const sudo = context.sudo(); 

        const [ foundUser ] = await sudo.db.User.findMany({where: {invitationToken: {equals: invitationToken}  }})

        if (!foundUser) {
            throw new CreateUserError(`No user found with invitationToken ${invitationToken}`)
        }

        await sudo.db.User.updateOne({
            where: { id: foundUser.id },
            data: {
                password,
                invitationToken: "",
                verifiedAt: new Date(),
            },
        });

        return "ok"

    } catch (e) {
        console.error(e)

        return "not allowed"
    }
}

class CreateUserError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "[CreateUserError]";
      // Fix the prototype chain for instanceof checks (important in TS/ES5)
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }