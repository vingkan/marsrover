var MISSION_ID = false;
var db = firebase.database();
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

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
	limit: 13,
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
				sendTask();
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
			if(start === 'reload'){
				window.location.reload();
			}
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
	var mtks = 0;
	window.addEventListener('taskmistake', function(e){
		// Failure
		mtks++;
		var resRef = db.ref('results/' + MISSION_ID);
		resRef.push({success: false});
		if(navigator.vibrate && isMobile){
			console.log('we in dis')
			var vlist = [];
			for(var n = 0; n < mtks; n++){
				vlist.push(500);
				vlist.push(250);
			}
			navigator.vibrate(vlist);
		}
		else{
			console.log('sad')
			var w = 0;
			var flish = setInterval(function(){
					document.body.style.background = 'red';
				setTimeout(function(){
					document.body.style.background = 'transparent';
				}, 500);
				w++;
				if(w === mtks){
					clearInterval(flish);
				}
			}, 750);
		}
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
				playAgain();
				break;
			}
			if(failure >= 5){
				// END GAME
				alert('Too many critical errors. Mission failed.');
				winRef.off();
				playAgain();
				break;
			}
			if(victory >= 7){
				// WIN GAME
				alert('Mission success! Connection established.');
				clearCanvas();
				winRef.off();
				playAgain();
				break;
			}
		}
		console.log('Successful: ', victory, 'Errors: ', failure);
	});
}

function playAgain(){
	var ps = document.getElementsByClassName('panel');
	for(var u = 0; u < ps.length; u++){
		if(ps[u]){
			ps[u].style.display = 'none';
		}
	}
	document.getElementById('again').style.display = 'inline-block';
}

function retry(){
	createMission(MISSION_ID);
	db.ref('start/' + MISSION_ID).set('reload');
	window.location.reload();
}