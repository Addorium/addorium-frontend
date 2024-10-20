'use client'

import { useEffect } from 'react'

export default function ProjectsList({ params }: { params: { type: string } }) {
	const type = params.type

	useEffect(() => {
		console.log('ProjectsList mounted')
		console.log(type)
		return () => {
			console.log('ProjectsList unmounted')
		}
	}, [])
	return (
		<div>
			<h1>Projects List 1</h1>
			<p>{type}</p>
		</div>
	)
}
