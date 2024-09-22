import { createContext, FC, ReactNode, useContext, useState } from 'react'
import Modal from './Modal'

interface ModalContextType {
	isVisible: boolean
	showModal: (content: ModalOptions) => void
	hideModal: () => void
}

export interface ModalOptions {
	title: string
	body: ReactNode
	backButton?: string
	saveButton?: string
	closeButton?: boolean
	onSave?: () => void
	onBack?: () => void
	onClose?: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = (): ModalContextType => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}

interface ModalProviderProps {
	children: ReactNode
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null)

	const showModal = (content: ModalOptions) => {
		setModalOptions(content)
		setIsVisible(true)
	}

	const hideModal = () => {
		setIsVisible(false)
		setModalOptions(null)
	}

	return (
		<ModalContext.Provider value={{ isVisible, showModal, hideModal }}>
			{children}
			{isVisible && modalOptions && (
				<Modal
					title={modalOptions.title}
					body={modalOptions.body}
					backButton={modalOptions.backButton}
					saveButton={modalOptions.saveButton}
					closeButton={modalOptions.closeButton}
					onSave={modalOptions.onSave}
					onBack={modalOptions.onBack}
					onClose={modalOptions.onClose || hideModal}
				/>
			)}
		</ModalContext.Provider>
	)
}
