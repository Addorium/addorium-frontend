'use client'

import ProjectsViewList from '@/components/projects-layout/ui/projects-list-page/projects-view-list/ProjectsViewList'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import { CustomOption } from '@/components/ui/form/select/select-field,types'
import { SelectField } from '@/components/ui/form/select/SelectField'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { useAllProjectFilters } from '@/hooks/filters/all-projects/useAllProjectsFilter'
import { projectService } from '@/services/project.service'
import { getProjectTypeFromStr } from '@/types/project.types'
import { useQuery } from '@tanstack/react-query'
import { Search, Table2 } from 'lucide-react'
import { useEffect } from 'react'

const sortOption: CustomOption[] = [
	{ value: 'relevance', label: 'Relevance' },
	{ value: 'download_count', label: 'Download count' },
	{ value: 'follower_cound', label: 'Follow count' },
	{ value: 'recently_published', label: 'Recently published' },
	{ value: 'recently_updated', label: 'Recently updated' },
]

export default function ProjectsList({ params }: { params: { type: string } }) {
	const type = params.type
	const { queryParams, isFilterUpdated, updateQueryParams } =
		useAllProjectFilters()

	// Получаем данные о проектах
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['projects', type],
		queryFn: () =>
			projectService.getAllType(getProjectTypeFromStr(type), queryParams),
	})

	const meta = data?.meta || { currentPage: 1, lastPage: 1 }
	const projects = data?.data || []

	useEffect(() => {
		if (isFilterUpdated) {
			refetch()
		}
	}, [queryParams])

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col px-2 py-2 w-full bg-background-2 rounded-2xl gap-4'>
				<div className='flex justify-between'>
					<div className='flex'>
						<InputField
							size='medium'
							type='search'
							placeholder='Search'
							id='search'
							Icon={Search}
							onChange={search => {
								updateQueryParams('search', search)
							}}
							defaultValue={queryParams.search}
						/>
						<SelectField
							size='medium'
							className='min-w-[256px]'
							options={sortOption}
							placeholder='Sort by'
							id='select'
							label='Sort by'
							labelPosition='left'
							defaultValue={
								sortOption.find(o => o.value === queryParams.orderBy) ||
								sortOption[0]
							}
							onChange={option => {
								updateQueryParams('orderBy', option.value)
							}}
						/>
					</div>
					<div className='flex items-center'>
						<Button Icon={Table2} type_style='dark' size='icon' />
					</div>
				</div>
			</div>
			<div className='flex flex-col justify-center'>
				<PaginatorWraper
					currentPage={queryParams.page || 1}
					totalPages={meta.lastPage}
					onPageChange={page => {
						updateQueryParams('page', page.toString())
					}}
					top
					bottom
				>
					<ProjectsViewList projects={projects} />
				</PaginatorWraper>
			</div>
		</div>
	)
}
