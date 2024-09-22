import Link from 'next/link'

interface Props {
	label: string
	href: string
}

export function NavBarItem({ label, href }: Props) {
	return <Link href={href}> {label} </Link>
}
