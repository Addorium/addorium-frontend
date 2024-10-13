import BasicSkeleton from './BasicSkeleton'

// CardSkeleton.tsx
const CardSkeleton = () => (
	<div
		style={{
			width: '300px',
			padding: '16px',
			borderRadius: '8px',
			background: '#fff',
			boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
		}}
	>
		<div
			style={{
				width: '100%',
				height: '150px',
				background: '#e0e0e0',
				borderRadius: '4px',
				marginBottom: '10px',
			}}
		/>
		<BasicSkeleton width='80%' height='20px' />
		<BasicSkeleton width='60%' height='20px' />
	</div>
)

export default CardSkeleton
