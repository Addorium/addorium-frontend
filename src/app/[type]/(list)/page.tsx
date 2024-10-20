import ProjectsList from './ProjectsList'

export default function ProjectsListPage({
	params,
}: {
	params: { type: string }
}) {
	return <ProjectsList params={params} />
}
