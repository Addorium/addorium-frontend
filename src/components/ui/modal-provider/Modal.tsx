// components/Modal.tsx
import { FC, ReactNode, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Button from '../form/buttons/Button'
import { useModal } from './ModalContext'

interface ModalProps {
	title: string
	body: ReactNode
	backButton?: string
	saveButton?: string
	closeButton?: boolean
	onSave?: () => void
	onBack?: () => void
	onClose?: () => void
}

const Modal: FC<ModalProps> = ({
	title,
	body,
	backButton = false,
	saveButton = false,
	closeButton = true,
	onSave,
	onBack,
	onClose,
}) => {
	const { hideModal } = useModal()
	const modalRef = useRef<HTMLDivElement>(null)
	const clickOutside = useOnClickOutside(modalRef, () => {
		hideModal()
	})

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-background-6 bg-opacity-50'>
			<div
				className='bg-background-4 rounded-2xl shadow-lg relative w-[592px] '
				ref={modalRef}
			>
				<div className='flex justify-between items-center mb-4 bg-gray-3 rounded-t-2xl p-4'>
					<h1 className='text-2xl font-semibold'>{title}</h1>
					{closeButton && (
						<button
							onClick={onClose}
							className='text-gray-6 hover:text-red transition-colors text-2xl'
						>
							&times;
						</button>
					)}
				</div>
				<div className='mb-4 px-4'>{body}</div>
				{backButton ||
					(saveButton && (
						<div className='flex justify-end p-4 gap-4'>
							{backButton && (
								<Button
									onClick={onBack}
									type_style='transperent'
									className='min-w-28'
								>
									{backButton}
								</Button>
							)}
							{saveButton && (
								<Button type_style='core' onClick={onSave} className='min-w-28'>
									{saveButton}
								</Button>
							)}
						</div>
					))}
			</div>
		</div>
	)
}

export default Modal
