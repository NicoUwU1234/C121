var resultado = "";
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('mobileNet',modelLoaded);
}
function draw(){
  image(video, 0,0,300,300);
  classifier.classify(video,gotResults);
}
function modelLoaded(){
  console.log("Modelo Cargado");
}
function gotResults(error,results){
  if(error){
console.log(error);
  }else{
    if((results[0].confidence>0.5)&&(resultado!=results[0].label)){
      console.log(results);
      resultado= results[0].label;
      var syn = window.speechSynthesis;
      speak_data = 'el objeto detectado es'+results[0].label;
      var utterthis = new SpeechSynthesisUtterance(speak_data);
      syn.speak(utterthis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_precision").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}




