'use client'

import Button from '@/components/ui/form/buttons/Button'
import { InputField } from '@/components/ui/form/fields/TextField'
import { OAUTH_URL } from '@/constants/auth.constants'
import { Key, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'

export function Auth() {
	const onSubmit = () => {
		window.location.href = OAUTH_URL
	}

	return (
		<>
			<div className='flex'>
				<form
					className='min-w-[425px] h-fit mx-auto shadow bg-background-2 rounded-xl px-8 py-9'
					onSubmit={e => {
						onSubmit()
						e.preventDefault()
					}}
				>
					<h1 className='text-2xl mb-4 font-semibold'>Sign in with</h1>
					<div className='flex items-center gap-2 justify-center'>
						<Button
							type='submit'
							type_style='tertiary'
							size='normal'
							className='w-full'
							iconurl='/discord.svg'
							width='w-full'
						>
							Discord
						</Button>
						<Button
							type='submit'
							type_style='tertiary'
							size='normal'
							className='w-full'
							iconurl='/google.svg'
							width='w-full'
							disabled
						>
							Google
						</Button>
					</div>
					<h1 className='text-2xl my-4 font-semibold'>Or use a password</h1>
					<div className='flex flex-col gap-4'>
						<InputField
							size='large'
							id='login'
							placeholder='Login'
							className='w-full'
							Icon={Mail}
						/>
						<InputField
							size='large'
							id='password'
							placeholder='Password'
							className='w-full'
							type='password'
							Icon={Key}
						/>
						<div className='flex justify-center w-full'>
							<Button size='normal' className='w-fit' Icon={LogIn}>
								Login
							</Button>
						</div>
					</div>
					<div className='flex gap-4 justify-center mt-4 text-blue transition-colors'>
						<Link href='/' className='hover:text-blue/90 hover:underline'>
							<h1>Create Account</h1>
						</Link>
						<Link href='/' className='hover:text-blue/90 hover:underline'>
							<h1>Forgot Password</h1>
						</Link>
					</div>
				</form>
			</div>
		</>
	)
}
