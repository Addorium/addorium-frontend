import { useEffect, useRef, useState } from 'react'

interface SvgIconProps {
	url: string // URL для загрузки SVG
	className?: string
	width?: string // Optional width prop
	height?: string // Optional height prop
	fill?: string // Optional fill color prop
}

const SvgIcon = ({ url, className, width, height, fill }: SvgIconProps) => {
	const [svgContent, setSvgContent] = useState<string | null>(null)
	const svgRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const fetchSvg = async () => {
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error('Error fetching SVG')
				}
				const svgText = await response.text()
				setSvgContent(svgText)
			} catch (error) {
				console.error('Error loading SVG:', error)
			}
		}

		fetchSvg()
	}, [url])

	useEffect(() => {
		if (svgRef.current && svgContent) {
			const svgElement = svgRef.current.querySelector('svg')

			if (svgElement) {
				if (width) svgElement.setAttribute('width', width)
				if (height) svgElement.setAttribute('height', height)
				if (fill) svgElement.setAttribute('fill', fill)
			}
		}
	}, [svgContent, width, height, fill])

	if (!svgContent) {
		return null
	}

	return (
		<div
			ref={svgRef}
			className={className}
			dangerouslySetInnerHTML={{ __html: svgContent }}
		/>
	)
}

export default SvgIcon
