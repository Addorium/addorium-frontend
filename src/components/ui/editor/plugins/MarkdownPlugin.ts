import { MarkdownManager } from '@/classes/MarkdownManager.class'
import TextWrapper from '@/classes/TextWrapper.class'

type Pluggable = any

abstract class MarkdownPlugin {
	abstract name: string
	abstract category: string
	abstract execute(wrapper: TextWrapper): void

	// Renderer принимает node в качестве аргумента
	abstract renderer(node: any): React.ReactNode
	abstract remarkPlugin(): Pluggable

	register(markdownManager: MarkdownManager) {
		markdownManager.register(
			this.name,
			this.category,
			this.name,
			this.execute.bind(this),
			this.name,
			this.renderer.bind(this),
			this.remarkPlugin()
		)
	}
}

export default MarkdownPlugin
