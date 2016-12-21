var Game = function(total) {
	this.total = total;
	this.imageLocation = [];	
	this.score = 0;
	
	this.initialize = function () {
		this.score = 0;
		this.last = -1;
		this.current = -1;
		
		var temp = [];
		var i = 0;	
		while (this.imageLocation.length < this.total) {		
			var index = Math.floor(Math.random() * (6 - 1 + 1));
			if (temp[index]) {
				temp[index] += 1;
			} else {
				temp[index] = 1;
			}
			if (temp[index] < 3) {
				this.imageLocation[i] = index + 1;				
				i++;
			}		
		}
	};
	
	this.calculateScore = function (last, current) {						
		if (this.imageLocation[last] == this.imageLocation[current]) {			
			this.score += 5;
			return 'match';
		} else {			
			this.score -= 2;
			return 'mismatch';
		}					
	};	
};

(function (window) {	
	var game, lastClicked;	

	function initialize() {
		$("img").off('click');
		$("img").click(imageClicked);			
		$("img" ).attr('src', "images/start.png");
		$("#score").text(0);
		$("#score").attr('class', 'label label-default')
		game = new Game(12);
		game.initialize();
		lastClicked = -1;				
	}
	
	function toggleImage (id) {
		var imageName = $("#" + id).attr('src');
		if (imageName.includes('start.png')) {
			$("#" + id).fadeOut(150, function () {
				$("#" + id).attr('src', "images/" + "images" + game.imageLocation[id-1] + ".jpeg");				
				$("#" + id).fadeIn('fast');	
			});									
		} else {
			$("#" + id).fadeOut(150, function () {
				$("#" + id).attr('src', "images/start.png");	
				$("#" + id).fadeIn('fast');	
			});			
		}
	}

	function imageClicked(event) {
		toggleImage(this['id']);		

		if (lastClicked === -1) {
			lastClicked = this['id'];				
		} else if (this['id'] == lastClicked){
			lastClicked = -1;				
		} else {				
			result = game.calculateScore(lastClicked - 1, this['id'] - 1);				
			
			$("#score").text(game.score);
			if (game.score == 0) {
				$("#score").attr('class', 'label label-default')
			} else if (game.score < 0) {
				$("#score").attr('class', 'label label-danger')
			} else {
				$("#score").attr('class', 'label label-success')
			}

			if (result === 'match'){				
				$("#" + lastClicked).off('click');		
				$("#" + this['id']).off('click');		
				lastClicked = -1;
			} else {
				toggleImage(lastClicked);
				lastClicked = this['id'];
			}
		}
	}

	$(document).ready(function(){		
		initialize();		
		$(".navbar-brand").click(initialize);
	});

})(window);