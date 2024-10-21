'use client'
import { errorCatch } from '@/api/error'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import { CustomOption } from '@/components/ui/form/select/select-field,types'
import { SelectField } from '@/components/ui/form/select/SelectField'
import {
	TypeSlider,
	TypeSliderOptions,
} from '@/components/ui/form/type-slider/TypeSlider'
import { useModal } from '@/components/ui/modal-provider/ModalContext'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { useRevalidateAllQueries } from '@/hooks/useRevalidate'
import { projectService } from '@/services/project.service'
import { IProjectsCreateProps } from '@/types/project.types'
import { useMutation } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { slug as urlSlug } from 'slug-gen'
import { toast } from 'sonner'

interface CreateProjectModalProps {}
const typeSliderOptions: TypeSliderOptions[] = [
	{ label: 'Blueprint', value: 'BLUEPRINT' },
	{ label: 'Script', value: 'SCRIPT', disabled: false },
	{ label: 'Theme', value: 'THEME', disabled: false },
	{ label: 'Pack', value: 'PACK', disabled: true },
]
const visibilityOptions: CustomOption[] = [
	{ value: 'PUBLIC', label: 'Public' },
	{ value: 'PRIVATE', label: 'Private' },
	{ value: 'UNLISTED', label: 'Unlisted' },
]

export function CreateProjectModal({}: CreateProjectModalProps) {
	const { hideModal } = useModal()
	const refetchAll = useRevalidateAllQueries()
	const [currentUrl, setCurrentUrl] = useState<string>('')
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<IProjectsCreateProps>({
		defaultValues: { type: 'BLUEPRINT', visibility: 'PUBLIC' },
	})

	const { mutate } = useMutation({
		mutationFn: (data: IProjectsCreateProps) => projectService.create(data),
		onSuccess: () => {
			hideModal()
			toast.success('Project created')
			refetchAll()
		},
		onError: (error: any) => {
			toast.error('Error creating project', {
				description: errorCatch(error),
			})
		},
	})

	const onSubmit = (data: IProjectsCreateProps) => {
		mutate(data)
	}

	const [type, name] = watch(['type', 'name'])

	useEffect(() => {
		const slug = urlSlug(name || '')
		setValue('slug', slug)
		switch (type) {
			case 'BLUEPRINT':
				setCurrentUrl(
					slug ? MAIN_PAGES.BLUEPRINT_SLUG(slug) : MAIN_PAGES.BLUEPRINTS
				)
				break
			case 'SCRIPT':
				setCurrentUrl(slug ? MAIN_PAGES.SCRIPT_SLUG(slug) : MAIN_PAGES.SCRIPTS)
				break
			case 'THEME':
				setCurrentUrl(slug ? MAIN_PAGES.THEME_SLUG(slug) : MAIN_PAGES.THEMES)
				break
		}
	}, [type, name])

	return (
		<div className='flex flex-col gap-4'>
			<p className='text-gray-5'>
				New projects are created as drafts and can be found under your profile
				page.
			</p>
			<div className='flex flex-col gap-4'>
				<Controller
					name='type'
					control={control}
					render={({ field }) => (
						<TypeSlider
							types={typeSliderOptions}
							value={typeSliderOptions.find(option => {
								return option.value === field.value?.toString()
							})}
							label='Type'
							important
							onChange={selected => {
								field.onChange(selected.value)
							}}
						/>
					)}
				/>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<InputField
							size='large'
							id='name'
							label='Name'
							important
							placeholder='Project name'
							defaultValue={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='summary'
					control={control}
					render={({ field }) => (
						<InputField
							size='large'
							id='summary'
							label='Summary'
							important
							placeholder='Project summary'
							defaultValue={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='slug'
					control={control}
					render={({ field }) => (
						<InputField
							size='large'
							id='url'
							important
							label='Url'
							defaultValue={process.env.NEXT_PUBLIC_DOMAIN + currentUrl}
							placeholder='Url'
							state='disabled'
						/>
					)}
				/>
				<Controller
					name='visibility'
					control={control}
					render={({ field }) => (
						<SelectField
							options={visibilityOptions}
							defaultValue={visibilityOptions.find(
								option => option.value === field.value
							)}
							label='Visibility'
							important
							onChange={() => {
								field.onChange
							}}
						/>
					)}
				/>
			</div>
			<div className='flex gap-2 justify-end'>
				<Button
					size='normal'
					type_style='transperent_red'
					onClick={() => {
						hideModal()
					}}
					Icon={X}
				>
					Cancel
				</Button>
				<Button
					size='normal'
					type_style='primary'
					onClick={handleSubmit(onSubmit)}
					Icon={Check}
				>
					Create
				</Button>
			</div>
		</div>
	)
}
