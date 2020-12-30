import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateProductInput = Pick<Prisma.ProductCreateArgs, "data">
export default async function createProduct({ data }: CreateProductInput, ctx: Ctx) {
  ctx.session.authorize()

  const product = await db.product.create({
    data: {
      description: data.description,
      name: data.name,
      price: data.price,
      image: data.image,
      intensity: data.intensity,
      available: true,
    },
  })

  return product
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
}
