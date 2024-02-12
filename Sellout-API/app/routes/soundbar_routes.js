const express = require('express')
const passport = require('passport')
const TV = require('../models/TV')
const Soundbar = require('../models/soundbar')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

///////////////////////////////////////////////////////
// routes go here 
///////////////////////////////////////////////////////



router.post('/soundbars', removeBlanks, (req, res, next) => {
    const soundbarData = req.body.soundbar

    Soundbar.create(soundbarData)
        .then(soundbar => res.status(201).json({ soundbar: soundbar.toObject() }))
        .catch(next)
})


// CREATE
// POST 
// router.post('/soundbars/:tvId', removeBlanks, (req, res, next) => {
//     const soundbar = req.body.soundbar
//     const tvId = req.params.tvId

// 	TV.findById(tvId)
//         .then(handle404)
// 		.then((tv) => {
//             tv.soundbars.push(soundbar)

// 			return tv.save()
// 		})
//         .then(tv => res.status(201).json({ tv: tv }))
// 		.catch(next)
// })

// UPDATE
router.patch('/soundbars/:tvId/:soundbarId', requireToken, removeBlanks, (req, res, next) => {
    const { tvId, soundbarId } = req.params

	TV.findById(tvId)
		.then(handle404)
		.then((tv) => {
            const theSoundbar = tv.soundbars.id(soundbarId)
			requireOwnership(req, tv)

            theSoundbar.set(req.body.soundbar)

			return tv.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DELETE & DESTROY
router.delete('/soundbars/:tvId/:soundbarId', requireToken, removeBlanks, (req, res, next) => {

    const { tvId, soundbarId } = req.params

	TV.findById(tvId)
		.then(handle404)
		.then((tv) => {
            const theSoundbar = tv.soundbars.id(soundbarId)
			requireOwnership(req, tv)
            theSoundbar.deleteOne()
			return tv.save()
		})
		.then(() => res.sendStatus(204))

		.catch(next)
})

module.exports = router
