import ProjectsList from './ProjectsList'

export default async function ProjectsListPage(
    props: {
        params: Promise<{ type: string }>
    }
) {
    const params = await props.params;
    return <ProjectsList params={params} />
}
