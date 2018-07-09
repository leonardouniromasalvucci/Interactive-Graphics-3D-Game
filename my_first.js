var scene = new THREE.Scene();
var background = THREE.ImageUtils.loadTexture( 'textures/cc.png' );
scene.background = background;	
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 1000 );
var position_z=5.0, position_x=0.0;
var obj1, dom, bomb, fuci;
var bombole=false, mano=false, fucile=false, get_mirino=false;
var bombols = false, prospective=false;
var x=0.0,y=0.0,x=0.0,x_r=.0,y_r=.0,z_r=.0;
var game_over=false, game_over1=false;
var ok=true;
var get_bom=false, get_arm=false;
var life = 100, life2=100;
var arr=[];
var ex=false;
var play=false;
var bob, mirino,shot,navicella, wins=false;
var sparato = false;
var sphere_explo, starts_time=false;
var ex1=false, ex2=false, ex3=false;

/*
var stats = new Stats();
stats.showPanel( 1 ); 
document.body.appendChild(stats.dom).style.left = "95%";
document.body.appendChild(stats.dom).style.top = "2%";
*/
var movementSpeed = 45;
var totalObjects = 8000;
var objectSize = 5;
var sizeRandomness = 4000;
var dirs = [];
var parts = [];

var pivotPoint;


var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

var pointLight = new THREE.PointLight( 0xffffff, 3 );
camera.add( pointLight );
scene.add( camera );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
dom = document.getElementById('Container');
dom.appendChild( renderer.domElement );

function ExplodeAnimation(x,y,z){

  var geometry = new THREE.Geometry();
  
  for (i = 0; i < totalObjects; i ++) { 
    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = z;
  
    geometry.vertices.push( vertex );
    dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
  }
  var material = new THREE.ParticleBasicMaterial( { size: objectSize,  color: 0xC0C0C0 });
  var particles = new THREE.ParticleSystem( geometry, material );
  
  this.object = particles;
  this.status = true;
  
  this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  
  scene.add( this.object  ); 
  
  this.update = function(){
    if (this.status == true){
      var pCount = totalObjects;
      while(pCount--) {
        var particle =  this.object.geometry.vertices[pCount]
        particle.y += dirs[pCount].y;
        particle.x += dirs[pCount].x;
        particle.z += dirs[pCount].z;
      }
      this.object.geometry.verticesNeedUpdate = true;
    }
  }
}


init();
function hands(){
   if(get_mirino){
       ok=false;
   }
   document.getElementById("bb").style.backgroundColor = "white";
   document.getElementById("bb").style.color = "#004C99";
   document.getElementById("bb1").style.backgroundColor = "black";
   document.getElementById("bb1").style.color = "white";
   document.getElementById("bb2").style.backgroundColor = "black";
   document.getElementById("bb2").style.color = "white";
   mano=true;
   bombols = false;
   get_arm=false;
}

function rifle(){
	if(get_mirino){
       ok=false;
   }
  document.getElementById("bb1").style.backgroundColor = "white";
  document.getElementById("bb1").style.color = "#004C99";
  document.getElementById("bb").style.backgroundColor = "black";
  document.getElementById("bb").style.color = "white";
  document.getElementById("bb2").style.backgroundColor = "black";
  document.getElementById("bb2").style.color = "white";
  fucile=true;
  bombols = false;
  get_arm=true;
  ok=true;
}

function bombs(){
	if(get_mirino){
       ok=false;
   }
  document.getElementById("bb2").style.backgroundColor = "white";	
  document.getElementById("bb2").style.color = "#004C99";
  document.getElementById("bb").style.backgroundColor = "black";
  document.getElementById("bb").style.color = "white";
  document.getElementById("bb1").style.backgroundColor = "black";
  document.getElementById("bb1").style.color = "white";
  bombole=true;
  bombols = true;
  get_arm=false;
}

var inizializza=false;

