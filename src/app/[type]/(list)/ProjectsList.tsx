'use client'

import ProjectsViewList from '@/components/projects-layout/ui/projects-list-page/projects-view-list/ProjectsViewList'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import { CustomOption } from '@/components/ui/form/select/select-field,types'
import { SelectField } from '@/components/ui/form/select/SelectField'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { useFilter } from '@/hooks/filters/useUserFilter'
import { projectService } from '@/services/project.service'
import { getProjectTypeFromStr } from '@/types/project.types'
import { useQuery } from '@tanstack/react-query'
import { Search, Table2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
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
	const router = useRouter()
	const searchParams = useSearchParams()
	// Получаем значения из URL или используем значения по умолчанию
	const initialSearch = searchParams.get('search') || ''
	const initialOrderBy = searchParams.get('orderBy') || 'relevance'
	const initialPage = parseInt(searchParams.get('page') || '1')

	// Использование фильтров с начальными значениями
	const {
		debouncedSearchTerm,
		setSearch,
		orderBy,
		setOrderBy,
		currentPage: page,
		setCurrentPage: setPage,
	} = useFilter({
		initialSearch,
		initialOrderBy,
		initialPage,
	})

	// Обновляем URL при изменении фильтров
	useEffect(() => {
		if (page === 1 && orderBy === 'relevance' && debouncedSearchTerm === '') {
			router.push(``)
			return
		}
		const query = new URLSearchParams()
		if (debouncedSearchTerm) query.set('search', debouncedSearchTerm)
		if (orderBy) query.set('orderBy', orderBy)
		if (page) query.set('page', page.toString())

		router.push(`?${query}`, { scroll: false }) // Отключение скролла при смене страницы
	}, [debouncedSearchTerm, orderBy, page, router])

	// Получаем данные о проектах
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['projects', type, debouncedSearchTerm, orderBy, page],
		queryFn: () =>
			projectService.getAllType(getProjectTypeFromStr(type), {
				search: debouncedSearchTerm,
				orderBy,
				page,
				perPage: 10,
			}),
	})

	const meta = data?.meta || { currentPage: 1, lastPage: 1 }
	const projects = data?.data || []

	// Перезапрашиваем данные при изменении фильтров
	useEffect(() => {
		refetch()
		if (setPage) setPage(meta.currentPage)
	}, [debouncedSearchTerm, orderBy, page, refetch, meta.currentPage, setPage])

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
							onChange={e => {
								if (setSearch) setSearch(e)
							}}
							defaultValue={initialSearch}
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
								sortOption.find(o => o.value === initialOrderBy) ||
								sortOption[0]
							}
							onChange={option => {
								if (setOrderBy) setOrderBy(option.value)
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
					currentPage={page || 1}
					totalPages={meta.lastPage}
					onPageChange={page => {
						if (setPage) setPage(page)
						refetch()
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
