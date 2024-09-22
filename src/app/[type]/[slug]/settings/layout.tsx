import LProjectSettings from '@/components/projects-layout/settings-layout/ProjectSettingsLayout'
import { ReactNode } from 'react'

export default function ProjectSettingsLayout({
	children,
	params,
}: {
	children: ReactNode
	params: { type: string; slug: string }
}) {
	return (
		<>
			<LProjectSettings slug={params.slug} type={params.type}>{children}</LProjectSettings>
		</>
	)
}
