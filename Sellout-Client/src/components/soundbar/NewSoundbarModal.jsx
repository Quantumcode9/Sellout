
import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import SoundbarForm from '../shared/SoundbarForm'
import messages from '../shared/AutoDismissAlert/messages'

import { createSoundbar } from '../../api/soundbar'

const NewSoundbarModal = (props) => {
    const { tv, show, handleClose, msgAlert, triggerRefresh } = props
    const [soundbar, setSoundbar] = useState({})

    const onChange = (e) => {
        e.persist()
        setSoundbar(prevSoundbar => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // if (updatedName === 'isSqueaky' && e.target.checked) {
            //     updatedValue = true
            // } else if (updatedName === 'isSqueaky' && !e.target.checked) {
            //     updatedValue = false
            // }

            const updatedSoundbar = { [updatedName] : updatedValue }

            return {
                ...prevSoundbar, ...updatedSoundbar
            }
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call
        createSoundbar(tv, soundbar)
            // then close the modal
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createSoundbarSuccess,
                    variant: 'success'
                })
            })
            // then refresh the page
            .then(() => triggerRefresh())
            .then(() => setSoundbar({}))
            // if error, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <SoundbarForm 
                    soundbar={soundbar}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${tv.name} a soundbar!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewSoundbarModal