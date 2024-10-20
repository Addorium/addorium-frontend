'use client'

import MainProjectSettings from './ui/MainProjectSettings'
import ProjectStatus from './ui/Moderation'
import ProjectDelete from './ui/ProjectDelete'

export default function General({
	params,
}: {
	params: { type: string; slug: string }
}) {
	return (
		<div className='flex flex-col gap-4'>
			<MainProjectSettings slug={params.slug} />
			<ProjectStatus slug={params.slug} />
			<ProjectDelete slug={params.slug} />
		</div>
	)
}
