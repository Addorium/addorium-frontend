import { IUser } from '@/types/user.types'
import { User } from 'lucide-react'

export default function ProjectAuthotLabel({ user }: { user: IUser }) {
	return (
		<div className='flex gap-1 text-gray-5 font-bold text-[15px] items-center'>
			<User className='size-[24px]' />
			<span>{user.name}</span>
		</div>
	)
}
