var MISSION_ID = localStorage.getItem('mission_id');
var db = firebase.database();

var UPLINK = {
	set: function(path, value){
		var levels = path.split('/');
		var target = STATE.data;
		for(var l = 0; l < levels.length; l++){
			target = target[levels[l]];
		}
		target = value;
		var ref = db.ref('missions/' + MISSION_ID + '/' + path);
			ref.set(value);
		//state.data.controls[state.id].panels[panel].interface = itf;
	},
	push: function(path, value){
		var levels = path.split('/');
		var target = STATE.data;
		for(var l = 0; l < levels.length; l++){
			target = target[levels[l]];
		}
		target.push(value);
		var ref = db.ref('missions/' + MISSION_ID + '/' + path);
			ref.push(value);
	}
}

var STATE = {
	id:
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
		UPLINK.set('controls/' + state.id + '/panels/' + panel + '/interface', itf);
	},
	calledTask: function(tid){
		var state = this;
		return (state.data.tasks.indexOf(tid) > -1);
	},
	startTask: function(tid){
		var state = this;
		UPLINK.push('tasks', tid);
	}
}

if(MISSION_ID){

	var ref = db.ref('missions/' + MISSION_ID);
	ref.on('value', function(snapshot){
		STATE.data = snapshot.val();
	});

}
