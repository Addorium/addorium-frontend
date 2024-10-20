'use client'
import { errorCatch } from '@/api/error'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import ImageFileField from '@/components/ui/form/file-upload/ImageFileField'
import { useModal } from '@/components/ui/modal-provider/ModalContext'
import { useRevalidateAllQueries } from '@/hooks/useRevalidate'
import { galleryService } from '@/services/galery.service'
import { GalleryImageUpload } from '@/types/galery.types'
import { useMutation } from '@tanstack/react-query'
import { Check, ImageUp, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface UploadImageModalProps {
	projectId: number
}

export function UploadImageModal({ projectId }: UploadImageModalProps) {
	const { hideModal } = useModal()
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<GalleryImageUpload>({})
	const revalidateAll = useRevalidateAllQueries()

	const { mutate: uploadImage, isPending } = useMutation({
		mutationFn: (data: GalleryImageUpload) => {
			return galleryService.create(data)
		},
		onSuccess: () => {
			revalidateAll()
			hideModal()
			toast.success('Image uploaded', {
				description: 'Image uploaded successfully',
			})
		},
		onError: (error: any) => {
			toast.error('Error creating project', {
				description: errorCatch(error),
			})
		},
	})

	const onSubmit = (data: GalleryImageUpload) => {
		data.projectId = projectId
		uploadImage(data)
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
					name='file'
					render={({ field }) => (
						<ImageFileField
							disabled={field.disabled}
							id='image'
							label='Image'
							placeholder='Drag and drop image here...'
							size='large'
							important
							Icon={ImageUp}
							onChange={field.onChange}
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
