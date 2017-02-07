var COLOR_SCHEME = {
	'gray': '#1a1a1a',
	'blue': '#00f',
	'purple': '#551a8b',
	'orange': '#ffa500',
	'green': '#00ff00'
}

var InterfaceGenerator = {
	'buttongroup': {
		render: function(id, interface){
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
		},
		activate: function(id, model, interface){
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
	},
	'functiongenerator': {
		render: (id, interface) => {
			var panel = document.getElementById(id);
			var html = '<div class="module module-buttongroup">'
				html += '<h2>' + interface.name + '</h2>'
				html += '<input type="range" class="scale a" min="0" max="3" step="1" value="0">'
				html += '<input type="range" class="scale b" min="0" max="3" step="1" value="0">'
				html += '<button>' + interface.command + '</button>'
				html += '<canvas class="function-generator-canvas" width="275" height="180"></canvas>'
			panel.innerHTML = html;
			var RenderedEvent = new CustomEvent('rendered', {
				detail: {id: id}
			});
			panel.dispatchEvent(RenderedEvent);
		},
		drawFunction: (canvas, fn) => {
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'black';
			ctx.fill();
			ctx.closePath();
			var f = {
				sinusoidal: (x) => {
					var theta = (x/canvas.width) * 4 * Math.PI;
					return (0.5 * canvas.height) * Math.sin(theta)
				},
				linear: (x) => {
					return (canvas.height/canvas.width) * x;
				},
				parabolic: (x) => {
					return Math.pow(x/(canvas.width * 0.05), 2);
				},
				scatter: (x) => {
					return canvas.height * ((2 * Math.random()) - 1);
				}
			}
			ctx.beginPath();
			ctx.fillStyle = fn.color;
			for(var x = (-0.5 * canvas.width); x < (0.5 * canvas.width); x++){
				var y = f[fn.type](x);
				ctx.rect((0.5 * canvas.width) + x, (0.5 * canvas.height) - y, 1, 1);
				ctx.fill();
			}
			ctx.closePath();
		},
		activate: (id, model, interface) => {
			var generator = InterfaceGenerator['functiongenerator'];
			var panel = document.getElementById(id);
			var canvas = panel.getElementsByTagName('canvas')[0];
			var scales = panel.getElementsByClassName('scale');
			for(var s = 0; s < scales.length; s++){
				scales[s].addEventListener('input', (e) => {
					var a = parseInt(scales[0].value, 10);
					var b = parseInt(scales[1].value, 10);
					var fn = interface.generator(a, b);
					generator.drawFunction(canvas, fn);
				});
			}
			var a = parseInt(scales[0].value, 10);
					var b = parseInt(scales[1].value, 10);
					var fn = interface.generator(a, b);
					generator.drawFunction(canvas, fn);
			var button = panel.getElementsByTagName('button')[0];
			button.addEventListener('click', function(e){
				var a = parseInt(scales[0].value, 10);
				var b = parseInt(scales[1].value, 10);
				model.attempt(interface.generator(a, b));
			});
		}
	},
	'arcgauge': {
		render: function(id, interface){
			var panel = document.getElementById(id);
			var html = '<div class="module module-arcgauge">'
				html += '<h2>' + interface.name + '</h2>'
				html += '<div class="arcgauge" id="arcgauge-' + id + '"></div>'
				html += '<button>' + interface.command + '</button>'
				html += '</div>'
			panel.innerHTML = html;
			var RenderedEvent = new CustomEvent('rendered', {
				detail: {id: id}
			});
			panel.dispatchEvent(RenderedEvent);
		},
		activate: function(id, model, interface){
			var panel = document.getElementById(id);
			var input = false;
			var config = {
				min: interface.config.min || 0,
				max: interface.config.max || 100,
				step: interface.config.step || 5,
				type: interface.config.type || 'min-range'

			}
			$('#arcgauge-' + id).roundSlider({
				min: config.min,
				max: config.max,
				step: config.step,
				value: config.type === 'min-range' ? 0 : [0, 90],
				radius: 85,
				width: 16,
				handleSize: '+0',
				startAngle: 0,
				endAngle: '+360',
				animation: true,
				showTooltip: true,
				editableTooltip: false,
				readOnly: false,
				disabled: false,
				keyboardAction: true,
				mouseScrollAction: false,
				sliderType: config.type,
				circleShape: 'full',
				handleShape: 'round',
				lineCap: 'square',
				// Events
				drag: (e) => {
					//console.log(e);
					if(config.type === 'range'){
						var range = e.value.split(',').map(val => parseFloat(val, 10));
						input = range;
					}
					else{
						input = e.value;
					}
				}
			});
			var button = panel.getElementsByTagName('button')[0];
			button.addEventListener('click', function(e){
				if(input){
					model.attempt(input);
				}
			});
		}
	},
	'numberpad': {
		render: function(id, interface){
			var panel = document.getElementById(id);
			var rows = interface.buttons.length;
			var cols = interface.buttons[0].length;
			var html = '<div class="module module-numberpad">'
				html += '<h2>' + interface.name + '</h2>'
			var pad = '';
			for(var r = 0; r < rows; r++){
				var row = '';
				for(var c = 0; c < cols; c++){
					var n = interface.buttons[r][c];
					row += '<button class="numbutton active" data-number="' + n + '">' + n + '</button>'
				}
				pad += '<div class="buttonrow">' + row + '</div>'
			}
				html += '<div class="numberpad">' + pad + '</div>'
				html += '<button id="numberpad-' + id + '">' + interface.command + '</button>'
				html += '</div>'
			panel.innerHTML = html;
			var RenderedEvent = new CustomEvent('rendered', {
				detail: {id: id}
			});
			panel.dispatchEvent(RenderedEvent);
		},
		activate: function(id, model, interface){
			var panel = document.getElementById(id);
			var input = 0;
			var bs = panel.getElementsByClassName('numbutton');
			function forEachButton(fn){
				for(var b = 0; b < bs.length; b++){
					var nb = bs[b];
					fn(nb);
				}
			}
			forEachButton(function(nb){
				nb.addEventListener('click', function(e){
					input += parseInt(e.target.dataset.number, 10);
					console.log(input)
					e.target.disabled = true;
				});
			});
			var button = panel.querySelector('#numberpad-' + id);
			button.addEventListener('click', function(e){
				console.log(input)
				model.attempt(input);
				input = 0;
				forEachButton(function(nb){
					nb.disabled = false;
				});
			});
			console.log('activated')
		}
	}
}

var ControlModule = function(id, itf){
	var interface = INTERFACES[itf];
	var render = InterfaceGenerator[interface.type].render;
	var activate = InterfaceGenerator[interface.type].activate;
	if(!render || !activate){
		console.error('Cannot find Interface Type.');
	}
	var model = {
		panel: id,
		itf: itf,
		task: false,
		attempt: function(value){
			if(this.task){
				var success = this.task.validate(value);
				var tid = this.task.id;
				if(success){
					dispatch({
						action: 'complete_task',
						itf: itf,
						tid: tid
					});
				}
				else{
					dispatch({
						action: 'fail_task',
						tid: tid
					});
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