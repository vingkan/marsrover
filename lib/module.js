var RenderButtonGroup = function(id, interface){
	var panel = document.getElementById(id);
	var html = '<div class="module module-buttongroup">'
		html = '<h2>' + interface.name + '</h2>'
		for(var b = 0; b < interface.options.length; b++){
			var option = interface.options[b];
			html += '<button data-option="' + option + '">' + option + '</button>'
		}
		html += '</div>'
	panel.innerHTML = html;
	var RenderedEvent = new CustomEvent('rendered', {
		detail: {id: id}
	});
	panel.dispatchEvent(RenderedEvent);
}

var ActivateButtonGroup = function(id, task, model){
	var panel = document.getElementById(id);
	var buttons = panel.getElementsByTagName('button');
	for(var b = 0; b < buttons.length; b++){
		var button = buttons[b];
		button.addEventListener('click', function(e){
			var el = e.target;
			var res = task.validate({
				option: el.dataset.option
			});
			console.log(el.dataset.option)
			model.attempt(res, task.id);
		});
	}
}

var ControlModule = function(id, interface){
	var model = {
		attempt: function(success, tid){
			if(success){
				// Get New Task
				//this.assignTask(newTask);
				console.log('Completed Task: ' + tid);
			}
			else{
				// Handle Failure
				console.log('Failed Task: ' + tid);
			}
		},
		assignTask: function(task){
			console.log('Assigned Task.');
			ActivateButtonGroup(id, task, this);
		}
	}
	var promise = new Promise(function(resolve, reject){
		var panel = document.getElementById(id);
		panel.addEventListener('rendered', function(e){
			if(e.detail.id === id){
				console.log('Finished Rendering.');
				resolve(model);
			}
		});
		RenderButtonGroup(id, interface);
	});
	return promise;
}