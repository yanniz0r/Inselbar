import { Ctx } from "blitz"
import { PASSCODE } from "../mutations/verifyPasscode"

export default async function checkPasscode(params: undefined, ctx: Ctx) {
  console.log("CHECK PASSCODE!!!!")
  const privateData = await ctx.session.getPrivateData()
  return privateData["passcode"] === PASSCODE
}
