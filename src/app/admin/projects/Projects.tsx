'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowDownUp, ArrowUpDown, Pencil, Search } from 'lucide-react'
import { useEffect, useMemo } from 'react'

import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import { InputField } from '@/components/ui/form/fields/TextField'
import { CustomOption } from '@/components/ui/form/select/select-field.types'
import { SelectField } from '@/components/ui/form/select/SelectField'
import Toggle from '@/components/ui/form/toggle/Toggle'
import { Heading } from '@/components/ui/Heading'
import SimpleProjectIcon from '@/components/ui/icons/project-icon/SimpleProjectIcon'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { Table } from '@/components/ui/table-component/Table'
import { Column, Node } from '@/components/ui/table-component/Table.types'
import { MAIN_PAGES, PROJECT_SETTINGS_PAGES } from '@/config/pages-url.config'
import { useProjectFilters } from '@/hooks/filters/projects/useProjectsFilter'
import { projectService } from '@/services/project.service'
import {
	ProjectStatus,
	ProjectType,
	ReadableProjectStatus,
	ReadableProjectType,
} from '@/types/project.types'
import Link from 'next/link'

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
			<div className='flex justify-end'>
				<LinkButton
					size='icon'
					Icon={Pencil}
					className='w-fit'
					type_style='dark'
					onlyIcon
					href={
						MAIN_PAGES.getProjectLink(item.slug, item.type) +
						PROJECT_SETTINGS_PAGES.GENERAL
					}
				/>
			</div>
		),
	},
]

export function Projects() {
	const { queryParams, isFilterUpdated, updateQueryParams } =
		useProjectFilters()
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['projects', queryParams],
		queryFn: () => projectService.getAll(queryParams),
	})
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

	useEffect(() => {
		if (isFilterUpdated) {
			refetch()
		}
	}, [queryParams, isFilterUpdated, refetch])

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
			<Heading title='Projects view' />

			{/* Поиск и сортировка */}
			<div className='flex justify-between items-center w-full'>
				<InputField
					Icon={Search}
					id='search'
					placeholder='Search projects'
					size='medium'
					defaultValue={queryParams.search}
					onChange={value => {
						updateQueryParams('search', value)
					}}
				/>
				<div className='flex gap-2 items-center'>
					<p className='text-gray-5 text-[16px]'>Sort by</p>
					<SelectField
						className='min-w-[156px]'
						options={options}
						size='medium'
						defaultValue={
							options.find(o => o.value === queryParams.orderBy) || options[0]
						}
						placeholder='Sort type'
						onChange={selected => {
							updateQueryParams('orderBy', selected.value)
						}}
					/>
					<Toggle
						label='Mod'
						checked={queryParams.projectStatus === 'MODERATION'}
						onChange={e => {
							updateQueryParams('projectStatus', e ? 'MODERATION' : '')
						}}
					/>
					<Button
						size='icon'
						type_style='dark'
						Icon={
							queryParams.orderDirection === 'asc' ? ArrowDownUp : ArrowUpDown
						}
						onlyIcon
						className='py-2'
						onClick={() => {
							updateQueryParams(
								'orderDirection',
								queryParams.orderDirection === 'asc' ? 'desc' : 'asc'
							)
						}}
					/>
				</div>
			</div>

			{/* Таблица и пагинация */}
			<div className='flex flex-col gap-2'>
				<PaginatorWraper
					currentPage={queryParams.page || 1}
					totalPages={meta.lastPage}
					onPageChange={newPage => {
						updateQueryParams('page', newPage.toString())
					}}
					top
				>
					<Table columns={COLUMNS} nodes={nodes} isLoading={isLoading} />
				</PaginatorWraper>
			</div>
		</div>
	)
}
