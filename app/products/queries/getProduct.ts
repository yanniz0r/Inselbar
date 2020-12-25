import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetProductInput = Pick<Prisma.FindFirstProductArgs, "where">

export default async function getProduct({ where }: GetProductInput, ctx: Ctx) {
  ctx.session.authorize()

  const product = await db.product.findFirst({ where })

  if (!product) throw new NotFoundError()

  return product
}
