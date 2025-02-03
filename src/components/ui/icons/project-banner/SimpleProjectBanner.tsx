'use client'
import { GalleryImage } from '@/types/galery.types'
import React from 'react'

interface ISimpleProjectBanner {
	isLoading: boolean
	image?: GalleryImage
	height?: number
	onClick?: () => void
}
const SimpleProjectBanner: React.FC<ISimpleProjectBanner> = ({
	isLoading,
	height = 10,
	...res
}) => {
	console.log(res.image)
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const nameUrl = `${bucket}images/projects/gallery/${res.image?.projectId}/${res.image?.url}`
	return (
		<>
			<div
				className={`flex aspect-video bg-background-4 rounded-t-2xl`}
				style={{ width: `auto`, height: `${height}px` }}
			>
				<img
					className={`object-cover rounded-t-2xl aspect-video`}
					style={{ width: `100%`, height: `${height}px` }}
					src={nameUrl}
					alt={'avatar'}
				></img>
			</div>
		</>
	)
}
export default SimpleProjectBanner
