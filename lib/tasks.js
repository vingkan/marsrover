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
		instruction: 'What beats scissors?',
		validate: function(option){
			var res = false;
			if(option.name === 'Rock'){
				res = true;
			}
			return res;
		}
	},	
	'tsk0051': {
		interface: 'itf0006',
		instruction: 'What beats rock?',
		validate: function(option){
			var res = false;
			if(option.name === 'Paper'){
				res = true;
			}
			return res;
		}
	},
	'tsk0052': {
		interface: 'itf0006',
		instruction: 'What beats paper?',
		validate: function(option){
			var res = false;
			if(option.name === 'Scissors'){
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
		interface: 'itf0008',
		instruction: 'Toggle module 22112221 to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0024': {
		interface: 'itf0008',
		instruction: 'Toggle module 22112221 to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0025': {
		interface: 'itf0009',
		instruction: 'Toggle module 21212211 to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0026': {
		interface: 'itf0009',
		instruction: 'Toggle module 21212211 to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0027': {
		interface: 'itf0010',
		instruction: 'Toggle module 221122 to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0028': {
		interface: 'itf0010',
		instruction: 'Toggle module 221122 to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0029': {
		interface: 'itf0011',
		instruction: 'Toggle module 212121 to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0030': {
		interface: 'itf0011',
		instruction: 'Toggle module 212121 to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0031': {
		interface: 'itf0012',
		instruction: 'Set the Hydromosin Trigometurret to 0.',
		validate: function(option){
			var res = false;
			if(option.name === '0'){
				res = true;
			}
			return res;
		}
	},
	'tsk0032': {
		interface: 'itf0012',
		instruction: 'Set the Hydromosin Trigometurret to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0033': {
		interface: 'itf0012',
		instruction: 'Set the Hydromosin Trigometurret to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0034': {
		interface: 'itf0012',
		instruction: 'Set the Hydromosin Trigometurret to 3.',
		validate: function(option){
			var res = false;
			if(option.name === '3'){
				res = true;
			}
			return res;
		}
	},
	'tsk0035': {
		interface: 'itf0013',
		instruction: 'Set the Asimilation Zaidion to 0.',
		validate: function(option){
			var res = false;
			if(option.name === '0'){
				res = true;
			}
			return res;
		}
	},
	'tsk0036': {
		interface: 'itf0013',
		instruction: 'Set the Asimilation Zaidion to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0037': {
		interface: 'itf0013',
		instruction: 'Set the Asimilation Zaidion to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0038': {
		interface: 'itf0013',
		instruction: 'Set the Asimilation Zaidion to 3.',
		validate: function(option){
			var res = false;
			if(option.name === '3'){
				res = true;
			}
			return res;
		}
	},
	'tsk0039': {
		interface: 'itf0014',
		instruction: 'Set the Sunlarus Shockometron to 0.',
		validate: function(option){
			var res = false;
			if(option.name === '0'){
				res = true;
			}
			return res;
		}
	},
	'tsk0040': {
		interface: 'itf0014',
		instruction: 'Set the Sunlarus Shockometron to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0041': {
		interface: 'itf0014',
		instruction: 'Set the Sunlarus Shockometron to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0042': {
		interface: 'itf0014',
		instruction: 'Set the Sunlarus Shockometron to 3.',
		validate: function(option){
			var res = false;
			if(option.name === '3'){
				res = true;
			}
			return res;
		}
	},
	'tsk0043': {
		interface: 'itf0015',
		instruction: 'Set the Jiggalydaydoju to 0.',
		validate: function(option){
			var res = false;
			if(option.name === '0'){
				res = true;
			}
			return res;
		}
	},
	'tsk0044': {
		interface: 'itf0015',
		instruction: 'Set the Jiggalydaydoju to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0045': {
		interface: 'itf0015',
		instruction: 'Set the Jiggalydaydoju to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0046': {
		interface: 'itf0015',
		instruction: 'Set the Jiggalydaydoju to 3.',
		validate: function(option){
			var res = false;
			if(option.name === '3'){
				res = true;
			}
			return res;
		}
	},
	'tsk0047': {
		interface: 'itf0016',
		instruction: 'Set the Vindoxy Kannakopter to 0.',
		validate: function(option){
			var res = false;
			if(option.name === '0'){
				res = true;
			}
			return res;
		}
	},
	'tsk0048': {
		interface: 'itf0016',
		instruction: 'Set the Vindoxy Kannakopter to 1.',
		validate: function(option){
			var res = false;
			if(option.name === '1'){
				res = true;
			}
			return res;
		}
	},
	'tsk0049': {
		interface: 'itf0016',
		instruction: 'Set the Vindoxy Kannakopter to 2.',
		validate: function(option){
			var res = false;
			if(option.name === '2'){
				res = true;
			}
			return res;
		}
	},
	'tsk0050': {
		interface: 'itf0016',
		instruction: 'Set the Vindoxy Kannakopter to 3.',
		validate: function(option){
			var res = false;
			if(option.name === '3'){
				res = true;
			}
			return res;
		}
	}

}
