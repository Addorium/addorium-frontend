// components/Popup.tsx
import SimpleGalleryImage from '@/components/projects-layout/ui/gallery/gallery-image/SimpleGaleryImage'
import { FC, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { ImagePopupOptions, useImagePopup } from './ImagePopupContext'

const ImagePopup: FC<ImagePopupOptions> = ({ galeryImage }) => {
	const { hidePopup } = useImagePopup()
	const popupRef = useRef<HTMLDivElement>(null)
	useOnClickOutside(popupRef, () => {
		hidePopup()
	})
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-background-6 bg-opacity-50'>
			<div
				ref={popupRef}
				className='bg-background-1 rounded-2xl flex flex-col gap-2 pb-4 w-[900px]'
			>
				<div>
					<SimpleGalleryImage width='900px' galleryImage={galeryImage} />
				</div>
				<div className='px-4'>
					<div className='h-fit'>
						<h1 className='text-2xl font-bold'>{galeryImage.title}</h1>
						<p className='text-lg text-gray-6 break-words'>
							{galeryImage.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImagePopup
