'use client'

import SimpleProjectIcon from '@/components/ui/icons/project-icon/SimpleProjectIcon'
import DownloadCountLabel from '@/components/ui/labels/DownloadCountLabel'
import FolloversCountLabel from '@/components/ui/labels/FolloversCountLabel'
import ProjectAuthotLabel from '@/components/ui/labels/ProjectAuthorLabel'
import UpdatedAtLabel from '@/components/ui/labels/UpdatedAtLabel'
import { IProject } from '@/types/project.types'

export default function ProjectView({
	project,
	onClick,
}: {
	project: IProject
	onClick?: (project: IProject) => void
}) {
	if (!project) return null
	if (!project.owner) return null
	return (
		<div
			className={`flex px-4 py-2.5 w-full bg-background-2 rounded-2xl gap-4 min-h-28 ${onClick ? 'cursor-pointer hover:scale-[101%] transition-all hover:bg-background-1' : ''}`}
			onClick={() => onClick && onClick(project)}
		>
			<div className='flex items-center'>
				<SimpleProjectIcon name={project.icon} isLoading={false} width={100} />
			</div>
			<div className='flex flex-col justify-between w-full'>
				<div className='flex flex-col'>
					<h1 className='text-xl font-semibold'>{project.name}</h1>
					<p className='text-gray-6 text-sm'>{project.summary}</p>
				</div>
				<div className='-mx-1'>
					<ProjectAuthotLabel user={project.owner} />
				</div>
			</div>
			<div className='flex flex-col items-end justify-between'>
				<div className='flex flex-col'>
					<div className='flex'>
						<DownloadCountLabel count={0} />
					</div>
					<div className='flex'>
						<FolloversCountLabel count={0} />
					</div>
				</div>
				<div>
					<UpdatedAtLabel date={project.updatedAt} />
				</div>
			</div>
		</div>
	)
}
