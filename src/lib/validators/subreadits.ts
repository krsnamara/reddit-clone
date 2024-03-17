import { z } from 'zod'

export const SubreaditValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubreaditSubscriptionValidator = z.object({
  subreaditId: z.string(),
})

export type CreateSubreaditPayload = z.infer<typeof SubreaditValidator>

export type SubscribeToSubreaditPayload = z.infer<
  typeof SubreaditSubscriptionValidator
>
