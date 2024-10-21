import { Download } from 'lucide-react'

export default function DownloadCountLabel({ count }: { count: number }) {
	return (
		<div className='flex gap-1 items-center'>
			<Download className='size-[20px]' />
			<span className='font-bold text-[20px]'>{count}</span>
		</div>
	)
}
