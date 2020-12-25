import db, { Prisma } from "db"
import { Ctx } from "blitz";

type CreateOrderInput = Pick<Prisma.OrderCreateArgs, "data">
export default async function createOrder({ data }: CreateOrderInput, ctx: Ctx) {
  ctx.session.authorize()

  const product = await db.order.create({ data })

  return product
}