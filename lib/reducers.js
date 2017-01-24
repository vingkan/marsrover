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
});

function dispatch(data){
	data.sender = PLAYER_ID;
	missionRef.push(data);
}

function getPlayerIndex(pid){
	return STATE.players.indexOf(pid);
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
					task: false
				}
			}
			return panelMap;
		});
		state.panels = itfs;
		return state;
	},
	// Inputs: pid, itf, tid
	assign_task: (state, data) => {
		var pidx = getPlayerIndex(data.pid);
		var panelMap = state.panels[pidx];
		var itf = panelMap[data.itf];
		if(itf){
			itf.task = data.tid;
		}
		else{
			console.error('assign_task: could not find interface');
		}
		if(data.pid === PLAYER_ID){
			//Render? LOL
		}
		return state;
	}
}