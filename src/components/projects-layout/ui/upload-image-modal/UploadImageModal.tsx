'use client'
import Button from '@/components/ui/form/buttons/Button'
import { useModal } from '@/components/ui/modal-provider/ModalContext'
import { GalleryImageUpload } from '@/types/galery.types'
import { useForm } from 'react-hook-form'

interface CreateProjectModalProps {}

export function CreateProjectModal({}: CreateProjectModalProps) {
	const { hideModal } = useModal()
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<GalleryImageUpload>({})

	const onSubmit = (data: GalleryImageUpload) => {
		// do something
	}

	return (
		<div className='flex flex-col gap-4'>
			<p className='text-gray-5'>Upload images to gallery.</p>
			<div className='flex flex-col gap-4'></div>
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
					Upload
				</Button>
			</div>
		</div>
	)
}
