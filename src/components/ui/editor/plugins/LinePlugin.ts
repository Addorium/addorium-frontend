import TextWrapper from '@/classes/TextWrapper.class'
import MarkdownPlugin from './MarkdownPlugin'

export class BoldPlugin extends MarkdownPlugin {
	name = 'B'
	category: string = 'text'

	execute(wrapper: TextWrapper) {
		wrapper.wrapBold()
	}
	remarkPlugin() {
		return null
	}
	renderer() {
		return null
	}
}
export class ItalicPlugin extends MarkdownPlugin {
	name = 'I'
	category: string = 'text'

	execute(wrapper: TextWrapper) {
		wrapper.wrapItalic()
	}
	remarkPlugin() {
		return null
	}
	renderer() {
		return null
	}
}
export class UnderlinePlugin extends MarkdownPlugin {
	name = 'U'
	category: string = 'text'

	execute(wrapper: TextWrapper) {
		wrapper.wrapUnderline()
	}
	remarkPlugin() {
		return null
	}
	renderer() {
		return null
	}
}
