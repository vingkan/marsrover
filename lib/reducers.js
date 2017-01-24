var STATE = {};

function clone(obj){
	return JSON.parse(JSON.stringify(obj));
}

var db = firebase.database();
var missionRef = db.ref('missions/' + MISSION_ID);
missionRef.orderByChild('timestamp').on('child_added', function(snapshot){
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
	data.timestamp = firebase.database.ServerValue.TIMESTAMP;
	missionRef.push(data);
}

function getPlayerIndex(pid){
	return STATE.players.indexOf(pid);
}

function getPlayerIndexByInterface(itf){
	for(var i = 0; i < state.panels.length; i++){
		var res = false;
		if(itf in state.panels[i]){
			res = i;
		}
		return res;
	}
}

function lastItem(list){
	if(list.length > 0){
		return list[list.length-1]
	}
	else{
		return false;
	}
}

function randomItem(list){
	if(list.length > 0){
		var idx = Math.floor(list.length * Math.random());
		return list[idx];
	}
	else{
		return false;
	}
}

function chooseTask(itf){
	var tasks = [];
	for(var t in TASKS){
		if(TASKS[t].interface === itf){
			tasks.push(t);
		}
	}
	var tid = false;
	if(tasks.length > 0){
		var tidx = Math.floor(tasks.length * Math.random());
		tid = tasks[tidx];
	}
	return tid;
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
		state.playing = true;
		state.score = {
			completed: [],
			failed: []
		}
		state.panels = state.players.map((pid, idx) => {
			var panelMap = {}
			var pitfs = PLAYER_ITFS[idx];
			for(var i = 0; i < pitfs.length; i++){
				panelMap[pitfs[i]] = {
					id: pitfs[i],
					active: false,
					tasks: [],
				}
			}
			return panelMap;
		});
		state.tasks = state.players.map((pid, idx) => {
			return false;
		});
		return state;
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(data.pid);
		var panelMap = state.panels[pidx];
		console.log(data.itf, data.pid, pidx, Object.keys(panelMap))
		var itf = panelMap[data.itf];
		var tid = chooseTask(itf);// Choose tid for the given itf
		if(itf){
			if(itf.active){
				// Need to handle override case and remove the old instruction from the partner player!
				// Ideally no penalty for this case
			}
			itf.active = true;
			itf.tasks.push(tid);
		}
		else{
			console.error('start_task: could not find interface: ', data.itf);
		}
		return state;
	},
	// Inputs: pid, tid
	start_instruction: (state, data) => {
		var pidx = getPlayerIndex(data.pid);
		state.tasks[pidx] = data.tid;
		return state;
	},
	// Inputs: itf, tid
	complete_task: (state, data) => {
		var pidx = getPlayerIndexByInterface(itf);
		var itf = state.panels[pidx][itf];
		if(itf){
			itf.active = false;
		}
		state.score.completed.push(data.tid);
		return state;
	},
	// Inputs: tid
	fail_task: (state, data) => {
		state.score.failed.push(data.tid);
		return state;
	},
	// Inputs: void
	finish_mission: (state, data) => {
		state.playing = false;
		for(var p = 0; p < state.panels.length; p++){
			for(var i in state.panels[p]){
				state.panels[p][i].active = false;
			}
		}
		for(var t = 0; t < state.tasks.length; t++){
			state.tasks[t] = false;
		}
		return state;
	}
}