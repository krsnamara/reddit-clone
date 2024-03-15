import { X } from 'lucide-react'
import { Button } from './ui/Button'

const CloseModal = () => {
  return (
    <Button variant="subtle" aria-label="Close modal">
      <X className="w-4 h-4" />
    </Button>
  )
}

export default CloseModal
