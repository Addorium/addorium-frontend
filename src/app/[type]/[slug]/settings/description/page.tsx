import DescriptionEdit from './Description'

export default function DescriptionPage({
	params,
}: {
	params: { type: string; slug: string }
}) {
	return <DescriptionEdit params={params} />
}
