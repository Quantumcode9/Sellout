import TVsIndex from './tvs/TvsIndex'
import React from "react"
import './Home.css'


const Home = (props) => {
	const { msgAlert } = props

	return (
		<div className="home-container">
			<div>
      <h1>Welcome to Sellout</h1>
      <p> Explore</p>
    </div>

			<TVsIndex msgAlert={msgAlert} />
		</div>
	)
}

export default Home