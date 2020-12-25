import * as z from "zod";

export const ProductInput = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  image: z.string().optional(),
})
export type ProductInputType = z.infer<typeof ProductInput>;
