import DescriptionEdit from './Description'

export default async function DescriptionPage(
    props: {
        params: Promise<{ type: string; slug: string }>
    }
) {
    const params = await props.params;
    return <DescriptionEdit params={params} />
}
