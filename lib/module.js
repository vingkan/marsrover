var sampleModule = {
	name: 'Orbital Reference',
	type: 'BUTTON_GROUP',
	options: ['Linear', 'Parabolic', 'Polynomial'],
	validate: function(clicked){
		var res = false;
		if(clicked.option === 'Parabolic'){
			res = true;
		}
		return res;
	}
}

var ControlModule = function(params){
	
}