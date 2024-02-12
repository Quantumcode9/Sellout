router.post('/tvs', requireToken, (req, res, next) => {
	req.body.tv.owner = req.user.id
	TV.create(req.body.tv)
		.then((tv) => {
			res.status(201).json({ tv: tv.toObject(), message: 'Product posted' });
			
	
		})
		.catch(next)
})