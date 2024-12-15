import { ReactNode } from 'react'

export default function ProjectLayout({
	children,
	params,
}: {
	children: ReactNode
	params: Promise<{ type: string; slug: string }>
}) {
	return <>{children}</>
}
