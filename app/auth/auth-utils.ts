import db from "db"

export const authenticateUser = async (username: string) => {
  let user = await db.user.findFirst({ where: { username: username.toLowerCase() } })

  if (!user) {
    user = await db.user.create({
      data: {
        username,
      }
    })
  }

  return user;
}
