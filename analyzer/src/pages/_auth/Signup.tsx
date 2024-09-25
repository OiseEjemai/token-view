import { SignUp, useUser } from '@clerk/clerk-react'
import React, {useEffect} from 'react'

function Signup() {
	const {user, isSignedIn} = useUser()

	useEffect(() => {
		// If the user is signed in, send their data to your backend
		const sendUserDataToBackend = async () => {
		//   if (isSignedIn && user) {
			const userData = {
			  userId: user.id,
			  email: user.primaryEmailAddress?.emailAddress,
			  username: user.username,
			  name: user.fullName,
			};
	
			try {
			  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			  });
	
			  if (response.ok) {
				console.log('User data saved to the backend successfully');
			  } else {
				console.error('Failed to save user data to the backend');
			  }
			} catch (error) {
			  console.error('Error sending user data to the backend:', error);
			}
		//   }
		};
	
		// Trigger the function after the user is signed in
		sendUserDataToBackend();
	  }, [isSignedIn, user]);

	console.log(import.meta.env.VITE_BACKEND_URL)
  return (
	<div className='flex flex-col items-center justify-center min-h-screen'>
	  <SignUp />
	</div>
  )
}

export default Signup
