'use client'

import Button from '@/components/ui/form/buttons/Button'
import { Eraser } from 'lucide-react'
import { ReactNode } from 'react'

export default function LayoutProjectsList({
	children,
	type,
}: {
	children: ReactNode
	type: string
}) {
	return (
		<div className='flex md-max:flex-col gap-4 mt-3'>
			<div className='bg-background-2 min-w-[322px] h-fit rounded-2xl px-4 py-2.5 flex flex-col gap-4'>
				<div className='flex justify-between items-center'>
					<h1 className='text-xl font-semibold'>Filters</h1>
					<Button type_style='transperent_red' size='icon' Icon={Eraser} />
				</div>
			</div>
			<main className='w-full'>{children}</main>
		</div>
	)
}