var mesh,mesh1,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7, loader4,loader5,star,loader,loader1,loader2,loader6, meshsx, moon;
var robots;
function init(){
pivotPoint = new THREE.Object3D();


loader = new THREE.TextureLoader();
loader.load('textures/land_ocean_ice_cloud_2048.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	mesh = new THREE.Mesh( geometry, material );
	mesh.material.side = THREE.BackSide;
    mesh.position.x = 1.005; 
    mesh.position.z = -1.005; 
	scene.add(mesh);
  mesh.add(pivotPoint);
});

loader.load('textures/planet2.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {map: texture } );
	mesh1 = new THREE.Mesh( geometry, material );
	mesh1.material.side = THREE.BackSide;
  mesh1.position.z = -8.005; 
  mesh1.position.x = -14.005;
	scene.add( mesh1 );
});

loader.load('textures/planet3.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	mesh2 = new THREE.Mesh( geometry, material );
	mesh2.material.side = THREE.BackSide;
  mesh2.position.z = -10.005; 
  mesh2.position.x = -5.505;
  mesh2.position.y = 4.005;
	scene.add( mesh2 );
});

loader.load('textures/planet9.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	mesh3 = new THREE.Mesh( geometry, material );
	mesh3.material.side = THREE.BackSide;
  mesh3.position.z = -18.005; 
  mesh3.position.x = 10.505;
  mesh3.position.y = 12.005;
	scene.add( mesh3 );
});


loader.load('textures/planet5.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	mesh4 = new THREE.Mesh( geometry, material );
	mesh4.material.side = THREE.BackSide;
  mesh4.position.z = -14.005; 
  mesh4.position.x = 18.505;
  mesh4.position.y = 4.005;
	scene.add( mesh4 );
});

loader.load('textures/planet4.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	mesh5 = new THREE.Mesh( geometry, material );
	mesh5.material.side = THREE.BackSide;
  mesh5.position.z = -12.005; 
  mesh5.position.x = -12.505;
  mesh5.position.y = 8.005;
	scene.add( mesh5 );
});


loader.load('textures/planet8.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	mesh6 = new THREE.Mesh( geometry, material );
	mesh6.material.side = THREE.BackSide;
  mesh6.position.z = -20.005;   
  mesh6.position.x = -14.505;
  mesh6.position.y = -8.005;
	scene.add( mesh6 );
});

loader.load('textures/planet15.jpg', function ( texture ) {
  var geometry = new THREE.SphereGeometry( 1, 20, 20 );
  var material = new THREE.MeshBasicMaterial( {map: texture} );
  mesh7 = new THREE.Mesh( geometry, material );
  mesh7.material.side = THREE.BackSide;
  mesh7.position.z = -10.005;   
  mesh7.position.x = 14.505;
  mesh7.position.y = -6.005;
  scene.add( mesh7 );
});


var geometry = new THREE.SphereGeometry( 4, 20, 20 );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
moon = new THREE.Mesh( geometry, material );
moon.material.side = THREE.BackSide;
moon.position.set(200, 4, 6);
scene.add( moon );  
pivotPoint.add(moon);

loader4 = new THREE.OBJLoader();
loader4.load('model/gas.obj', function ( object1 ) {
	bomb = object1;
	bomb.position.z =-22.04;
	bomb.position.x = -24.505;
    bomb.position.y = -0.505;
	bomb.scale.set( 0.5, 0.5, 0.5);
    scene.add( bomb );
});

loader5 = new THREE.OBJLoader();
loader5.load('model/missile.obj', function ( object1 ) {
	fuci = object1;
	fuci.position.z =-49.04;
	fuci.position.x = 15.505;
	fuci.position.y = 15.505;
	fuci.scale.set( 0.007, 0.007, 0.007);
    scene.add( fuci );
});


texture_nav = new THREE.MeshPhongMaterial( {color: 0xC0C0C0 } );
loader6 = new THREE.OBJLoader();
loader6.load( 'model/SpaceShipDetailed.obj', function ( object ) {
object.traverse( function ( child ) {
  if ( child instanceof THREE.Mesh ) {
            child.material = texture_nav;
  }
});

navicella = object;
navicella.position.z=-100;
navicella.rotation.y=-7.9;
navicella.scale.set(0.08,0.08,0.08);
scene.add( navicella);
});


