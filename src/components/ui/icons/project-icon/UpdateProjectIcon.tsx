'use client'
import { errorCatch } from '@/api/error'
import { useProjectRevalidate } from '@/hooks/useRevalidate'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/project.types'
import { useMutation } from '@tanstack/react-query'
import { Trash2, Upload } from 'lucide-react'
import React, { useRef } from 'react'
import { toast } from 'sonner'
import Button from '../../form/buttons/Button'
import SimpleProjectIcon from './SimpleProjectIcon'

interface IUpdateProjectIcon {
	project: IProject | undefined
	disabled?: boolean
}
const UpdateProjectIcon: React.FC<IUpdateProjectIcon> = ({
	project,
	disabled,
}) => {
	if (!project) {
		return null
	}

	const inputFile = useRef<HTMLInputElement | null>(null)
	const { refreshQueries } = useProjectRevalidate()

	const { mutate: updateImage } = useMutation({
		mutationFn: (image_data: FormData) => projectService.updateIcon(image_data),
		onSuccess: () => {
			toast.success('Image updated')
			inputFile.current!.value = ''
			refreshQueries({ projectSlug: project.slug })
		},
		onError: (error: any) => {
			inputFile.current!.value = ''
			toast.error('Error updating image', {
				description: errorCatch(error),
			})
		},
	})
	const { mutate: clearImage } = useMutation({
		mutationFn: (id: string) => projectService.clearIcon(id),
		onSuccess: () => {
			toast.success('Image cleared', { description: 'Image is cleared' })
			inputFile.current!.value = ''
			refreshQueries({ projectSlug: project.slug })
		},
		onError: (error: { message: string }) => {
			inputFile.current!.value = ''
			toast.error('Error updating image', {
				description: error.message,
			})
		},
	})

	const handleFileChange = (file: File) => {
		const formData = new FormData()
		if (file) {
			formData.append('file', file)
			formData.append('id', project.id.toString())
			updateImage(formData)
		}
	}
	return (
		<>
			<div className='flex gap-4'>
				<div>
					<SimpleProjectIcon isLoading={false} name={project.icon} width={90} />
				</div>
				<div className='flex flex-col gap-2 justify-center w-fit'>
					<Button
						disabled={disabled}
						className='w-full'
						size='medium'
						type_style='dark'
						Icon={Upload}
						onClick={() => {
							inputFile.current?.click()
						}}
					>
						Upload Image
					</Button>
					<Button
						disabled={disabled}
						className='w-full'
						size='medium'
						type_style='red'
						Icon={Trash2}
						onClick={() => {
							clearImage(project.id.toString())
						}}
					>
						Clear Image
					</Button>
					<input
						disabled={disabled}
						type='file'
						className='hidden'
						ref={inputFile}
						onChange={e => {
							const file = e.target.files?.[0]
							if (file) {
								handleFileChange(file)
							}
						}}
					/>
				</div>
			</div>
		</>
	)
}
export default UpdateProjectIcon
