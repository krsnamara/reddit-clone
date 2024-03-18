'use client'

import { FC, startTransition } from 'react'
import { Button } from './ui/Button'
import { SubscribeToSubreaditPayload } from '@/lib/validators/subreadits'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useCustomToast } from '@/hooks/use-custom-toast'

interface SubscribeLeaveToggleProps {
  subreaditId: string
  subreaditName: string
  isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subreaditId,
  subreaditName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToast()
  const router = useRouter()

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubreaditPayload = {
        subreaditId,
      }

      const { data } = await axios.post('/api/subreadit/subscribe', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'Could not subscribe, please try again later',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: 'Subscribed',
        description: `You are now subscribed to r/${subreaditName}!`,
        variant: 'default',
      })
    },
  })

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubreaditPayload = {
        subreaditId,
      }

      const { data } = await axios.post('/api/subreadit/unsubscribe', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'Could not subscribe, please try again later',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: 'Unsubscribed',
        description: `You are now unsubscribed to r/${subreaditName}!`,
        variant: 'default',
      })
    },
  })

  return isSubscribed ? (
    <Button
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}
      className="w-full mt-1 mb-4"
    >
      Leave community
    </Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
    >
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle
