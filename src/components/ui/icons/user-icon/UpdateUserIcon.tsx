'use client'
import { errorCatch } from '@/api/error'
import { useUserRevalidate } from '@/hooks/useRevalidate'
import { userService } from '@/services/user.service'
import { IUser } from '@/types/user.types'
import { useMutation } from '@tanstack/react-query'
import { Trash2, Upload } from 'lucide-react'
import React, { useRef } from 'react'
import { toast } from 'sonner'
import Button from '../../form/buttons/Button'
import SimpleUserIcon from './SimpleUserIcon'

interface IUpdateUserIcon {
	user: IUser | undefined
}
const UpdateUserIcon: React.FC<IUpdateUserIcon> = ({ user }) => {
	if (!user) {
		return null
	}

	const inputFile = useRef<HTMLInputElement | null>(null)
	const { refreshQueries } = useUserRevalidate()

	const { mutate: updateAvatar } = useMutation({
		mutationFn: (image_data: FormData) => userService.updateAvatar(image_data),
		onSuccess: () => {
			toast.success('Avatar updated')
			inputFile.current!.value = ''
			refreshQueries(user.id.toString(), true)
		},
		onError: (error: any) => {
			inputFile.current!.value = ''
			toast.error('Error updating avatar', {
				description: errorCatch(error),
			})
		},
	})
	const { mutate: clearAvatar } = useMutation({
		mutationFn: (id: string) => userService.clearAvatar(id),
		onSuccess: () => {
			toast.success('Avatar cleared', { description: 'Avatat is cleared' })
			inputFile.current!.value = ''
			refreshQueries(user.id.toString(), true)
		},
		onError: (error: { message: string }) => {
			inputFile.current!.value = ''
			toast.error('Error updating avatar', {
				description: error.message,
			})
		},
	})

	const handleFileChange = (file: File) => {
		const formData = new FormData()
		if (file) {
			formData.append('file', file)
			formData.append('id', user.id.toString())
			updateAvatar(formData)
		}
	}
	return (
		<>
			<div className='flex gap-4'>
				<div>
					<SimpleUserIcon isLoading={false} avatar={user.avatar} width={100} />
				</div>
				<div className='flex flex-col gap-2'>
					<Button
						size='small'
						type_style='dark'
						Icon={Upload}
						onClick={() => {
							inputFile.current?.click()
						}}
					>
						Upload Image
					</Button>
					<Button
						size='small'
						type_style='red'
						Icon={Trash2}
						onClick={() => {
							clearAvatar(user.id.toString())
						}}
					>
						Clear Image
					</Button>
					<input
						type='file'
						className='hidden'
						ref={inputFile}
						onChange={e => {
							const file = e.target.files?.[0]
							if (file) {
								handleFileChange(file)
							}
						}}
					/>
				</div>
			</div>
		</>
	)
}
export default UpdateUserIcon
