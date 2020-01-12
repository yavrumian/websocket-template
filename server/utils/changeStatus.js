

module.exports = async (term, pi) => {
	if(!term.manual){
		if(term.status){
			console.log('heyyyy');
			if((term.tempNow - term.high) >= term.tempNeed){
				pi.emit('status', {status: false})
				term.status = false
			}
		}
		else{
			if((term.tempNow + term.low) <= term.tempNeed){
				pi.emit('status', {status: true})
				term.status = true
			}
		}
	}
}
