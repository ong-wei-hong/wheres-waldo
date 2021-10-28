import React, { useState } from 'react';

import './App.css';

import WinForm from './components/WinForm';

// firebase setup
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, child, get, set } from 'firebase/database'

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
	apiKey: "AIzaSyAQVqEU2CcFJ1a05tD8M994bJTI9X9sC00",
	authDomain: "wheres-waldo-9ccde.firebaseapp.com",
	projectId: "wheres-waldo-9ccde",
	storageBucket: "wheres-waldo-9ccde.appspot.com",
	messagingSenderId: "651676962417",
	appId: "1:651676962417:web:730105a5e9a2e7633655d0",
	databaseURL: "https://wheres-waldo-9ccde-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const firebaseApp = initializeApp(firebaseConfig);

// get Highscore and name

const db = getDatabase();

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

const Image = () => {
	const [imgSrc, setImgSrc] = useState('')

	getDownloadURL(ref(storage, 'wheres-waldo-10.jpg'))
		.then((url) => {
			setImgSrc(url)
		})
		.catch((error) => {
			console.log(error)
		});

	return(
		<img className='image' src={imgSrc} alt='Loading, please wait a moment' />
	)
}

const Target0 = ({ found }) => {
	const [imgSrc, setImgSrc] = useState('')

	getDownloadURL(ref(storage, 'waldo.jpg'))
		.then((url) => {
			setImgSrc(url)
		})
		.catch((error) => {
			console.log(error)
		});

	return(
		<img className={found ? 'found' : 'to-find'} src={imgSrc} alt='Waldo' />
	)
}

const Target1 = ({ found }) => {
	const [imgSrc, setImgSrc] = useState('')

	getDownloadURL(ref(storage, 'whitebeard.jpg'))
		.then((url) => {
			setImgSrc(url)
		})
		.catch((error) => {
			console.log(error)
		});

	return(
		<img className={found ? 'found' : 'to-find'} src={imgSrc} alt='Whitebeard' />
	)
}

const Target2 = ({ found }) => {
	const [imgSrc, setImgSrc] = useState('')

	getDownloadURL(ref(storage, 'waldo-fan-1.jpg'))
		.then((url) => {
			setImgSrc(url)
		})
		.catch((error) => {
			console.log(error)
		});

	return(
		<img className={found ? 'found' : 'to-find'} src={imgSrc} alt='Waldo fan 1' />
	)
}

const Target3 = ({ found }) => {
	const [imgSrc, setImgSrc] = useState('')

	getDownloadURL(ref(storage, 'waldo-fan-2.jpg'))
		.then((url) => {
			setImgSrc(url)
		})
		.catch((error) => {
			console.log(error)
		});

	return(
		<img className={found ? 'found' : 'to-find'} src={imgSrc} alt='Waldo fan 2' />
	)
}

const Target4 = ({ found }) => {
	const [imgSrc, setImgSrc] = useState('')

	getDownloadURL(ref(storage, 'woof.jpg'))
		.then((url) => {
			setImgSrc(url)
		})
		.catch((error) => {
			console.log(error)
		});

	return(
		<img className={found ? 'found' : 'to-find'} src={imgSrc} alt='Woof' />
	)
}

const Header = ({ found, name, highScore }) => {
	return(
		<header>
			<div className="flex-column wrapper">
				<div className="white-words flex-end">
					<p>High score: {highScore}</p>
					<p>Name: {name}</p>
				</div>
				<div className="flex-row center white-words">
					<h1>Where's Waldo?</h1>
				</div>
				<div className="margin-top-1 flex-row white-words center italic">
					Find the characters below
				</div>
				<div className="margin-top-1 grid">
					<Target0 found={found[0]} />
					<Target1 found={found[1]} />
					<Target2 found={found[4]} />
					<Target3 found={found[3]} />
					<Target4 found={found[2]} />
					<p className="white-words">Waldo</p>
					<p className="white-words">Whitebeard</p>
					<p className="white-words">Waldo fan 1</p>
					<p className="white-words">Waldo fan 2</p>
					<p className="white-words">Woof</p>
				</div>
			</div>
		</header>
	)
}

function App() {
	const cacheFound = Array(5).fill(false)
	const [found, setFound] = useState(cacheFound)
	const [win, setWin] = useState(false)
	const [score, setScore] = useState(0)
	const start = Date.now()

	const [highScore, setHighScore] = useState(0)
	const [name, setName] = useState('')

	const dbReference = dbRef(db)
	get(child(dbReference, 'highScore'))
		.then((snapshot) => {
			setHighScore(snapshot.val())
		})
	get(child(dbReference, 'name'))
		.then((snapshot) => {
			setName(snapshot.val())
		})

	const handleWin = () => {
		const end = Date.now()
		setScore(10000 - Math.floor((end - start) / 1000))
		setWin(true)
	}

	const select = (e, i) => {
		e.target.classList.add('seen')

		cacheFound[i] = true
		setFound([...cacheFound])

		if (found.every(e => e)) {
			handleWin()
		}
	}

	const [targets] = useState(
		Array.from({length: 5}, (_, i) => (
			<div className={`target target-${i}`} key={i} onClick={(e) => select(e, i)} />
		))
	)

	const writeData = (name, highScore) => {
		set(dbReference, {
			highScore: highScore,
			name: name
		})
	}

	return (
    <div className="App">
			<Header
				found={found}
				highScore={highScore}
				name={name} />
			<div className="game-wrapper">
				<div className="game">
					<Image />
					{targets.map(target => target)}
				</div>
			</div>
			<WinForm
				win={win}
				score={score}
				highScore={highScore}
				writeData={writeData}
			/>
    </div>
  );
}

export default App;