var i;
for(i=0;i<20; i++){
	//loader.load('../textures/star.jpg', function ( texture ) {
	var geometry = new THREE.SphereGeometry( 0.02, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {} );
	star = new THREE.Mesh( geometry, material );
	star.position.x = getRandomInt(-45,45);
	star.position.y = getRandomInt(-25,25);
	star.position.z = getRandomInt(-70,-30);
	scene.add( star );
    //});
}

loader1 = new THREE.OBJLoader();
var k;
for(k=0;k<50; k++){
loader1.load('model/Asteroid.obj', function ( object ) {	

       obj1=object;
       obj1.position.z=getRandomInt(-1500,-1950);;
       obj1.rotation.y=0.02;
       obj1.position.x=getRandomInt(-650,650);
       obj1.position.y=getRandomInt(-650,650);
       obj1.scale.set( 0.8, 0.8, 0.8);
       arr.push(obj1);
       scene.add( obj1 );

});
}

var m;
loader2 = new THREE.OBJLoader();
for(m=0;m<60; m++){
loader2.load('model/asteroid OBJ.obj', function ( object ) {
	
       obj1=object;
       obj1.position.z=getRandomInt(-1500,-1950);;
       obj1.rotation.y=0.02;
       obj1.position.x=getRandomInt(-650,650);
       obj1.position.y=getRandomInt(-650,650);
       obj1.scale.set( 0.8, 0.8, 0.8);
       arr.push(obj1);
       scene.add( obj1 );
});
}

var loader55 = new THREE.OBJLoader();
loader55.load('model/missile.obj', function ( object1 ) {
  meshsx = object1;
  meshsx.rotation.y=3;
  meshsx.scale.set( 0.007, 0.007, 0.007);
});

var shot_geometry = new THREE.SphereGeometry(1, 128, 128);
var texture2 = THREE.ImageUtils.loadTexture( 'textures/gg.jpg' );
var material2 = new THREE.MeshLambertMaterial( { map: texture2 } );
shot = new THREE.Mesh(shot_geometry, material2);
shot1 = new THREE.Mesh(shot_geometry, material2);

for (var i = 0; i < shot.geometry.vertices.length; i++) {
    var k = 3;
      for (var i = 0; i < shot.geometry.vertices.length; i++) {
        var p = shot.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + 6* noise.perlin3(p.x * k, p.y * k, p.z * k));
    }
}
shot.geometry.verticesNeedUpdate = true; //must be set or vertices will not update
shot.geometry.computeVertexNormals(); 
shot.scale.set(0.3,0.3,0.3);
shot.rotation.y=3;

shot1.geometry.verticesNeedUpdate = true; //must be set or vertices will not update
shot1.geometry.computeVertexNormals(); 
shot1.scale.set(0.3,0.3,0.3);
shot1.rotation.y=3;


var sphere_geometry_explo = new THREE.SphereGeometry(1, 128, 128);
var texture_explo = THREE.ImageUtils.loadTexture( 'textures/explo11.jpg' );
var material_explo = new THREE.MeshLambertMaterial( { map: texture_explo } );
sphere_explo = new THREE.Mesh(sphere_geometry_explo, material_explo);

bob = new Robot("bob");
bob.model.position.z=0;
bob.model.position.y=-4;
scene.add(bob.model);

camera.position.z=5.0;
inizializza=true;

}

