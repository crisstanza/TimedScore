/***************************************************************
 *************** LIBRARY: Timed Score Vs. 1.1.0 ****************
 ***************************************************************/

var TimedScore = function(idTime, idTotal1, idTotal2) {
	this.idTime = idTime;
	this.idTotal1 = idTotal1;
	this.idTotal2 = idTotal2;
	this.time = undefined;
	this.timer = undefined;
	this.limit = undefined;
	this.limitCallback = undefined;
};

(function() {

	var DELAY = 500;
	var SEP = ':';
	var DEFAULT_TIME = '00:00';

	TimedScore.dec2 = function(n) {
		n = Math.floor(n);
		return n >= 10 ? n : '0' + n;
	};

	TimedScore.dec2opt = function(n, sep) {
		n = Math.floor(n);
		return n > 0 ? TimedScore.dec2(n) + sep : '';
	};

	TimedScore.prototype.toString = function() {
		if (this.time == undefined) {
			return DEFAULT_TIME;
		} else {
			return this.getTime();
		}
	};

	TimedScore.prototype.reset = function() {
		if (this.idTotal1) {
			document.getElementById(this.idTotal1).innerHTML = 0;
		}
		if (this.idTotal2) {
			document.getElementById(this.idTotal2).innerHTML = 0;
		}
		this.time = new Date().getTime();
		if (this.idTime) {
			document.getElementById(this.idTime).innerHTML = this.getTime();
		}
	};

	TimedScore.prototype.start = function() {
		this.reset();
		var _this = this;
		this.timer = setInterval(function() { _this.loop() }, DELAY);
	};

	TimedScore.prototype.loop = function() {
		if (this.idTime) {
			document.getElementById(this.idTime).innerHTML = this.getTime();
			this.checkLimit();
		}
	};

	TimedScore.prototype.checkLimit = function() {
		var now = new Date().getTime();
		var seconds = Math.floor((now - this.time) / 1000);
		if (this.limit) {
			if (seconds >= this.limit) {
				this.stop();
				if (this.limitCallback) {
					var time = this.idTime ? document.getElementById(this.idTime).innerHTML : undefined;
					var total1 = this.idTotal1 ? document.getElementById(this.idTotal1).innerHTML : undefined;
					var total2 = this.idTotal2 ? document.getElementById(this.idTotal2).innerHTML : undefined;
					this.limitCallback(time, total1, total2);
				}
			}
		}
	};

	TimedScore.prototype.add1 = function() {
		if (this.idTotal1) {
			document.getElementById(this.idTotal1).innerHTML++;
		}
	};

	TimedScore.prototype.add2 = function() {
		if (this.idTotal2) {
			document.getElementById(this.idTotal2).innerHTML++;
		}
	};

	TimedScore.prototype.stop = function() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	};

	TimedScore.prototype.setLimit = function(limit, limitCallback) {
		this.limit = limit;
		this.limitCallback = limitCallback;
	};

	TimedScore.prototype.getTime = function() {
		var now = new Date().getTime();
		var seconds = (now - this.time) / 1000;
		var minutes = seconds / 60;
		seconds = seconds % 60;
		var hours = minutes / 60;
		minutes = minutes % 60;
		return TimedScore.dec2opt(hours, SEP) + TimedScore.dec2(minutes) + SEP + TimedScore.dec2(seconds);
	};

})();

/********************************************************************************************************
 ********************************************************************************************************/
 