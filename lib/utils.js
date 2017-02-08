function joinMission(){
	dispatch({
		action: 'add_player',
		pid: PLAYER_ID
	});
}

function init(){
	dispatch({
		action: 'setup_controls'
	});
}

function resetRef(){
	missionRef.off();
	missionRef.remove();
}

var Terminal = {
	limit: GLOBAL.LIMIT,
	startTime: Date.now(),
	print: function(message){
		var terminal = document.getElementById('terminal-text');
		terminal.innerHTML = '<p class="typewriter">' + message + '</p>';
		terminal.style.opacity = 1.0;
	},
	startTimer: function(tid){
		var tmn = this;
		tmn.startTime = Date.now();
		var itx = setInterval(function(){
			var elapsed = Date.now() - tmn.startTime;
			var remaining = (tmn.limit * 1000) - elapsed;
			var per = remaining / (tmn.limit * 1000);
			if(STATE.playing){
				if(per < 0){
					clearInterval(itx);
					dispatch({
						action: 'fail_task',
						tid: tid
					});
				}
				else{
					/*var terminal = document.getElementById('terminal-text');
						terminal.style.opacity = per;*/
					var ticker = document.getElementById('terminal-ticker');
						ticker.style.width = (per * 100) + '%';
				}
			}
			else{
				clearInterval(itx);
				var result = (STATE.score.completed.length > GLOBAL.WIN) ? 'Success!' : 'Failure.';
				/*var terminal = document.getElementById('terminal-text');
					terminal.style.opacity = 1.0;*/
				var ticker = document.getElementById('terminal-ticker');
					ticker.style.width = '100%';
				Terminal.print('Mission Result: ' + result);
			}
		}, 1000);
	},
	showFeedback: function(success){
		var color = success ? 'green' : 'red';
		var terminal = document.getElementById('terminal-mission');
		//var ogbg = terminal.style.background;
			terminal.style.opacity = 1.0;
			terminal.style.background = color;
		setTimeout(function(){
			terminal.style.background = '#000000'; // Also brittle lmao
		}, 500);
	}
}

function selectItfs(list, n){
	var out = []
	while(out.length < n){
		var ridx = Math.floor(list.length * Math.random());
		out.push(list.splice(ridx, 1)[0]);
	}
	return out;
}

var LOCAL_CONTROL_MODULES = {};

function getPanelID(itf){
	// Watch this one for sketchy behavior
	return LOCAL_CONTROL_MODULES[itf].panel;
}

function showPanelFeedback(id, success){
	var color = success ? 'green' : 'red';
	var panel = document.getElementById(id);
	//var ogbc = panel.style.borderColor;
		panel.style.borderColor = color;
	setTimeout(function(){
			panel.style.borderColor = '#02080D'; // Brittle lmao
	}, 500);
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

function archiveMission(){
	missionRef.once('value', function(snapshot){
		var tree = snapshot.val();
		var p = db.ref('archives/' + MISSION_ID).push(tree);
		p.then((done) => {
			console.log('Saved to archives: ', done);
			resetRef();
		})
	});
}