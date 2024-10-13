// InputSkeleton.tsx
const InputSkeleton = ({ width = '100%', height = '40px' }) => (
	<div
		style={{
			width,
			height,
			backgroundColor: '#e0e0e0',
			borderRadius: '4px',
			animation: 'pulse 1.5s infinite',
		}}
	/>
)

export default InputSkeleton
