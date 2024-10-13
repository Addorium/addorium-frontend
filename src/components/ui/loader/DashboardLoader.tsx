'use client'
import BasicSkeleton from './skeleton/BasicSkeleton'

export default function DashboardLoader() {
	return (
		<div className='flex gap-4 mt-3'>
			<div className='min-w-[322px] h-fit rounded-2xl flex flex-col gap-4'>
				<BasicSkeleton width='100%' height='300px' className='rounded-2xl' />
			</div>
			<main className='w-full'>
				<BasicSkeleton width='100%' height='500px' className='rounded-2xl' />
			</main>
		</div>
	)
}
