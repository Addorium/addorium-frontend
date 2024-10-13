import ImagesSettings from './ImagesSettings'

export default function ImagesSettingsPage({
	params,
}: {
	params: { type: string; slug: string }
}) {
	return <ImagesSettings params={params} />
}
