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
			STATE.reserveTask(tid); // Whole function should be async
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
	},

	'tsk0003': {
		interface: 'itf0001',
		instruction: 'Set Orbital Reference to Polynomial',
		validate: function(option){
			var res = false;
			if(option.name === 'Polynomial'){
				res = true;
			}
			return res;
		}
	},

	'tsk0004': {
		interface: 'itf0001',
		instruction: 'Set Orbital Reference to Popsicle Stick',
		validate: function(option){
			var res = false;
			if(option.name === 'Popsicle Stick'){
				res = true;
			}
			return res;
		}
	},
	'tsk0005': {
		interface: 'itf0002',
		instruction: 'Read it again.',
		validate: function(option){
			var res = false;
			if(option.name === 'Read'){
				res = true;
			}
			return res;
		}
	},
	'tsk0006': {
		interface: 'itf0002',
		instruction: 'Press it again.',
		validate: function(option){
			var res = false;
			if(option.name === 'Press'){
				res = true;
			}
			return res;
		}
	},
	'tsk0007': {
		interface: 'itf0002',
		instruction: 'Do it again.',
		validate: function(option){
			var res = false;
			if(option.name === 'Do'){
				res = true;
			}
			return res;
		}
	},
	'tsk0008': {
		interface: 'itf0002',
		instruction: 'Try it again.',
		validate: function(option){
			var res = false;
			if(option.name === 'Try'){
				res = true;
			}
			return res;
		}
	},
	'tsk0009': {
		interface: 'itf0003',
		instruction: 'Press the useless button on the left.',
		validate: function(option){
			var res = false;
			if(option.name === 'Middle'){
				res = true;
			}
			return res;
		}
	},
	'tsk0010': {
		interface: 'itf0003',
		instruction: 'Press the useless button in the center.',
		validate: function(option){
			var res = false;
			if(option.name === 'Right'){
				res = true;
			}
			return res;
		}
	},
	'tsk0011': {
		interface: 'itf0003',
		instruction: 'Press the useless button in the middle.',
		validate: function(option){
			var res = false;
			if(option.name === 'Right'){
				res = true;
			}
			return res;
		}
	},
	'tsk0012': {
		interface: 'itf0003',
		instruction: 'Press the useless button on the right.',
		validate: function(option){
			var res = false;
			if(option.name === 'Center'){
				res = true;
			}
			return res;
		}
	},
	'tsk0013': {
		interface: 'itf0004',
		instruction: 'Fire the intern.',
		validate: function(option){
			var res = false;
			if(option.name === 'Fire'){
				res = true;
			}
			return res;
		}
	},
	'tsk0014': {
		interface: 'itf0004',
		instruction: 'Hire the intern.',
		validate: function(option){
			var res = false;
			if(option.name === 'Hire'){
				res = true;
			}
			return res;
		}
	},
	'tsk0015': {
		interface: 'itf0005',
		instruction: 'Everyone, listen to me!',
		validate: function(option){
			var res = false;
			if(option.name === 'Listen to me'){
				res = true;
			}
			return res;
		}
	},
	'tsk0016': {
		interface: 'itf0005',
		instruction: 'Everyone, stop!',
		validate: function(option){
			var res = false;
			if(option.name === 'Stop'){
				res = true;
			}
			return res;
		}
	},
	'tsk0017': {
		interface: 'itf0005',
		instruction: 'Everyone, you know what to do!',
		validate: function(option){
			var res = false;
			if(option.name === 'What to do'){
				res = true;
			}
			return res;
		}
	},
	'tsk0018': {
		interface: 'itf0005',
		instruction: 'Everyone, hurry!',
		validate: function(option){
			var res = false;
			if(option.name === 'Hurry'){
				res = true;
			}
			return res;
		}
	},
	'tsk0019': {
		interface: 'itf0006',
		instruction: 'Press the button.',
		validate: function(option){
			var res = false;
			if(option.name === ''){
				res = true;
			}
			return res;
		}
	},
	'tsk0020': {
		interface: 'itf0007',
		instruction: 'Press the green button.',
		validate: function(option){
			var res = false;
			if(option.name === 'Blue'){
				res = true;
			}
			return res;
		}
	},
	'tsk0021': {
		interface: 'itf0007',
		instruction: 'Press the blue button.',
		validate: function(option){
			var res = false;
			if(option.name === 'Purple'){
				res = true;
			}
			return res;
		}
	},
	'tsk0022': {
		interface: 'itf0007',
		instruction: 'Press the purple button.',
		validate: function(option){
			var res = false;
			if(option.name === 'Pineapple'){
				res = true;
			}
			return res;
		}
	},
	'tsk0023': {
		interface: 'itf0007',
		instruction: 'Press the orange button.',
		validate: function(option){
			var res = false;
			if(option.name === 'Green'){
				res = true;
			}
			return res;
		}
	}
}
