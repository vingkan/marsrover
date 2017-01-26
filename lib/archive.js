function setStartTime(key, time){
	console.log(key)
	DETAILS[key].startTime = time;
}

function getStartTime(key){
	return DETAILS[key].startTime || 0;
}

function addEvent(key, e){
	DETAILS[key].events.push({
		time: (e.time - getStartTime(key)),
		note: e.note
	});
}

// Render functions should not mutate the state! They may dispatch events, but do not have to. This allows for non-playing clients that can still monitor the game state tree.

var RENDERERS = {
	// Inputs: pid
	add_player: (state, data) => {
		console.log('Players in the game:', state.players.join(', '));
	},
	// Inputs: void
	setup_controls: (state, data) => {
		
	},
	// Inputs: win, lose, limit
	global_settings: (state, data) => {

	},
	// Inputs: void
	start_mission: (state, data) => {
		if(state.playing){
			setStartTime(data.mkey, data.timestamp);
			addEvent(data.mkey, {
				time: data.timestamp,
				note: 'Mission started.'
			});
			console.log('Start mission!');
		}
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(state, data.pid);
		var interface = state.panels[pidx][data.itf];
		var tid = lastItem(interface.tasks);
		console.log(data.pid, 'was assigned task:', tid);
	},
	// Inputs: pid, tid
	start_instruction: (state, data) => {

	},
	// Inputs: itf, tid
	complete_task: (state, data) => {
		console.log(data.sender, 'completed task:', data.tid);
		console.log('Score:', state.score.completed.length + '-' + state.score.failed.length);
	},
	// Inputs: tid
	fail_task: (state, data) => {
		console.log(data.sender, 'failed task:', data.tid);
		console.log('Score:', state.score.completed.length + '-' + state.score.failed.length);
	},
	// Inputs: void
	finish_mission: (state, data) => {
		var result = (state.score.completed.length > state.global.win) ? 'Success!' : 'Failure';
		console.log('Mission finished, result: ', result);
		console.log('Score:', state.score.completed.length + '-' + state.score.failed.length);
	},
	// Inputs: void
	retry: (state, data) => {

	}
}