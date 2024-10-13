'use client'

import type { GalleryImage } from '@/types/galery.types'
import Image from 'next/image'

interface GalleryImageProps {
	galleryImage: GalleryImage
}

export default function GalleryImage({ galleryImage }: GalleryImageProps) {
	const name = galleryImage.url ?? 'default.webp'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const nameUrl = `${bucket}images/projects/galery/${name}`
	return (
		<>
			<div>
				<Image src={nameUrl} alt={name} />
			</div>
		</>
	)
}
