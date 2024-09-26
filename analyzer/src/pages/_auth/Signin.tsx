import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function Signin() {
  return (
	<div className='flex flex-col items-center justify-center min-h-screen'>
	  <SignIn />
	</div>
  )
}

export default Signin

