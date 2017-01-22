var TaskManager = {
	getTask: function(itf){
		var tasks = [];
		for(var t in TASKS){
			if(TASKS[t].interface === itf){
				if(!STATE.calledTask(t)){
					tasks.push(t);
				}
			}
		}
		var tid = false;
		if(tasks.length > 0){
			var tidx = Math.floor(tasks.length * Math.random());
			tid = tasks[tidx];
			STATE.startTask(tid); // Whole function should be async
		}
		return tid;
	}
}

var TASKS = {
	'tsk0001': {
		interface: 'itf0001',
		instruction: 'Set Orbital Reference to Parabolic',
		validate: function(option){
			var res = false;
			if(option.name === 'Parabolic'){
				res = true;
			}
			return res;
		}
	},
	'tsk0002': {
		interface: 'itf0001',
		instruction: 'Set Orbital Reference to Linear',
		validate: function(option){
			var res = false;
			if(option.name === 'Linear'){
				res = true;
			}
			return res;
		}
	}
}