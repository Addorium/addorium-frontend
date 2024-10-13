'use client'

import { MarkdownManager } from '@/classes/MarkdownManager.class'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './MarkdownRenderer.module.scss'
import MarkdownPlugin from './plugins/MarkdownPlugin'

type Pluggable = any

export default function MarkdownRenderer({
	markdown,
	mplugins,
}: {
	markdown: string
	mplugins: MarkdownPlugin[]
}) {
	const markdownManager = new MarkdownManager()
	mplugins.forEach(plugin => plugin.register(markdownManager))

	const plugins = [remarkGfm, ...markdownManager.getRemarkPlugins()]

	return (
		<ReactMarkdown
			remarkPlugins={plugins}
			components={markdownManager.getRenderers()}
			className={styles.renderer}
		>
			{markdown}
		</ReactMarkdown>
	)
}
