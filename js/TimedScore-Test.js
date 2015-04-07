function TimedScoreTest() {
}

// TimedScoreTest.beforeClass = function() {};
// TimedScoreTest.afterClass = function() {};
// TimedScoreTest.prototype.before = function() {};
// TimedScoreTest.prototype.after = function() {};

TimedScoreTest.prototype.testStoped = function() {
	var ts = new TimedScore();
	var expected = '00:00';
	var current = ts.toString();
	JSUS.assertEquals(expected, current);
};

TimedScoreTest.prototype.testStarted = function() {
	var ts = new TimedScore();
	var expected = '00:00';
	ts.start();
	var current = ts.toString();
	JSUS.assertEquals(expected, current);
};

TimedScoreTest.prototype.testAdd1 = function() {
	var ts = new TimedScore('time', 'total-success', 'total-error');
	ts.start();
	ts.add1();
	var expected = '00:00';
	var current = ts.toString();
	JSUS.assertEquals(expected, current);
};

(function() {
	function start() {
		if (typeof JSUS != 'undefined') {
			var jsus = new JSUS(TimedScoreTest);
			jsus.start('display');
			jsus.end();
		}
	}
	window.addEventListener('load', start, false);
})();
