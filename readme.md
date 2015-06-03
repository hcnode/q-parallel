**Feature**
 - q-parallel is base on  [q](https://github.com/kriskowal/q) library, configurable max times at the same time of concurrent execute functions, support asynchronous functions
 
**Install**

    npm install q-parallel

**Test**

    mocha

or

    npm test

**Usage**

    var p = require("q-parallel");
    p(items, max, func, onFinish);

 - items : array of data or just repeat times 
 - max: max times of function running at one time 
 - func: function you want to execute, in the function should call defer.resolve({index: index, value : value}) at the end
 - onFinish: call whe finish repeat the array and all results are return

**Example**


    equire("q-parallel")([5,4,3,2,1], 2, function(index, defer, item){
    	setTimeout(function(){
		    defer.resolve({
				index : index,
				value : {item : item, index : index}
			});
		}, item * 1000);
    }, function onFinish(result){
	    console.log(result);
    })

**中文说明**

参数说明
- items: 数组或者只是循环次数，每次调用func时会在第三个参数传入对应的值
- max: 并发调用func的最多的次数
- func: 调用的函数，最后必须调用q的defer.resolve({index: index, value : value})，必须有index和value的key
- onFinish: 当完成所有的调用并且调用了defer的resolve返回后调用该函数
