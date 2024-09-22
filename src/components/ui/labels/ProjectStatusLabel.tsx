import { ProjectStatus } from '@/types/project.types'
import { BookCheck, BookDashed, BookUser } from 'lucide-react'

export default function ProjectStatusLabel({
	status,
}: {
	status: ProjectStatus
}) {
	const statusIcon = {
		DRAFT: <BookDashed className='size-[24px]' />,
		MODERATION: <BookUser className='size-[24px]' />,
		PUBLISHED: <BookCheck className='size-[24px]' />,
	}

	return (
		<div className='flex gap-1 text-gray-5 font-bold text-[15px] items-center'>
			{statusIcon[status]}
			<span>{status}</span>
		</div>
	)
}
