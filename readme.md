**Feature**
 - q-parallel is base on q library, configurable max times at the same time of concurrent execute functions, support asynchronous functions
**Install**

    npm install q-parallel

**Test**

    mocha

or

    npm test

**Usage**

    var p = require("q-parallel");
    p(items, max, func, onFinish);

 - item : array of data or just repeat times 
 - max: max times of function running at one time 
 - func: function you want to execute, in the function should call defer.resolve({index: index, value : value});
 - onFinish: finish repeat the array and all results are return

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



