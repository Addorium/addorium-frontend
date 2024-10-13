import Tags from './Tags'

export default function TagsPage({
	params,
}: {
	params: { type: string; slug: string }
}) {
	return <Tags params={params} />
}
