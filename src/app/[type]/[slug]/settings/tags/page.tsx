import Tags from './Tags'

export default async function TagsPage(
    props: {
        params: Promise<{ type: string; slug: string }>
    }
) {
    const params = await props.params;
    return <Tags params={params} />
}
