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
			console.log('Start mission!');	
		}
		else{
			console.log(state.checkedIn + 'players are ready.');
		}
	},
	// Inputs: pid, itf
	start_task: (state, data) => {
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
		var result = (state.score.completed.length > GLOBAL.WIN) ? 'Success!' : 'Failure';
		console.log('Mission finished, result: ', result);
		console.log('Score:', state.score.completed.length + '-' + state.score.failed.length);
	},
	// Inputs: void
	retry: (state, data) => {

	}
}