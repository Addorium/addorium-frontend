// context/PopupContext.tsx
import { GalleryImage } from '@/types/galery.types'
import { createContext, FC, ReactNode, useContext, useState } from 'react'
import ImagePopup from './ImagePopup'

interface ImagePopupContextType {
	showPopup: (options: ImagePopupOptions) => void
	hidePopup: () => void
}

export interface ImagePopupOptions {
	galeryImage: GalleryImage
}

const ImagePopupContext = createContext<ImagePopupContextType | undefined>(
	undefined
)

export const useImagePopup = (): ImagePopupContextType => {
	const context = useContext(ImagePopupContext)
	if (!context) {
		throw new Error('usePopup must be used within a PopupProvider')
	}
	return context
}

interface ImagePopupProviderProps {
	children: ReactNode
}

export const ImagePopupProvider: FC<ImagePopupProviderProps> = ({
	children,
}) => {
	const [popupOptions, setPopupOptions] = useState<ImagePopupOptions | null>(
		null
	)

	const showPopup = (options: ImagePopupOptions) => {
		setPopupOptions(options)
	}

	const hidePopup = () => {
		setPopupOptions(null)
	}

	return (
		<ImagePopupContext.Provider value={{ showPopup, hidePopup }}>
			{children}
			{popupOptions && <ImagePopup galeryImage={popupOptions.galeryImage} />}
		</ImagePopupContext.Provider>
	)
}
