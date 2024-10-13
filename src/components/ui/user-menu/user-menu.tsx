'use client'
import PermissionGuard from '@/components/permission-guard'
import { ADMIN_PAGES } from '@/config/pages-url.config'
import { useProfile } from '@/hooks/useProfile'
import { useUserRevalidate } from '@/hooks/useRevalidate'
import { authService } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { LogOut, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { forwardRef } from 'react'
import { UserMenuItem } from './UserMenuItem'
import { USER_MENU } from './menu.data'
import styles from './user-menu.module.scss'

interface IUserMenu extends React.HTMLAttributes<HTMLDivElement> {
	isOpen: boolean
	setOpen: () => void
	close: () => void
}
export type Ref = HTMLDivElement
const UserMenu = forwardRef<Ref, IUserMenu>((props, ref) => {
	const { refreshQueries } = useUserRevalidate()
	const router = useRouter()
	const { data } = useProfile()
	const { isOpen, setOpen, close } = props
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			refreshQueries([], true, false)
			router.push('/')
			close()
		},
	})
	return (
		<>
			{isOpen && (
				<>
					<div ref={ref} className={styles.userMenu}>
						{USER_MENU.map(item => (
							<UserMenuItem handleClose={setOpen} item={item} key={item.link} />
						))}
						<div className='my-2 h-0.5 bg-gray-2 w-full' />
						<PermissionGuard
							requiredPermission='admin:dashboard.button'
							userPermissions={data?.role?.permissions}
						>
							<UserMenuItem
								handleClose={setOpen}
								item={{
									icon: ShieldCheck,
									name: 'Admin',
									type: 'green',
									link: ADMIN_PAGES.HOME,
								}}
							/>
						</PermissionGuard>
						<UserMenuItem
							handleClose={setOpen}
							item={{
								icon: LogOut,
								name: 'Logout',
								type: 'red',
								onClick: () => mutate(),
							}}
						/>
					</div>{' '}
				</>
			)}
		</>
	)
})
export default UserMenu
