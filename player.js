window.audioPlayer = document.createElement("audio");
window.fileSelector = document.createElement("input");
window.fileSelectorSF = document.createElement("input");
var ogTitle = document.title;
fileSelector.type = "file";
fileSelector.accept = ".gcompiled";
fileSelectorSF.type = "file";
fileSelectorSF.accept = ".sf2";
window.indexOfFile = 0;
window.soundFontEnabled = true;
audioPlayer.onerror = function () {
	
}
function getFile() {
	if (gcompiler.fileNames()[indexOfFile].split('.').pop() == "mid" || gcompiler.fileNames()[indexOfFile].split('.').pop() == "MID") {
		try{return {
			data:"MIDI",
			mididata:gcompiler.readFile(gcompiler.fileNames()[indexOfFile]),
			name:gcompiler.fileNames()[indexOfFile]
		};}
		catch(e){return {
			data:null,
			name:null
		};}
	} else {
		try{return {
			data:gcompiler.readFile(gcompiler.fileNames()[indexOfFile]),
			name:gcompiler.fileNames()[indexOfFile]
		};}
		catch(e){return {
			data:null,
			name:null
		};}
	}
}
function updateAudio() {
	audioPlayer.src = getFile().data;
	document.getElementById("fileName").innerHTML = getFile().name.split('.')[0];
	document.title = getFile().name.split('.')[0] + " - " + ogTitle;
}
function readFile(filedata) {
	window.indexOfFile = 0;
	document.getElementsByTagName("midi-player")[0].style.display = "none";
	//document.getElementsByTagName("midi-visualizer")[0].style.display = "none";
	document.getElementById("play/pause button").hidden = false;
	document.getElementById("stop button").hidden = false;
	if (gcompiler.openFile(filedata)) {
		updateAudio()
		if (gcompiler.fileExisits("icon.png")) {
			document.getElementsByClassName("logo")[0].src = gcompiler.readFile("icon.png");
		} else{
			document.getElementsByClassName("logo")[0].src = "favicon.png";
		}
	} else {
		window.alert("not a valid file type!");
	}
}
fileSelector.onchange = function () {
	var file = fileSelector.files[0];
	var reader = new FileReader();
	reader.onload = function(){readFile(reader.result)};
	if(file){reader.readAsText(file);}
}
fileSelectorSF.onchange = function () {
	var file = fileSelectorSF.files[0];
	var reader = new FileReader();
	reader.onload = function(){
		soundFont = reader.result;
	};
	if(file){reader.readAsDataURL(file);}
}

function playAudio(elem) {
	if (audioPlayer.paused){
		audioPlayer.play();
		doAudioInfo()
	} else {
		audioPlayer.pause();
		doAudioInfo()
	}
	audioplay()
}
function audioplay() {
	if (getFile().data == "MIDI") {
		document.getElementsByTagName("midi-player")[0].src = getFile().mididata;
		document.getElementsByTagName("midi-player")[0].style.display = "block";
		//document.getElementsByTagName("midi-visualizer")[0].style.display = "block";
		//document.getElementsByTagName("midi-visualizer")[0].src = getFile().mididata;
		document.getElementById("play/pause button").hidden = true;
		document.getElementById("stop button").hidden = true;
	}
}
function stopAudio() {
	audioPlayer.pause();
	doAudioInfo()
	audioPlayer.currentTime = 0;
	if (document.getElementsByTagName("midi-player")[0]._isPlaying) {
	}else {
	}
}
function next() {
	indexOfFile += 1;
	if (indexOfFile > gcompiler.fileNames().length) {
		indexOfFile = gcompiler.fileNames().length - 1;
	}
	try{updateAudio();}catch(e){}
	audioPlayer.play();
	doAudioInfo()
	audioplay()
}
function last() {
	indexOfFile -= 1;
	if (indexOfFile < 0) {
		indexOfFile = 0
	}
	try{updateAudio();}catch(e){}
	audioPlayer.play();
	doAudioInfo()
	audioplay()
}
function checkPlaying() {
	if (audioPlayer.paused){
		document.getElementById('play/pause icon').src = "images/player/play.png";
	} else {
		document.getElementById('play/pause icon').src = "images/player/pause.png";
	}
	var progress = Math.round((audioPlayer.currentTime/audioPlayer.duration) * 100);
	var progressBar = document.getElementById("playProgress")
	try{progressBar.value = progress;}catch(e){}
	try{BrowserWindow.setProgressBar(progressBar)}catch(e){}
	doAudioInfo()
	setTimeout(checkPlaying,1);
	
}
setTimeout(checkPlaying,1);
function doAudioInfo() {
}
function toggleSf(e) {
	if (window.soundFontEnabled) {
		window.soundFontEnabled = false;
		document.getElementsByTagName("midi-player")[0].removeAttribute("sound-font");
		e.innerHTML = "Toggle Soundfont (Disabled)";
	} else {
		window.soundFontEnabled = true;
		document.getElementsByTagName("midi-player")[0].setAttribute("sound-font","");
		e.innerHTML = "Toggle Soundfont (Enabled)";
	}

}