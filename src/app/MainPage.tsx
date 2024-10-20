'use client'

import LinkButton from '@/components/ui/form/buttons/LinkButton'
import { Link } from 'lucide-react'

export default function MainPage() {
	return (
		<div className='mt-16 flex flex-col items-center justify-center'>
			<div>
				<img src='/axiom_logo.svg' alt='axiom' width='262px' height='262px' />
			</div>
			<div className='flex flex-col'>
				<h1 className='text-[86px]'>The place for Axiom</h1>
				<h1 className='text-core-1 text-[86px] text-center'>blueprints</h1>
				<p className='text-gray-6 text-center text-[26px]'>
					Discover and share Axiom content through our platform.
				</p>
			</div>
			<div className='flex gap-20 mt-9'>
				<LinkButton
					href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
					size='large'
					Icon={Link}
				>
					Axiom website
				</LinkButton>
				<LinkButton
					href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
					type_style='line_secondary'
					size='large'
					Icon={Link}
				>
					Axiom discord
				</LinkButton>
			</div>
		</div>
	)
}
