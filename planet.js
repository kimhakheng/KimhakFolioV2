import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// create scence
const scence = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
// scence.add( camera );
camera.position.z = 2;
camera.position.x = -5;
// camera.position.y = -5;


// create renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// orbit control
// const controls = new OrbitControls(camera, renderer.domElement);


// earth geometry
const earthGeometry = new THREE.SphereGeometry(4, 32, 32);

// earth material
const earthTexture = new THREE.TextureLoader().load( '/earthmap1k.jpg' );
const earthBumpmap = new THREE.TextureLoader().load('/earthbump1k.jpg')
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: earthTexture,
    bumpMap: earthBumpmap,
    bumpScale: 0.3
})


// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scence.add(earthMesh)


// cloud Geometry
const cloudGeometry = new THREE.SphereGeometry(4.1, 32, 32);

// cloud metarial
const cloudTexture = new THREE.TextureLoader().load('/earthCloud.png');
const cloudMetarial = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true
})

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
scence.add(cloudMesh);



// Moon 
const moonTexture = new THREE.TextureLoader().load('/2k_moon.jpg')

const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshPhongMaterial({
        map: moonTexture
    })
)
const moonObj = new THREE.Object3D();
moonObj.add(moonMesh)
scence.add(moonObj);

moonMesh.position.x = 5
moonMesh.position.y = 0
moonMesh.position.z = 0



// // Sun 
// const sunTexture = new THREE.TextureLoader().load('2k_sun.jpg')

// const sunMesh = new THREE.Mesh(
//     new THREE.SphereGeometry(25, 32, 32),
//     new THREE.MeshPhongMaterial({
//         map: sunTexture
//     })
// )
// scence.add(sunMesh)

// sunMesh.position.x = -50
// sunMesh.position.y = 0
// sunMesh.position.z = 0


// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
    map : new THREE.TextureLoader().load('/galaxy.png'),
    side: THREE.BackSide
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scence.add(starMesh);


// ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.25);
scence.add(ambientlight);


// point light
const pointLight = new THREE.PointLight(0xffffff, 1, 300)
pointLight.position.set(-10, 3, -5);
scence.add(pointLight);


earthMesh.position.x = 0;
cloudMesh.position.x = 0;


// handling resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer();
}, false);



// rendering
function animate(){
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0005;
    cloudMesh.rotation.y -= 0.0005;
    starMesh.rotation.y -= 0.0005;
    // moonMesh.rotation.y = 0.1;
    moonObj.rotateY(-0.01);
    render();
  }

// rendering
const render = () => {
    renderer.render(scence, camera);
}

animate();