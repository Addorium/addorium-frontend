'use client'

import { useQuery } from '@tanstack/react-query'
import { Pencil, Plus, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { CreateTagModal } from '@/components/admin-layout/ui/tags/CreateTagModal'
import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import { InputField } from '@/components/ui/form/fields/TextField'
import { Heading } from '@/components/ui/Heading'
import SimpleTagIcon from '@/components/ui/icons/tag-icon/SimpleTagIcon'
import {
	ModalOptions,
	useModal,
} from '@/components/ui/modal-provider/ModalContext'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { Table } from '@/components/ui/table-component/Table'
import { Column, Node } from '@/components/ui/table-component/Table.types'
import { useFilter } from '@/hooks/filters/useUserFilter'
import { tagsService } from '@/services/tags.service'
import { ProjectType, ReadableProjectType } from '@/types/project.types'

// Интерфейс для данных ролей в таблице
interface CustomNode extends Node {
	id: number
	icon: string
	name: string
	projectType: ProjectType
	createdAt: string
}

// Описание колонок таблицы
const COLUMNS: Column<CustomNode>[] = [
	{ label: 'ID', renderCell: item => item.id },
	{
		label: 'Icon',
		renderCell: item => <SimpleTagIcon name={item.icon} width={30} />,
	},
	{ label: 'Name', renderCell: item => item.name },
	{ label: 'Type', renderCell: item => ReadableProjectType[item.projectType] },
	{
		label: 'Created at',
		renderCell: item => new Date(item.createdAt).toLocaleDateString(),
	},
	{
		label: '',
		renderCell: item => (
			<div className='flex justify-end'>
				<LinkButton
					size='small'
					Icon={Pencil}
					className='w-fit'
					type_style='dark'
					onlyIcon
					href={'/admin/roles/' + item.id}
				/>
			</div>
		),
	},
]

export function AdminTags() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { showModal } = useModal()

	const tagModalProps: ModalOptions = {
		title: 'Create tag',
		body: <CreateTagModal />,
	}

	// Начальные значения фильтров
	const initialSearch = searchParams.get('search') || ''
	const initialPage = parseInt(searchParams.get('page') || '1')

	// Использование кастомного хука для фильтрации и сортировки
	const {
		debouncedSearchTerm,
		setSearch,
		currentPage: page,
		setCurrentPage: setPage,
	} = useFilter({
		initialSearch,
		initialPage,
	})

	// Обновление URL без перезагрузки страницы при изменении фильтров
	useEffect(() => {
		const query = new URLSearchParams({
			search: debouncedSearchTerm || '',
			page: page?.toString() || '1',
		}).toString()
		router.push(`?${query}`, { scroll: false }) // Отключение скролла при смене страницы
	}, [debouncedSearchTerm, page, router])

	// Запрос данных ролей
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['tags', debouncedSearchTerm, page],
		queryFn: () =>
			tagsService.getAll({
				search: debouncedSearchTerm,
				page,
				projectType: 'BLUEPRINT',
			}),
	})

	const tags = data?.data || []
	const meta = data?.meta || { currentPage: 1, lastPage: 1 }

	const nodes: CustomNode[] = tags.map(tag => ({
		id: tag.id,
		icon: tag.icon,
		name: tag.name,
		projectType: tag.projectType,
		createdAt: tag.createdAt,
	}))

	// Перезагрузка данных при изменении фильтров или страницы
	useEffect(() => {
		refetch()
		if (setPage) setPage(meta.currentPage)
	}, [debouncedSearchTerm, page, refetch, meta.currentPage, setPage])

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
			<Heading title='Roles view' />

			{/* Поисковая строка и сортировка */}
			<div className='flex justify-between items-center w-full'>
				<InputField
					Icon={Search}
					id='search'
					placeholder='Search roles'
					size='medium'
					onChange={value => {
						if (setSearch) setSearch(value) // Проверяем, есть ли setSearch
					}}
				/>
				<div className='flex gap-2 items-center'>
					<Button
						size='medium'
						type_style='primary'
						Icon={Plus}
						onClick={() => {
							showModal(tagModalProps)
						}}
					>
						Create tag
					</Button>
				</div>
			</div>

			{/* Таблица и пагинация */}
			<div className='flex flex-col gap-2 items-end'>
				<PaginatorWraper
					currentPage={page || 1}
					totalPages={meta.lastPage}
					onPageChange={page => {
						if (setPage) setPage(page)
					}}
					top
				>
					<Table columns={COLUMNS} nodes={nodes} isLoading={isLoading} />
				</PaginatorWraper>
			</div>
		</div>
	)
}
