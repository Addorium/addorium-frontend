'use client'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import styles from './UserIcon.module.scss'

interface IUserIcon {
	isLoading: boolean
	avatar?: string
	onClick?: () => void
}
const UserIcon: React.FC<IUserIcon> = ({ isLoading, ...res }) => {
	const avatar = res.avatar ?? 'default.webp'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const avatarUrl = `${bucket}images/users/avatar/${avatar}`
	return (
		<>
			<div className='flex items-center gap-1'>
				<div
					className={clsx('w-[45px] h-[45px]', styles.userIcon)}
					onClick={res.onClick}
				>
					<Image
						className='transition-transform rounded-2xl duration-500 ease-in-out object-cover'
						fill
						src={avatarUrl}
						alt={'avatar'}
						unoptimized={true}
						objectFit='cover'
						objectPosition='center'
					></Image>
				</div>
				<ChevronDown className='cursor-pointer' onClick={res.onClick} />
			</div>
		</>
	)
}
export default UserIcon
