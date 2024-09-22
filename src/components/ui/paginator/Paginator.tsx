import React from 'react'

interface PaginatorProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}

	const handlePageClick = (page: number) => {
		onPageChange(page)
	}
	const canCurrentPage = currentPage >= 2 && currentPage <= totalPages - 1

	return (
		<div className='flex items-center space-x-1.5'>
			{/* Previous button */}
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className={`px-1 py-1 min-w-9 min-h-9 ${currentPage === 1 ? 'text-gray-5' : 'text-gray-1 hover:bg-gray-1/15 rounded-full transition-colors'} `}
			>
				&lt;
			</button>

			{/* First page */}
			<button
				onClick={() => handlePageClick(1)}
				className={`px-1 py-1 min-w-9 min-h-9 rounded-full ${currentPage === 1 ? 'text-gray-1 bg-core-0 rounded-full' : 'text-gray-1 hover:bg-gray-1/15'}`}
			>
				1
			</button>

			{/* Dots before current page */}
			{currentPage > 2 && <span className='text-gray-1 px-1 py-1'>-</span>}

			{/* Previous page */}
			{currentPage > 2 && (
				<button
					onClick={() => handlePageClick(currentPage - 1)}
					className='px-1 py-1 min-w-9 min-h-9 text-gray-1 hover:bg-gray-1/15 rounded-full transition-colors'
				>
					{currentPage - 1}
				</button>
			)}

			{/* current page */}
			{canCurrentPage && (
				<button
					className='px-1 py-1 min-w-9 min-h-9 text-gray-1 bg-core-0 rounded-full'
					disabled
				>
					{currentPage}
				</button>
			)}

			{/* Next page */}
			{currentPage < totalPages - 1 && (
				<button
					onClick={() => handlePageClick(currentPage + 1)}
					className='px-1 py-1 min-w-9 min-h-9 text-gray-1 hover:bg-gray-1/15 rounded-full transition-colors'
				>
					{currentPage + 1}
				</button>
			)}

			{/* Dots after current page */}
			{currentPage < totalPages - 2 && (
				<span className='text-gray-1 px-1 py-1'>-</span>
			)}

			{/* Last page */}
			<button
				onClick={() => handlePageClick(totalPages)}
				className={`px-1 py-1 min-w-9 min-h-9 ${currentPage === totalPages ? 'text-gray-1 bg-core-0 rounded-full' : 'text-gray-1 hover:bg-gray-1/15 rounded-full transition-colors'}`}
			>
				{totalPages}
			</button>

			{/* Next button */}
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className={`px-1 py-1 min-w-9 min-h-9 ${currentPage === totalPages ? 'text-gray-5' : ' text-gray-1 hover:bg-gray-1/15 rounded-full transition-colors'} `}
			>
				&gt;
			</button>
		</div>
	)
}

export default Paginator
