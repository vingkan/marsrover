var InterfaceManager = {
	getInterface: function(panel){
		var interfaces = [];
		for(var i in INTERFACES){
			if(!STATE.usingInterface(i)){
				interfaces.push(i);
			}
		}
		var itf = false;
		if(interfaces.length > 0){
			var idx = Math.floor(interfaces.length * Math.random());
			itf = interfaces[idx];
			STATE.installInterface(panel, itf); // Whole function should be async	
		}
		return itf;
	}
}

var INTERFACES = {
	'itf0001': {
		type: 'buttongroup',
		name: 'Orbital Reference',
		options: [
			{name: 'Linear', color: 'gray'},
			{name: 'Parabolic', color: 'gray'},
			{name: 'Polynomial', color: 'gray'}
		]
	}
}