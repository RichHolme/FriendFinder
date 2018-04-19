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
		var match;
		// var theMatch
		// var sum;
		// var option;
		// console.log('for loop begining');
		// console.log(friendsData[0]);
		var friendsLength = friendsData.length - 1;
		for(var i = 0; i < friendsLength; i ++){
			// console.log('for loop working');
			// option = friendsData[i].scores;
			// console.log(option);
			var option = friendsData[i].scores.reduce(function(a, b){
    			return parseInt(a) + parseInt(b);
			});

			console.log(friendsData[i].name + " option: " +option);
			var optionSum = userSum - option;
			optionSum = Math.abs(optionSum);
			console.log("option sum: " + optionSum);
			if(i == 0){
				// console.log('0 set');
				matchSum = optionSum;
				match = friendsData[i]
			}else if(optionSum < matchSum){
				// console.log('better option');
				matchSum = optionSum;
				match = friendsData[i]
				// console.log(matchName);
			}

		}

		console.log('your match: ' + match.name);
		res.json(match);
	})
}