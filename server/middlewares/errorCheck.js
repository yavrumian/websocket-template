const {validationResult} = require('express-validator')

module.exports = (req, res, next) => {
	const errors = validationResult(req).formatWith(({msg, param}) => JSON.parse(`{"param": "${param}", "msg": "${msg}"}`));

	if(!errors.isEmpty()){
		return res.status(400).send({status: 'failed', errors: errors.array()})
	}else next()
}
