import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateOrderInput = Pick<Prisma.OrderUpdateArgs, "where" | "data">

export default async function updateOrder({ where, data }: UpdateOrderInput, ctx: Ctx) {
  ctx.session.authorize()

  const order = await db.order.update({ where, data })

  return order
}
