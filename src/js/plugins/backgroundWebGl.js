var canvas1 = document.querySelector('.scene--full');
var width1 = canvas1.offsetWidth,
    height1 = canvas1.offsetHeight;

var renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
    antialias: true,
    alpha: true
});
renderer1.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer1.setSize(width1, height1);
renderer1.setClearColor(0x000000,0);

var scene1 = new THREE.Scene();

var camera1 = new THREE.PerspectiveCamera(40, width1 / height1, 0.1, 1000);
camera1.position.set(0, 0, 350);

var sphere1 = new THREE.Group();
scene1.add(sphere1);
var material1 = new THREE.LineBasicMaterial({
    color: 0xfe0e55
});
var linesAmount = 18;
var radiusB = 100;
var verticesAmount = 50;
for(var j=0;j<linesAmount;j++){
    var index = j;
    var geometry = new THREE.Geometry();
    geometry.y = (index/linesAmount) * radiusB*2;
    for(var i=0;i<=verticesAmount;i++) {
        var vector = new THREE.Vector3();
        vector.x = Math.cos(i/verticesAmount * Math.PI*2);
        vector.z = Math.sin(i/verticesAmount * Math.PI*2);
        vector._o = vector.clone();
        geometry.vertices.push(vector);
    }
    var line = new THREE.Line(geometry, material1);
    sphere1.add(line);
}

function updateVertices (a) {
 for(var j=0;j<sphere1.children.length;j++){
     var line = sphere1.children[j];
     line.geometry.y += 0.3;
     if(line.geometry.y > radiusB*2) {
         line.geometry.y = 0;
     }
     var radiusBHeight = Math.sqrt(line.geometry.y * (2*radiusB-line.geometry.y));
     for(var i=0;i<=verticesAmount;i++) {
         var vector = line.geometry.vertices[i];
            var ratio = noise.simplex3(vector.x*0.009, vector.z*0.009 + a*0.0006, line.geometry.y*0.009) * 15;
            vector.copy(vector._o);
            vector.multiplyScalar(radiusBHeight + ratio);
            vector.y = line.geometry.y - radiusB;
        }
     line.geometry.verticesNeedUpdate = true;
 }
}

function render(a) {
    requestAnimationFrame(render);
    updateVertices(a);
    renderer1.render(scene1, camera1);
}

function onResize() {
    canvas1.style.width = '';
    canvas1.style.height = '';
    width1 = canvas1.offsetWidth;
    height1 = canvas1.offsetHeight;
    camera1.aspect = width1 / height1;
    camera1.updateProjectionMatrix();
    renderer1.setSize(width1, height1);
}

var mouse = new THREE.Vector2(0.8, 0.5);
function onMouseMove(e) {
    mouse.y = e.clientY / window.innerHeight;
    TweenMax.to(sphere1.rotation, 2, {
        x : (mouse.y * 1),
        ease:Power1.easeOut
    });
}

requestAnimationFrame(render);
window.addEventListener("mousemove", onMouseMove);
var resizeTm;
window.addEventListener("resize", function(){
    resizeTm = clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 200);
});