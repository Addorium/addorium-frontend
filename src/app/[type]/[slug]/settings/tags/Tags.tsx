'use client'

import { errorCatch } from '@/api/error'
import LoaderLayout from '@/components/loader-layout'
import CheckboxList, {
	CheckboxOption,
} from '@/components/ui/form/checkbox-list/CheckboxList'
import { Heading } from '@/components/ui/Heading'
import SimpleCategoryIcon from '@/components/ui/icons/category-icon/SimpleCategoryIcon'
import SimpleTagIcon from '@/components/ui/icons/tag-icon/SimpleTagIcon'
import { categoriesService } from '@/services/categories.service'
import { projectService } from '@/services/project.service'
import { tagsService } from '@/services/tags.service'
import {
	getProjectTypeFromStr,
	IProjectsUpdateProps,
	ProjectType,
} from '@/types/project.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function Tags({
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
	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: () =>
			categoriesService.getAll({
				projectType: getProjectTypeFromStr(params.type as ProjectType),
			}),
	})
	const { data: tags } = useQuery({
		queryKey: ['tags'],
		queryFn: () =>
			tagsService.getAll({
				projectType: getProjectTypeFromStr(params.type as ProjectType),
			}),
	})
	const { mutate: updateProject } = useMutation({
		mutationFn: (data: IProjectsUpdateProps) => {
			return projectService.update(data)
		},
		onError: error => {
			toast.error('Error!', { description: errorCatch(error) })
		},
	})

	const handleUpdateCategory = (categorie: CheckboxOption[]) => {
		if (!project) return
		if (!categorie[0]) return
		updateProject({
			id: project.id,
			categoryId: parseInt(categorie[0].value),
		})
	}
	const handleUpdateTags = (tags: CheckboxOption[]) => {
		if (!project) return
		if (tags.length === 0) return

		updateProject({
			id: project.id,
			tags: tags.map(tag => parseInt(tag.value)),
		})
	}

	const categoriesData: CheckboxOption[] =
		categories?.data.map(category => ({
			label: category?.name,
			value: category?.id.toString(),
			icon: <SimpleCategoryIcon name={category.icon} width={24} />,
		})) || []
	const defaultCategories: CheckboxOption[] = [
		{
			label: project?.category?.name || '',
			value: project?.category?.id?.toString() || '',
		},
	]
	const tagsData: CheckboxOption[] =
		tags?.data.map(tag => ({
			label: tag.name,
			value: tag.id.toString(),
			icon: <SimpleTagIcon name={tag.icon} width={24} />,
		})) || []

	const defaultTags: CheckboxOption[] =
		project?.tags.map(tag => ({
			label: tag.name,
			value: tag.id.toString(),
			icon: <SimpleTagIcon name={tag.icon} width={24} />,
		})) || []

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
				<Heading title='Tags' />
				<LoaderLayout loading={isLoading}>
					<div className='flex flex-col gap-4'>
						<CheckboxList
							label='Categorie'
							description='Select categorie that reflect the themes of your project'
							checkboxes={categoriesData}
							defaultValues={defaultCategories}
							onChange={data => {
								handleUpdateCategory(data)
							}}
						/>
						<CheckboxList
							label='Tags'
							description='Select all tags that reflect the themes or function of your project.'
							checkboxes={tagsData}
							defaultValues={defaultTags}
							isMulti
							maxValue={3}
							onChange={data => {
								handleUpdateTags(data)
							}}
						/>
					</div>
				</LoaderLayout>
			</div>
		</div>
	)
}
