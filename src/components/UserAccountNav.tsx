import { User } from 'next-auth'
import { FC } from 'react'
import { DropdownMenu, DropdownMenuTrigger } from './ui/DropdownMenu'
import UserAvatar from './UserAvatar'

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'email' | 'image'>
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      {/* <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Group>
        <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content> */}
    </DropdownMenu>
  )
}

export default UserAccountNav
