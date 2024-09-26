import { ReactNode } from 'react'

export default function ProjectLayout({
	children,
	params,
}: {
	children: ReactNode
	params: { type: string; slug: string }
}) {
	return <>{children}</>
}
