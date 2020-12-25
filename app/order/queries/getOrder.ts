import { Prisma } from "@prisma/client";
import { Ctx, NotFoundError } from "blitz";
import db from "db";

type GetOrderInput = Pick<Prisma.FindFirstOrderArgs, "where">

export default async function getOrder({ where }: GetOrderInput, ctx: Ctx) {
  ctx.session.authorize()

  const order = await db.order.findFirst({ where, include: {
    product: true,
    user: true,
  } })

  if (!order) throw new NotFoundError()

  return order
}
