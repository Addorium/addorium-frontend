import General from './General'

export default async function GeneralPage(
    props: {
        params: Promise<{ type: string; slug: string }>
    }
) {
    const params = await props.params;
    return <General params={params} />
}
