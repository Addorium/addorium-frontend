// components/Popup.tsx
import { FC, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Button from '../form/buttons/Button'
import { usePopup } from './PopupContext'

type PopupType = 'normal' | 'link' | 'warning' | 'error'

interface PopupProps {
	message: string
	type: PopupType
	confirmText?: string
	cancelText?: string
	onConfirm: () => void
	onCancel?: () => void
	link?: string // Добавляем ссылку для типа linkOutside
}

const Popup: FC<PopupProps> = ({
	message,
	type,
	confirmText = 'Подтвердить',
	cancelText = 'Отмена',
	onConfirm,
	onCancel,
	link,
}) => {
	const { hidePopup } = usePopup()
	const popupRef = useRef<HTMLDivElement>(null)
	useOnClickOutside(popupRef, () => {
		hidePopup()
	})
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-background-6 bg-opacity-50'>
			<div
				className={`bg-background-2 px-4 py-5 rounded-2xl shadow-lg w-80 relative drop-shadow-sm outline outline-1 outline-gray-2`}
				ref={popupRef}
			>
				<p className='mb-4 text-center'>{message}</p>
				{type === 'link' && link && (
					<div className='mb-4 text-center'>
						<a
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue underline'
						>
							{link}
						</a>
					</div>
				)}
				<div className='flex justify-between space-x-2'>
					{onCancel && (
						<Button onClick={onCancel} type_style='red' className='min-w-28'>
							{cancelText}
						</Button>
					)}
					<Button
						onClick={onConfirm}
						type_style={type === 'link' ? 'green' : 'primary'}
						className='min-w-28'
					>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Popup
