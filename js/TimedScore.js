/***************************************************************
 *************** LIBRARY: Timed Score Vs. 1.1.2 ****************
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

	function setHTML(id, value) {
		if (id) {
			if (value == undefined) {
				document.getElementById(id).innerHTML++;
			} else {
				document.getElementById(id).innerHTML = value;
			}
		}
	}

	function getHTML(id) {
		return id ? document.getElementById(id).innerHTML : undefined;
	}

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
		setHTML(this.idTotal1, 0);
		setHTML(this.idTotal2, 0);
		this.time = new Date().getTime();
		setHTML(this.idTime, this.getTime());
	};

	TimedScore.prototype.start = function() {
		this.reset();
		var _this = this;
		this.timer = setInterval(function() { _this.loop() }, DELAY);
	};

	TimedScore.prototype.loop = function() {
		setHTML(this.idTime, this.getTime());
		this.checkLimit();
	};

	TimedScore.prototype.checkLimit = function() {
		var now = new Date().getTime();
		var seconds = Math.floor((now - this.time) / 1000);
		if (this.limit) {
			if (seconds >= this.limit) {
				this.stop();
				if (this.limitCallback) {
					this.limitCallback(getHTML(this.idTime), getHTML(this.idTotal1), getHTML(this.idTotal2));
				}
			}
		}
	};

	TimedScore.prototype.add1 = function() {
		setHTML(this.idTotal1);
	};

	TimedScore.prototype.add2 = function() {
		setHTML(this.idTotal2);
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
