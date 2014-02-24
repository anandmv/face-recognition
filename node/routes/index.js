var fs = require('fs');
var sys = require('sys');
var csv = require('ya-csv');
var sys = require('sys')
var exec = require('child_process').exec;
exports.saveImage = function(req, res){
	// string generated by canvas.toDataURL()
	var img = req.body.img;
	var name = req.body.name;
	var nameSpaceOut=name.replace(/\s+/g, '');
	// strip off the data: url prefix to get just the base64-encoded bytes
	var data = img.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');
	var pic_name = nameSpaceOut+new Date().getTime();
	fs.writeFile('../imagesDB/'+pic_name+'.png', buf);
	var path ='/imagesDB/'+pic_name+'.png'
	var w = csv.createCsvFileWriter('../faces.csv', {'flags': 'a'});
	var csvData=[path,name]
	w.writeRecord(csvData);
}

exports.searchImage = function(req, res){
	var img = req.body.img;
	var data = img.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');
	var pic_name = new Date().getTime();
	fs.writeFile('../checkImage/'+pic_name+'.png', buf);
	var path ='../checkImage/'+pic_name+'.png';
	var to_path="../imagesDB";
	console.log("python ../python/pyfacesdemo "+path+" "+to_path+" 6 3")
	exec("python ../python/pyfacesdemo "+path+" "+to_path+" 6 3", function(error, stdout, stderr) { sys.puts(stdout)
		res.send(stdout) 
		setTimeout(function(){fs.unlink(path)},2000);
	});
}
exports.searchName = function(req, res){
	var searchName = req.query.filename;
	if (searchName.split("imagesDB/")[1])
		searchName=searchName.split("imagesDB/")[1];
	var reader = csv.createCsvFileReader('../faces.csv');
	reader.addListener('data', function(data) {
		if(data[0])
		{	var fileName=data[0].split("imagesDB/");
			fileName=fileName[1];
			if(fileName == searchName)
			res.send(data[1]);
		}
	});
}