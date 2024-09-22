import cn from 'clsx'

interface IBentoGrid extends React.HTMLAttributes<HTMLDivElement> {
	columns?: number
	autoRows?: string
}

export function BentoGrid({
	columns,
	autoRows,
	children,
	className,
}: IBentoGrid) {
	const gridStyles = {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, 1fr)`,
		gridAutoRows: autoRows,
		gap: '1rem', // Adjust as needed
	}
	return (
		<>
			<div style={gridStyles} className={cn(className)}>
				{children}
			</div>
		</>
	)
}
