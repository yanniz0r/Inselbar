import * as z from "zod";

export const ProductInput = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
})
export type ProductInputType = z.infer<typeof ProductInput>;
