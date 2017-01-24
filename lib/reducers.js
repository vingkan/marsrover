var MISSION_ID = false;
var PLAYER_ID = false;

var STATE = {};

function clone(obj){
	return JSON.parse(JSON.stringify(obj));
}

var db = firebase.database();
var missionRef = db.ref('missions/' + MISSION_ID);
missionRef.on('child_added', function(snapshot){
	var data = snapshot.val();
	var reducer = REDUCERS[data.action];
	if(reducer){
		STATE = reducer(clone(STATE), data);
	}
	var renderer = RENDERERS[data.action];
	if(renderer){
		renderer(STATE, data);
	}
});

function dispatch(data){
	data.sender = PLAYER_ID;
	missionRef.push(data);
}

function getPlayerIndex(pid){
	return STATE.players.indexOf(pid);
}

function lastItem(list){
	if(list.length > 0){
		return list[list.length-1]
	}
	else{
		return false;
	}
}

var REDUCERS = {
	// Inputs: pid
	add_player: (state, data) => {
		if(state.players){
			state.players.push(data.pid);
		}
		else{
			state.players = [data.pid];
		}
		return state;
	},
	// Inputs: void
	start_mission: (state, data) => {
		state.started = true;
		var itfs = state.players.map((pid, idx) => {
			var panelMap = {}
			var pitfs = PLAYER_ITFS[idx];
			for(var i = 0; i < pitfs.length; i++){
				panelMap[pitfs[i]] = {
					id: pitfs[i],
					tasks: [],
				}
			}
			return panelMap;
		});
		state.panels = itfs;
		return state;
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(data.pid);
		var panelMap = state.panels[pidx];
		var itf = panelMap[data.itf];
		var tid = // Choose tid for the given itf
		if(itf){
			itf.tasks.push(tid);
		}
		else{
			console.error('start_task: could not find interface');
		}
		return state;
	},
	start_instruction: (state, data) => {
		// Don't do anything for now
		return state;
	}
}

var RENDERERS = {
	// Inputs: pid
	add_player: (state, data) => {
		console.log('Players in the game: ', state.players.join(', '));
	},
	// Inputs: void
	start_mission: (state, data) => {
		console.log('Start mission!');
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(data.pid);
		var tid = lastItem(state.panels[pidx][data.itf].tasks);
		if(data.pid === PLAYER_ID){
			console.log('Activated interface: ', data.itf, ' with task: ', tid);
		}
		dispatch({
			action: 'start_instructions',
			pid: sender,
			tid: tid
		});
	},
	// Inputs: pid, tid
	start_instruction: (state, data) => {
		if(data.pid === PLAYER_ID){
			console.log('Displayed instructions for task: ', data.tid);
		}
	}
}