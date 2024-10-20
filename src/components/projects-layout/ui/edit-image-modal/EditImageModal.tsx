'use client'
import { errorCatch } from '@/api/error'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import Toggle from '@/components/ui/form/toggle/Toggle'
import { useModal } from '@/components/ui/modal-provider/ModalContext'
import { useRevalidateAllQueries } from '@/hooks/useRevalidate'
import { galleryService } from '@/services/galery.service'
import { GalleryImage, GalleryImageUpdate } from '@/types/galery.types'
import { useMutation } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface EditImageModalProps {
	image: GalleryImage
}

export function EditImageModal({ image }: EditImageModalProps) {
	const { projectId, id, ...rest } = image
	const { hideModal } = useModal()
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<GalleryImageUpdate>({
		defaultValues: {
			title: rest.title,
			description: rest.description,
			bannerOf: rest.bannerOf,
		},
	})
	const revalidateAll = useRevalidateAllQueries()

	const { mutate: updateImage, isPending } = useMutation({
		mutationFn: (data: GalleryImageUpdate) => {
			return galleryService.update(data)
		},
		onSuccess: () => {
			revalidateAll()
			hideModal()
			toast.success('Image uploaded', {
				description: 'Image uploaded successfully',
			})
		},
		onError: (error: any) => {
			console.log(error)
			toast.error('Error creating project', {
				description: errorCatch(error),
			})
		},
	})

	const onSubmit = (data: GalleryImageUpdate) => {
		data.id = id
		console.log(data)
		updateImage(data)
	}
	const isBanner = (value?: number) => {
		if (value) {
			return true
		}
		return false
	}

	return (
		<div className='flex flex-col gap-4'>
			<p className='text-gray-5'>Upload images to gallery.</p>
			<div className='flex flex-col gap-4'>
				<Controller
					control={control}
					name='title'
					render={({ field }) => (
						<InputField
							disabled={field.disabled}
							placeholder='Title'
							id='title'
							label='Title'
							important
							size='large'
							defaultValue={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					name='description'
					render={({ field }) => (
						<InputField
							disabled={field.disabled}
							placeholder='Description'
							id='description'
							label='Description'
							important
							size='large'
							defaultValue={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					name='bannerOf'
					render={({ field }) => (
						<Toggle
							disabled={field.disabled}
							checked={isBanner(field.value)}
							onChange={e => {
								field.onChange(e ? projectId : undefined)
							}}
							label='Banner'
							important
						/>
					)}
				/>
			</div>
			<div className='flex gap-2 justify-end'>
				<Button
					disabled={isPending}
					size='normal'
					type_style='transperent'
					onClick={() => {
						hideModal()
					}}
					Icon={X}
				>
					Cancel
				</Button>
				<Button
					disabled={isPending}
					size='normal'
					type_style='primary'
					onClick={handleSubmit(onSubmit)}
					Icon={Check}
				>
					Upload
				</Button>
			</div>
		</div>
	)
}
