import Button from '../../form/buttons/Button'
import { ToolbarButtonProps } from '../types/toolbar.types'

export default function ToolbaarIcon({
	button,
	textWrapper,
	disabled,
}: ToolbarButtonProps) {
	const { icon, onClick, tooltip } = button
	return (
		<Button
			type_style='dark'
			size='icon'
			className='text-lg'
			onClick={() => {
				onClick(textWrapper)
			}}
			disabled={disabled}
		>
			{icon}
		</Button>
	)
}
