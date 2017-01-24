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
		}
	},
	// Inputs: itf, tid
	complete_task: (state, data) => {
		console.log('Completed task: ', data.tid, 'Score: ', state.score.completed.length + '-' + state.score.failed.length);
		if(state.score.completed > GLOBAL.WIN){
			if(data.sender === PLAYER_ID){
				dispatch({
					action: 'finish_mission'
				});
			}
		}
		//if(data.sender === )
		// TODO: Tell sender that they can load a new instruction
	},
	// Inputs: tid
	fail_task: (state, data) => {
		console.log('Failed task: ', data.tid, 'Score: ', state.score.completed.length + '-' + state.score.failed.length);
		if(state.score.failed > GLOBAL.LOSE){
			if(data.sender === PLAYER_ID){
				dispatch({
					action: 'finish_mission'
				});
			}
		}
	},
	// Inputs: void
	finish_mission: (state, data) => {
		var result = (state.score.completed > GLOBAL.WIN) ? 'Success!' : 'Failure';
		console.log('Mission finished, result: ', result, state.score.completed.length + '-' + state.score.failed.length);
	}
}