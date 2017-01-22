var MISSION_ID = false;
var db = firebase.database();

var UPLINK = {
	set: function(path, value){
		var ref = db.ref('missions/' + MISSION_ID + '/' + path);
			ref.set(value);
	},
	push: function(path, value){
		var ref = db.ref('missions/' + MISSION_ID + '/' + path);
			ref.push(value);
	}
}

var STATE = {
	id: false,
	data: {},
	usingInterface: function(itf){
		var state = this;
		var res = false;
		for(var c in state.data.controls){
			var panels = state.data.controls[c].panels;
			for(var p in panels){
				var panel = panels[p];
				if(panel.interface === itf){
					res = true;
					break;
				}
			}
			if(res){
				break;
			}
		}
		return res;
	},
	installInterface: function(panel, itf){
		var state = this;
		state.data.controls[state.id][panel].interface = itf;
		UPLINK.set('controls/' + state.id + '/' + panel + '/interface', itf);
	},
	calledTask: function(tid){
		var state = this;
		return (state.data.tasks.indexOf(tid) > -1);
	},
	reserveTask: function(tid){
		var state = this;
		state.data.tasks.push(tid);
		UPLINK.push('tasks', tid);
		/*state.data.controls[state.id][panel].task = tid;
		UPLINK.set('controls/' + state.id + '/' + panel + '/task', tid);*/
	}
}

var Terminal = {
	print: function(message){
		var terminal = document.getElementById('terminal-mission');
		terminal.innerText = message;
	}
}

var LOCAL = {
	panels: false
}

function createMission(key){
	var ref = db.ref('missions/' + key);
		ref.off();
		ref.remove();
	var playersRef = db.ref('players/' + key);
		playersRef.off();
		playersRef.remove();
	var setup = ref.set({
		tasks: {'init': 'init_task'}
	});
	return setup;
}

var CAN_START = false;

var startB = document.getElementById('start');
	startB.addEventListener('click', function(e){
		if(CAN_START){
			db.ref('start/' + MISSION_ID).set(true);
		}
	});

db.ref('start/' + MISSION_ID).on('value', function(snapshot){
	var start = snapshot.val();
	if(start){
		// Start Game
		sendTask();
	}
});

function join(mission, player){

	MISSION_ID = mission;
	STATE.id = player;

	db.ref('start/' + MISSION_ID).set(false);

	var playersRef = db.ref('players/' + MISSION_ID)
	playersRef.on('child_added', function(snapshot){
		var val = snapshot.val();
		var playersPanel = document.getElementById('players');
			playersPanel.innerHTML += val.player + ' joined the mission.<br>';
	});
	playersRef.push({
		player: STATE.id,
		loaded: false
	}).then(function(joined){
		playersRef.once('value', function(playersSnap){
			var val = playersSnap.val();
			var pc = 0;
			for(var i in val){
				pc++;
				if(val[i].player === STATE.id){
					break;
				}
			}
			console.log('You are Player #' + pc);
			var itfs = PLAYER_ITFS[pc];
			LOCAL = itfs;
			db.ref('missions/' + MISSION_ID + '/controls/' + STATE.id).set({
				'panel-1': {interface: itfs[0], task: false},
				'panel-2': {interface: itfs[1], task: false},
				'panel-3': {interface: itfs[2], task: false},
				'panel-4': {interface: false, task: false}
			});
			
		});
	});

	playersRef.on('value', function(snapshot){
		var playersMap = snapshot.val();
		var waiting = true;
		for(var i in playersMap){
			var p = playersMap[i];
			if(!p.loaded){
				waiting = false;
			}
		}
		if(!waiting){
			CAN_START = true;
			startB.disabled = false;
		}
		else{
			CAN_START = false;
			startB.disabled = true;
		}
	});

}

function sendTask(){
	var controlsRef = db.ref('missions/' + MISSION_ID + '/controls');
	controlsRef.once('value', function(snapshot){
		var controls = snapshot.val();
		var members = [];
		for(var member in controls){
			var panels = [];
			for(var p in controls[member]){
				var panel = controls[member][p];
				if(panel.task === false){
					panels.push({
						id: p,
						interface: panel.interface
					});
				}
			}
			members.push({
				player: member,
				panels: panels
			});
		}
		members = members.sort(function(a, b){
			return b.panels.length - a.panels.length;
		});
		var assignTo = members[0];
		var pidx = Math.floor(assignTo.panels.length * Math.random());
		var itf = assignTo.panels[pidx].interface;
		var panel_id = assignTo.panels[pidx].id;
		var tid = TaskManager.getTask(itf);
		var inbox = db.ref('tasks/' + MISSION_ID + '/' + assignTo.player);
		var promise = inbox.push({
			panel: panel_id,
			interface: itf,
			task: tid,
			assigned: Date.now()
		});
		promise.then(function(done){
			var task = TASKS[tid];
			Terminal.print(task.instruction);
		});
	});
}

function loadPanels(itfs){
	var promises = [];
	var panels = document.getElementsByClassName('panel-module');
	for(var p = 0; p < itfs.length; p++){
		var panel = panels[p];
		var itf = itfs[p];
		promises.push(ControlModule(panel.id, itf));
	}
	Promise.all(promises).then(function(modules){
		var panelMap = {};
		for(var m = 0; m < modules.length; m++){
			var mp = modules[m];
			panelMap[mp.panel] = mp;
		}
		LOCAL.panels = panelMap;
		connect();
	});
}

function connect(){
	var configured = false;
	var ref = db.ref('missions/' + MISSION_ID);
	ref.on('value', function(snapshot){
		var val = snapshot.val();
		var tasks = [];
		for(var t in val.tasks){
			tasks.push(val.tasks[t]);
		}
		val.tasks = tasks;
		STATE.data = val;
		if(!configured){
			configured = true;
			init();
		}
	});	
}

function init(){
	// Listen for completions
	window.addEventListener('taskcompleted', function(e){
		// Victory
		sendTask();
	});
	// Listen for mistakes
	window.addEventListener('taskmistake', function(e){
		// Failure
	});
	var inbox = db.ref('tasks/' + MISSION_ID + '/' + STATE.id);
	inbox.on('child_added', function(snapshot){
		var newTask = snapshot.val();
		var panel = LOCAL.panels[newTask.panel];
			panel.startTask(TASKS[newTask.task]);
	});
	db.ref('players/' + MISSION_ID + '/' + STATE.id + '/loaded').set(true);
}