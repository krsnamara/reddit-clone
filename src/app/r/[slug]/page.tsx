import MiniCreatePost from '@/components/MiniCreatePost'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: PageProps) => {
  const { slug } = params

  const session = await getAuthSession()

  const subreadit = await db.subreadit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreadit: true,
        },

        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  })

  if (!subreadit) return notFound()

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreadit.name}
      </h1>
      <MiniCreatePost session={session} />
    </>
  )
}

export default page
