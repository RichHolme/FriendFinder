var friendsData = require("../data/friends.js");

module.exports = function(app){

	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	})

	app.post("/api/friends", function(req, res) {
		friendsData.push(req.body);
		var userSum = req.body.scores.reduce(function(a, b){
    		return parseInt(a) + parseInt(b);
		});

		console.log(userSum);
		var matchSum = 0;
		var matchName;
		// var sum;
		var option;
		// console.log('for loop begining');
		// console.log(friendsData[0]);
		for(var i = 0; i < friendsData.length; i ++){
			// console.log('for loop working');
			option = friendsData[i].scores;
			// console.log(option);
			var sum = option.reduce(function(a, b){
    			return parseInt(a) + parseInt(b);
			});

			// console.log(sum);
			var optionSum = userSum - option;

			if(i == 0){
				// console.log('0 set');
				matchSum = optionSum;
				matchName = friendsData[i].name
			}else if(optionSum < matchSum){
				// console.log('better option');
				matchSum = optionSum;
				matchName = friendsData[i].name
				// console.log(matchName);
			}else{
				// console.log('no option');
				matchSum = matchSum;
				matchName = matchName;
				// console.log(matchName);
			}
		}

		console.log('your match: ' +matchName);
	})
}