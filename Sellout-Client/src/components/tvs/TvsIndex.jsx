import {useState, useEffect} from 'react'
import { getAllTVs } from "../../api/tv"

import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const TVsIndex = (props) => {
    const [tvs, setTVs] = useState(null)
    const [error, setError] = useState(false)

    // destructure our props
    const { msgAlert } = props

	useEffect(() => {
		getAllTVs()
			.then(res => {
				console.log('use Effect hook ran')
				setTVs(res.data.tvs)
			})
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
                setError(true)
            })
	}, [])

    if (error) {
        return <LoadingScreen />
    }

    if (!tvs) {
        return <LoadingScreen />

    } else if (tvs.length === 0) {
        return <p>No tvs yet, go add some!</p>
    }

    const tvCards = tvs.map(tv => (
        <Card key={tv.id} style={{ width: '30%', margin: 5 }} >
            <Card.Header>{tv.modelNumber}</Card.Header>
            <img src={tv.image} alt={tv.modelNumber} style={{ width: '100%' }} />
            <Card.Body>
                <Card.Text>
                    <Link to={`/tvs/${tv._id}`} className='btn btn-info'>
                        View {tv.modelNumber}
                    </Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerLayout }>
            { tvCards }
        </div>
    )
}


export default TVsIndex