exports.auth = (req, res, auth) => {
	if(req.session.id) next()
	else res.status(401).send({status: 'failed', msg: 'You\'re not logged in'})
}
