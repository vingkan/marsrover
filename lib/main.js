var STATE = {};

var GLOBAL = {
	WIN: 7,
	LOSE: 5,
	LIMIT: 27
}

var db = firebase.database();
var gref = db.ref('globals');
var missionRef = db.ref(MISSION_PATH);

function main(){

	gref.once('value', function(snapshot){
		var val = snapshot.val();
		GLOBAL.WIN = val.win || 10;
		GLOBAL.LOSE = val.lose || 10;
		GLOBAL.LIMIT = 27;
	}).then((done) => {

		missionRef.orderByChild('timestamp').on('child_added', function(snapshot){
			var data = snapshot.val();
			var reducer = REDUCERS[data.action];
			if(reducer){
				STATE = reducer(clone(STATE), data);
			}
			var renderer = RENDERERS[data.action];
			if(renderer){
				renderer(STATE, data);
			}
		});

	});
}
