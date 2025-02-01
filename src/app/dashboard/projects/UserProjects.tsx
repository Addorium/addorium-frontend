'use client'

import { CreateProjectModal } from '@/components/main-layout/ui/create-project-modal/CreateProjectModal'
import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import Checkbox from '@/components/ui/form/checkbox'
import { CustomOption } from '@/components/ui/form/select/select-field.types'
import { SelectField } from '@/components/ui/form/select/SelectField'
import { Heading } from '@/components/ui/Heading'
import SimpleProjectIcon from '@/components/ui/icons/project-icon/SimpleProjectIcon'
import CopyLabel from '@/components/ui/labels/CopyLabel'
import {
	ModalOptions,
	useModal,
} from '@/components/ui/modal-provider/ModalContext'
import PaginatorWraper from '@/components/ui/paginator/PaginatorWraper'
import { Table } from '@/components/ui/table-component/Table'
import { Column, Node } from '@/components/ui/table-component/Table.types'
import { MAIN_PAGES, PROJECT_SETTINGS_PAGES } from '@/config/pages-url.config'
import { useProjectFilters } from '@/hooks/filters/projects/useProjectsFilter'
import { projectService } from '@/services/project.service'
import {
	IProject,
	ProjectStatus,
	ProjectType,
	ReadableProjectStatus,
	ReadableProjectType,
} from '@/types/project.types'
import { useQuery } from '@tanstack/react-query'
import { ArrowDownUp, ArrowUpDown, Edit, Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CustomNode extends Node {
	icon: string
	id: number
	slug: string
	name: string
	type: ProjectType
	status: ProjectStatus
	checked: boolean
}

const options: CustomOption[] = [
	{ value: 'name', label: 'Name' },
	{ value: 'status', label: 'Status' },
	{ value: 'type', label: 'Type' },
]

export default function UserProject() {
	const { showModal } = useModal()
	const { queryParams, isFilterUpdated, updateQueryParams } =
		useProjectFilters()
	const modalOptions: ModalOptions = {
		title: 'Create project',
		body: <CreateProjectModal />,
	}

	// State for master checkbox
	const [allChecked, setAllChecked] = useState(false)
	const [nodes, setNodes] = useState<CustomNode[]>([])

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['user projects'],
		queryFn: () => {
			return projectService.getByUserProjects(queryParams)
		},
	})

	useEffect(() => {
		if (isFilterUpdated) {
			refetch()
		}
	}, [queryParams])
	const projects = data?.data
	const meta = data?.meta
	useEffect(() => {
		if (projects) {
			const updatedNodes = projects.map((project: IProject) => ({
				id: project.id,
				slug: project.slug,
				icon: project.icon,
				name: project.name,
				status: project.status,
				type: project.type,
				checked: false,
			}))
			setNodes(updatedNodes)
		}
	}, [data])

	const handleMasterCheckboxChange = (checked: boolean) => {
		setAllChecked(checked)
		setNodes(prevNodes => prevNodes.map(node => ({ ...node, checked })))
	}
	const handleCheckboxChange = (id: number, checked: boolean) => {
		setNodes(prevNodes =>
			prevNodes.map(node => (node.id === id ? { ...node, checked } : node))
		)
	}
	useEffect(() => {
		const allSelected = nodes.length > 0 && nodes.every(node => node.checked)
		setAllChecked(allSelected)
	}, [nodes])
	const COLUMNS: Column<CustomNode>[] = [
		{
			label: (
				<Checkbox
					checked={allChecked}
					onChange={event => handleMasterCheckboxChange(event.target.checked)}
				/>
			),
			renderCell: item => (
				<Checkbox
					checked={item.checked}
					onChange={event =>
						handleCheckboxChange(item.id, event.target.checked)
					}
				/>
			),
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
					<Link
						className='hover:underline'
						href={MAIN_PAGES.getProjectLink(item.slug, item.type)}
					>
						{item.name}
					</Link>
				)
			},
		},
		{
			label: 'ID',
			renderCell: item => {
				return <CopyLabel text={item.id.toString()} />
			},
		},
		{ label: 'Type', renderCell: item => ReadableProjectType[item.type] },
		{ label: 'Status', renderCell: item => ReadableProjectStatus[item.status] },
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

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
			<div className='flex justify-between items-start'>
				<Heading
					title='Your projects'
					description='You can create content pack selecting content and clicked "Make pack".'
				/>
				<Button
					size='medium'
					type_style='primary'
					Icon={Plus}
					onClick={() => {
						showModal(modalOptions)
					}}
				>
					Create project
				</Button>
			</div>
			<div className='flex justify-between items-center w-full'>
				<div className='flex justify-center'>
					<Button size='medium' type_style='dark' Icon={Edit}>
						Make pack
					</Button>
				</div>
				<div className='flex gap-2 items-center'>
					<p className='text-gray-5 text-[16px]'>Sort by</p>
					<SelectField
						options={options}
						defaultValue={
							queryParams?.orderBy
								? options.find(o => o.value === queryParams.orderBy)
								: options[0]
						}
						placeholder='Sort type'
						size='medium'
						onChange={selected => {
							updateQueryParams('orderBy', selected.value)
						}}
					/>
					<Button
						size='icon'
						type_style='dark'
						Icon={
							queryParams.orderDirection === 'asc' ? ArrowDownUp : ArrowUpDown
						}
						onlyIcon
						className='py-2 '
						onClick={() => {
							updateQueryParams(
								'orderDirection',
								queryParams.orderDirection === 'asc' ? 'desc' : 'asc'
							)
						}}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<PaginatorWraper
					currentPage={queryParams.page || 1}
					totalPages={meta?.lastPage || 1}
					onPageChange={page => {
						updateQueryParams('page', page.toString())
					}}
					top
				>
					<Table columns={COLUMNS} nodes={nodes} isLoading={isLoading}></Table>
				</PaginatorWraper>
			</div>
		</div>
	)
}
