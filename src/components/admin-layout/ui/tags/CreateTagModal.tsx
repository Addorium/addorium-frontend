'use client'
import { errorCatch } from '@/api/error'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import FileField from '@/components/ui/form/file-upload/FileField'
import {
	TypeSlider,
	TypeSliderOptions,
} from '@/components/ui/form/type-slider/TypeSlider'
import { useModal } from '@/components/ui/modal-provider/ModalContext'
import { tagsService } from '@/services/tags.service'
import { ITagCreateProps } from '@/types/tag.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface CreateTagModalProps {}
const typeSliderOptions: TypeSliderOptions[] = [
	{ label: 'Blueprint', value: 'BLUEPRINT' },
	{ label: 'Script', value: 'SCRIPT', disabled: false },
	{ label: 'Theme', value: 'THEME', disabled: false },
]

export function CreateTagModal({}: CreateTagModalProps) {
	const { hideModal } = useModal()
	const queryClient = useQueryClient()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ITagCreateProps>({
		defaultValues: { projectType: 'BLUEPRINT' },
	})

	const { mutate } = useMutation({
		mutationFn: (data: ITagCreateProps) => tagsService.create(data),
		onSuccess: () => {
			hideModal()
			toast.success('Tag created')
			queryClient.invalidateQueries({
				queryKey: ['tags'],
				refetchType: 'all',
			})
		},
		onError: (error: any) => {
			toast.error('Error creating tag', {
				description: errorCatch(error),
			})
		},
	})

	const onSubmit = (data: ITagCreateProps) => {
		console.log(data)
		console.log(data.file)
		if (!data.file) {
			toast.error('Icon is required')
			return
		}
		mutate(data)
	}

	return (
		<div className='flex flex-col gap-4'>
			<p className='text-gray-5'>
				New tag will be created and added to the list
			</p>
			<div className='flex flex-col gap-4'>
				<Controller
					name='projectType'
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
							placeholder='Tag name'
							defaultValue={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					name='file'
					control={control}
					render={({ field }) => (
						<FileField
							Icon={Upload}
							size='large'
							id='icon'
							label='Icon'
							placeholder='Icon for tag'
							onChange={file => {
								if (file) {
									console.log(file)
									field.onChange(file)
								}
							}}
						/>
					)}
				/>
			</div>
			<div className='flex gap-2 justify-end'>
				<Button
					size='normal'
					type_style='transperent'
					onClick={() => {
						hideModal()
					}}
				>
					Cancel
				</Button>
				<Button
					size='normal'
					type_style='core'
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</div>
		</div>
	)
}