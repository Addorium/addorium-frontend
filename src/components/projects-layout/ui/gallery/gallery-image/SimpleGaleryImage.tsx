import type { GalleryImage } from '@/types/galery.types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface SimpleGalleryImageProps {
	galleryImage: GalleryImage
	width?: string
}

export default function SimpleGalleryImage({
	galleryImage,
	width = '291px',
}: SimpleGalleryImageProps) {
	const [aspectRatio, setAspectRatio] = useState<string>('16 / 9')
	const name = galleryImage.url ?? 'default.webp'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const nameUrl = `${bucket}images/projects/gallery/${galleryImage.projectId}/${name}`

	useEffect(() => {
		const img = new window.Image() // Использование глобального объекта Image для работы с изображениями
		img.src = nameUrl
		img.onload = () => {
			const ratio = img.width / img.height
			setAspectRatio(`${img.width}/${img.height}`)
		}
	}, [nameUrl])

	return (
		<div
			className='relative rounded-2xl'
			style={{ width: width, aspectRatio: aspectRatio }} // Встроенные стили для ширины и соотношения сторон
		>
			<Image
				src={nameUrl}
				alt={name}
				fill
				className='rounded-2xl object-contain'
				unoptimized={true}
			/>
		</div>
	)
}
