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
	},
	'tsk0051': {
		interface: 'itf0017',
		instruction: 'Generate a green sinusoidal function.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'green' && fn.type === 'sinusoidal'){
				res = true;
			}
			return res;
		}
	},
	'tsk0052': {
		interface: 'itf0017',
		instruction: 'Generate a red linear function.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'red' && fn.type === 'linear'){
				res = true;
			}
			return res;
		}
	},
	'tsk0053': {
		interface: 'itf0017',
		instruction: 'Generate a blue parabolic function.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'blue' && fn.type === 'parabolic'){
				res = true;
			}
			return res;
		}
	},
	'tsk0054': {
		interface: 'itf0017',
		instruction: 'Generate a yellow scatter function.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'yellow' && fn.type === 'scatter'){
				res = true;
			}
			return res;
		}
	},
	'tsk0055': {
		interface: 'itf0018',
		instruction: 'Broadcast a red parabolic Signal.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'red' && fn.type === 'parabolic'){
				res = true;
			}
			return res;
		}
	},
	'tsk0056': {
		interface: 'itf0018',
		instruction: 'Broadcast a green scatter Signal.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'green' && fn.type === 'scatter'){
				res = true;
			}
			return res;
		}
	},
	'tsk0057': {
		interface: 'itf0018',
		instruction: 'Broadcast a blue linear Signal.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'blue' && fn.type === 'linear'){
				res = true;
			}
			return res;
		}
	},
	'tsk0058': {
		interface: 'itf0018',
		instruction: 'Broadcast a yellow sinusoidal Signal.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'yellow' && fn.type === 'sinusoidal'){
				res = true;
			}
			return res;
		}
	},
	'tsk0059': {
		interface: 'itf0019',
		instruction: 'Adjust the Thermo Statometer to green and linear.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'green' && fn.type === 'linear'){
				res = true;
			}
			return res;
		}
	},
	'tsk0060': {
		interface: 'itf0019',
		instruction: 'Adjust the Thermo Statometer to red and parabolic.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'red' && fn.type === 'parabolic'){
				res = true;
			}
			return res;
		}
	},
	'tsk0061': {
		interface: 'itf0019',
		instruction: 'Adjust the Thermo Statometer to blue and scatter.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'blue' && fn.type === 'scatter'){
				res = true;
			}
			return res;
		}
	},
	'tsk0062': {
		interface: 'itf0019',
		instruction: 'Adjust the Thermo Statometer to yellow and sinusoidal.',
		validate: function(fn){
			var res = false;
			if(fn.color === 'yellow' && fn.type === 'sinusoidal'){
				res = true;
			}
			return res;
		}
	},
	'tsk0063': {
		interface: 'itf0020',
		instruction: 'Orient Arc Gauge to 90 degrees.',
		validate: function(angle){
			var res = false;
			if(angle === 90){
				res = true;
			}
			return res;
		}
	},
	'tsk0064': {
		interface: 'itf0020',
		instruction: 'Orient Arc Gauge to Pi radians.',
		validate: function(angle){
			var res = false;
			if(angle === 180){
				res = true;
			}
			return res;
		}
	},
	'tsk0065': {
		interface: 'itf0020',
		instruction: 'Orient Arc Gauge to 263 pops.',
		validate: function(angle){
			var res = false;
			if(angle === 263){
				res = true;
			}
			return res;
		}
	},
	'tsk0066': {
		interface: 'itf0021' ,
		instruction: 'Cast a 7/8-wide Sonar Range in any direction.',
		validate: function(range){
			var res = false;
			var size = Math.abs(range[0] - range[1]);
			if(size === (7/8)){
				res = true;
			}
			return res;
		}
	},
	'nmt0000': {
		interface: 'nmi0000',
		instruction: 'Set Compression Matrix to 5.',
		validate: function(sum){
			return sum === 5;
		}
	},
	'nmt0001': {
		interface: 'nmi0000',
		instruction: 'Set Compression Matrix to 10.',
		validate: function(sum){
			return sum === 10;
		}
	},
	'vgk0001': {
		interface: 'arc0001',
		instruction: 'Set Temporal Offset to today\'s date.',
		validate: function(value){
			return (value === new Date().getDate());
		}
	},
	'vgk0002': {
		interface: 'arc0001',
		instruction: 'Set Temporal Offset to today\'s month.',
		validate: function(value){
			return (value === (new Date().getMonth()+1));
		}
	},
	'vgk0003': {
		interface: 'arc0001',
		instruction: 'Set Temporal Offset to yesterday\'s date.',
		validate: function(value){
			var day_ms = 1000 * 60 * 60 * 24;
			var d = new Date();
			var y = new Date(d.getTime() - day_ms);
			return (value === y.getDate());
		}
	},
	'vgk0004': {
		interface: 'arc0001',
		instruction: 'Set Temporal Offset to tomorrow\'s date.',
		validate: function(value){
			var day_ms = 1000 * 60 * 60 * 24;
			var d = new Date();
			var t = new Date(d.getTime() + day_ms);
			return (value === t.getDate());
		}
	},
	'vgk0005': {
		interface: 'arc0002',
		instruction: 'Polarize a range between even values.',
		validate: function(range){
			var even0 = (range[0] % 2 === 0);
			var even1 = (range[1] % 2 === 0);
			return even0 && even1;
		}
	},
	'vgk0006': {
		interface: 'arc0002',
		instruction: 'Polarize a range between odd values.',
		validate: function(range){
			var odd0 = (range[0] % 2 === 1);
			var odd1 = (range[1] % 2 === 1);
			return odd0 && odd1;
		}
	},
	'vgk0007': {
		interface: 'arc0002',
		instruction: 'Polarize a range between an odd value and an even value.',
		validate: function(range){
			var odd0 = (range[0] % 2 === 1);
			var odd1 = (range[1] % 2 === 1);
			return (odd0 && !odd1) || (!odd0 && odd1);
		}
	}

}
