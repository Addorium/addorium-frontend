'use client'

import { IProject } from '@/types/project.types'
import ProjectView from './components/ProjectView'

export default function ProjectsViewList({
	projects,
}: {
	projects: IProject[]
}) {
	return (
		<div className='flex flex-col gap-2'>
			{projects.map(project => (
				<ProjectView
					key={project.id}
					project={project}
					onClick={project => {
						console.log(project)
					}}
				/>
			))}
		</div>
	)
}
