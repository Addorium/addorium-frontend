import ImagesSettings from './ImagesSettings'

export default async function ImagesSettingsPage(
    props: {
        params: Promise<{ type: string; slug: string }>
    }
) {
    const params = await props.params;
    return <ImagesSettings params={params} />
}
