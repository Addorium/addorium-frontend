'use client'

import LoaderLayout from '@/components/loader-layout'
import PagePermissionGuard from '@/components/page-permission-guard'
import SimpleProjectIcon from '@/components/ui/icons/project-icon/SimpleProjectIcon'
import ProjectStatusLabel from '@/components/ui/labels/ProjectStatusLabel'
import DashboardLoader from '@/components/ui/loader/DashboardLoader'
import { Sidebar } from '@/components/ui/sidebar/Sidebar'
import { useProfile } from '@/hooks/useProfile'
import { projectService } from '@/services/project.service'
import { getProjectTypeFromStr } from '@/types/project.types'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
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
	const [isLoading, setIsLoading] = useState(true)
	const { data: user, isLoading: userLoading } = useProfile()
	const { data: project, isLoading: projectLoading } = useQuery({
		queryKey: ['project', slug],
		queryFn: () => {
			return projectService.getBySlug(slug)
		},
	})
	useEffect(() => {
		const isLoading = userLoading || projectLoading
		setIsLoading(isLoading)
		console.log('isLoading', isLoading)
	}, [userLoading, projectLoading])
	const isUserProject = project?.owner?.id === user?.id
	return (
		<PagePermissionGuard
			isLoading={isLoading}
			userPermissions={user?.role?.permissions}
			requiredPermission='admin:project.update'
			permanent={isUserProject}
			redirectUrl='/'
			loaderComponent={<DashboardLoader />}
		>
			<div className='flex gap-4 mt-3'>
				<div className='bg-background-2 min-w-[322px] h-fit rounded-2xl px-4 py-5 flex flex-col gap-4'>
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
		</PagePermissionGuard>
	)
}
