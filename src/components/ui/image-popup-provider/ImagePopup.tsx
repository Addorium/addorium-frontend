// components/Popup.tsx
import { FC, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { ImagePopupOptions, useImagePopup } from './ImagePopupContext'

const ImagePopup: FC<ImagePopupOptions> = ({
	galeryImage,
	confirmText = 'Подтвердить',
	cancelText = 'Отмена',
	onConfirm,
	onCancel,
}) => {
	const { hidePopup } = useImagePopup()
	const popupRef = useRef<HTMLDivElement>(null)
	useOnClickOutside(popupRef, () => {
		hidePopup()
	})
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-background-6 bg-opacity-50'></div>
	)
}

export default ImagePopup
