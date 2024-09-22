// context/PopupContext.tsx
import { createContext, FC, ReactNode, useContext, useState } from 'react'
import Popup from './Popup'

type PopupType = 'normal' | 'link' | 'warning' | 'error'

interface PopupContextType {
	showPopup: (options: PopupOptions) => void
	hidePopup: () => void
}

export interface PopupOptions {
	message: string
	type: PopupType
	confirmText?: string
	cancelText?: string
	onConfirm: () => void
	onCancel?: () => void
	link?: string // Добавляем поддержку ссылки для типа linkOutside
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const usePopup = (): PopupContextType => {
	const context = useContext(PopupContext)
	if (!context) {
		throw new Error('usePopup must be used within a PopupProvider')
	}
	return context
}

interface PopupProviderProps {
	children: ReactNode
}

export const PopupProvider: FC<PopupProviderProps> = ({ children }) => {
	const [popupOptions, setPopupOptions] = useState<PopupOptions | null>(null)

	const showPopup = (options: PopupOptions) => {
		setPopupOptions(options)
	}

	const hidePopup = () => {
		setPopupOptions(null)
	}

	return (
		<PopupContext.Provider value={{ showPopup, hidePopup }}>
			{children}
			{popupOptions && (
				<Popup
					message={popupOptions.message}
					type={popupOptions.type}
					confirmText={popupOptions.confirmText}
					cancelText={popupOptions.cancelText}
					onConfirm={popupOptions.onConfirm}
					onCancel={popupOptions.onCancel || hidePopup}
					link={popupOptions.link} // Передаем ссылку, если она есть
				/>
			)}
		</PopupContext.Provider>
	)
}
