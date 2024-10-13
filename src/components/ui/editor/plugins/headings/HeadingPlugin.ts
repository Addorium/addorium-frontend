import TextWrapper from '@/classes/TextWrapper.class'
import MarkdownPlugin from '../MarkdownPlugin'

export class Heading1Plugin extends MarkdownPlugin {
	name = 'h1'
	category: string = 'headings'

	execute(wrapper: TextWrapper) {
		wrapper.wrapText('# ', '')
	}
	remarkPlugin() {
		return null
	}
	renderer() {
		return null
	}
}
export class Heading2Plugin extends MarkdownPlugin {
	name = 'h2'
	category: string = 'headings'

	execute(wrapper: TextWrapper) {
		wrapper.wrapText('## ', '')
	}
	remarkPlugin() {
		return null
	}
	renderer() {
		return null
	}
}
export class Heading3Plugin extends MarkdownPlugin {
	name = 'h3'
	category: string = 'headings'

	execute(wrapper: TextWrapper) {
		wrapper.wrapText('### ', '')
	}
	remarkPlugin() {
		return null
	}
	renderer() {
		return null
	}
}
