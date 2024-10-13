import AvatarSkeleton from './AvatarSkeleton'
import BasicSkeleton from './BasicSkeleton'

// ListSkeleton.tsx
const ListSkeleton = () => (
	<div>
		{Array.from({ length: 5 }).map((_, index) => (
			<div key={index} className='flex items-center p-3'>
				<AvatarSkeleton />
				<div className='m-3'>
					<BasicSkeleton width='200px' height='20px' />
					<BasicSkeleton width='150px' height='15px' />
				</div>
			</div>
		))}
	</div>
)

export default ListSkeleton
