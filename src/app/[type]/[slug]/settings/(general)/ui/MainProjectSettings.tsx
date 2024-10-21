'use client'

import { errorCatch } from '@/api/error'
import LoaderLayout from '@/components/loader-layout'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import { SelectField } from '@/components/ui/form/select/SelectField'
import { Heading } from '@/components/ui/Heading'
import UpdateProjectIcon from '@/components/ui/icons/project-icon/UpdateProjectIcon'
import {
	PopupOptions,
	usePopup,
} from '@/components/ui/popup-provider/PopupContext'
import { MAIN_PAGES, PROJECT_SETTINGS_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import { useRevalidateAllQueries } from '@/hooks/useRevalidate'
import { canEditInModeration, projectService } from '@/services/project.service'
import { IProject, IProjectsUpdateProps } from '@/types/project.types'
import { IUser } from '@/types/user.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const typeOptions = [
	{ value: 'BLUEPRINT', label: 'Blueprint' },
	{ value: 'SCRIPT', label: 'Script' },
	{ value: 'THEME', label: 'Theme' },
]
const visibilityOptions = [
	{ value: 'PUBLIC', label: 'Public' },
	{ value: 'PRIVATE', label: 'Private' },
	{ value: 'UNLISTED', label: 'Unlisted' },
]

export default function MainProjectSettings({ slug }: { slug: string }) {
	const revalidateAll = useRevalidateAllQueries()
	const { showPopup, hidePopup } = usePopup()
	const [currentUrl, setCurrentUrl] = useState<string>(MAIN_PAGES.BLUEPRINTS)
	const { push } = useRouter()
	const { data: user } = useProfile()
	const { data: project, isLoading } = useQuery({
		queryKey: ['project', slug],
		queryFn: () => {
			return projectService.getBySlug(slug)
		},
	})

	const {
		mutate: updateProject,
		isSuccess,
		isPending,
	} = useMutation({
		mutationKey: ['updateProject'],
		mutationFn: (data: IProjectsUpdateProps) => projectService.update(data),
		onSuccess: () => {
			toast.success('Project updated')
		},
		onError: error => {
			toast.error('Error updating project', {
				description: errorCatch(error),
			})
		},
	})
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IProjectsUpdateProps>({
		disabled: !canEditInModeration(user as IUser, project as IProject),
		defaultValues: {
			name: project?.name,
			type: project?.type,
			slug: project?.slug,
			summary: project?.summary,
		},
	})
	const [type] = watch(['type'])
	useEffect(() => {
		switch (type) {
			case 'BLUEPRINT':
				setCurrentUrl(MAIN_PAGES.BLUEPRINTS)
				break
			case 'SCRIPT':
				setCurrentUrl(MAIN_PAGES.SCRIPTS)
				break
			case 'THEME':
				setCurrentUrl(MAIN_PAGES.THEMES)
				break
		}
	}, [type, project?.type])

	const popupOptions: PopupOptions = {
		message: 'Are you sure you want to save changes?',
		type: 'normal',
		confirmText: 'Save',
		cancelText: 'Cancel',
		onConfirm: () => {
			handleSubmit(onSubmit)()
		},
		onCancel: () => {
			hidePopup()
		},
	}

	const onSubmit: SubmitHandler<IProjectsUpdateProps> = data => {
		data.id = project?.id || 0
		data.slug = data.slug || project?.slug || ''
		updateProject(data)
		hidePopup()
		if (isSuccess) {
			if (project?.slug !== data.slug || project?.type !== data.type) {
				const url =
					MAIN_PAGES.getProjectLink(data.slug, data.type || 'BLUEPRINT') +
					PROJECT_SETTINGS_PAGES.GENERAL
				revalidateAll()
				push(url)
			}
		}
	}

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
			<Heading title='Project information' />
			<LoaderLayout loading={isLoading}>
				<div>
					<div className='flex flex-col gap-3 '>
						<h1 className='text-lg text-gray-6 font-semibold'>Icon</h1>
						<UpdateProjectIcon
							project={project}
							disabled={
								!canEditInModeration(user as IUser, project as IProject)
							}
						/>
					</div>
					<div className='flex flex-col gap-6 mt-4'>
						<div className='flex flex-col gap-4'>
							<div className='flex flex-col gap-4'>
								<Controller
									name='name'
									control={control}
									defaultValue={project?.name}
									rules={{ required: 'Name is required' }}
									render={({ field }) => (
										<InputField
											disabled={field.disabled}
											label='Name'
											important
											id='project-name'
											placeholder='Enter project name'
											className='w-72'
											onChange={field.onChange}
											defaultValue={field.value}
											state={errors.name ? 'error' : 'default'}
											stateText={errors.name?.message}
										/>
									)}
								/>
								<Controller
									name='summary'
									control={control}
									defaultValue={project?.summary}
									rules={{ required: 'Summary is required' }}
									render={({ field }) => (
										<InputField
											disabled={field.disabled}
											label='Summary'
											important
											id='project-summary'
											placeholder='Enter project summary'
											className='w-72'
											onChange={field.onChange}
											defaultValue={field.value}
											state={errors.summary ? 'error' : 'default'}
											stateText={errors.summary?.message}
										/>
									)}
								/>

								<Controller
									name='type'
									control={control}
									defaultValue={project?.type}
									rules={{ required: 'Type is required' }}
									render={({ field }) => (
										<SelectField
											disabled={field.disabled}
											label='Type'
											id='type'
											important
											options={typeOptions}
											placeholder='Select project type'
											className='w-96'
											defaultValue={typeOptions.find(option => {
												return option.value === field.value?.toString()
											})}
											onChange={type => {
												field.onChange(type.value)
											}}
										/>
									)}
								/>
								<Controller
									name='visibility'
									control={control}
									defaultValue={project?.visibility}
									render={({ field }) => (
										<SelectField
											disabled={field.disabled}
											label='Visibility'
											id='visibility'
											important
											options={visibilityOptions}
											placeholder='Select project visibility'
											className='w-96'
											defaultValue={visibilityOptions.find(option => {
												return option.value === field.value?.toString()
											})}
											onChange={type => {
												field.onChange(type.value)
											}}
										/>
									)}
								/>
							</div>
							<div className='flex gap-4'>
								<Controller
									name='slug'
									control={control}
									defaultValue={project?.slug}
									render={({ field }) => (
										<InputField
											disabled={field.disabled}
											label='Url'
											id='url'
											helperText={
												'https://' +
												process.env.NEXT_PUBLIC_DOMAIN +
												currentUrl +
												'/'
											}
											placeholder='Enter slug'
											defaultValue={field.value}
											onChange={field.onChange}
											state={errors.name ? 'error' : 'default'}
											stateText={errors.name?.message}
										/>
									)}
								/>
							</div>
						</div>
						<div className='flex gap-4'>
							<Button
								type='button'
								size='medium'
								className='w-24'
								type_style='primary'
								Icon={Save}
								disabled={
									isPending ||
									!canEditInModeration(user as IUser, project as IProject)
								}
								onClick={() => {
									showPopup(popupOptions)
								}}
							>
								Save
							</Button>
						</div>
					</div>
				</div>
			</LoaderLayout>
		</div>
	)
}
