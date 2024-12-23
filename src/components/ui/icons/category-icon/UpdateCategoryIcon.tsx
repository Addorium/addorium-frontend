'use client'
import { errorCatch } from '@/api/error'
import { useRevalidateAllQueries } from '@/hooks/useRevalidate'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/project.types'
import { useMutation } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import React, { useRef } from 'react'
import { toast } from 'sonner'
import Button from '../../form/buttons/Button'
import SimpleCategoryIcon from './SimpleCategoryIcon'

interface IUpdateCategoryIcon {
	project: IProject | undefined
}
const UpdateCategoryIcon: React.FC<IUpdateCategoryIcon> = ({ project }) => {
	const inputFile = useRef<HTMLInputElement>(null)
	const revalidate = useRevalidateAllQueries()

	const { mutate: updateImage, isPending } = useMutation({
		mutationFn: (image_data: FormData) => projectService.updateIcon(image_data),
		onSuccess: () => {
			toast.success('Image updated')
			inputFile.current!.value = ''
			revalidate()
		},
		onError: (error: any) => {
			inputFile.current!.value = ''
			toast.error('Error updating image', {
				description: errorCatch(error),
			})
		},
	})
	if (!project) {
		return null
	}

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
					<SimpleCategoryIcon name={project.icon} width={50} />
				</div>
				<div className='flex flex-col gap-2 justify-center'>
					<Button
						disabled={isPending}
						size='small'
						type_style='dark'
						Icon={Upload}
						onClick={() => {
							inputFile.current?.click()
						}}
					>
						Upload Image
					</Button>
					<input
						disabled={isPending}
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
export default UpdateCategoryIcon
