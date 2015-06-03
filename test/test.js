
var assert = require("assert");
var p = require("./../index");

describe('test for q-parallel', function(){
	it('test case normal', function(done){
		var func = function(index, defer, item){
			defer.resolve({
				index : index,
				value : item
			});
		};
		var items = [0,1,2,3,4,5];
		p(items, 2, func, function onFinish(result){
			assert.equal(result.length, items.length);
			assert.equal(result[0], items[0]);
			assert.equal(result[4], items[4]);

			done();
		});
	});

	it('test case one item', function(done){
		var func = function(index, defer, item){
			defer.resolve({
				index : index,
				value : item * 2
			});
		};
		var items = [1];
		p(items, 2, func, function onFinish(result){
			assert.equal(result.length, items.length);
			assert.equal(result[0], items[0] * 2);
			done();
		});
	});
	it('test case asynchronous', function(done){
		var running = 0;
		var func = function(index, defer, item){
			running ++;
			setTimeout(function () {
				defer.resolve({
					index: index,
					value : item
				});
				running --;
			}, 100);
		};
		var items = [0,1,2,3,4,5];
		p(items, 2, func, function onFinish(result){
			assert.equal(result.length, items.length);
			assert.equal(result[0], items[0]);
			assert.equal(result[4], items[4]);
			done();
		});
		setTimeout(function () {
			assert.equal(running, 2);
		}, 200);
	});
	it('test case asynchronous and random delay timeout', function(done){
		var running = 0;
		var func = function(index, defer, item){
			running ++;
			var timeout = 100 + Math.round(Math.random()*200);
			setTimeout(function () {
				defer.resolve({
					index: index,
					value : {
						item : item,
						timeout : timeout
					}
				});
				running --;
			}, timeout);
		};
		var items = [0,1,2,3,4,5,6,7,8,9,10];
		p(items, 2, func, function onFinish(result){
			assert.equal(result.length, items.length);
			assert.equal(result[0].item,items[0]);
			assert.equal(result[1].item,items[1]);
			assert.equal(result[2].item,items[2]);
			assert.equal(result[3].item,items[3]);
			assert.equal(result[4].item,items[4]);
			assert.equal(result[5].item,items[5]);
			assert.equal(result[6].item,items[6]);
			assert.equal(result[7].item,items[7]);
			assert.equal(result[8].item,items[8]);
			done();
			console.log(result);
		});
		setTimeout(function () {
			assert.equal(running, 2);
		}, 200);
		setTimeout(function () {
			assert.equal(running, 2);
		}, 300);
		setTimeout(function () {
			assert.equal(running, 2);
		}, 400);
		setTimeout(function () {
			assert.equal(running, 2);
		}, 500);
		setTimeout(function () {
			assert.equal(running, 2);
		}, 600);
	});
})
