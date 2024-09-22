'use client'

import LoaderLayout from '@/components/loader-layout'
import SimpleProjectIcon from '@/components/ui/icons/project-icon/SimpleProjectIcon'
import ProjectStatusLabel from '@/components/ui/labels/ProjectStatusLabel'
import { Sidebar } from '@/components/ui/sidebar/Sidebar'
import { projectService } from '@/services/project.service'
import { getProjectTypeFromStr } from '@/types/project.types'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { getProjectSettingsCategories } from './sidebar/settings-sidebar.data'

export default function LProjectSettings({
	children,
	type,
	slug,
}: {
	children: ReactNode
	type: string
	slug: string
}) {
	const { data: project } = useQuery({
		queryKey: ['project', slug],
		queryFn: () => {
			return projectService.getBySlug(slug)
		},
	})

	return (
		<div className='flex gap-4 mt-3'>
			<div className='bg-gray-3 min-w-[322px] h-fit rounded-2xl px-4 py-5 flex flex-col gap-4'>
				<LoaderLayout loading={!project}>
					{project && (
						<div className='flex gap-4 items-center'>
							<SimpleProjectIcon name={project?.icon} width={70} isLoading />
							<div className='flex flex-col gap-1.5'>
								<span className='text-lg font-bold'>{project.name}</span>
								<ProjectStatusLabel status={project.status} />
							</div>
						</div>
					)}
				</LoaderLayout>
				<Sidebar
					categories={getProjectSettingsCategories(
						slug,
						getProjectTypeFromStr(type)
					)}
				/>
			</div>

			<main className='w-full'>{children}</main>
		</div>
	)
}
