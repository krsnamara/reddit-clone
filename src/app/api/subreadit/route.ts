import { getAuthSession } from '@/lib/auth'
import { SubreaditValidator } from '@/lib/validators/subreadits'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = SubreaditValidator.parse(body)

    const subreaditsExists = await db.subreadit.findFirst({
      where: { name },
    })

    if (subreaditsExists) {
      return new Response('Subreadit already exists', { status: 409 })
    }

    const subreadit = await db.subreadit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subreaditId: subreadit.id,
      },
    })

    return new Response(subreadit.name, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create subreadit 500', { status: 500 })
  }
}
