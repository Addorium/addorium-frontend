'use client'

import SimpleUserIcon from '@/components/ui/icons/user-icon/SimpleUserIcon'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'

export default function Overview() {
	const { data, isLoading } = useProfile()

	return (
		<div className='flex flex-col px-4 py-5 w-full bg-gray-3 rounded-2xl gap-4'>
			<div className='flex gap-4 items-center'>
				<SimpleUserIcon
					avatar={data?.avatar}
					isLoading={isLoading}
					width={93}
				/>
				<div className='flex flex-col gap-1'>
					<h1 className='text-2xl font-medium'>{data?.name}</h1>
					<Link
						href=''
						className='text-xs text-blue/75 transition-colors hover:text-blue hover:underline'
					>
						Visit your profile
					</Link>
				</div>
			</div>
		</div>
	)
}
