import React, { useState, useEffect } from 'react'
import './App.css'
import UserCard                       from './components/card/UserCard'
import axios                          from 'axios'

function App () {
	const [user, setUser] = useState(null)
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setIsLoading(true)
				const response = await axios.get('https://randomuser.me/api/');
				setUser(response.data.results[0]);
			} catch (error) {
				//console.error('Error fetching user:', error)
				setError("Loading user error")
			}
			setIsLoading(false)
		}

		fetchUser()
	}, [])

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Random User</h1>
				{isLoading && <p>Loading...</p>}
				{ !isLoading && user && <UserCard user={ user } /> }
				{!isLoading && error && <p>{error}</p>}
			</header>
		</div>
	)
}

export default App
