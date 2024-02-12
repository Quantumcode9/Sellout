
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneTV, removeTV, updateTV } from '../../api/tv'
import { addToCart } from '../../api/cart'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button, Row, Col  } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditTVModal from './EditTvModal'
import './TvShow.css'
//import SoundbarShow from '../soundbars/SoundbarShow'
//import NewSoundbarModal from '../soundbars/NewSoundbarModal'

const soundbarCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',

    flexFlow: 'row wrap'
}

const TVShow = (props) => {
    const { tvId } = useParams()
    const { user, msgAlert } = props

    const [tv, setTV] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getOneTV(tvId)
            .then(res => setTV(res.data.tv))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])
    

    const deleteTV = () => {
        removeTV(user, tv._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteTVSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    const [cartItems, setCartItems] = useState([])

    const handleAddToCart = (tv) => {
        addToCart(tv._id, user)
        .then(res => {
            msgAlert({
                heading: 'Added to Cart!',
                message: 'Added to cart successfully!',
                variant: 'success'
            })
            setCartItems(prevCartItems => [...prevCartItems, res.data.tv]);
            navigate('/cart')
        })
        .catch(err => {
            console.error(err);
            msgAlert({
                heading: 'Oh no!',
                message: messages.generalError,
                variant: 'danger'
            })
        });
    }; 
    

    // let soundbarCards
    // if (tv) {
    //     if (tv.soundbars.length > 0) {
    //         soundbarCards = tv.soundbars.map(soundbar => (
    //             <SoundbarShow 
    //                 key={soundbar.id}
    //                 soundbar={soundbar}
    //                 tv={tv}
    //                 user={user}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    //     } else {
    //     }
    // }

    if (!tv) {
        return <LoadingScreen />
    }

    return (
        <>
        <Container className='hero'>
            <Card>
                    <Card.Header className='hero-head'>
                    {tv.brand} { tv.modelNumber}
                    </Card.Header>
                    <Card.Body>
                        
                    <img src={tv.image2 ? tv.image2 : tv.image} alt={tv.modelNumber} className='tv-image'/>

                    </Card.Body>
                    <Card.Footer className='hero-foot'>
                    {tv.brand} { tv.modelNumber}
                    </Card.Footer>
                </Card>
                    </Container>
                    
            <Container className='m-2'>
            <Row>
                <Col md={6}>
                <Card>
                    <Card.Header>
                    {tv.brand} { tv.modelNumber}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <img src={tv.image} alt={tv.modelNumber} className='tv-image'/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* <Button
                            className='m-2'
                            variant='info'
                            onClick={() => setSoundbarModalShow(true)}
                        >
                            Give {tv.name} a soundbar!
                        </Button> */}
                        {

                            


                            tv.owner && user && tv.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Update TV
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => deleteTV()}
                                >
                                    Delete TV 
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='dark'
                            onClick={() => handleAddToCart(tv)}
                                >
                                    Add to Cart
                                </Button>

                            </>
                            :
                            null
                        }
                        <br/>
                        {

                        }
                    </Card.Footer>

                </Card>
                <br/>



                <Card>
                    <Card.Header className='hero-header'>
                        Details
                    </Card.Header>
    <Card.Body className="tech-specs">
        <Card.Text className="tech-specs">
            <strong>Size:</strong> {tv.size}"<br/>
            <strong>Type:</strong> {tv.type}<br/>
            <strong>Refresh Rate:</strong> {tv.refreshRate}hz<br/>
            <strong>HDR Format:</strong> {tv.highDynamicRangeFormat}<br/>
            <strong>Color:</strong> {tv.wideColorGamut ? 'Wide Color Gamut' : 'Standard Color Gamut'}<br/>
            <strong>Contrast Ratio:</strong> {tv.contrastRatio}<br/>
            <strong>Brightness:</strong> {tv.brightness} nits<br/>
            <strong>Model Year:</strong> {tv.modelYear}<br/>
            <strong>Smart OS:</strong> {tv.smartOS}<br/>
            <strong>Backlight Type:</strong> {tv.backlightType}<br/>
        </Card.Text>
    </Card.Body>
</Card>
                </Col>

                <Col md={6}>
                <Card>
                    <Card.Header>
                        Features
                    </Card.Header>
                    <Card.Body>
                            <ul>
                                {tv.features}
                            </ul>
                    
                    </Card.Body>
                </Card>
                <br/>


                <Card className="commercial-details">
    <Card.Header className='hero-header'>Commercial Details</Card.Header>
    <Card.Body>
        <Card.Text>
            <strong>Brand:</strong> {tv.brand}<br/>
            <strong>Price:</strong> ${tv.price}<br/>
        </Card.Text>
    </Card.Body>
</Card>
</Col>
            </Row>
            <Row>
                <Col md={6}>
                <Card>
                    <Card.Header>
                        Ratings
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <strong>Overall Rating:</strong> {tv.overallRating} / 10
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        Inputs
                    </Card.Header>
                    <Card.Body>

                            <ul>
                                {
                                    tv.inputs.map((input, index) => (
                                        <li key={index}>{input}</li>
                                    ))
                                }
                            </ul>
                    
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Row>
            <Col md={6}>
                <Card>
                    <Card.Header>
                        Reviews
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Overall Rating: {tv.overallRating} / 10<br/>
                            <br/>
                            Overview: <br/> 
                            {tv.overview}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={6}>
                <Card>
                    <Card.Header>
                        Comments
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            </Row>



            </Container>
            <Container className='m-2' style={soundbarCardContainerLayout}>
                {/* {soundbarCards} */}
            </Container>
            <EditTVModal 
                user={user}
                show={editModalShow}
                updateTV={updateTV}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                tv={tv}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            {/* <NewSoundbarModal 
                tv={tv}
                show={soundbarModalShow}
                msgAlert={msgAlert}
                handleClose={() => setSoundbarModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            /> */}
        </>
    )
}

export default TVShow