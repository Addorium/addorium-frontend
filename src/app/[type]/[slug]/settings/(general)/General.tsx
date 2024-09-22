'use client'

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
import { MAIN_PAGES } from '@/config/pages-url.config'
import { projectService } from '@/services/project.service'
import { IProjectsUpdateProps } from '@/types/project.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const typeOptions = [
	{ value: 'BLUEPRINT', label: 'Blueprint' },
	{ value: 'SCRIPT', label: 'Script' },
	{ value: 'THEME', label: 'Theme' },
]

export default function General({
	params,
}: {
	params: { type: string; slug: string }
}) {
	const { showPopup, hidePopup } = usePopup()
	const [currentUrl, setCurrentUrl] = useState<string>(MAIN_PAGES.BLUEPRINTS)

	const { data: project, isLoading } = useQuery({
		queryKey: ['project', params.slug],
		queryFn: () => {
			return projectService.getBySlug(params.slug)
		},
	})

	const { mutate: updateProject } = useMutation({
		mutationKey: ['updateProject'],
		mutationFn: (data: IProjectsUpdateProps) => projectService.update(data),
		onSuccess: () => {
			toast.success('Project updated')
		},
	})
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IProjectsUpdateProps>({
		defaultValues: {
			name: project?.name,
			type: project?.type,
			slug: project?.slug,
		},
	})
	const [type] = watch(['type'])
	useEffect(() => {
		const rType = project?.type || 'BLUEPRINT'
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
		data.slug = project?.slug || ''
		updateProject(data)
		hidePopup()
	}
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col px-4 py-5 w-full bg-gray-3 rounded-2xl gap-4'>
				<Heading title='Project information' />
				<LoaderLayout loading={isLoading}>
					<div>
						<div className='flex flex-col gap-3 '>
							<h1 className='text-lg text-gray-1 font-semibold'>Icon</h1>
							<UpdateProjectIcon project={project} />
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
												size='large'
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
										name='type'
										control={control}
										defaultValue={project?.type}
										rules={{ required: 'Type is required' }}
										render={({ field }) => (
											<SelectField
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
								</div>
								<div className='flex gap-4'>
									<Controller
										name='slug'
										control={control}
										defaultValue={project?.slug}
										render={({ field }) => (
											<InputField
												size='large'
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
									size='small'
									className='w-24'
									type_style='core'
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
			<div className='flex flex-col px-4 py-5 w-full bg-gray-3 rounded-2xl gap-4'>
				<Heading
					title='Delete project'
					description="Removes your project from Addorium's servers and search. Clicking on this will delete your project, so be extra careful!"
				/>
				<div>
					<Button type_style='red' size='small' Icon={Trash2}>
						Delete project
					</Button>
				</div>
			</div>
		</div>
	)
}
function urlSlug(arg0: string) {
	throw new Error('Function not implemented.')
}
