import { CheckIcon, ClipboardCopyIcon } from 'lucide-react'
import { useState } from 'react'

interface CopyLabelProps {
	text: string
}

export default function CopyLabel({ text }: CopyLabelProps) {
	const [isCopied, setIsCopied] = useState(false)
	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			setIsCopied(true)
			setTimeout(() => setIsCopied(false), 4000)
		} catch (err) {
			console.error('Failed to copy: ', err)
		}
	}
	return (
		<div
			className='flex bg-background-5 justify-between items-center px-2 py-0.5 rounded-lg w-fit gap-2 hover:bg-background-6 cursor-pointer transition-colors'
			onClick={() => {
				copyToClipboard(text)
			}}
		>
			<span>{text}</span>
			{isCopied ? (
				<CheckIcon className='cursor-pointer size-4' />
			) : (
				<ClipboardCopyIcon className='cursor-pointer size-4' />
			)}
		</div>
	)
}
