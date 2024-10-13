'use client'

import { errorCatch } from '@/api/error'
import Button from '@/components/ui/form/buttons/Button'
import { Heading } from '@/components/ui/Heading'
import { projectService } from '@/services/project.service'
import { IProjectsUpdateProps } from '@/types/project.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ImageUpIcon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function ImagesSettings({
	params,
}: {
	params: { type: string; slug: string }
}) {
	const { data: project, isLoading } = useQuery({
		queryKey: ['project', params.slug],
		queryFn: () => {
			return projectService.getBySlug(params.slug)
		},
	})
	const { mutate: updateProject } = useMutation({
		mutationFn: (data: IProjectsUpdateProps) => {
			return projectService.update(data)
		},
		onError: error => {
			toast.error('Error!', { description: errorCatch(error) })
		},
	})
	const hasImages = project?.galleryImages && project.galleryImages.length > 0

	useEffect(() => {
		console.log('project', project)
	}, [project])

	return (
		<div className='flex flex-col gap-4 h-full'>
			<div className='flex items-center justify-between px-4 py-2 w-full bg-background-2 rounded-2xl gap-4'>
				<Heading title='Images' />
				<Button size='small' Icon={ImageUpIcon}>
					Upload
				</Button>
			</div>
			<div className='flex flex-wrap w-full rounded-2xl gap-4  h-full'>
				{hasImages ? (
					project?.galleryImages?.map(image => (
						<div
							key={image.id}
							className='w-[200px] h-[200px] bg-background-2 rounded-2xl'
						>
							<img
								src={image.url}
								alt={image.title}
								className='w-full h-full object-cover rounded-2xl'
							/>
						</div>
					))
				) : (
					<div className='flex items-center justify-center w-full h-full rounded-2xl '>
						<p>No images found</p>
					</div>
				)}
			</div>
		</div>
	)
}
