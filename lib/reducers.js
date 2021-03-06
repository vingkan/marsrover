function clone(obj){
	return JSON.parse(JSON.stringify(obj));
}

function dispatch(data){
	data.sender = PLAYER_ID;
	data.timestamp = firebase.database.ServerValue.TIMESTAMP;
	missionRef.push(data);
}

function getPlayerIndex(state, pid){
	return state.players.indexOf(pid);
}

// Keep an eye on this function
function getPlayerIndexByInterface(state, itf){
	var res = false;
	for(var i = 0; i < state.panels.length; i++){
		if(itf in state.panels[i]){
			res = i;
			break;
		}
	}
	//console.warn('getPlayerIndexByInterface: ', itf, ' -> ', res);
	return res;
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
		var player = data.pid;
		if(!state.playing){
			if(state.players){
				//if(state.players.length === 4){}
				state.players.push(player);
			}
			else{
				state.players = [player];
			}
		}
		else{
			console.error('Cannot join: mission already in progress.');
		}
		return state;
	},
	// Inputs: void
	setup_controls: (state, data) => {
		state.success = false;
		// Maybe need to throw error when state.global is undefined
		state.global = {
			win: GLOBAL.WIN,
			lose: GLOBAL.LOSE,
			limit: GLOBAL.LIMIT
		}
		state.score = {
			completed: [],
			failed: []
		}
		state.players = state.players.sort();
		state.panels = state.players.map((pid, idx) => {
			var panelMap = {}
			var pitfs = PLAYER_ITFS[idx];
			for(var i = 0; i < pitfs.length; i++){
				panelMap[pitfs[i]] = {
					id: pitfs[i],
					dom: 'panel-' + (i + 1),
					active: false,
					tasks: []
				}
			}
			return panelMap;
		});
		state.instructions = state.players.map((pid, idx) => {
			return false;
		});
		return state;
	},
	// Inputs: win, lose, limit
	global_settings: (state, data) => {
		state.global = {
			win: data.win,
			lose: data.lose,
			limit: data.limit
		}
		return state;
	},
	// Inputs: void
	start_mission: (state, data) => {
		state.checkedIn = state.checkedIn + 1 || 1;
		if(state.checkedIn === state.players.length){
			state.playing = true;
		}
		return state;
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(state, data.pid);
		var panelMap = state.panels[pidx];
		var tid = chooseTask(data.itf); //Choose tid for the given itf
		var itf = panelMap[data.itf];
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
		var pidx = getPlayerIndex(state, data.pid);
		state.instructions[pidx] = data.tid;
		return state;
	},
	// Inputs: itf, tid
	complete_task: (state, data) => {
		var pidx = getPlayerIndexByInterface(state, data.itf);
		var itf = state.panels[pidx][data.itf];
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
		state.success = (state.score.completed.length > state.global.win);
		for(var p = 0; p < state.panels.length; p++){
			for(var i in state.panels[p]){
				state.panels[p][i].active = false;
			}
		}
		for(var t = 0; t < state.instructions.length; t++){
			state.instructions[t] = false;
		}
		return state;
	},
	// Inputs: void
	retry: (state, data) => {
		state = {};
		return state;
	}
}