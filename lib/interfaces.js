var PLAYER_ITFS = [
	['itf0004', 'itf0003', 'itf0008', 'itf0013'],
	['itf0001', 'itf0007', 'itf0009', 'itf0014'],
	['itf0006', 'itf0005', 'itf0010', 'itf0015'],
	['itf0002', 'itf0011', 'itf0012', 'itf0016']
]

var INTERFACES = {
	'itf0001': {
		type: 'buttongroup',
		name: 'Orbital Reference',
		options: [
			{name: 'Linear', color: 'gray'},
			{name: 'Parabolic', color: 'gray'},
			{name: 'Polynomial', color: 'gray'},
			{name: 'Popsicle Stick', color: 'gray'}
		]
	},
	'itf0002': {
		type: 'buttongroup',
		name: 'It Again',
		options: [
			{name: 'Read', color: 'gray'},
			{name: 'Press', color: 'gray'},
			{name: 'Do', color: 'gray'},
			{name: 'Try', color: 'gray'}
		]
	},
	'itf0003': {
		type: 'buttongroup',
		name: 'Three Useless Buttons',
		options: [
			{name: 'Middle', color: 'gray'},
			{name: 'Right', color: 'gray'},
			{name: 'Center', color: 'gray'}
		]
	},
	'itf0004': {
		type: 'buttongroup',
		name: 'The Intern',
		options: [
			{name: 'Fire', color: 'gray'},
			{name: 'Hire', color: 'gray'}
		]
	},
	'itf0005': {
		type: 'buttongroup',
		name: 'Everyone',
		options: [
			{name: 'Listen to me', color: 'gray'},
			{name: 'Stop', color: 'gray'},
			{name: 'What to do', color: 'gray'},
			{name: 'Hurry', color: 'gray'}
		]
	},
	'itf0006': {
		type: 'buttongroup',
		name: 'On Shoot',
		options: [
			{name: 'Rock', color: 'gray'},
			{name: 'Paper', color: 'gray'},
			{name: 'Scissors', color: 'gray'}
		]
	},
	'itf0007': {
		type: 'buttongroup',
		name: 'Poorly labeled buttons',
		options: [
			{name: 'Blue', color: 'green'},
			{name: 'Purple', color: 'blue'},
			{name: 'Pineapple', color: 'purple'},
			{name: 'Green', color: 'orange'}
		]
	},
	'itf0008': {
		type: 'buttongroup',
		name: 'Module 22112221',
		options: [
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'}
		]
	},
	'itf0009': {
		type: 'buttongroup',
		name: 'Module 21212211',
		options: [
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'}
		]
	},
	'itf0010': {
		type: 'buttongroup',
		name: 'Module 221122',
		options: [
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'}
		]
	},
	'itf0011': {
		type: 'buttongroup',
		name: 'Module 212121',
		options: [
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'}
		]
	},
	'itf0012': {
		type: 'buttongroup',
		name: 'Hydromosin Trigometurret',
		options: [
			{name: '0', color: 'gray'},
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'},
			{name: '3', color: 'gray'}
		]
	},
	'itf0013': {
		type: 'buttongroup',
		name: 'Asimilation Zaidion',
		options: [
			{name: '0', color: 'gray'},
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'},
			{name: '3', color: 'gray'}
		]
	},
	'itf0014': {
		type: 'buttongroup',
		name: 'Sunlarus Shockometron',
		options: [
			{name: '0', color: 'gray'},
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'},
			{name: '3', color: 'gray'}
		]
	},
	'itf0015': {
		type: 'buttongroup',
		name: 'Jiggalydaydoju',
		options: [
			{name: '0', color: 'gray'},
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'},
			{name: '3', color: 'gray'}
		]
	},
	'itf0016': {
		type: 'buttongroup',
		name: 'Vindoxy Kannakopter',
		options: [
			{name: '0', color: 'gray'},
			{name: '1', color: 'gray'},
			{name: '2', color: 'gray'},
			{name: '3', color: 'gray'}
		]
	},
	// Function Generator scales go from 0 to 3
	'itf0017': {
		type: 'functiongenerator',
		name: 'Function Generator',
		command: 'Set',
		generator: function(a, b){
			var types = ['sinusoidal', 'linear', 'parabolic', 'scatter'];
			var colors = ['green', 'red', 'blue', 'yellow'];
			var typeGrid = [
				[3, 0, 3, 0],
				[0, 1, 1, 1],
				[3, 1, 2, 2],
				[0, 1, 2, 3]
			]
			var colorGrid = [
				[1, 3, 0, 0],
				[2, 1, 3, 0],
				[0, 2, 1, 3],
				[0, 0, 2, 1]
			]
			return {
				type: types[typeGrid[a][b]],
				color: colors[colorGrid[a][b]]
			}
		}
	},
	'itf0018': {
		type: 'functiongenerator',
		name: 'Radiation Signal',
		command: 'Broadcast',
		generator: function(a, b){
			var types = ['sinusoidal', 'linear', 'parabolic', 'scatter'];
			var colors = ['green', 'red', 'blue', 'yellow'];
			var typeGrid = [
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[2, 2, 2, 2],
				[3, 3, 3, 3]
			]
			var colorGrid = [
				[3, 2, 1, 0],
				[3, 2, 1, 0],
				[3, 2, 1, 0],
				[3, 2, 1, 0]
			]
			return {
				type: types[typeGrid[a][b]],
				color: colors[colorGrid[a][b]]
			}
		}
	}
}