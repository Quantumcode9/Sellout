import React, { useEffect, useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import { removeSoundbar, getSoundbar } from '../../../api/soundbar'
import messages from '../../shared/AutoDismissAlert/messages'
import EditSoundbarModal from '../EditSoundbarModal'
import { useParams } from 'react-router-dom'
import './SoundbarShow.css'

const SoundbarShow = (props) => {
  const [soundbar, setSoundbar] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false)
  
  const { user, msgAlert, triggerRefresh } = props;
  const { id } = useParams();
  
  useEffect(() => {
    let isMounted = true; 
  
    getSoundbar(id)
      .then(response => {
        if (isMounted) { 
          setSoundbar(response.data.soundbar);
        }
      })
      .catch(error => {
        if (isMounted) { 
          console.error(error);
        }
      });
  
    return () => {
      isMounted = false; 
    };
  }, [id]);

    const handleEdit = () => {
      setEditModalShow(true);
    };
  
    const handleRemove = () => {
        removeSoundbar(user, soundbar._id)
            .then(() => {
            msgAlert({
                heading: 'Soundbar Deleted',
                message: messages.removeSoundbarSuccess,
                variant: 'success'
            });
            triggerRefresh();
            })
            .catch(() => {
            msgAlert({
                heading: 'Soundbar Deletion Failed',
                message: messages.removeSoundbarFailure,
                variant: 'danger'
            });
            });
    };
  
    if (!soundbar) {
      return <Container className="mt-5">Loading...</Container>;
    }


  return (
    <>
    <Container style={{ backgroundColor: 'black' }} className='m-2'>
      <Card>
        <Card.Header style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
          {soundbar.brand} {soundbar.modelNumber}
        </Card.Header>
        <Card.Body>
          <img src={soundbar.image2 ? soundbar.image2 : soundbar.image} alt={soundbar.modelNumber} className='soundbar-image'/>
        </Card.Body>
        <Card.Footer style={{ color: 'white', backgroundColor: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
          {soundbar.brand} {soundbar.modelNumber}
        </Card.Footer>
      </Card>
    </Container>
    <br />
  

        <Container className='m-2'>
      <Row>
                <Col md={6}>
                <Card>
                <Card.Header style= {{ backgroundColor: 'black', color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
                    {soundbar.brand} { soundbar.modelNumber}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <img src={soundbar.image} alt={soundbar.modelNumber} className='soundbar-image'/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style= {{ backgroundColor: 'black', color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>
                    <Container className='m-2'>
        <Button variant='primary' onClick={() => setEditModalShow(true)}>Edit</Button>
        <Button variant='danger' onClick={() => removeSoundbar(user, soundbar._id)
          .then(() => {
            msgAlert({
              heading: 'Soundbar Deleted',
              message: messages.removeSoundbarSuccess,
              variant: 'success'
            })
            triggerRefresh()
          })
          .catch(() => {
            msgAlert({
              heading: 'Soundbar Deletion Failed',
              message: messages.removeSoundbarFailure,
              variant: 'danger'
            })
          })}>Delete</Button>
      </Container>
      <EditSoundbarModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        soundbar={soundbar}
        user={user}
        msgAlert={msgAlert}
        triggerRefresh={triggerRefresh}
      />
              
 </Card.Footer>
        </Card>
        </Col>
        <Col md={6}>
        <Card>

        <Card.Header style= {{ backgroundColor: 'white', color: 'black', fontFamily: 'Lucida Sans ,Lucida Sans Regular', border: '2px solid black' }}>
                      Details
                    </Card.Header>
            <Card.Body style= {{ backgroundColor: 'black', color: 'white', fontFamily: 'Lucida Sans ,Lucida Sans Regular' }}>

                    <p>Price: $<strong>{soundbar.price}.99</strong></p>
                    <p>Channels: <strong>{soundbar.channels}</strong></p>
                    <p>
                    Rating: <span style={{ color: soundbar.rating >= 8 ? 'green' : soundbar.rating >= 6 ? 'yellow' : 'red' }}><strong>{soundbar.rating}/10</strong></span>
                    </p>
                    <p>Dolby Atmos: <strong>{soundbar.dolbyAtmos ? 'Yes' : 'No'}</strong></p>

              
            </Card.Body>
        </Card>
        </Col>
        </Row>
        </Container>
    </>

    )
}









export default SoundbarShow