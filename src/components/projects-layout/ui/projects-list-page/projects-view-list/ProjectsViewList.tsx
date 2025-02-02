'use client'

import { MAIN_PAGES } from '@/config/pages-url.config'
import { IProject } from '@/types/project.types'
import { useRouter } from 'next/navigation'
import ProjectView from './components/ProjectView'

export default function ProjectsViewList({
	projects,
}: {
	projects: IProject[]
}) {
	const { push } = useRouter()
	return (
		<div className='flex flex-col gap-2'>
			{projects.map(project => (
				<ProjectView
					key={project.id}
					project={project}
					onClick={project => {
						push(MAIN_PAGES.getProjectLink(project.slug, project.type))
					}}
				/>
			))}
		</div>
	)
}
