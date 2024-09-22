'use client'

import { useQuery } from '@tanstack/react-query'
import {
	ArrowDownUp,
	ArrowUpDown,
	Link,
	Pencil,
	Search,
	Trash2,
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import { InputField } from '@/components/ui/form/fields/TextField'
import { CustomOption } from '@/components/ui/form/select/select-field,types'
import { SelectField } from '@/components/ui/form/select/SelectField'
import { Heading } from '@/components/ui/Heading'
import SimpleProjectIcon from '@/components/ui/icons/project-icon/SimpleProjectIcon'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { Table } from '@/components/ui/table-component/Table'
import { Column, Node } from '@/components/ui/table-component/Table.types'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { useFilter } from '@/hooks/filters/useUserFilter'
import { projectService } from '@/services/project.service'
import {
	ProjectStatus,
	ProjectType,
	ReadableProjectStatus,
	ReadableProjectType,
} from '@/types/project.types'

// Интерфейс для данных проектов
interface CustomNode extends Node {
	id: number
	slug: string
	icon: string
	name: string
	ownerName: string
	status: ProjectStatus
	type: ProjectType
	createdAt: string
}

// Опции для сортировки
const options: CustomOption[] = [
	{ value: 'name', label: 'Name' },
	{ value: 'status', label: 'Status' },
	{ value: 'visibility', label: 'Visibility' },
	{ value: 'category', label: 'Category' },
	{ value: 'ownerId', label: 'Owner' },
	{ value: 'type', label: 'Type' },
	{ value: 'createdAt', label: 'Created at' },
]

// Описание колонок таблицы
const COLUMNS: Column<CustomNode>[] = [
	{
		label: 'ID',
		renderCell: item => item.id,
	},
	{
		label: 'Icon',
		renderCell: item => (
			<Link href={MAIN_PAGES.getProjectLink(item.slug, item.type)}>
				<SimpleProjectIcon
					isLoading={false}
					name={item.icon}
					width={32}
					rounded='lg'
				/>
			</Link>
		),
	},
	{
		label: 'Name',
		renderCell: item => {
			return (
				<Link href={MAIN_PAGES.getProjectLink(item.slug, item.type)}>
					{item.name}
				</Link>
			)
		},
	},
	{ label: 'Owner', renderCell: item => item.ownerName },
	{ label: 'Status', renderCell: item => ReadableProjectStatus[item.status] },
	{ label: 'Type', renderCell: item => ReadableProjectType[item.type] },
	{
		label: 'Created at',
		renderCell: item => new Date(item.createdAt).toLocaleDateString(),
	},
	{
		label: '',
		renderCell: item => (
			<div className='flex gap-2 justify-end'>
				<LinkButton
					size='small'
					Icon={Pencil}
					type_style='coreBorder'
					onlyIcon
					href={'/'}
				/>
				<Button size='small' Icon={Trash2} type_style='redBorder' onlyIcon />
			</div>
		),
	},
]

export function Projects() {
	const router = useRouter()
	const searchParams = useSearchParams()

	// Получаем значения из URL или используем значения по умолчанию
	const initialSearch = searchParams.get('search') || ''
	const initialOrderBy = searchParams.get('orderBy') || 'name'
	const initialOrderDirection =
		(searchParams.get('orderDirection') as 'asc' | 'desc') || 'asc'
	const initialPage = parseInt(searchParams.get('page') || '1')

	// Использование фильтров с начальными значениями
	const {
		debouncedSearchTerm,
		setSearch,
		orderBy,
		setOrderBy,
		orderDirection,
		setOrderDirection,
		currentPage: page,
		setCurrentPage: setPage,
	} = useFilter({
		initialSearch,
		initialOrderBy,
		initialOrderDirection,
		initialPage,
	})

	// Обновляем URL при изменении фильтров
	useEffect(() => {
		const query = new URLSearchParams({
			search: debouncedSearchTerm || '',
			orderBy: orderBy || '',
			orderDirection: orderDirection || 'asc',
			page: page?.toString() || '1',
		}).toString()

		router.push(`?${query}`, { scroll: false }) // Отключение скролла при смене страницы
	}, [debouncedSearchTerm, orderBy, orderDirection, page, router])

	// Получаем данные о проектах
	const { data, refetch } = useQuery({
		queryKey: ['projects', debouncedSearchTerm, orderBy, orderDirection, page],
		queryFn: () =>
			projectService.getAll({
				search: debouncedSearchTerm,
				orderBy,
				orderDirection,
				page,
			}),
	})

	// Мемоизируем данные проектов для предотвращения лишнего рендеринга
	const nodes: CustomNode[] = useMemo(
		() =>
			data?.data?.map(project => ({
				id: project.id,
				slug: project.slug,
				icon: project.icon,
				name: project.name,
				ownerName: project.owner?.name ?? 'Unknown',
				status: project.status,
				type: project.type,
				createdAt: project.createdAt,
			})) ?? [],
		[data]
	)

	const meta = data?.meta || { currentPage: 1, lastPage: 1 }

	// Перезапрашиваем данные при изменении фильтров
	useEffect(() => {
		refetch()
		if (setPage) setPage(meta.currentPage)
	}, [
		debouncedSearchTerm,
		orderBy,
		orderDirection,
		page,
		refetch,
		meta.currentPage,
		setPage,
	])

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-gray-3 rounded-2xl gap-4'>
			<Heading title='Projects view' />

			{/* Поиск и сортировка */}
			<div className='flex justify-between items-center w-full'>
				<InputField
					Icon={Search}
					id='search'
					placeholder='Search projects'
					size='small'
					defaultValue={initialSearch}
					onChange={value => {
						if (setSearch) setSearch(value)
					}}
				/>
				<div className='flex gap-2 items-center'>
					<p className='text-gray-5 text-[16px]'>Sort by</p>
					<SelectField
						options={options}
						size='small'
						defaultValue={
							options.find(o => o.value === initialOrderBy) || options[0]
						}
						placeholder='Sort type'
						onChange={selected => {
							if (setOrderBy) setOrderBy(selected.value)
						}}
					/>
					<Button
						size='small'
						type_style='dark'
						Icon={orderDirection === 'asc' ? ArrowDownUp : ArrowUpDown}
						onlyIcon
						className='py-2'
						onClick={() => {
							if (setOrderDirection)
								setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
						}}
					/>
				</div>
			</div>

			{/* Таблица и пагинация */}
			<div className='flex flex-col gap-2 items-end'>
				<PaginatorWraper
					currentPage={page || 1}
					totalPages={meta.lastPage}
					onPageChange={newPage => {
						if (setPage) setPage(newPage)
					}}
					top
				>
					<Table columns={COLUMNS} nodes={nodes} />
				</PaginatorWraper>
			</div>
		</div>
	)
}
