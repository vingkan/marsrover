function setStartTime(key, time){
	DETAILS[key].startTime = time;
}

function getStartTime(key){
	return DETAILS[key].startTime || 0;
}

function addEvent(data, e){
	e.time = (data.timestamp - getStartTime(data.mkey));
	e.data = data;
	DETAILS[data.mkey].events.push(e);
}

var temp = {};

var taskTime = {};

// Render functions should not mutate the state! They may dispatch events, but do not have to. This allows for non-playing clients that can still monitor the game state tree.

var RENDERERS = {
	// Inputs: pid
	add_player: (state, data) => {
		
	},
	// Inputs: void
	setup_controls: (state, data) => {
		DETAILS[data.mkey].playerScore = state.players.map((i) => { return {
			success: 0,
			failure: 0
		}; });
		DETAILS[data.mkey].taskFails = {};
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
		}
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(state, data.pid);
		var interface = state.panels[pidx][data.itf];
		var tid = lastItem(interface.tasks);
		taskTime[tid] = data.timestamp;
	},
	// Inputs: pid, tid
	start_instruction: (state, data) => {

	},
	// Inputs: itf, tid
	complete_task: (state, data) => {
		var pidx = getPlayerIndex(state, data.sender);
		DETAILS[data.mkey].playerScore[pidx].success++;
		addEvent(data, {
			note: data.sender + ' completed a task for ' + INTERFACES[data.itf].name,
			start: taskTime[data.tid]
		});
	},
	// Inputs: tid
	fail_task: (state, data) => {
		var pidx = getPlayerIndex(state, data.sender);
		DETAILS[data.mkey].playerScore[pidx].failure++;
		var tfs = DETAILS[data.mkey].taskFails[data.tid];
		if(tfs){
			DETAILS[data.mkey].taskFails[data.tid]++;
		}
		else{
			DETAILS[data.mkey].taskFails[data.tid] = 1;
		}
		var itf = TASKS[data.tid].interface;
		addEvent(data, {
			note: data.sender + ' failed a task for ' + INTERFACES[itf].name
		});
	},
	// Inputs: void
	finish_mission: (state, data) => {
		var result = (state.score.completed.length > state.global.win) ? 'Success!' : 'Failure.';
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
	/*var durations = detail.events.filter((e) => {
		return e.start;
	}).map((e) => {
		return {
			data: e.data,
			duration: e.data.timestamp - e.start
		};
	}).sort((a, b) => {
		return b.duration - a.duration;
	});
	console.log(durations);*/
	var eh = '';
	eh += '<h3>Summary</h3>';
	eh += '<ul>';
	eh += '<li>Mission on ' + moment(detail.startTime).format('M/D h:mm A') + '</li>';
	eh += '<li>To Win: ' + state.global.win + ', To Lose: ' + state.global.lose + '</li>';
	eh += '<li>Time Limit: ' + state.global.limit + ' secs</li>';
	eh += '</ul>';
	eh += '<h3>Team</h3>';
	eh += '<ul>';
	for(var p = 0; p < state.players.length; p++){
		var pid = state.players[p];
		var c = detail.playerScore[p];
		eh += '<li>' + pid + ' (' + c.success + '-' + c.failure +')</lI>';
	}
	eh += '</ul>';
	eh += '<h3>Highlights</h3>';
	eh += '<ul>';
	var mostFails = Object.keys(detail.taskFails).map((tid) => {
		return {
			tid: tid,
			fails: detail.taskFails[tid]
		}
	}).sort((a, b) => {
		return b.fails - a.fails;
	})[0];
	if(mostFails){
		eh += '<li>Toughest Task: ' + TASKS[mostFails.tid].instruction + ' (' + mostFails.fails + ' failures)</li>';
	}
	eh += '</ul>';
	eh += '<h3>Timeline</h3>';
	eh += '<ul>';
	for(var i = 0; i < detail.events.length; i++){
		var ev = detail.events[i];
		var secs = (ev.time/1000).toFixed(1);
		eh += '<li><span class="log-time">' + secs + ' secs: </span>' + ev.note + '</li>';
	}
	eh += '</ul>';
	var logs = document.getElementById('logs');
	logs.innerHTML = eh;
}