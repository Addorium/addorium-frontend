import LayoutProjectsList from '@/components/main-layout/projects-layout/LayoutProjectsList'
import { ReactNode } from 'react'

export default function ProjectsListLayout({
	children,
	params,
}: {
	children: ReactNode
	params: { type: string }
}) {
	return <LayoutProjectsList type={params.type}>{children}</LayoutProjectsList>
}
