'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowDownUp, ArrowUpDown, Pencil, Plus, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import { InputField } from '@/components/ui/form/fields/TextField'
import { Heading } from '@/components/ui/Heading'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { Table } from '@/components/ui/table-component/Table'
import { Column, Node } from '@/components/ui/table-component/Table.types'
import { useFilter } from '@/hooks/filters/useUserFilter'
import { roleService } from '@/services/role.service'

// Интерфейс для данных ролей в таблице
interface CustomNode extends Node {
	id: number
	name: string
	permissions?: string[] // Права могут отсутствовать
	createdAt: string
}

// Описание колонок таблицы
const COLUMNS: Column<CustomNode>[] = [
	{ label: 'ID', renderCell: item => item.id },
	{ label: 'Name', renderCell: item => item.name },
	{
		label: 'Created at',
		renderCell: item => new Date(item.createdAt).toLocaleDateString(),
	},
	{
		label: '',
		renderCell: item => (
			<div className='flex justify-end'>
				<LinkButton
					size='icon'
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

export function Roles() {
	const router = useRouter()
	const searchParams = useSearchParams()

	// Начальные значения фильтров
	const initialSearch = searchParams.get('search') || ''
	const initialOrderDirection =
		(searchParams.get('orderDirection') as 'asc' | 'desc') || 'asc'
	const initialPage = parseInt(searchParams.get('page') || '1')

	// Использование кастомного хука для фильтрации и сортировки
	const {
		debouncedSearchTerm,
		setSearch,
		orderDirection,
		setOrderDirection,
		currentPage: page,
		setCurrentPage: setPage,
	} = useFilter({
		initialSearch,
		initialOrderDirection,
		initialPage,
	})

	// Обновление URL без перезагрузки страницы при изменении фильтров
	useEffect(() => {
		const query = new URLSearchParams({
			search: debouncedSearchTerm || '',
			orderDirection: orderDirection || 'asc',
			page: page?.toString() || '1',
		}).toString()
		router.push(`?${query}`, { scroll: false }) // Отключение скролла при смене страницы
	}, [debouncedSearchTerm, orderDirection, page, router])

	// Запрос данных ролей
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['roles', debouncedSearchTerm, orderDirection, page],
		queryFn: () =>
			roleService.getAll({
				search: debouncedSearchTerm,
				orderDirection,
				page,
			}),
	})

	const roles = data?.data || []
	const meta = data?.meta || { currentPage: 1, lastPage: 1 }

	const nodes: CustomNode[] = roles.map(role => ({
		id: role.id,
		name: role.name,
		permissions: role.permissions,
		createdAt: role.createdAt,
	}))

	// Перезагрузка данных при изменении фильтров или страницы
	useEffect(() => {
		refetch()
		if (setPage) setPage(meta.currentPage)
	}, [
		debouncedSearchTerm,
		orderDirection,
		page,
		refetch,
		meta.currentPage,
		setPage,
	])

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
						size='icon'
						type_style='dark'
						Icon={orderDirection === 'asc' ? ArrowDownUp : ArrowUpDown}
						onlyIcon
						className='py-2'
						onClick={() => {
							if (setOrderDirection)
								setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
						}}
					/>
					<Button size='medium' type_style='primary' Icon={Plus}>
						Create role
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
