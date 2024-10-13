// ButtonSkeleton.tsx
const ButtonSkeleton = ({ width = '100px', height = '40px' }) => (
	<div
		style={{
			width,
			height,
		}}
		className='animate-pulse bg-gray-2 rounded-lg'
	/>
)

export default ButtonSkeleton
