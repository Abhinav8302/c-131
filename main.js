objects=[]
img="";
status="";
function preload(){
    img=loadImage('bedroom-furniture-5-500x500.jpg');

}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    objectDetecter=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting objects";
}

function modelLoaded(){
    console.log('Model loaded');
    status=true;
    objectDetecter.detect(img ,gotResult);

}

function gotResult(error,results){
if (results.length>0){
    objects=results;
    console.log(results);
}
}

function draw(){
r = random(255);
g=random(255);
b=random(255);
image(img,0,0,380,380);
/*fill("#4287f5");
text("dog",45,75);
noFill();
stroke("#4287f5");
rect(30,60,450,350);
fill("#7eeb09");
text("cat",320,120);
noFill();
stroke("#7eeb09");
rect(300,90,270,320);*/
if(status != ""){
    for(index=0; index<objects.length; index++){
        document.getElementById("status").innerHTML="status : objects detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are :"+objects.length;
        fill("#56fc03");
        prcnt=floor(objects[index].confidence * 100);
        text(objects[index].label + " " + prcnt + "%",objects[index].x,objects[index].y);
        stroke("#56fc03");
        noFill();
        rect(objects[index].x , objects[index].y, objects[index].width, objects[index].height );
    }
}

}