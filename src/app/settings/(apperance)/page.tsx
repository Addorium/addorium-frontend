'use client'
export default function ApperancePage() {
	return (
		<div>
			<h1>Apperance</h1>
			<button
				type='button'
				onClick={() => {
					throw new Error('Sentry Frontend Error')
				}}
			>
				Throw error
			</button>
			;
		</div>
	)
}
