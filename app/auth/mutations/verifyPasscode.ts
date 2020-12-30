import { Ctx } from "blitz"

export const PASSCODE = "5819"

export default async function verifyPasscode(passcode: string, ctx: Ctx) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const canFunk = passcode === PASSCODE
  ctx.session.setPublicData({
    passcode,
  })
  return canFunk
}
