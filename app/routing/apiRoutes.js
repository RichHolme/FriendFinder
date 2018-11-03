var friendsData = require("../data/friends.js");

module.exports = function(app){

	// returns all character data
	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	})

	// sums user input and returns character with closest score
	app.post("/api/friends", function(req, res) {
		friendsData.push(req.body);
		var userSum = req.body.scores.reduce(function(a, b){
    		return parseInt(a) + parseInt(b);
		});

		var matchSum = 0;
		var match;
		var friendsLength = friendsData.length - 1;
		for(var i = 0; i < friendsLength; i++){
			var option = friendsData[i].scores.reduce(function(a, b){
    			return parseInt(a) + parseInt(b);
			});

			var optionSum = userSum - option;
			optionSum = Math.abs(optionSum);

			if(i == 0){
				matchSum = optionSum;
				match = friendsData[i]
			}else if(optionSum < matchSum){
				matchSum = optionSum;
				match = friendsData[i]
			}

		}
		
		res.json(match);
	})
}