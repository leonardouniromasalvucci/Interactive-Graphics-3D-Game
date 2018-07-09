var Robot = function(inName) {
	this.model = new THREE.Object3D();

	this.currentPose = Robot.FLOAT;

	var body = this.createBody();
	body.position.set(0, -80, 0);
	this.model.add(body);

	var head  = this.createHead();
	head.position.set(0, -0.6, 0);
	this.model.add(head);

	var leftleg = this.createLeg("leftleg");
	leftleg.position.set(-0.7, -54.5, 0);
	this.model.add(leftleg);

	var rightleg = this.createLeg("rightleg");
	rightleg.position.set(0.7, -54.5, 0);
	this.model.add(rightleg);

	var leftarm = this.createArm("leftarm");
	leftarm.position.set(-1.25, 1, 0);
	if(fucile){
       leftarm.rotation.x=20.6;
	}
	this.model.add(leftarm);

	var rightarm = this.createArm("rightarm");
	rightarm.position.set(1.25, 1, 0);
	if(fucile){
    	rightarm.rotation.x=20.6;
	}
	this.model.add(rightarm);

	this.model.name = inName;

	return this;
}

Robot.texture = new THREE.ImageUtils.loadTexture( 'images/t3.jpg' );
Robot.texture2 = new THREE.ImageUtils.loadTexture( 'images/moon.jpg' );
Robot.materials = new THREE.MeshPhongMaterial( { map: Robot.texture2, bumpMap: Robot.texture2, bumpScale: 0.3, color: 0x2181FF } );
Robot.material3 = new THREE.MeshPhongMaterial( { map: Robot.texture, bumpMap: Robot.texture, bumpScale: 0.3} );
Robot.materials2 = new THREE.MeshPhongMaterial( { map: Robot.texture2, bumpMap: Robot.texture2, bumpScale: 0.3, color: 0xffffff} );
Robot.material4 = new THREE.MeshBasicMaterial( { color: 0xffffff, specular: 0xffffff, ambient: 0xffffff } );



Robot.prototype.createLimbJoint = function(inName, diameter, thickness) {
	var joint = new THREE.Object3D();

	var outerGeometry = new THREE.CylinderGeometry( diameter, diameter, thickness, 10, 4 );
	var outer = new THREE.Mesh(outerGeometry, Robot.materials );
	outer.position.set(0, 0, 0);
	outer.rotation.z = Math.PI / 2;

	joint.add(outer);

	joint.name = inName;

	return joint;
}

Robot.prototype.createLimbSegment = function(inName, length, thickness) {
	var segment = new THREE.Object3D();

	var bone1 = new THREE.Mesh( 
		new THREE.CylinderGeometry(0.6 * thickness, 0.7 * thickness, length, 20, 4 ), 
		Robot.materials2 );
	bone1.position.set(0, -length, 0 + 0.10 * thickness);
	segment.add(bone1);

	segment.name = inName; 

	return segment;
}

Robot.prototype.createTank = function(inName) {
	var tank = new THREE.Object3D();

	var cylinder = new THREE.Mesh( 
		new THREE.CylinderGeometry( 0.35, 0.35, 1.8, 20, 8  ), 
		Robot.materials2 );
	cylinder.position.set(0, 0, 0);
	tank.add(cylinder);

	var cylinder1 = new THREE.Mesh( 
		new THREE.CylinderGeometry( 0.10, 0.35,0.2, 6, 8 ), 
		Robot.materials );
	cylinder1.position.set(0, 0.96, 0);
	tank.add(cylinder1);

	var cylinder1 = new THREE.Mesh( 
		new THREE.CylinderGeometry( 0.35, 0.10, 0.3, 6, 8 ), 
		Robot.materials );
	cylinder1.position.set(0, -0.96, 0);
	tank.add(cylinder1);


	return tank;
}

Robot.prototype.createLight = function(inName) {
	var light = new THREE.Object3D();

	var lightSphere = new THREE.Mesh( 
		new THREE.SphereGeometry( 3, 32, 16 ), Robot.material4 );
	lightSphere.position.set(0, 0, 0);
	light.add(lightSphere);

	light.name = inName;

	return light;
}

Robot.prototype.createEye = function() {
	var eye = new THREE.Object3D();

	var socketGeometry = new THREE.CylinderGeometry( 0.12, 0.12, 0.2, 20, 8 );

	var socket = new THREE.Mesh( 
		socketGeometry, 
		Robot.materials2);
	socket.rotation.x = Math.PI / 2;

	eye.add(socket);

/*	var light = this.createLight();
	light.position.z = -11.3;
	eye.add(light);*/

	return eye;
}

Robot.prototype.createHead = function() {
	var head = new THREE.Object3D();

	var skullGeometry = new THREE.CylinderGeometry( 0.7, 0.7, 1, 40, 6 );

	var skull = new THREE.Mesh( 
		skullGeometry, 
		Robot.materials );
	skull.position.set(0, 2.8, 0);
	head.add(skull);

	var neck = new THREE.Mesh( 
		new THREE.CylinderGeometry(0.3, 0.3, 0.45, 20, 4 ), 
		Robot.materials2 );
	neck.position.set(0, 2.2, 0);
	head.add(neck);

	var lefteye = this.createEye("lefttank");
	lefteye.position.set(0.2, 2.9, -0.70);
	head.add(lefteye);

	var righteye = this.createEye("righteye");
	righteye.position.set(-0.2, 2.9, -0.70);
	head.add(righteye);

	head.name = "head"

	return head;
}

