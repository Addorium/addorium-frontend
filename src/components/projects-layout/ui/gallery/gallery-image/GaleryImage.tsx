'use client'

import Button from '@/components/ui/form/buttons/Button'
import type { GalleryImage } from '@/types/galery.types'
import { Calendar, Edit2Icon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'

interface GalleryImageProps {
	galleryImage: GalleryImage
	width?: string
	onClick?: (image: GalleryImage) => void
	onDelete?: (image: GalleryImage) => void
	onEdit?: (image: GalleryImage) => void
}

export default function GalleryImage({
	galleryImage,
	width = '290px',
	onClick,
	onDelete,
	onEdit,
}: GalleryImageProps) {
	const name = galleryImage.url ?? 'default.webp'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const nameUrl = `${bucket}images/projects/gallery/${galleryImage.projectId}/${name}`
	const readableDate = new Date(galleryImage.createdAt).toLocaleDateString()
	return (
		<>
			<div
				className={`group bg-background-2 w-[291px] h-fit flex flex-col gap-1 rounded-2xl ${onClick ? 'cursor-pointer hover:scale-[101%] transition-transform' : ''}`}
				onClick={() => onClick?.(galleryImage)}
			>
				<div className='relative w-full h-auto aspect-video rounded-2xl'>
					<Image
						src={nameUrl}
						alt={name}
						fill
						className='rounded-t-2xl object-contain'
						unoptimized={true}
					/>
					<div className='absolute top-2 right-2 flex gap-2'>
						{onEdit && (
							<Button
								size='icon'
								type_style='transperent'
								className='bg-blue-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
								onClick={e => {
									e.stopPropagation()
									onEdit?.(galleryImage)
								}}
							>
								<Edit2Icon size={22} />
							</Button>
						)}
						{onDelete && (
							<Button
								size='icon'
								type_style='transperent_red'
								className='bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
								onClick={e => {
									e.stopPropagation()
									onDelete?.(galleryImage)
								}}
							>
								<Trash2Icon size={22} />
							</Button>
						)}
					</div>
				</div>
				<div className='mx-4 flex flex-col justify-between h-full pb-2'>
					<div>
						<h1 className='text-xl font-bold'>{galleryImage.title}</h1>
					</div>
					<div className='flex items-center gap-2 text-gray-5 text-xs'>
						<Calendar size={22} />
						<p>{readableDate}</p>
					</div>
				</div>
			</div>
		</>
	)
}
