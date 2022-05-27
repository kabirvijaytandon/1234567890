object = [];
status = "";
video = "";

function preload(){
video = createVideo('video.mp4');
video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video, 0 ,0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < object.length;i++){
            document.getElementById('status').innerHTML = "Status: object detecting";
            document.getElementById('number_of_object').innerHTML = "Number Of Objects Detected Are : " + object.length;
            
            fill('#FF0000');
            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%" , object[i].x + 15, object[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(object[i].x, object[i].y, object[i].height, object[i].width);
        }
    }
}

function gotResults (error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;

}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Status: object detecting";
}

function modelLoaded(){
    console.log('Model Loaded!'); 
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}