function startTimer(duration) {
	starts_time = true;
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("times").innerHTML = minutes+" : "+seconds;
        if(minutes==0 && seconds==25){
          wins=true;
        }

        if(minutes==0){
          document.location.href = 'win.html';
        }
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play_game(){
  document.getElementById("im1").style.border = "2px solid white";
  document.getElementById("im2").style.border = "0px solid";
  play=true;
}
function stop_game(){
  document.getElementById("im2").style.border = "2px solid red";
  document.getElementById("im1").style.border = "0px solid";
  play=false;
}

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

var speeds;


function handleKeyDown(keyEvent){
  if ( keyEvent.keyCode === 65) {//left
    bob.model.rotation.y+=0.1;
  }
  if ( keyEvent.keyCode === 67) {//left
    prospective=!prospective;
  }
  if ( keyEvent.keyCode === 69) {//left
    position_z+=1.1;
  }
  if ( keyEvent.keyCode === 70) {//left
    position_z-=1.1;
  }
  if ( keyEvent.keyCode === 71) {//left
    position_x+=1.1;
  }
  if ( keyEvent.keyCode === 72) {//left
    position_x-=1.1;
  }

  if ( keyEvent.keyCode === 37) {//left
      bob.model.position.x-=speeds;
      if(!get_arm){
        bob.model.rotation.y=1.6;
      }
  }
  if ( keyEvent.keyCode === 38) {//up
      bob.model.position.y+=speeds;
      bob.model.rotation.y=0.0;
  }
  if ( keyEvent.keyCode === 39) {//righ
      bob.model.position.x+=speeds;
      if(!get_arm){
        bob.model.rotation.y=-1.6;
      }
  }
  if ( keyEvent.keyCode === 40) {//down
      bob.model.position.y-=speeds;
      bob.model.rotation.y=0.0;
  }
  if ( keyEvent.keyCode === 77) {//avan
      bob.model.position.z+=speeds;
      bob.model.rotation.x=0.0;
  }
  if ( keyEvent.keyCode === 76) {//dietro
      bob.model.position.z-=speeds;
      bob.model.rotation.x=-0.5;
  }
  if ( keyEvent.keyCode === 80) {//dietro
      bob.model.position.z=0;
      bob.model.position.y=-4;
      bob.model.position.x=0;
      bob.model.rotation.y=0;
      
  }
}
var mouse = new THREE.Vector2(), INTERSECTED;
var raycaster;

function onDocumentMouseMove(event){
	event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


raycaster = new THREE.Raycaster();
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

var toRotate3; 
var toRotate33;

document.addEventListener('click', sparos, false);
function sparos(){
	if(get_mirino && ok){
		sparato=true;
		var toRotate = bob.model;
		toRotate = toRotate.getObjectByName("rightarm");
		toRotate = toRotate.getObjectByName("bocs");

    var toRotate1 = bob.model;
	  toRotate1 = toRotate1.getObjectByName("leftarm");
	  toRotate1 = toRotate1.getObjectByName("bocs");
 
	  var vector = toRotate.getWorldPosition();
	  var vector1 = toRotate1.getWorldPosition();
	
    shot.position.z=vector.z;
		shot.position.y=vector.y;
		shot.position.x=vector.x;		
		scene.add(shot);

		shot1.position.z=vector1.z;
		shot1.position.y=vector1.y;
		shot1.position.x=vector1.x;
		scene.add(shot1);
		ex=true;	
		document.getElementById('sparo').play();
		setTimeout(function(){ 
		    scene.remove(shot);
		    scene.remove(shot1);
    }, 300);
	}
}

function handleKeyUp(keyEvent){
  if ( keyEvent.keyCode === 76) {//left
    bob.model.rotation.x=0.0;
  }
  if ( keyEvent.keyCode === 37) {//left
    bob.model.rotation.y=0.0;
  }
  if ( keyEvent.keyCode === 39) {//righ
    bob.model.rotation.y=0.0;
  }
}

function changes(){
	bob = new Robot("bob");
	bob.model.position.x=x;
	bob.model.position.y=y;
	bob.model.position.z=z;
	bob.model.rotation.x=x_r;
	bob.model.rotation.y=y_r;
	bob.model.rotation.z=z_r;
    scene.add(bob.model);
}

function ease(t) { 
    return 2*t*t;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

var t = 0,a,b;

function esplodi(x,y,z){
   parts.push(new ExplodeAnimation(x, y, z));
   ex=false;
}
var crash=[];
var ind, p, q;


var verso,spar=false;
var start_explo=0,start_explo1=0,start_explo2=0;

function onWindowResize() {

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
window.addEventListener( 'resize', onWindowResize, false );

function sp(){
	a = {x: navicella.position.x, y: navicella.position.y, z: navicella.position.z},
    b = {x: bob.model.position.x, y: bob.model.position.y, z: bob.model.position.z};
    spar=true;
}

var ex_mesh, ruota=false,c=0.0, navicella_colpita=0, distruggi_navicella=false;
var intersects, intersects1;
var vector, stops=false;
var animate = function(){
 if(!stops){
   requestAnimationFrame(animate);
   vector = moon.getWorldPosition();
   pointLight.position.set(vector.x,vector.y,vector.z);
   pivotPoint.rotation.y = 0.4;

  if(game_over){
    if(!ex1){
      camera.position.z = 10;
      camera.position.x = 0;
      camera.position.y = 0;
      sphere_explo.position.z=-1.005; 
      sphere_explo.position.x=1.005;
      scene.add(sphere_explo);
      document.getElementById('explo').play();
      ex1=true;
    }
   
    for (var i = 0; i < sphere_explo.geometry.vertices.length; i++) {
        var p = sphere_explo.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + 0.3* noise.perlin3(p.x * 3 + start_explo, p.y * 3, p.z * 3));
    }
    sphere_explo.geometry.verticesNeedUpdate = true; 
    sphere_explo.geometry.computeVertexNormals(); 
    sphere_explo.scale.set(start_explo,start_explo,start_explo);
    start_explo+=0.02;
    if(start_explo>5){
      document.location.href = 'end.html';
	    stops=true;
    }
  }else if(game_over1){
    if(!ex2){
      camera.position.z = 10;
      sphere_explo.position.z=bob.model.position.z;
      sphere_explo.position.y=bob.model.position.y;
      sphere_explo.position.x=bob.model.position.x;
      scene.add(sphere_explo);
      document.getElementById('explo').play();
      ex2=true;
    }

    for (var i = 0; i < sphere_explo.geometry.vertices.length; i++) {
      var p = sphere_explo.geometry.vertices[i];
      p.normalize().multiplyScalar(1 + 0.3* noise.perlin3(p.x * 3 + start_explo1, p.y * 3, p.z * 3));
    }
    sphere_explo.geometry.verticesNeedUpdate = true; 
    sphere_explo.geometry.computeVertexNormals(); 
    sphere_explo.scale.set(start_explo1,start_explo1,start_explo1);
    start_explo1+=0.02;
    if(start_explo1>5){
      document.location.href = 'end.html';
	    stops=true;
    }
  }else{   	

    if(!distruggi_navicella){
      if(navicella.position.x>=60){verso=false;}else if(navicella.position.x<=-60){verso=true;}else{}
        if(verso){ 
          navicella.position.x+=0.2;
          navicella.rotation.y-=0.002;
        }else{
          navicella.position.x-=0.2;
          navicella.rotation.y+=0.002;
        } 
    }


   if(play){
    scene.add( meshsx );
    if(!distruggi_navicella){
        if(!spar){
          sp();
        }

        if(meshsx.position.z>b.z){  
          sp();
          t=0;
          var newX = lerp(a.x, b.x, ease(t));   
          var newY = lerp(a.y, b.y, ease(t));   
          var newZ = lerp(a.z, b.z, ease(t));
          meshsx.position.set(newX, newY, newZ); 
   
        }else{
           var newX = lerp(a.x, b.x, ease(t));   
          var newY = lerp(a.y, b.y, ease(t));   
          var newZ = lerp(a.z, b.z, ease(t));
          meshsx.position.set(newX, newY, newZ); 
        }  


      var dist3 = Math.sqrt( Math.pow((bob.model.position.x-meshsx.position.x), 2) + Math.pow((bob.model.position.y-meshsx.position.y), 2) + Math.pow((bob.model.position.z-meshsx.position.z), 2) );
      if(dist3<1){ 
      document.getElementById('error').play(); 
      document.getElementById("life2").style.width = life2;
      if(life2<83){
       document.getElementById("life2").style.background = "orange";
      }
      if(life2<50){
        document.getElementById("life2").style.background = "red";
        ruota=true;  
      }
      if(life2<1){
        game_over1=true;
      }
      life2-=25;
      }

      if(ruota){      
        c += 0.02;
        var toRotate = bob.model;
        toRotate = toRotate.getObjectByName("rightleg");
        var toRotate1 = bob.model;
        toRotate1 = toRotate1.getObjectByName("leftleg");
        toRotate.position.set(c,c,-c);
        toRotate1.position.set(c,c,-c);
      }  

      t += 0.0050; 
    }
   }
    if(bombols && !ruota){
      speeds=3.1;
    }else{
      speeds=0.9;
    }
  
	
  mesh.rotation.y += 0.005;
  mesh1.rotation.y += 0.005;
  mesh2.rotation.y += 0.005;
  mesh3.rotation.y += 0.005;
  mesh4.rotation.y += 0.005;
  mesh5.rotation.y += 0.005;
  mesh6.rotation.y += 0.005;  
  mesh7.rotation.y += 0.005;    
  
  bomb.rotation.x+=0.02;
  fuci.rotation.x+=0.02;
    

  
  if(!get_bom){
    var dist = Math.sqrt( Math.pow((bob.model.position.x-bomb.position.x), 2) + Math.pow((bob.model.position.y-bomb.position.y), 2) + Math.pow((bob.model.position.z-bomb.position.z), 2) );
    if(dist<4){    
    	document.getElementById("bb2").style.display = "block";
        scene.remove(bomb);
        document.getElementById('jolly').play();
        get_bom=true;
    }
  }

  if(!get_arm){
    var dist1 = Math.sqrt( Math.pow((bob.model.position.x-fuci.position.x), 2) + Math.pow((bob.model.position.y-fuci.position.y), 2) + Math.pow((bob.model.position.z-fuci.position.z), 2) );
    if(dist1<4){
    		document.getElementById("bb1").style.display = "block";
            scene.remove(fuci);
            document.getElementById('jolly').play();
            get_arm=true;    	
    }
  }

    for(s=0; s<arr.length;s++){
    	var dist = Math.sqrt( Math.pow((arr[s].position.x-mesh.position.x), 2) + Math.pow((arr[s].position.y-mesh.position.y), 2) + Math.pow((arr[s].position.z-mesh.position.z), 2) );
    	
    	if(dist<200){
    		if(!crash.includes(s)){
    			crash.push(s);
    			document.getElementById('error').play();

            	document.getElementById("life").style.width = life;
            	if(life<70){
                	document.getElementById("life").style.background = "orange";
            	}
            	if(life<30){
                	document.getElementById("life").style.background = "red";
            	}
            	if(life<1){
                  game_over=true;
            	}
           	 	life-=15;
            }
    }

      if(play){
        if(arr[s].position.z<-40){
          if(s%2==0){
          	if(!starts_time){
          		arr[s].position.z+=0.91;
                arr[s].rotation.x+=0.031;
          	}else{
          		arr[s].position.z+=2.51;
                arr[s].rotation.x+=0.031;
          	}
          }else{
          	if(!starts_time){
          		arr[s].position.z+=1.1;
                arr[s].rotation.x+=0.031;
          	}else{
          		arr[s].position.z+=3.1;
                arr[s].rotation.x+=0.031;
          	}
          }
        }else{
          if(wins){
            scene.remove(arr[s]);
          }else{
            ind = crash.indexOf(s);
            if (ind >= 0) {
             crash.splice( ind, 1 );
            }
            arr[s].position.z = -900;
          }
        }
      }
    }
    
    if(bombole){
      	x = bob.model.position.x;
        y = bob.model.position.y;
        z = bob.model.position.z;
        x_r = bob.model.rotation.x;
        y_r = bob.model.rotation.y;
        z_r = bob.model.rotation.z;
        scene.remove(bob.model);
        changes();
      	bombole=false;
        get_mirino=false;
        document.body.style.cursor = "default"; 
    }
    
    if(fucile){
    	x = bob.model.position.x;
        y = bob.model.position.y;
        z = bob.model.position.z;
        x_r = bob.model.rotation.x;
        y_r = bob.model.rotation.y;
        z_r = bob.model.rotation.z;
        scene.remove(bob.model);
        changes();
    	fucile=false;
        get_mirino=true;
        document.body.style.cursor = "pointer"; 
    }

    if(mano){
    	x = bob.model.position.x;
        y = bob.model.position.y;
        z = bob.model.position.z;
        x_r = bob.model.rotation.x;
        y_r = bob.model.rotation.y;
        z_r = bob.model.rotation.z;
        scene.remove(bob.model);
        changes();
    	mano=false;
        get_mirino=false;
        document.body.style.cursor = "default"; 
    }

    if(prospective){
    	camera.position.z = bob.model.position.z+4;
        camera.position.x = bob.model.position.x;
        camera.position.y = bob.model.position.y+4;

    }

    raycaster.setFromCamera( mouse, camera );
    
    for(q=0;q<arr.length;q++){
        intersects=raycaster.intersectObjects( arr[q].children, true );
        if ( intersects.length > 0 ) {
       	    if ( INTERSECTED != intersects[ 0 ].object ) {
                if(ex){
				   esplodi(arr[q].position.x,arr[q].position.y,arr[q].position.z);
				   arr[q].position.z = -1500;
			    }
		    }
		}
    } 

    intersects1=raycaster.intersectObjects( navicella.children, true );
    if ( intersects1.length > 0 ) {
      if ( INTERSECTED != intersects1[ 0 ].object ) {
        if(ex){
          document.getElementById('bbs').innerHTML ='';
          navicella_colpita+=1;
          texture_nav.color.setHex(0xFF1F10);
          texture_nav.needsUpdate = true;
          ex=false;         
         
          document.getElementById('bbs').innerHTML = '<b>'+navicella_colpita+'</b>';
          setTimeout(function(){ 
            texture_nav.color.setHex(0xC0C0C0);
            texture_nav.needsUpdate = true;     
        
          }, 300);
        }
      }
    } 

    if(navicella_colpita>9){
      startTimer(160);
      distruggi_navicella=true;  
      
      document.getElementById('explo').play();
      document.getElementById('bbs').style.display = 'none';
      navicella_colpita=1;  
      setTimeout(function(){ 
        scene.remove(navicella);
        scene.remove(meshsx);
        
      }, 3000);
    }
    
    if(get_mirino){
      var toRotate = bob.model;
      toRotate = toRotate.getObjectByName("rightarm");
      var toRotate1 = bob.model;
      toRotate1 = toRotate1.getObjectByName("leftarm");
      toRotate.rotation.z=mouse.x;
      toRotate1.rotation.z=mouse.x;
      toRotate.rotation.x=mouse.y+90;
      toRotate1.rotation.x=mouse.y+90;
  
   }
    
    if(distruggi_navicella){
      if(!ex3){
        sphere_explo.position.z=navicella.position.z;
        sphere_explo.position.y=navicella.position.y;
        sphere_explo.position.x=navicella.position.x;
        scene.add(sphere_explo);
        ex3=true;
      }
      for (var i = 0; i < sphere_explo.geometry.vertices.length; i++) {
        var p = sphere_explo.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + 0.3* noise.perlin3(p.x * 3 + start_explo2, p.y * 3, p.z * 3));
      } 
      sphere_explo.geometry.verticesNeedUpdate = true; 
      sphere_explo.geometry.computeVertexNormals(); 
      sphere_explo.scale.set(start_explo2,start_explo2,start_explo2);
      start_explo2+=0.12;

      if(start_explo2>15){
        scene.remove(meshsx);
        scene.remove(sphere_explo);
      }
    }

    var pCount = parts.length;
    while(pCount--) {
        parts[pCount].update();
    }
				
  }    	

  setTimeout(function(){ 
    ex=false;
  }, 2000);

  if(bob.model.position.x>28){
      bob.model.position.x=24;
  }
  if(bob.model.position.x<-28){
      bob.model.position.x=-24;
  }
  if(bob.model.position.y>16){
      bob.model.position.y=11;
  }
  if(bob.model.position.y<-16){
      bob.model.position.y=-9;
  }
  if(bob.model.position.z>9){
      bob.model.position.z=8;
  }
  if(bob.model.position.z<-48){
      bob.model.position.z=-47;
  }

  /* stats.begin();
  stats.end();*/
  
  renderer.render(scene, camera);
 }
}

animate();
