import React, { useState } from "react"

const Win = ({ score }) => {
	return(
		<div>
			<h2>You found Waldo and his friends!</h2>
			<p>Your score: {score}</p>
			<p className='italic'>Score is calculated by 10 000 - time taken in seconds </p>
		</div>
	)
}

const Form = ({ score, writeData }) => {
	const [value, setValue] = useState('')

	const handleChange = (e) => {
		setValue(e.target.value)
	}

	const handleClick = (e) => {
		e.target.disabled = true
		e.target.textContent = 'Submitted'
		writeData(value, score)
	}

	return(
		<div className="margin-top-1">
			<label>Name: </label>
			<input type="text" value={value} onChange={handleChange} />
			<button type="submit" onClick={handleClick}>Submit high score</button>
		</div>
	)
}

const WinForm = ({ win, score, highScore, writeData }) => {
	if(win) {
		if( score > highScore) {
			return(
				<div className="overlay flex-row center">
					<div className='winform-bg text-center'>
						<Win score={score} />
						<Form score={score} writeData={writeData} />
					</div>
				</div>
			)
		}
		return(
			<div className="overlay flex-row center">
				<div className="winform-bg text-center">
					<Win score={score}/>
				</div>
			</div>
		)
	}
	return(
		<div />
	)
}

export default WinForm
