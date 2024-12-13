import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
	label: string
	href: string
}

export function NavBarItem({ label, href }: Props) {
	const path = usePathname()
	const isActive = path === href
	const className = isActive ? '!text-core-1 underline' : ''
	return (
		<Link href={href} className={className}>
			{label}
		</Link>
	)
}
