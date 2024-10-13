'use client'

import { useQuery } from '@tanstack/react-query'
import { Pencil, Plus, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { CreateCategorieModal } from '@/components/admin-layout/ui/categories/CreateCategorieModal'
import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import { InputField } from '@/components/ui/form/fields/TextField'
import { Heading } from '@/components/ui/Heading'
import SimpleCategoryIcon from '@/components/ui/icons/category-icon/SimpleCategoryIcon'
import {
	ModalOptions,
	useModal,
} from '@/components/ui/modal-provider/ModalContext'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { Table } from '@/components/ui/table-component/Table'
import { Column, Node } from '@/components/ui/table-component/Table.types'
import { useFilter } from '@/hooks/filters/useUserFilter'
import { categoriesService } from '@/services/categories.service'
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
		renderCell: item => <SimpleCategoryIcon name={item.icon} width={30} />,
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

export function AdminCategories() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { showModal } = useModal()

	const categoriesModalProps: ModalOptions = {
		title: 'Create category',
		body: <CreateCategorieModal />,
	}

	// Начальные значения фильтров
	const initialSearch = searchParams.get('search') || ''
	const initialProjectType =
		(searchParams.get('type') as ProjectType) || 'BLUEPRINT'
	const initialPage = parseInt(searchParams.get('page') || '1')

	// Использование кастомного хука для фильтрации и сортировки
	const {
		debouncedSearchTerm,
		setSearch,
		currentPage: page,
		setCurrentPage: setPage,
		projectType,
		setProjectType,
	} = useFilter({
		initialSearch,
		initialPage,
		initialProjectType,
	})

	// Обновление URL без перезагрузки страницы при изменении фильтров
	useEffect(() => {
		const query = new URLSearchParams({
			search: debouncedSearchTerm || '',
			projectType: projectType || 'BLUEPRINT',
			page: page?.toString() || '1',
		}).toString()
		router.push(`?${query}`, { scroll: false }) // Отключение скролла при смене страницы
	}, [debouncedSearchTerm, page, router, projectType])

	// Запрос данных ролей
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['categories', debouncedSearchTerm, page, projectType],
		queryFn: () =>
			categoriesService.getAll({
				search: debouncedSearchTerm,
				page,
				projectType,
			}),
	})

	const categories = data?.data || []
	const meta = data?.meta || { currentPage: 1, lastPage: 1 }

	const nodes: CustomNode[] = categories.map(categorie => ({
		id: categorie.id,
		icon: categorie.icon,
		name: categorie.name,
		projectType: categorie.projectType,
		createdAt: categorie.createdAt,
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
					size='small'
					onChange={value => {
						if (setSearch) setSearch(value) // Проверяем, есть ли setSearch
					}}
				/>
				<div className='flex gap-2 items-center'>
					<Button
						size='small'
						type_style='core'
						Icon={Plus}
						onClick={() => {
							showModal(categoriesModalProps)
						}}
					>
						Create category
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
