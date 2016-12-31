function speak(yomi){
    var ssu = new SpeechSynthesisUtterance();
    ssu.text = yomi;
    ssu.lang = 'ja-JP';
    speechSynthesis.speak(ssu);
}

stopflag = false;

function getPlayPosition(){
  return document.getElementById('number').value;
}

function setPlayPosition(v){
  return document.getElementById('number').value=v;
}



function setKanji(kanji){
    var k = document.getElementById('kanji');
    var y = document.getElementById('yomi');
    var len = kanji.length;
    if (len <= 3) {
	k.style.fontSize = 300;
    } else {
	k.style.fontSize = 300*3 / len;
    }

    k.textContent=kanji
    y.textContent="";
}
function setYomi(yomi){
    var y = document.getElementById('yomi');
    var len = yomi.length;
    if (len <= 4) {
	y.style.fontSize = 240;
    } else {
	y.style.fontSize = 240*4 / len;
    }
    y.textContent=yomi;
}

function job(i){
    var len = kanjis.length;
    var speed = document.getElementById('speed').value;
    setPlayPosition(i);
    setKanji(kanjis[i].kanji);
    setTimeout(function (){
	setYomi(kanjis[i].yomi);
	setTimeout(function (){
	    speak(kanjis[i].yomi);
	    setTimeout(function (){
		if(!stopflag && i+1<len)
		    job(i+1);
		stopflag = false;
	    },2000);
	},500);
    },speed*1000.0);
}

function start(){
    job(0);
}
function restart(){
    job(getPlayPosition());
}
function stop(){
    stopflag = true;
}
function shuffle(){
    function shuffle_(array){
	var n = array.length, t, i;

	while (n) {
	    i = Math.floor(Math.random() * n--);
	    t = array[n];
	    array[n] = array[i];
	    array[i] = t;
	}

	return array;
    }
    kanjis=shuffle_(kanjis);
}
window.onload=function(){
    document.getElementById('start').addEventListener('click',start);
    document.getElementById('restart').addEventListener('click',restart);
    document.getElementById('stop').addEventListener('click',stop);
    document.getElementById('play').addEventListener('click',
						     function (){
							 speak(kanjis[playPosition].yomi);
						     }
						    );
    document.getElementById('shuffle').addEventListener('click',shuffle);
    document.getElementById('number').value='0';
    document.getElementById('number_max_min').textContent='0から'+(kanjis.length-1)+'まで'

}
