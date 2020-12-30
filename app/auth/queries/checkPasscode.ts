import { Ctx } from "blitz"
import { PASSCODE } from "../mutations/verifyPasscode"

export default async function checkPasscode(params: undefined, ctx: Ctx) {
  return ctx.session.publicData.passcode === PASSCODE
}
