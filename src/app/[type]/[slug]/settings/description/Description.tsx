'use client'

import { errorCatch } from '@/api/error'
import LoaderLayout from '@/components/loader-layout'
import MarkdownEditor from '@/components/ui/editor/MarkdownEditor'
import {
	Heading1Plugin,
	Heading2Plugin,
	Heading3Plugin,
} from '@/components/ui/editor/plugins/headings/HeadingPlugin'
import {
	BoldPlugin,
	ItalicPlugin,
	UnderlinePlugin,
} from '@/components/ui/editor/plugins/LinePlugin'
import Button from '@/components/ui/form/buttons/Button'
import { Heading } from '@/components/ui/Heading'
import BasicSkeleton from '@/components/ui/loader/skeleton/BasicSkeleton'
import { projectService } from '@/services/project.service'
import { IProjectsUpdateProps } from '@/types/project.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Save } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DescriptionEdit({
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
		onSuccess: () => {
			toast.success('Success!', { description: 'Project description updated' })
		},
		onError: error => {
			toast.error('Error!', { description: errorCatch(error) })
		},
	})
	const [description, setDescription] = useState(project?.description)

	const handleSave = () => {
		if (!project) return
		updateProject({
			id: project.id,
			description,
		})
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
				<Heading
					title='Description'
					description='You can type an extended description of your project here. The description must clearly and honestly describe the purpose and function of the project.'
				/>
				<LoaderLayout
					loading={isLoading}
					loaderComponent={<BasicSkeleton height='465px' />}
				>
					<MarkdownEditor
						onChange={value => {
							setDescription(value)
						}}
						value={description || project?.description}
						plugins={[
							new Heading1Plugin(),
							new Heading2Plugin(),
							new Heading3Plugin(),
							new BoldPlugin(),
							new ItalicPlugin(),
							new UnderlinePlugin(),
						]}
						maxLength={5000}
						placeholder='Type your description here...'
					/>
				</LoaderLayout>
				<div>
					<Button
						size='small'
						Icon={Save}
						onClick={() => {
							handleSave()
						}}
						disabled={isLoading}
					>
						Save changes
					</Button>
				</div>
			</div>
		</div>
	)
}