var body;
Robot.prototype.createBody = function() {
	body = new THREE.Object3D();
       
    if(bombols){
       var body = new THREE.Object3D();
	   var lefttank = this.createTank("lefttank");
	   lefttank.position.set(0.4, 80, 0.81);
	   body.add(lefttank);

	   var righttank = this.createTank("righttank");
	   righttank.position.set(-0.4, 80, 0.81);
	   body.add(righttank);
    }
	var bodyGeometry = new THREE.BoxGeometry( 2, 3, 1, 2, 2, 2 );

	var bodyBox = new THREE.Mesh(bodyGeometry, 
		Robot.material3 );
	bodyBox.position.y = 80;
	body.add(bodyBox);
    
    var tube1 = new THREE.Mesh( 
		new THREE.CylinderGeometry( 0.1, 0.1, 1.8, 12, 4 ), 
		Robot.material3 );
	tube1.rotation.z = Math.PI / 2;
	tube1.position.y = 78.2;
	body.add(tube1);

    var tube = new THREE.Mesh( 
		new THREE.CylinderGeometry( 0.1, 0.1, 2.9, 20, 4 ), 
		Robot.material3 );
	tube.rotation.z = Math.PI / 2;
	tube.position.y = 81;
	body.add(tube);	

	var beltGeometry = new THREE.BoxGeometry( 1, 0.5, 0.5, 4, 4, 4 );

	var belt = new THREE.Mesh(beltGeometry, Robot.materials2 );
	belt.position.y = 78.4;
	body.add(belt);

	body.name = "body"

	return body;
}

Robot.prototype.createCube = function(inName) {
	var light = new THREE.Object3D();

	var lightCube = new THREE.Mesh( new THREE.BoxGeometry( 0.5, 0.2, 0.5), Robot.materials );
	//lightCube.position.set(0, 44.5, 0);
	light.add(lightCube);

	light.name = inName;

	return light;
}

Robot.prototype.createLeg = function(inName) {
	var leg = new THREE.Object3D();

	var hip = this.createLimbJoint("hip", 0.4, 0.4);
	hip.position.y = 52.7;
	leg.add(hip);

	var thigh = this.createLimbSegment("thigh", 2, 0.15);
	thigh.position.y = 53.55;
	leg.add(thigh);

	var shin = new THREE.Object3D();

	var light = this.createCube();
	light.position.y = 50.3;
	light.position.x = 0;

	light.rotation.x = 1.6;
	leg.add(light);

	var finger_leg= new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.4, 0.1 ), Robot.materials );
	finger_leg.position.y = 50;
	finger_leg.rotation.x = 91;
	finger_leg.position.z = 0;
	finger_leg.position.x = 0.2;
	leg.add(finger_leg);

	var finger_leg1= new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.4, 0.1 ), Robot.materials );
	finger_leg1.position.y = 50;
	finger_leg1.rotation.x = 91;
	finger_leg1.position.z = 0;
	finger_leg1.position.x = 0;
	leg.add(finger_leg1);

	var finger_leg2= new THREE.Mesh( new THREE.BoxGeometry(0.1, 0.4, 0.1 ), Robot.materials );
	finger_leg2.position.y = 50;
	finger_leg2.rotation.x = 91;
	finger_leg2.position.z = 0;
	finger_leg2.position.x = -0.2;
	leg.add(finger_leg2);

	leg.name = inName;

	return leg;
}

Robot.prototype.createbocs = function(inName) {
   var boc = new THREE.Object3D();
   var tubeGeometry = new THREE.CylinderGeometry( 0.2, 0.1, 0.2, 30, 10 );
   var tube = new THREE.Mesh(tubeGeometry, Robot.materials2 );
   boc.add(tube);
   boc.position.set(0, 0.3, 0);

   boc.name = inName;
   
   return boc;

}

Robot.prototype.createArm = function(inName) {
	var arm = new THREE.Object3D();

	var shoulder = this.createLimbJoint("shoulder", 0.4, 0.4);
	arm.add(shoulder);

	var bicep = this.createLimbSegment("bicep", 1.8, 0.15);
	bicep.position.y = 1.1;
	arm.add(bicep);

	var forearm = new THREE.Object3D();
    
    if(get_arm){
	    var tubeGeometry1 = new THREE.CylinderGeometry( 0.2,0.2, 1, 50, 10 );
	    var tube1 = new THREE.Mesh(tubeGeometry1, Robot.material3 );
        tube1.position.y = 53;
	    forearm.add(tube1);

        var boc = this.createbocs("bocs");

        boc.position.y = 52.4;
	    forearm.add(boc);
    }else{
    	var hand = new THREE.Mesh( new THREE.BoxGeometry( 0.2, 0.5, 0.5 ), Robot.materials );
	    hand.position.y = 53.2;
	    forearm.add(hand);
    
    var k=0;
    for(k=0;k<4;k++){
    	var  finger1= new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.4, 0.08 ), Robot.materials );
	    finger1.position.y = 52.8;
	    if(k==0){
	    	finger1.position.z = -0.18;
	    }else if(k==2){
	    	finger1.position.z = -0.06;
	    }else if(k==3){
	    	finger1.position.z = 0.06;
	    }else{
            finger1.position.z = 0.18;
	    }
        forearm.add(finger1);
    }

    var finger2= new THREE.Mesh( new THREE.BoxGeometry( 0.1, 0.3, 0.08 ), Robot.materials );
    finger2.position.z = -0.3;
    finger2.position.x = 0;
    finger2.position.y = 53.2;
    finger2.rotation.x = 155;
	forearm.add(finger2);

    }
   	forearm.position.y = -55;
	arm.add(forearm);
	arm.name = inName;

	return arm;
}
