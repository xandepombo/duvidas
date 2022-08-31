img = "";
modelStatus = ""; //Verificar se o modelo foi carregado


//Array objeto
objetos = [];


function preload(){
  
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video= creatCapture(VIDEO);
  video.hide();
}
function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function draw() {
  //Carregando imagem
  image(video, 0, 0, 380, 380);

  if (modelStatus != "") {
    /*
      Buscando dados do 1° objeto
        objetos[0].label
        objetos[0].confidence
        objetos[0].width
        objetos[0].height
        objetos[0].x
        objetos[0].y
    */
        objectDetector.detect(video, gotResult); //objectDetector = nossa variável criada em setup (contém o modelo)
      for (var i = 0; i < objetos.length; i++) {
        document.getElementById("status").innerHTML = "Status: Objeto Detectado";

        /* Código antigo identificar o cachorro
        rect(130, 50, 250, 360 );
        text("Dog", 140, 70);
        stroke(255, 0, 0);
        fill(255, 0, 0);  
        noFill();
        */

        rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);

        percent = floor(objetos[i].confidence * 100); //Converter a confidence para %
        
        text(objetos[i].label + " " + percent + "%", objetos[i].x + 15, objetos[i].y + 15);
        stroke(255, 0, 0);
        fill(255, 0, 0);  
        noFill();
      }
    
  }
}

function modelLoaded() {
  console.log("Modelo Carregado!");
  modelStatus = true;

}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);


  //Atribuindo os valores de results para objetos
  //JUSTIFICATIVA: para manipularmos o array em draw
  objetos = results;
}