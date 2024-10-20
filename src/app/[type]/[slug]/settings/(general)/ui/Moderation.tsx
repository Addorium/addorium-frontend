import { errorCatch } from '@/api/error'
import Button from '@/components/ui/form/buttons/Button'
import { SelectField } from '@/components/ui/form/select/SelectField'
import { Heading } from '@/components/ui/Heading'
import {
	PopupOptions,
	usePopup,
} from '@/components/ui/popup-provider/PopupContext'
import { useProfile } from '@/hooks/useProfile'
import { useRevalidateAllQueries } from '@/hooks/useRevalidate'
import { canEditInModeration, projectService } from '@/services/project.service'
import { IProject, IProjectsUpdateProps } from '@/types/project.types'
import { IUser } from '@/types/user.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ProjectStatus({ slug }: { slug: string }) {
	const revalidateAll = useRevalidateAllQueries()
	const { showPopup, hidePopup } = usePopup()
	const statusOptions = [
		{ value: 'DRAFT', label: 'Draft' },
		{ value: 'PUBLISHED', label: 'Published' },
	]
	const popupOptions: PopupOptions = {
		message: 'Are you sure you want to change the status of this project?',
		type: 'normal',
		confirmText: 'Yes',
		cancelText: 'Cancel',
		onConfirm: () => {
			handleSubmit(onSubmit)()
		},
		onCancel: () => {
			hidePopup()
		},
	}
	const { data: project, isLoading } = useQuery({
		queryKey: ['project', slug],
		queryFn: () => {
			return projectService.getBySlug(slug)
		},
	})
	const { data: user } = useProfile()

	const {
		mutate: updateProject,
		isSuccess,
		isPending,
	} = useMutation({
		mutationKey: ['updateProject'],
		mutationFn: (data: IProjectsUpdateProps) => projectService.update(data),
		onSuccess: () => {
			toast.success('Project updated')
			revalidateAll()
		},
		onError: error => {
			toast.error('Error updating project', {
				description: errorCatch(error),
			})
		},
	})
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IProjectsUpdateProps>({
		disabled: !canEditInModeration(user as IUser, project as IProject),
		defaultValues: {
			status: project?.status,
		},
	})
	const onSubmit: SubmitHandler<IProjectsUpdateProps> = data => {
		data.id = project?.id || 0
		updateProject(data)
		hidePopup()
	}
	return (
		<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
			<Heading
				title='Moderation'
				description="Change your project's status to draft, or published. Clicking on this will change your project's status."
			/>
			<div className='flex flex-col gap-4'>
				<div className='flex'>
					<Controller
						name='status'
						control={control}
						rules={{ required: 'Type is required' }}
						render={({ field }) => (
							<SelectField
								disabled={field.disabled}
								label='Status'
								id='status'
								important
								options={statusOptions}
								placeholder='Select new status'
								className='w-96'
								defaultValue={statusOptions.find(option => {
									return option.value === field.value?.toString()
								})}
								onChange={type => {
									field.onChange(type.value)
								}}
							/>
						)}
					/>
				</div>
				<Button
					disabled={
						isPending ||
						!canEditInModeration(user as IUser, project as IProject)
					}
					type_style='primary'
					size='medium'
					Icon={Trash2}
					onClick={() => {
						showPopup(popupOptions)
					}}
				>
					Change status
				</Button>
			</div>
		</div>
	)
}
