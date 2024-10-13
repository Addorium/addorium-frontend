import { ToolbarProps } from '../types/toolbar.types'
import ToolbaarIcon from './ToolBarIcon'

const EditorToolbar: React.FC<ToolbarProps> = ({
	categories,
	textWrapper,
	disabled,
}) => {
	return (
		<div className='flex'>
			{categories.map((category, index) => (
				<div key={index} className='flex items-center'>
					<div key={index} className='flex flex-row gap-1'>
						{category.buttons.map((button, index) => (
							<ToolbaarIcon
								key={index}
								button={button}
								textWrapper={textWrapper}
								disabled={disabled}
							/>
						))}
					</div>
					{index !== categories.length - 1 && (
						<div className='bg-gray-2 w-0.5 h-[35px] mx-2 rounded-md' />
					)}
				</div>
			))}
		</div>
	)
}

export default EditorToolbar
