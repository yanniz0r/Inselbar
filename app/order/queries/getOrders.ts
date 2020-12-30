import { Prisma } from "@prisma/client"
import { Ctx } from "blitz"
import db from "db"

type GetOrderInput = Pick<Prisma.FindFirstOrderArgs, "where">

export default async function getOrders({ where }: GetOrderInput, ctx: Ctx) {
  ctx.session.authorize()

  const order = await db.order.findMany({
    where,
    include: {
      product: true,
      user: true,
    },
  })

  return order
}
