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
		//console.log(state.data);
		state.data.controls[state.id][panel].interface = itf;
		UPLINK.set('controls/' + state.id + '/' + panel + '/interface', itf);
	},
	calledTask: function(tid){
		var state = this;
		return (state.data.tasks[state.data.tasks.length-1] === tid);
		//return (state.data.tasks.indexOf(tid) > -1);
		//return false;
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
	limit: 11,
	startTime: Date.now(),
	print: function(message){
		var terminal = document.getElementById('terminal-mission');
		terminal.innerHTML = '<p class="typewriter">' + message + '</p>';
	},
	startTimer: function(tid){
		var tmn = this;
		tmn.startTime = Date.now();
		var itx = setInterval(function(){
			var elapsed = Date.now() - tmn.startTime;
			var remaining = (tmn.limit * 1000) - elapsed;
			var per = remaining / (tmn.limit * 1000);
			if(per < 0){
				clearInterval(itx);
				console.log('Failed Task: ' + tid);
				var MistakeEvent = new CustomEvent('taskmistake', {
					detail: {
						id: tid,
						reason: 'Ran out of time!'
					}
				});
				window.dispatchEvent(MistakeEvent);
			}
			else{
				var terminal = document.getElementById('terminal-mission');
				terminal.style.opacity = per;
			}
		}, 1000);
	}
}

var LOCAL = {
	panels: false
}

function removeAtPath(path){
	var ref = db.ref(path);
		ref.off();
		ref.remove();
}

function createMission(key){
	removeAtPath('missions/' + key);
	removeAtPath('players/' + key);
	removeAtPath('results/' + key);
	removeAtPath('start/' + key);
	removeAtPath('tasks/' + key);
	var ref = db.ref('missions/' + key);
	var setup = ref.set({
		tasks: {'init': 'init_task'}
	});
	return setup;
}

var CAN_START = false;
var PUSH_ID = false;

function sendTask(){
	var controlsRef = db.ref('missions/' + MISSION_ID + '/controls');
	controlsRef.once('value', function(snapshot){
		var controls = snapshot.val();
		var members = [];
		for(var member in controls){
			var panels = [];
			for(var p in controls[member]){
				if(member !== STATE.id){
					var panel = controls[member][p];
					if(!panel.task){
						panels.push({
							id: p,
							interface: panel.interface
						});
					}
				}
			}
			if(panels.length > 0){
				members.push({
					player: member,
					panels: panels
				});
			}
		}
		if(members.length > 1){
			members = members.sort(function(a, b){
				return b.panels.length - a.panels.length;
			});
		}
		if(members.length > 0){
			var assignTo = members[0];
			var pidx = Math.floor(assignTo.panels.length * Math.random());
			var itf = assignTo.panels[pidx].interface;
			var panel_id = assignTo.panels[pidx].id;
			var tid = TaskManager.getTask(itf);
			if(tid){
				var inbox = db.ref('tasks/' + MISSION_ID + '/' + assignTo.player);
				var promise = inbox.push({
					origin: STATE.id,
					panel: panel_id,
					interface: itf,
					task: tid,
					assigned: Date.now()
				});
				promise.then(function(done){
					var task = TASKS[tid];
					Terminal.print(task.instruction);
					Terminal.startTimer(tid);
				});
			}
			else{
				console.error('All out of Usable Tasks!');
				var resRef = db.ref('results/' + MISSION_ID);
				resRef.push({
					disaster: true,
					reason: 'All out of Usable Tasks!'
				});
			}
		}
		else{
			console.log('No one to send tasks to.');
			Terminal.print('You look nice today.');
		}
	});
}

function join(mission, player){

	MISSION_ID = mission;
	STATE.id = player;

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
			console.log('Started Game.');
			var wel = document.getElementById('welcome');
			wel.style.display = 'none';
			sendTask();
		}
	});

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
		PUSH_ID = joined.key;
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
			var itfs = PLAYER_ITFS[pc-1];
			STATE.data.controls = {};
			STATE.data.controls[STATE.id] = {};
			loadPanels(itfs);
		});
	});

	playersRef.on('value', function(snapshot){
		var playersMap = snapshot.val();
		var waiting = false;
		var counter = 0;
		for(var i in playersMap){
			var p = playersMap[i];
			if(!p.loaded){
				waiting = true;
			}
			counter++;
		}
		if(counter < 2){
			waiting = true;
		}
		if(!waiting){
			CAN_START = true;
			startB.disabled = false;
			console.log('All players are ready to start the mission.')
		}
		else{
			CAN_START = false;
			startB.disabled = true;
			console.log('Players are not ready to start the mission.')
		}
	});

}

function loadPanels(itfs){
	var promises = [];
	var panels = document.getElementsByClassName('panel-module');
	var map = {};
	for(var p = 0; p < itfs.length; p++){
		var panel = panels[p];
		var itf = itfs[p];
		//console.log(STATE.data.controls[STATE.id], panel.id)
		map[panel.id] = {interface: itf};
		promises.push(ControlModule(panel.id, itf));
	}
	STATE.data.controls[STATE.id] = map;
	UPLINK.set('controls/' + STATE.id, map);
	Promise.all(promises).then(function(modules){
		var panelMap = {};
		console.log('modules', modules)
		for(var m = 0; m < modules.length; m++){
			var mp = modules[m];
			panelMap[mp.panel] = mp;
		}
		console.log('panelMap', panelMap)
		LOCAL.panels = panelMap;
		console.log('All panels loaded');
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
			console.log('Connected to Firebase.');
			init();
		}
	});	
}

function init(){
	var originMap = {};
	// Listen for completions
	window.addEventListener('taskcompleted', function(e){
		// Victory
		var resRef = db.ref('results/' + MISSION_ID);
		resRef.push({success: true});
		var returnTo = originMap[e.detail.id];
		var outbox = db.ref('tasks/' + MISSION_ID + '/' + returnTo);
		outbox.push({
			completed: true,
			by: STATE.id
		});
		reduceObscurity();
		//sendTask(); This should never run here (Sunny + Graph Theory)
	});
	// Listen for mistakes
	window.addEventListener('taskmistake', function(e){
		// Failure
		var resRef = db.ref('results/' + MISSION_ID);
		resRef.push({success: false});
	});
	var inbox = db.ref('tasks/' + MISSION_ID + '/' + STATE.id);
	inbox.on('child_added', function(snapshot){
		var newTask = snapshot.val();
		if(newTask.completed){
			sendTask();
		}
		else{
			var panel = LOCAL.panels[newTask.panel];
			panel.startTask(newTask.task);
			originMap[newTask.task] = newTask.origin;
		}
	});
	db.ref('players/' + MISSION_ID + '/' + PUSH_ID + '/loaded').set(true);
	console.log('Ready to start mission.');
	// Keep Score
	var winRef = db.ref('results/' + MISSION_ID)
	winRef.on('value', function(snapshot){
		var val = snapshot.val();
		var victory = 0;
		var failure = 0;
		for(var i in val){
			var node = val[i];
			if(node.success){
				victory++;
			}
			else{
				failure++;
			}
			if(node.disaster){
				alert('System failure! Mission cannot be completed.');
				winRef.off();
				break;
			}
			if(failure >= 3){
				// END GAME
				alert('Too many critical errors. Mission failed.');
				winRef.off();
				break;
			}
			if(victory >= 7){
				// WIN GAME
				alert('Mission success! Connection established.');
				clearCanvas();
				winRef.off();
				break;
			}
		}
		console.log('Successful: ', victory, 'Errors: ', failure);
	});
}