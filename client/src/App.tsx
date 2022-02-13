import { observer } from 'mobx-react-lite'
import React, { FC, useEffect, useState } from 'react'

import { LoginForm } from './components'
import { IUser } from './models/User.interface'
import { UserService } from './services/User.Service'
import { useStore } from './store/context'

export const App: FC = observer(() => {
	const { store } = useStore()
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	const getUsers = async () => {
		try {
			const response = await UserService.fetchUsers()
			setUsers(response.data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="App">
			{store.isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<h2>{store.user ? `You are logged in as ${store.user.email}` : `You have to authorized`}</h2>
					<h2>
						{store.user?.isActivated ? `Account verified by email ${store.user.email}` : `Account is not verified`}
					</h2>
					{store.user && (
						<>
							<button onClick={() => store.logout()}>Logout</button>
							<button onClick={getUsers}>Get Users</button>
							{users.map((u) => (
								<div style={{ margin: 4 }} key={u._id}>
									{u.email}
								</div>
							))}
						</>
					)}
					{!store.user && <LoginForm />}
				</>
			)}
		</div>
	)
})
