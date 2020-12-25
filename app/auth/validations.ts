import * as z from "zod"

export const LoginInput = z.object({
  username: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>
