import { Clock } from 'lucide-react'

export default function UpdatedAtLabel({ date }: { date: string }) {
	return (
		<div className='flex gap-1 text-gray-5 font-bold text-[15px] items-center text-nowrap'>
			<Clock className='size-[24px]' />
			<span>{new Date(date).toDateString()}</span>
		</div>
	)
}
