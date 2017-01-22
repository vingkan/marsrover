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
		console.log('controls', state.data.controls);
		state.data.controls[state.id][panel].interface = itf;
		UPLINK.set('controls/' + state.id + '/' + panel + '/interface', itf);
	},
	calledTask: function(tid){
		var state = this;
		return (state.data.tasks.indexOf(tid) > -1);
	},
	startTask: function(tid){
		var state = this;
		state.data.tasks.push(tid);
		UPLINK.push('tasks', tid);
	}
}

function createMission(key){
	localStorage.setItem('mars_mission_id', key);
	var ref = db.ref('missions/' + key);
		ref.off();
	var setup = ref.set({
		tasks: {'init': 'init_task'}
	});
}

function init(mission, player){

	MISSION_ID = mission;
	STATE.id = player;

	db.ref('missions/' + MISSION_ID + '/controls/' + STATE.id).set({
		'panel-1': {interface: false},
		'panel-2': {interface: false},
		'panel-3': {interface: false},
		'panel-4': {interface: false}
	});

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
			main();
			configured = true;
		}
	});

}

function main(){

	var panels = document.getElementsByClassName('panel');
	var promises = [];
	for(var p = 0; p < panels.length; p++){
		var panel = panels[p];
		var itf = InterfaceManager.getInterface(panel.id);
		if(itf){
			var promise = ControlModule(panel.id, itf);
			promises.push(promise);
		}
		else{
			console.error('All out of Usable Interfaces!');
			break;
		}
	}
	Promise.all(promises).then(function(modules){
		var midx = Math.floor(modules.length * Math.random());
		var tid = modules[midx].getTask();
		window.addEventListener('taskcompleted', function(e){
			console.log(e);
			if(e.detail.id === tid){
				midx = Math.floor(modules.length * Math.random());
				tid = modules[midx].getTask();
			}
		});
	});

}