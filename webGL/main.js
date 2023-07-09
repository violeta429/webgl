import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Three.js 초기화
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas });
const camera = new THREE.PerspectiveCamera(500, 800 / 1000, 1, 1000);
const scene = new THREE.Scene();
let Mesh;
let light;
let light_sun;


function init() {
    scene.background = new THREE.Color('black');
    camera.position.set(5, 14, 18);
    camera.lookAt( 0.5, 10, 16 );
}

function setLight() {
    light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);
    
    light_sun = new THREE.DirectionalLight ( 0x808080, 1.0 );
      var shadowBlur=10;
      light_sun.castShadow=true;
      light_sun.shadow.camera.left=-shadowBlur;
      light_sun.shadow.camera.right=shadowBlur;
      light_sun.shadow.camera.top=shadowBlur;
      light_sun.shadow.camera.bottom=-shadowBlur;
      scene.add( light_sun );
}

// GLTF 로더 생성
const loader = new GLTFLoader();

// GLTF 파일 로드
loader.load(
  'src/object/test.glb',
  function (gltf) {
    // 로드된 GLTF 파일의 콘텐츠를 씬에 추가
    const object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // 로딩 진행 상태를 표시할 콜백 함수
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    // 로드 중에 오류가 발생하면 실행될 콜백 함수
    console.error('Error loading GLTF file:', error);
  }
);

function animate() {
    requestAnimationFrame(animate);
    if (Mesh && Mesh.rotation) {
        Mesh.rotation.y -= 0.001;
    }
    
    // 카메라 컨트롤러 추가
    //let controls = new THREE.OrbitControls (camera, renderer.domElement);
    //controls.update();
  
    renderer.render(scene, camera);
}







init();
setLight();
animate();