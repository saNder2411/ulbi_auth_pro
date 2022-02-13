import { observer } from 'mobx-react-lite'
import React, { FC, useState } from 'react'

import { useStore } from '../store/context'

export const LoginForm: FC = observer(() => {
	const [email, setEmail] = useState('')

	const [password, setPassword] = useState('')

	const { store } = useStore()

	return (
		<div className="Form">
			<input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button onClick={() => store.login({ email, password })}>Login</button>
			<button onClick={() => store.register({ email, password })}>Registration</button>
		</div>
	)
})
