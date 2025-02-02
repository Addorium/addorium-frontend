import { projectService } from '@/services/project.service'
import ProjectEntry from './ProjectEntry'

export default async function GeneralPage({
	params,
}: {
	params: Promise<{ type: string; slug: string }>
}) {
	const { type, slug } = await params
	const project = await projectService.getBySlug(slug)
	return <ProjectEntry initialProject={project} />
}
