const router = require('express').Router()

router.use(`/login`, require('./login'))
// router.use(`/transfer`, require('./transfer'))
// router.use(`/station`, require('./station'))
// router.use(`/pump`, require('./pump'))
// router.use(`/out`, require('./out'))

// router.get('/api/test', (req, res) => {
// 	req.session.hey = 'heeeey'
// 	console.log('hey');
// 	res.send(req.session.hey)
// })

module.exports = router
