import LProjectSettings from '@/components/projects-layout/settings-layout/ProjectSettingsLayout'
import { ReactNode } from 'react'

export default async function ProjectSettingsLayout(props: {
	children: ReactNode
	params: Promise<{ type: string; slug: string }>
}) {
	const params = await props.params

	const { children } = props

	return (
		<>
			<LProjectSettings slug={params.slug} type={params.type}>
				{children}
			</LProjectSettings>
		</>
	)
}
