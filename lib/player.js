var Terminal = {
	limit: GLOBAL.LIMIT,
	startTime: Date.now(),
	print: function(message){
		var terminal = document.getElementById('terminal-mission');
		terminal.innerHTML = '<p class="typewriter">' + message + '</p>';
	},
	startTimer: function(tid){
		if(STATE.playing){
			var tmn = this;
			tmn.startTime = Date.now();
			var itx = setInterval(function(){
				var elapsed = Date.now() - tmn.startTime;
				var remaining = (tmn.limit * 1000) - elapsed;
				var per = remaining / (tmn.limit * 1000);
				if(per < 0){
					clearInterval(itx);
					dispatch({
						action: 'fail_task',
						tid: tid
					});
				}
				else{
					var terminal = document.getElementById('terminal-mission');
					terminal.style.opacity = per;
				}
			}, 1000);
		}
		else{
			var terminal = document.getElementById('terminal-mission');
			terminal.style.opacity = 1.0;
			Terminal.print('Created at Boilermake IV by Sunny and Vinesh.');
		}
	}
}

// Purely random method, implement structure for other strategies later
// Allocatation strategy should control player, interface, and task
function allocateTask(){
	var pid = randomItem(STATE.players);
	var itf = randomItem(Object.keys(STATE.panels[getPlayerIndex(pid)]));
	dispatch({
		action: 'start_task',
		pid: pid,
		itf: itf
	});
}

// Render functions should not mutate the state! They may dispatch events, but do not have to. This allows for non-playing clients that can still monitor the game state tree.

var RENDERERS = {
	// Inputs: pid
	add_player: (state, data) => {
		console.log('Players in the game: ', state.players.map((player) => {return player.id}).join(', '));
	},
	// Inputs: void
	start_mission: (state, data) => {
		console.log('Start mission!');
		var adjacentPidx = (state.players.indexOf(PLAYER_ID) + 1) % state.players.length;
		var possibleItfs = state.panels[adjacentPidx];
		var itf = randomItem(Object.keys(possibleItfs));
		dispatch({
			action: 'start_task',
			pid: state.players[adjacentPidx],
			itf: itf
		});
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(data.pid);
		var tid = lastItem(state.panels[pidx][data.itf].tasks);
		if(data.pid === PLAYER_ID){
			console.log('Activated interface: ', data.itf, ' with task: ', tid);
			dispatch({
				action: 'start_instruction',
				pid: data.sender,
				tid: tid
			});
		}
	},
	// Inputs: pid, tid
	start_instruction: (state, data) => {
		if(data.pid === PLAYER_ID){
			console.log('Displayed instructions for task: ', data.tid);
			var task = TASKS[data.tid];
			Terminal.print(task.instruction);
			Terminal.startTimer(data.tid);
		}
	},
	// Inputs: itf, tid
	complete_task: (state, data) => {
		console.log('Completed task: ', data.tid, 'Score: ', state.score.completed.length + '-' + state.score.failed.length);
		if(state.score.completed.length > GLOBAL.WIN){
			if(data.sender === PLAYER_ID){
				dispatch({
					action: 'finish_mission'
				});
			}
		}
		var isSender = isTaskSender(state, data);
		if(isSender){
			allocateTask(); // Only the sender should allocate a new task
		}
	},
	// Inputs: tid
	fail_task: (state, data) => {
		console.log('Failed task: ', data.tid, 'Score: ', state.score.completed.length + '-' + state.score.failed.length);
		if(state.score.failed.length > GLOBAL.LOSE){
			if(data.sender === PLAYER_ID){
				dispatch({
					action: 'finish_mission'
				});
			}
		}
		var isSender = isTaskSender(state, data);
		if(isSender){
			allocateTask(); // Only the sender should allocate a new task
		}
	},
	// Inputs: void
	finish_mission: (state, data) => {
		var result = (state.score.completed > GLOBAL.WIN) ? 'Success!' : 'Failure';
		console.log('Mission finished, result: ', result, state.score.completed.length + '-' + state.score.failed.length);
		missionRef.off();
	}
}

// Messy approach to handling both actions, needs renaming
function isTaskSender(state, data){
	var sender = false;
	for(var s = 0; s < state.instructions.length; s++){
		if(state.instructions[s] === data.tid){
			sender = s;
			break;
		}
	}
	if(sender > -1){
		if(state.players[sender] === PLAYER_ID){
			return true;
		}
		else{
			return false;
		}
	}
	else{
		console.log(state);
		console.error(data.action + ': could not identify task sender!');
		return false;
	}	
}