'use client'

import { errorCatch } from '@/api/error'
import { EditImageModal } from '@/components/projects-layout/ui/edit-image-modal/EditImageModal'
import GalleryImage from '@/components/projects-layout/ui/gallery/gallery-image/GaleryImage'
import { UploadImageModal } from '@/components/projects-layout/ui/upload-image-modal/UploadImageModal'
import Button from '@/components/ui/form/buttons/Button'
import { Heading } from '@/components/ui/Heading'
import {
	ImagePopupOptions,
	useImagePopup,
} from '@/components/ui/image-popup-provider/ImagePopupContext'
import {
	ModalOptions,
	useModal,
} from '@/components/ui/modal-provider/ModalContext'
import {
	PopupOptions,
	usePopup,
} from '@/components/ui/popup-provider/PopupContext'
import { useProfile } from '@/hooks/useProfile'
import { useRevalidateAllQueries } from '@/hooks/useRevalidate'
import { galleryService } from '@/services/galery.service'
import { canEditInModeration, projectService } from '@/services/project.service'
import type { GalleryImage as GImage } from '@/types/galery.types'
import { IProject } from '@/types/project.types'
import { IUser } from '@/types/user.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ImageUpIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function ImagesSettings({
	params,
}: {
	params: { type: string; slug: string }
}) {
	const { showModal, hideModal } = useModal()
	const { showPopup } = useImagePopup()
	const { showPopup: showSuccess, hidePopup } = usePopup()

	const revalidateAll = useRevalidateAllQueries()

	const { data: user } = useProfile()

	const { data: project, isLoading } = useQuery({
		queryKey: ['project', params.slug],
		queryFn: () => {
			return projectService.getBySlug(params.slug)
		},
	})
	const isDisabled = !canEditInModeration(user as IUser, project as IProject)

	const { mutate: deleteImage } = useMutation({
		mutationFn: (data: number) => {
			return galleryService.delete(data)
		},
		onSuccess: () => {
			toast.success('Image deleted')
			revalidateAll()
			hidePopup()
		},
		onError: error => {
			toast.error('Error!', { description: errorCatch(error) })
		},
	})
	const deleteImageHandler = (image: GImage) => {
		const popupOptions: PopupOptions = {
			message: 'Are you sure you want to delete this image?',
			type: 'normal',
			confirmText: 'Yes',
			cancelText: 'Cancel',
			onConfirm: () => {
				deleteImage(image.id)
			},
			onCancel: () => {
				hidePopup()
			},
		}
		showSuccess(popupOptions)
	}

	const editImageHandler = (image: GImage) => {
		if (!project) return
		const modal: ModalOptions = {
			title: 'Edit image',
			body: <EditImageModal image={image} />,
		}
		showModal(modal)
	}
	const uploadImageHandler = () => {
		const modal: ModalOptions = {
			title: 'Upload image',
			body: <UploadImageModal projectId={project?.id || 0} />,
		}
		showModal(modal)
	}

	const imagePrewiew = (image: GImage) => {
		const prewierSettings: ImagePopupOptions = {
			galeryImage: image,
		}
		showPopup(prewierSettings)
	}
	const hasImages = project?.galleryImages && project.galleryImages.length > 0

	useEffect(() => {
		console.log('project', project)
	}, [project])

	return (
		<div className='flex flex-col gap-4 justify-center h-full'>
			<div className='flex items-center justify-between px-4 py-2 w-full bg-background-2 rounded-2xl gap-4'>
				<Heading title='Images' />
				<Button
					size='medium'
					Icon={ImageUpIcon}
					onClick={() => {
						uploadImageHandler()
					}}
					disabled={isDisabled}
				>
					Upload
				</Button>
			</div>

			<div className='flex flex-wrap w-full rounded-2xl gap-4 h-full'>
				{hasImages ? (
					project?.galleryImages
						?.sort((a, b) => (a.id === project.bannerId ? -1 : 1))
						.map(image => {
							image.bannerOf =
								image.id === project.bannerId ? project.id : undefined
							return (
								<GalleryImage
									width='291px'
									galleryImage={image}
									onClick={image => {
										imagePrewiew(image)
									}}
									{...(!isDisabled && {
										onDelete: image => deleteImageHandler(image),
										onEdit: image => editImageHandler(image),
									})}
								/>
							)
						})
				) : (
					<div className='flex items-center justify-center w-full h-full rounded-2xl '>
						<p>No images found</p>
					</div>
				)}
			</div>
		</div>
	)
}
