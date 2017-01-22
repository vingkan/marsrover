var COLOR_SCHEME = {
	'gray': '#1a1a1a',
	'blue': '#00f',
	'purple': '#551a8b',
	'orange': '#ffa500',
	'green': '#00ff00'
}

var RenderButtonGroup = function(id, interface){
	var panel = document.getElementById(id);
	var html = '<div class="module module-buttongroup">'
		html += '<h2>' + interface.name + '</h2>'
		for(var b = 0; b < interface.options.length; b++){
			var option = interface.options[b];
			html += '<button style="background: ' + COLOR_SCHEME[option.color] + ';" data-option="' + b + '">' + option.name + '</button>'
		}
		html += '</div>'
	panel.innerHTML = html;
	var RenderedEvent = new CustomEvent('rendered', {
		detail: {id: id}
	});
	panel.dispatchEvent(RenderedEvent);
}

var ActivateButtonGroup = function(id, model, interface){
	var panel = document.getElementById(id);
	var buttons = panel.getElementsByTagName('button');
	for(var b = 0; b < buttons.length; b++){
		var button = buttons[b];
		button.addEventListener('click', function(e){
			var el = e.target;
			var oidx = parseInt(el.dataset.option, 10);
			model.attempt(interface.options[oidx]);
		});
	}
}

var ControlModule = function(id, itf){
	var interface = INTERFACES[itf];
	//STATE.installInterface(id, itf);
	var render = false;
	var activate = false;
	switch(interface.type){
		case 'buttongroup':
			render = RenderButtonGroup;
			activate = ActivateButtonGroup;
			break;
		default:
			console.error('Interface Ftype not found.');
	}
	var model = {
		panel: id,
		task: false,
		attempt: function(value){
			if(this.task){
				var success = this.task.validate(value);
				var tid = this.task.id;
				if(success){
					// Get New Task
					console.log('Completed Task: ' + tid);
					LOCAL.panels[this.panel].task = false;
					UPLINK.set('controls/' + STATE.id + '/' + this.panel + '/task', false);
					var CompletedEvent = new CustomEvent('taskcompleted', {
						detail: {
							id: tid
						}
					});
					window.dispatchEvent(CompletedEvent);
				}
				else{
					// Handle Failure
					console.log('Failed Task: ' + tid);
					var MistakeEvent = new CustomEvent('taskmistake', {
						detail: {
							id: tid
						}
					});
					window.dispatchEvent(MistakeEvent);
				}
			}
			else{
				console.trace();
				console.error('No Task!');
			}
		},
		startTask: function(tid){
			var _this = this;
			if(tid){
				var task = TASKS[tid];
					task.id = tid;
				_this.task = task;
				console.log('Assigned Task: ' + tid);
			}
			else{
				console.error('All out of Usable Tasks!');
				console.error('SHOULD NEVER REACH HERE!');
			}
			return tid;
		}
	}
	var promise = new Promise(function(resolve, reject){
		var panel = document.getElementById(id);
		panel.addEventListener('rendered', function(e){
			if(e.detail.id === id){
				console.log('Finished Rendering.');
				activate(id, model, interface);
				resolve(model);
			}
		});
		render(id, interface);
	});
	return promise;
}