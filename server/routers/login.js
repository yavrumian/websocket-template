const router = require('express').Router(),
	{check} = require('express-validator'),

	checkError = require('../middlewares/errorCheck'),
	controller = require('../controllers/login')

router.post('/register', [
	check('username').trim().not().isEmpty().withMessage('This property can not be empty'),
	check('password').trim().not().isEmpty().withMessage('This property can not be empty')
], checkError, controller.reg)

router.post('/', [
	check('username').trim().not().isEmpty().withMessage('This property can not be empty'),
	check('password').trim().not().isEmpty().withMessage('This property can not be empty')
], checkError, controller.auth)

router.get('/check', controller.check)

router.get('/logout', controller.logout)

module.exports = router
