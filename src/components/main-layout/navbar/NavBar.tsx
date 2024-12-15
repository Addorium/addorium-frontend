'use client'
import LoaderLayout from '@/components/loader-layout'
import PermissionGuard from '@/components/permission-guard'
import Button from '@/components/ui/form/buttons/Button'
import LinkButton from '@/components/ui/form/buttons/LinkButton'
import UserIcon from '@/components/ui/icons/user-icon/UserIcon'
import {
	ModalOptions,
	useModal,
} from '@/components/ui/modal-provider/ModalContext'
import UserMenu from '@/components/ui/user-menu/user-menu'
import * as Sentry from '@sentry/nextjs'
import clsx from 'clsx'
import { LogIn, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { useProfile } from '@/hooks/useProfile'
import { CreateProjectModal } from '../ui/create-project-modal/CreateProjectModal'
import { NAVBAR_ITEMS } from './NavBar.data'
import styles from './NavBar.module.scss'
import { NavBarItem } from './NavBarItem'

export function NavBar() {
	const { data, isLoading, isLoggedIn } = useProfile()
	const isClient = useIsClient()
	const dropdown = useRef<HTMLDivElement | null>(null)
	const { showModal } = useModal()
	const [isShow, setIsShow] = useState<boolean>(false)

	// useOnClickOutside([dropdown], () => setIsShow(false))
	const modalOptions: ModalOptions = {
		title: 'Create project',
		body: <CreateProjectModal />,
	}
	const cloaseMenu = () => {
		setIsShow(false)
	}
	useEffect(() => {
		if (!isLoading && data) {
			Sentry.setUser({
				id: data.id,
				email: data.email,
				username: data.name,
				role: data.role,
			})
		}
	}, [data, isLoading])

	return (
		<nav className={styles.navbar}>
			<Link className={styles.logo} href='/'>
				<img src='/axiom_logo.svg' alt='axiomlogo' />
				<h1>Addorium</h1>
			</Link>
			<div className={clsx(styles.links)}>
				{NAVBAR_ITEMS.map((item, index) => (
					<NavBarItem key={index} label={item.label} href={item.href} />
				))}
			</div>
			<div className='flex justify-end gap-2 min-w-[190px]'>
				<LoaderLayout loading={!isClient}>
					<PermissionGuard permanent={!isLoggedIn}>
						<div className='flex items-center justify-end'>
							<LinkButton href='/auth' size='normal' Icon={LogIn}>
								Sign In
							</LinkButton>
						</div>
					</PermissionGuard>
					<PermissionGuard permanent={isLoggedIn}>
						<div className='flex items-center justify-end gap-1'>
							<Button
								size='medium'
								type_style='secondary'
								className='h-[32px]'
								Icon={Plus}
								onClick={() => {
									showModal(modalOptions)
								}}
							>
								create
							</Button>
							<UserIcon
								isLoading={isLoading}
								avatar={data?.avatar}
								onClick={() => setIsShow(prev => !prev)}
							/>
							<UserMenu
								ref={dropdown}
								isOpen={isShow || false}
								setOpen={() => setIsShow(prev => !prev)}
								close={cloaseMenu}
							/>
						</div>
					</PermissionGuard>
				</LoaderLayout>
			</div>
		</nav>
	)
}
