
import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeSoundbar } from '../../api/soundbar'
import messages from '../shared/AutoDismissAlert/messages'
import EditSoundbarModal from '../soundbars/EditSoundbarModal'

const SoundbarShow = (props) => {
    const { soundbar, user, tv, triggerRefresh, msgAlert } = props

    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {

        let rating = parseInt(soundbar.rating, 10);

        if (rating >= 8) {
            return ({width: '18rem', backgroundColor: '#b5ead7'}); 
        } else if (rating >= 6) {
            return ({width: '18rem', backgroundColor: '#ffdac1'}); 
        } else {
            return ({width: '18rem', backgroundColor: '#ff9aa2'}); 
        }
    }

    const destroySoundbar = () => {
        // we want to remove the soundbar
        removeSoundbar(user, tv._id, soundbar._id)
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteSoundbarSuccess,
                    variant: 'success'
                })
            })
            // refresh the page
            .then(() => triggerRefresh())
            // if err, send err msg
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className='m-2' style={setBgCondition(soundbar.condition)}>
                <Card.Header>{soundbar.brand} {soundbar.model}</Card.Header>
                <Card.Body>
                    <Card.Img variant='top' src={soundbar.image} />

                    <small>{soundbar.channels} channels</small><br/>
                    <small>Dolby Atmos: {soundbar.dolbyAtmos ? 'Yes' : 'No'}</small>
                </Card.Body>
                <Card.Footer>
                <small>Rating: {soundbar.rating}</small><br/>
                    {
                        user && tv.owner && user._id === tv.owner._id
                        ?
                        <>
                            <Button
                                className='m-2'
                                variant='warning'
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Soundbar
                            </Button>
                            <Button
                                className='m-2'
                                variant='danger'
                                onClick={() => destroySoundbar()}
                            >
                                Delete Soundbar
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditSoundbarModal 
                user={user}
                tv={tv}
                soundbar={soundbar}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default SoundbarShow