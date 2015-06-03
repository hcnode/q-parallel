/**
 * @license
 * q-parallel
 * Copyright 2012-2015 7372@163.com
 * Available under MIT license
 */
var Q = require("q");
module.exports = function (items, max, func, onFinish){
	var running = -1;
	var finish = 0;
	var allResult = [];
	max = max || 1;
	items = items || [];
	if(!("length" in items)){
		items = [items];
	}
	if(!func) return;
	function exec() {
		running ++;
		if(running >= items.length) {
			if(finish == items.length) onFinish && onFinish(allResult);
			return;
		}

		var callee = arguments.callee;
		(function () {
			var defer = Q.defer();
			func(running, defer, items[running]);
			return defer.promise;
		})().then(function (result) {
			allResult[result.index] = result.value;
			finish ++;
			callee();
		});
	}
	for(var i=0;i<max;i++){
		exec();
	}
}