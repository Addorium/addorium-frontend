'use client'

import LoaderLayout from '@/components/loader-layout'
import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import { CustomOption } from '@/components/ui/form/select/select-field.types'
import { SelectField } from '@/components/ui/form/select/SelectField'
import UpdateUserIcon from '@/components/ui/icons/user-icon/UpdateUserIcon'
import {
	PopupOptions,
	usePopup,
} from '@/components/ui/popup-provider/PopupContext'
import { ADMIN_PAGES } from '@/config/pages-url.config'
import { useUserRevalidate } from '@/hooks/useRevalidate'
import { roleService } from '@/services/role.service'
import { userService } from '@/services/user.service'
import { IUsersUpdateProps } from '@/types/user.types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function UserEdit({ userId }: { userId: string }) {
	const router = useRouter()
	const { refreshQueries } = useUserRevalidate()
	const { showPopup, hidePopup } = usePopup()

	const { data, error, isLoading } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => userService.getById(userId),
	})

	const { data: roles } = useQuery({
		queryKey: ['roles'],
		queryFn: () => roleService.getAll({}),
	})

	const { mutate: updateUser } = useMutation({
		mutationFn: (data: IUsersUpdateProps) => userService.update(data),
		onSuccess: () => {
			toast.success('User updated')
			router.push(ADMIN_PAGES.USERS)
			refreshQueries(userId)
		},
		onError: (error: {
			message: string
			response: { data: { message: string } }
		}) => {
			toast.error('Error updating user', {
				description: error?.response?.data?.message || error.message,
			})
		},
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IUsersUpdateProps>({
		defaultValues: {
			name: data?.name,
			roleId: data?.roleId,
			email: data?.email,
		},
	})

	const popupOptions: PopupOptions = {
		message: 'Are you sure you want to save changes?',
		type: 'normal',
		confirmText: 'Save',
		cancelText: 'Cancel',
		onConfirm: () => {
			handleSubmit(onSubmit)()
		},
		onCancel: () => {
			hidePopup()
		},
	}

	const onSubmit: SubmitHandler<IUsersUpdateProps> = data => {
		data.id = +userId
		updateUser(data)
		hidePopup()
	}

	const roleOptions: CustomOption[] =
		roles?.data.map(role => ({
			value: role.id.toString(),
			label: role.name,
		})) ?? []

	return (
		<>
			<div className='flex flex-col px-4 py-5 w-full bg-background-2 rounded-2xl gap-4'>
				<div className='w-full'>
					<h1 className='text-gray-1 text-2xl font-bold'>User updating</h1>
				</div>
				<LoaderLayout loading={isLoading}>
					<div className='flex flex-col gap-5 w-full'>
						<p className='text-gray-6'>
							As an admin, any updates you make to user profiles will be
							immediately reflected and visible to the public.
						</p>
						<div className='flex flex-col gap-3 '>
							<h1 className='text-xl text-gray-1 font-semibold'>
								Profile picture
							</h1>
							<UpdateUserIcon user={data} />
						</div>
						<div className='flex flex-col gap-6'>
							<div className='flex flex-col gap-4'>
								<div className='flex gap-4'>
									<Controller
										name='name'
										control={control}
										defaultValue={data?.name}
										rules={{ required: 'Name is required' }}
										render={({ field }) => (
											<InputField
												size='medium'
												label='User name'
												id='user-name'
												placeholder='Enter user name'
												className='w-72'
												onChange={field.onChange}
												defaultValue={field.value}
												state={errors.name ? 'error' : 'default'}
												stateText={errors.name?.message}
											/>
										)}
									/>

									<Controller
										name='roleId'
										control={control}
										defaultValue={data?.roleId}
										rules={{ required: 'Role is required' }}
										render={({ field }) => (
											<SelectField
												label='Role'
												id='role'
												size='medium'
												options={roleOptions}
												placeholder='Select role'
												defaultValue={roleOptions.find(option => {
													return option.value === field.value?.toString()
												})}
												onChange={role => {
													field.onChange(role.value)
												}}
											/>
										)}
									/>
								</div>
								<div className='flex gap-4'>
									<InputField
										size='medium'
										label='Discord ID'
										id='discord-id'
										placeholder='Enter discord ID'
										defaultValue={data?.discordId}
										className='w-72'
										state='disabled'
									/>
									<Controller
										name='email'
										control={control}
										defaultValue={data?.email}
										render={({ field }) => (
											<InputField
												size='medium'
												label='Email'
												id='email'
												placeholder='Enter email'
												defaultValue={field.value}
												className='w-72'
												onChange={value => field.onChange(value)}
												state={errors.email ? 'error' : 'default'}
												stateText={errors.email?.message}
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex gap-4'>
								<Button
									type='button'
									size='medium'
									className='w-24'
									type_style='primary'
									onClick={() => {
										showPopup(popupOptions)
									}}
								>
									Save
								</Button>
								<Button
									size='medium'
									className='w-24'
									type_style='transperent'
									onClick={() => {
										router.push(ADMIN_PAGES.USERS)
									}}
								>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</LoaderLayout>
			</div>
		</>
	)
}
