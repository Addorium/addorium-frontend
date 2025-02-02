import { ProjectType, ReadableProjectType } from '@/types/project.types'
import { BookCheck, BookDashed, BookUser } from 'lucide-react'

export default function ProjectTypeLabel({ type }: { type: ProjectType }) {
	const typeIcon = {
		BLUEPRINT: <BookDashed className='size-[24px]' />,
		SCRIPT: <BookUser className='size-[24px]' />,
		THEME: <BookCheck className='size-[24px]' />,
	}

	return (
		<div className='flex gap-1 text-gray-5 font-bold text-[15px] items-center'>
			{typeIcon[type]}
			<span>{ReadableProjectType[type]}</span>
		</div>
	)
}
