'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowDownUp, ArrowUpDown, Pencil, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import { InputField } from '@/components/ui/form/fields/TextField'
import { SelectField } from '@/components/ui/form/select/SelectField'
import { Heading } from '@/components/ui/Heading'
import SimpleUserIcon from '@/components/ui/icons/user-icon/SimpleUserIcon'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { Table } from '@/components/ui/table-component/Table'
import { Column, Node } from '@/components/ui/table-component/Table.types'
import { ADMIN_PAGES } from '@/config/pages-url.config'
import { useFilter } from '@/hooks/filters/useUserFilter'
import { userService } from '@/services/user.service'
import { IRole } from '@/types/role.types'

// Интерфейс для данных пользователя в таблице
interface CustomNode extends Node {
	id: number
	avatar?: string
	name: string
	role?: IRole
	createdAt: string
}

// Опции для фильтрации/сортировки
const options = [
	{ value: 'name', label: 'Name' },
	{ value: 'roleId', label: 'Role' },
	{ value: 'createdAt', label: 'Created at' },
]

// Описание колонок для таблицы
const COLUMNS: Column<CustomNode>[] = [
	{ label: 'ID', renderCell: item => item.id },
	{
		label: 'Icon',
		renderCell: item => (
			<SimpleUserIcon
				isLoading={false}
				avatar={item.avatar}
				width={32}
				rounded='lg'
			/>
		),
	},
	{ label: 'Name', renderCell: item => item.name },
	{ label: 'Role', renderCell: item => item.role?.name },
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
					href={ADMIN_PAGES.EDIT_USERS(item.id)}
				/>
			</div>
		),
	},
]

export function Users() {
	const router = useRouter()
	const searchParams = useSearchParams()

	// Получаем начальные значения из параметров запроса или задаем значения по умолчанию
	const initialSearch = searchParams.get('search') || ''
	const initialOrderBy = searchParams.get('orderBy') || 'name'
	const initialOrderDirection =
		(searchParams.get('orderDirection') as 'asc' | 'desc') || 'asc'
	const initialPage = parseInt(searchParams.get('page') || '1')

	// Используем кастомный хук для фильтрации и сортировки
	const {
		debouncedSearchTerm,
		setSearch,
		orderBy,
		setOrderBy,
		orderDirection,
		setOrderDirection,
		currentPage: page = 1,
		setCurrentPage: setPage,
	} = useFilter({
		initialSearch,
		initialOrderBy,
		initialOrderDirection,
		initialPage,
	})

	// Обновляем URL без перезагрузки страницы при изменении фильтров
	useEffect(() => {
		const query = new URLSearchParams({
			search: debouncedSearchTerm || '',
			orderBy: orderBy || '',
			orderDirection: orderDirection || 'asc',
			page: page.toString(),
		}).toString()
		router.push(`?${query}`, { scroll: false })
	}, [debouncedSearchTerm, orderBy, orderDirection, router, page])

	// Запрос данных пользователей
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['users', debouncedSearchTerm, orderBy, orderDirection, page],
		queryFn: () =>
			userService.getAll({
				search: debouncedSearchTerm,
				orderBy,
				orderDirection,
				page,
			}),
	})

	const users = data?.data || []
	const meta = data?.meta || { currentPage: 1, lastPage: 1 }

	const nodes: CustomNode[] = users.map(user => ({
		id: user.id,
		avatar: user.avatar,
		name: user.name,
		role: user.role,
		createdAt: user.createdAt,
	}))

	// Перезагружаем данные при изменении фильтров и страницы
	useEffect(() => {
		refetch()
		if (setPage) {
			setPage(meta.currentPage)
		}
	}, [debouncedSearchTerm, orderBy, orderDirection, page])

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
			<Heading title='Users view' />

			{/* Поисковая строка и сортировка */}
			<div className='flex justify-between items-center w-full'>
				<InputField
					Icon={Search}
					id='search'
					placeholder='Search users'
					size='small'
					defaultValue={initialSearch}
					onChange={value => {
						if (setSearch) {
							setSearch(value)
						}
					}}
				/>
				<div className='flex gap-2 items-center'>
					<p className='text-gray-5 text-[16px]'>Sort by</p>
					<SelectField
						size='small'
						options={options}
						defaultValue={
							options.find(o => o.value === initialOrderBy) || options[0]
						}
						placeholder='Sort type'
						onChange={selected => {
							if (setOrderBy) {
								setOrderBy(selected.value)
							}
						}}
					/>
					<Button
						size='icon'
						type_style='dark'
						Icon={orderDirection === 'asc' ? ArrowDownUp : ArrowUpDown}
						onlyIcon
						className='py-2'
						onClick={() => {
							if (setOrderDirection) {
								setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
							}
						}}
					/>
				</div>
			</div>

			{/* Таблица пользователей и пагинация */}
			<div className='flex flex-col gap-2 items-end'>
				<PaginatorWraper
					currentPage={page}
					totalPages={meta.lastPage}
					onPageChange={page => {
						if (setPage) {
							setPage(page)
						}
					}}
					top
				>
					<Table columns={COLUMNS} nodes={nodes} isLoading={isLoading} />
				</PaginatorWraper>
			</div>
		</div>
	)
}
