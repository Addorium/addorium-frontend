import type { PropsWithChildren } from 'react'
import Paginator from './Paginator'

interface PaginatorWraperProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	top?: boolean
	bottom?: boolean
}

export default function PaginatorWraper({
	children,
	currentPage,
	totalPages,
	onPageChange,
	top = false,
	bottom = true,
}: PropsWithChildren<PaginatorWraperProps>) {
	if (totalPages === 0 || totalPages === 1) {
		return <>{children}</>
	}

	return (
		<>
			<div className='flex flex-col gap-4'>
				{top && (
					<Paginator
						currentPage={+currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				)}
				{children}
				{bottom && (
					<Paginator
						currentPage={+currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				)}
			</div>
		</>
	)
}
