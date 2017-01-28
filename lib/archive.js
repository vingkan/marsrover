function setStartTime(key, time){
	console.log(key)
	DETAILS[key].startTime = time;
}

function getStartTime(key){
	return DETAILS[key].startTime || 0;
}

function addEvent(data, e){
	DETAILS[data.mkey].events.push({
		time: (data.timestamp - getStartTime(data.mkey)),
		note: e.note
	});
}

var temp = {};

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
			addEvent(data, {
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
		addEvent(data, {
			note: data.sender + ' completed a task for ' + INTERFACES[data.itf].name
		});
	},
	// Inputs: tid
	fail_task: (state, data) => {
		console.log(data.sender, 'failed task:', data.tid);
		console.log('Score:', state.score.completed.length + '-' + state.score.failed.length);
		var itf = TASKS[data.tid].interface;
		addEvent(data, {
			note: data.sender + ' failed a task for ' + INTERFACES[itf].name
		});
	},
	// Inputs: void
	finish_mission: (state, data) => {
		var result = (state.score.completed.length > state.global.win) ? 'Success!' : 'Failure.';
		console.log('Mission finished, result: ', result);
		console.log('Score:', state.score.completed.length + '-' + state.score.failed.length);
		addEvent(data, {
			note: 'Mission finished, result: ' + result + ' Score: (' + state.score.completed.length + '-' + state.score.failed.length + ')'
		});
	},
	// Inputs: void
	retry: (state, data) => {

	}
}

function renderArchive(key){
	var state = ARCHIVE[key];
	var detail = DETAILS[key];
	console.log(state);
	var eh = '';
	eh += '<h3>Summary</h3>';
	eh += '<ul>';
	eh += '<li>Mission on ' + detail.startTime + '</li>';
	eh += '<li>To Win: ' + state.global.win + ', To Lose: ' + state.global.lose + '</li>';
	eh += '<li>Time Limit: ' + state.global.limit + '</li>';
	eh += '</ul>';
	eh += '<h3>Team</h3>';
	eh += '<ul>';
	for(var p = 0; p < state.players.length; p++){
		var pid = state.players[p];
		eh += '<li>' + pid + '</lI>';
	}
	eh += '</ul>';
	eh += '<h3>Timeline</h3>';
	eh += '<ul>';
	for(var i = 0; i < detail.events.length; i++){
		var ev = detail.events[i];
		var secs = (ev.time/1000).toFixed(1);
		eh += '<li>' + secs + ' secs: ' + ev.note + '</li>';
	}
	eh += '</ul>';
	var logs = document.getElementById('logs');
	logs.innerHTML = eh;
}