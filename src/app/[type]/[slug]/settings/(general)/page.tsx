import General from './General'

export default function GeneralPage({
	params,
}: {
	params: { type: string; slug: string }
}) {
	return <General params={params} />
}
