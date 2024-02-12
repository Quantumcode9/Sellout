const express = require('express')

const passport = require('passport')

const TV = require('../models/TV')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()





router.post('/tvs', requireToken, (req, res, next) => {
	req.body.tv.owner = req.user.id
	TV.create(req.body.tv)
		.then((tv) => {
			res.status(201).json({ tv: tv.toObject(), message: 'TV successfully created!' });
			
	
		})
		.catch(next)
})


// INDEX
// GET /tvs
router.get('/tvs', (req, res, next) => {
	TV.find()
        .populate('owner')
		.then((tvs) => {
			return tvs.map((tv) => tv.toObject())
		})
		.then((tvs) => res.status(200).json({ tvs: tvs }))
		.catch(next)
})


router.get('/tvs/mine', requireToken, (req, res, next) => {
	TV.find({ owner: req.user.id })
		.then((tvs) => {

			return tvs.map((tv) => tv.toObject())
		})
		.then((tvs) => res.status(200).json({ tvs: tvs }))
		.catch(next)
})

// SHOW
// GET 
router.get('/tvs/:id', (req, res, next) => {
	TV.findById(req.params.id)
        .populate('owner')
		.then(handle404)
		.then((tv) => res.status(200).json({ tv: tv.toObject() }))
		.catch(next)
})

// CREATE
// POST /tvs

// UPDATE
// PATCH 
router.patch('/tvs/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.tv.owner

	TV.findById(req.params.id)
		.then(handle404)
		.then((tv) => {
			requireOwnership(req, tv)

			return tv.updateOne(req.body.tv)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DELETE 
router.delete('/tvs/:id', requireToken, (req, res, next) => {
	TV.findById(req.params.id)
		.then(handle404)
		.then((tv) => {
			requireOwnership(req, tv)
			tv.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router