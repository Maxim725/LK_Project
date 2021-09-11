import React, { useState } from 'react'
import b from './b.json';

import "./style.scss"
export const App = () => {
	const [COUNT, setCOUNT] = useState<number>(0)
	return (
		<div>
			<h1>Enter code here...</h1>
			<button onClick={() => setCOUNT(COUNT + 1)}>add</button>
			<p>{COUNT}</p>
		</div>
	)
}
