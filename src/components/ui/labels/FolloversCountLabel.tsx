import { User } from 'lucide-react'

export default function FolloversCountLabel({ count }: { count: number }) {
	return (
		<div className='flex gap-1 items-center'>
			<User className='size-[20px]' />
			<span className='font-bold text-[20px]'>{count}</span>
		</div>
	)
}
