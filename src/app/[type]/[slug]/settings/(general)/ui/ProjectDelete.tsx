import Button from '@/components/ui/form/buttons/Button'
import { Heading } from '@/components/ui/Heading'
import { useProfile } from '@/hooks/useProfile'
import { canEditInModeration, projectService } from '@/services/project.service'
import { IProject } from '@/types/project.types'
import { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'

export default function ProjectDelete({ slug }: { slug: string }) {
	const { data: project, isLoading } = useQuery({
		queryKey: ['project', slug],
		queryFn: () => {
			return projectService.getBySlug(slug)
		},
	})
	const { data: user } = useProfile()
	return (
		<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
			<Heading
				title='Delete project'
				description="Removes your project from Addorium's servers and search. Clicking on this will delete your project, so be extra careful!"
			/>
			<div>
				<Button
					type_style='red'
					size='medium'
					Icon={Trash2}
					disabled={!canEditInModeration(user as IUser, project as IProject)}
				>
					Delete project
				</Button>
			</div>
		</div>
	)
}
