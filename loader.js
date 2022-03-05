window.gcompiler = {
	fileData:null,
	fileTypes:{
		wav:"audio",
		ogg:"audio",
		mp3:"audio",
		mp4:"video",
		avi:"video",
		svg:"image",
		png:"image",
		gif:"image",
		txt:"text",
		wmv:"video",
		ico:"image",
		js:"javascript"
	},
	readFile: function (filename) {
		try {
			return this.fileData.files[filename];
		} catch(e) {
			throw Error("File Can Not Be Found In Data, Or FileData Is Not Set Up Correctly.");
		}
	},
	fileExisits: function (filename) {
		try {
			if (this.fileData.files[filename]) {
				return true;
			}
			return false;
		} catch(e) {
			throw Error("FileData Is Not Set Up Correctly.");
		}
	},
	fileNames: function () {
		try {
			return this.fileData.names;
		} catch(e) {
			throw Error("FileData Is Not Set Up Correctly.");
		}
	},
	addFile: function (base64NoUrl,extension,name) {
		var fileuri = "data:"+this.fileTypes[extension]+"/"+extension+";base64,"+base64NoUrl;
		this.fileData.files[name] = fileuri;
		this.fileData.names.push(name);
		this.fileData.fileCount += 1;
		this.fileData.base64ids.push("data:"+this.fileTypes[extension]+"/"+extension+";base64,");
		return "data:"+this.fileTypes[extension]+"/"+extension+";base64,"+base64NoUrl;
	},
	newFile:function () {
		return {"files":{},"filecount":0,"names":[],"base64ids":[]};
	},
	download:function () {
		var blob = new Blob([JSON.stringify(this.fileData)], {type : 'application/json'});
		var reader = new FileReader();
		reader.onload = function () {
			var a = document.createElement("a");
			a.href = reader.result;
			a.download = "file.gcompiled";
			a.click();
		}
		reader.readAsDataURL(blob);
	},
	openFile:function (text) {
		try{
			this.fileData = JSON.parse(text); return true;
		}catch(e){
			return false;
		}
	}
}