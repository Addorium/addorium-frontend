import { ITag } from '@/types/tag.types'

export default function ProjectTagLabel({ tag }: { tag: ITag }) {
	return (
		<div className='flex gap-1 text-gray-5 font-bold text-[15px] items-center'>
			<span>{tag.name}</span>
		</div>
	)
}
