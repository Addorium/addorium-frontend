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
import clsx from 'clsx'
import { LogIn, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useIsClient, useOnClickOutside } from 'usehooks-ts'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { CreateProjectModal } from '../ui/create-project-modal/CreateProjectModal'
import { NAVBAR_ITEMS } from './NavBar.data'
import styles from './NavBar.module.scss'
import { NavBarItem } from './NavBarItem'

interface Props {}

export function NavBar({}: Props) {
	const { data, isLoading } = useProfile()
	const { isAuth } = useAuth()
	const [isShow, setIsShow] = useState<boolean>()
	const isClient = useIsClient()
	const dropdown = useRef(null)
	const { showModal } = useModal()
	useOnClickOutside(dropdown, () => setIsShow(false))

	const modalOptions: ModalOptions = {
		title: 'Create project',
		body: <CreateProjectModal />,
	}
	const cloaseMenu = () => {
		setIsShow(false)
	}

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
			<div className='flex gap-2 min-w-[190px]'>
				<LoaderLayout loading={!isClient}>
					<PermissionGuard permanent={!isAuth}>
						<LinkButton href='/auth' size='large' Icon={LogIn} className='w-36'>
							Sign In
						</LinkButton>
					</PermissionGuard>
					<PermissionGuard permanent={isAuth}>
						<div className='flex items-center justify-end gap-1'>
							<Button
								size='small'
								type_style='gray'
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
								onClick={() => {
									setIsShow(prev => !prev)
								}}
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
