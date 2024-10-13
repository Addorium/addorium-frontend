import BasicSkeleton from './BasicSkeleton'

// TableSkeleton.tsx
const TableSkeleton = () => (
	<div>
		<div className='flex p-2'>
			<BasicSkeleton width='20%' height='30px' />
			<BasicSkeleton width='40%' height='30px' />
			<BasicSkeleton width='20%' height='30px' />
		</div>
		{Array.from({ length: 5 }).map((_, index) => (
			<div key={index} className='flex p-2'>
				<BasicSkeleton width='20%' height='20px' />
				<BasicSkeleton width='40%' height='20px' />
				<BasicSkeleton width='20%' height='20px' />
			</div>
		))}
	</div>
)

export default TableSkeleton
