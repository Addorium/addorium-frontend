'use client'

import { CreateProjectModal } from '@/components/main-layout/ui/create-project-modal/CreateProjectModal'
import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import Checkbox from '@/components/ui/form/checkbox'
import { CustomOption } from '@/components/ui/form/select/select-field,types'
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
import { useFilter } from '@/hooks/filters/useUserFilter'
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
import { useRouter, useSearchParams } from 'next/navigation'
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
	const modalOptions: ModalOptions = {
		title: 'Create project',
		body: <CreateProjectModal />,
	}

	const router = useRouter()
	const searchParams = useSearchParams()

	// State for master checkbox
	const [allChecked, setAllChecked] = useState(false)
	const [nodes, setNodes] = useState<CustomNode[]>([])

	// Get filters from query or use default values
	const initialOrderBy = searchParams.get('orderBy') || 'name'
	const initialOrderDirection =
		(searchParams.get('orderDirection') as 'asc' | 'desc') || 'asc'
	const initialPage = searchParams.get('page') || 1

	const {
		debouncedSearchTerm,
		orderBy,
		setOrderBy,
		orderDirection,
		setOrderDirection,
		currentPage: page,
		setCurrentPage: setPage,
	} = useFilter({
		initialOrderBy,
		initialOrderDirection,
		initialPage: parseInt(initialPage as string) || 1,
	})

	useEffect(() => {
		const query = new URLSearchParams({
			orderBy: orderBy || '',
			orderDirection: orderDirection || 'asc',
			page: page?.toString() || '1',
		}).toString()

		// Update URL without reloading the page
		router.push(`?${query}`)
	}, [debouncedSearchTerm, orderBy, orderDirection, router, page])

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['user projects'],
		queryFn: () => {
			return projectService.getByUserProjects({
				orderBy: orderBy,
				orderDirection: orderDirection,
				page: page,
			})
		},
	})

	useEffect(() => {
		if (data) {
			// Map data to include the `checked` property
			const updatedNodes = data.data.map((project: IProject) => ({
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

	const projects = data?.data
	const meta = data?.meta

	// Handle master checkbox change
	const handleMasterCheckboxChange = (checked: boolean) => {
		setAllChecked(checked)
		setNodes(prevNodes => prevNodes.map(node => ({ ...node, checked })))
	}

	// Handle individual checkbox change
	const handleCheckboxChange = (id: number, checked: boolean) => {
		setNodes(prevNodes =>
			prevNodes.map(node => (node.id === id ? { ...node, checked } : node))
		)
	}

	// Watch nodes to update master checkbox when all are checked
	useEffect(() => {
		const allSelected = nodes.length > 0 && nodes.every(node => node.checked)
		setAllChecked(allSelected)
	}, [nodes])

	// Table columns
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
						size='small'
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

	useEffect(() => {
		refetch()
		if (setPage) {
			setPage(meta?.currentPage || 1)
		}
	}, [debouncedSearchTerm, orderBy, orderDirection, page])

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-gray-3 rounded-2xl gap-4'>
			<div className='flex justify-between items-start'>
				<Heading
					title='Your projects'
					description='You can create content pack selecting content and clicked "Make pack".'
				/>
				<Button
					size='small'
					type_style='core'
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
					<Button size='small' type_style='dark' Icon={Edit}>
						Make pack
					</Button>
				</div>
				<div className='flex gap-2 items-center'>
					<p className='text-gray-5 text-[16px]'>Sort by</p>
					<SelectField
						options={options}
						defaultValue={
							initialOrderBy
								? options.find(o => o.value === initialOrderBy)
								: options[0]
						}
						placeholder='Sort type'
						size='small'
						onChange={selected => {
							if (setOrderBy) {
								setOrderBy(selected.value)
							}
						}}
					/>
					<Button
						size='small'
						type_style='dark'
						Icon={orderDirection === 'asc' ? ArrowDownUp : ArrowUpDown}
						onlyIcon
						className='py-2 '
						onClick={() => {
							if (setOrderDirection) {
								setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
							}
						}}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-2 items-end'>
				<PaginatorWraper
					currentPage={page || 1}
					totalPages={meta?.lastPage || 1}
					onPageChange={page => {
						if (setPage) {
							setPage(page)
						}
					}}
					top
				>
					<Table columns={COLUMNS} nodes={nodes}></Table>
				</PaginatorWraper>
			</div>
		</div>
	)
}
