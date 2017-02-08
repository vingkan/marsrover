// Purely random method, implement structure for other strategies later
// Allocatation strategy should control player, interface, and task
function allocateTask(state){
	var pid = randomItem(state.players);
	var itf = randomItem(Object.keys(state.panels[getPlayerIndex(state, pid)]));
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
		console.log('Players in the game: ', state.players.join(', '));
		var playersPanel = document.getElementById('players');
			playersPanel.innerHTML += data.pid + ' connected to mission control.<br>';
	},
	// Inputs: void
	setup_controls: (state, data) => {
		// Dirty fix for new team formation
		db.ref('join/' + MISSION_ID).remove();
		// Deal with redundancy later
		dispatch({
			action: 'global_settings',
			win: GLOBAL.WIN,
			lose: GLOBAL.LOSE,
			limit: GLOBAL.LIMIT
		});
		document.querySelector('#welcome').style.display = 'none';
		var promises = [];
		var panelMap = state.panels[getPlayerIndex(state, PLAYER_ID)];
		var itfs = Object.keys(panelMap);
		for(var i = 0; i < itfs.length; i++){
			var interface = panelMap[itfs[i]];
			var p = ControlModule(interface.dom, itfs[i]).then((model) => {
				LOCAL_CONTROL_MODULES[model.itf] = model;
			});
			promises.push(p);
		}
		Promise.all(promises).then((done) => {
			dispatch({
				action: 'start_mission'
			});
		});
	},
	// Inputs: win, lose, limit
	global_settings: (state, data) => {

	},
	// Inputs: void
	start_mission: (state, data) => {
		if(state.playing){
			console.log('Start mission!');
			var adjacentPidx = (state.players.indexOf(PLAYER_ID) + 1) % state.players.length;
			var possibleItfs = state.panels[adjacentPidx];
			var itf = randomItem(Object.keys(possibleItfs));
			dispatch({
				action: 'start_task',
				pid: state.players[adjacentPidx],
				itf: itf
			});			
		}
		else{
			console.log(state.checkedIn + ' players are ready.');
		}
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
		var pidx = getPlayerIndex(state, data.pid);
		var interface = state.panels[pidx][data.itf];
		var tid = lastItem(interface.tasks);
		if(data.pid === PLAYER_ID){
			console.log('Activated interface: ', data.itf, ' with task: ', tid);
			var model = LOCAL_CONTROL_MODULES[data.itf];
			model.startTask(tid);
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
		reduceObscurity();
		if(state.score.completed.length > state.global.win){
			if(data.sender === PLAYER_ID){
				dispatch({
					action: 'finish_mission'
				});
			}
		}
		if(data.sender === PLAYER_ID){
			var panelID = getPanelID(data.itf);
			showPanelFeedback(panelID, true);
		}
		var isSender = isTaskSender(state, data);
		if(isSender){
			Terminal.showFeedback(true);
			allocateTask(state); // Only the sender should allocate a new task
		}
	},
	// Inputs: tid
	fail_task: (state, data) => {
		console.log('Failed task: ', data.tid, 'Score: ', state.score.completed.length + '-' + state.score.failed.length);
		if(state.score.failed.length > state.global.lose){
			if(data.sender === PLAYER_ID){
				dispatch({
					action: 'finish_mission'
				});
			}
		}
		var isSender = isTaskSender(state, data);
		if(isSender){
			Terminal.showFeedback(false);
			allocateTask(state); // Only the sender should allocate a new task
		}
		if(data.sender === PLAYER_ID){
			var itf = TASKS[data.tid].interface;
			try{
				var panelID = getPanelID(itf);
				showPanelFeedback(panelID, false);
			}
			catch(e){
				//console.log(e);
				// Suppress error for now
			}
			var mtks = state.score.failed.length;
			if(navigator.vibrate){
				var vlist = [];
				for(var n = 0; n < mtks; n++){
					vlist.push(500);
					vlist.push(250);
				}
				navigator.vibrate(vlist);
			}
			/*var w = 0;
			var flish = setInterval(function(){
					document.body.style.background = 'red';
				setTimeout(function(){
					document.body.style.background = 'transparent';
				}, 500);
				w++;
				if(w === mtks){
					clearInterval(flish);
				}
			}, 750);*/
		}
	},
	// Inputs: void
	finish_mission: (state, data) => {
		document.querySelector('#outro').style.display = 'inline-block';
		var result = (state.success) ? 'Success!' : 'Failure.';
		console.log('Mission finished, result: ', result, state.score.completed.length + '-' + state.score.failed.length);
		var ticker = document.getElementById('terminal-ticker');
			ticker.style.width = '100%';
		Terminal.print('Mission Result: ' + result);
		if(state.score.completed.length > state.global.win){
			clearCanvas();
		}
		missionRef.off();
		if(getPlayerIndex(state, PLAYER_ID) === 0){
			archiveMission();
		}
	},
	// Inputs: void
	retry: (state, data) => {
		// Need to turn missionRef back on! to allow this
		LOCAL_CONTROL_MODULES = {};
		joinMission();
		document.querySelector('#outro').style.display = 'inline-block';
	}
}