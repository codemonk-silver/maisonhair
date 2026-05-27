import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  uniform float uAspect;
  uniform float uTime;
  uniform float uCenterAngle;
  uniform vec2 uMouse;
  uniform float uAnimType;
  uniform float uHide;
  uniform float uHideInner;
  uniform vec2 uCenter;
  uniform float uStrength;

  varying vec2 vUv;
  varying vec2 vCenterUv;
  varying float vHideUv;
  varying float vDisplacement;

  float circle(vec2 uv, vec2 center, float radius) {
    return smoothstep(radius, 0.0, length(uv - center));
  }

  void main() {
    vec3 transformed = vec3(position);

    vec3 posUv = transformed / vec3(1.0 / uAspect, 1.0, 1.0) + 0.5;

    float direction = uCenterAngle;
    float radius = distance(uCenter, posUv.xy);
    float a = atan(posUv.y - uCenter.y, posUv.x - uCenter.x);
    float circlePos = (direction / 3.14159265359) * 0.5 + 0.5;
    float polar = (a / 3.14159265359) * 0.5 + 0.5;
    float angleDifference = abs(polar - circlePos);
    float angleDifference2 = 1.0 - angleDifference;
    float maxAngleDifference = max(angleDifference, angleDifference2);
    float angle = smoothstep(0.0, 0.65, maxAngleDifference);
    float animCenterRadius = clamp(1.0 - radius * angle, 0.0, 1.0);
    float animCenterDir = smoothstep(0.5, 1.0, (sin((animCenterRadius - uTime * 2.0) * 5.0) + 1.0) * 0.5);

    float centerDist = smoothstep(0.3, 0.0, distance(vec2(0.5), posUv.xy));
    animCenterDir = mix(animCenterDir, animCenterDir * centerDist, 0.8);

    float animCenter = uStrength * animCenterDir * 0.8;

    float dist = distance(uMouse, posUv.xy);
    float mouseCircle = smoothstep(0.4, 0.0, dist);
    float d = mouseCircle * 1.2 * (1.0 - uAnimType);

    transformed.z += d + animCenter;

    vDisplacement = transformed.z;
    vUv = uv;
    vCenterUv = posUv.xy;

    vec4 mvPosition = vec4(transformed, 1.0);
    #ifdef USE_INSTANCING
      mvPosition = instanceMatrix * mvPosition;
    #endif
    mvPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;

    vHideUv = circle(vUv, vec2(0.5), 0.5);
    float hide = smoothstep(0.0, 0.4, vHideUv);
    float innerCircle = circle(vCenterUv, vec2(0.5), 0.48);
    vHideUv *= smoothstep(0.0, 0.4, innerCircle);
    float edgeWidth = 0.016;
    float outerEdge = smoothstep(0.5 - edgeWidth, 0.5, 1.0 - vHideUv);
    float innerEdge = smoothstep(0.48 - edgeWidth, 0.48, 1.0 - innerCircle);
    vHideUv = clamp(vHideUv + outerEdge * uHide + innerEdge * uHideInner, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  uniform float uAnimType;

  varying vec2 vUv;
  varying float vHideUv;
  varying vec2 vCenterUv;

  void main() {
    vec4 finalColor = vec4(1.0);
    vec4 textureColor = vec4(0.0);
    float mixValue = 0.0;

    #ifdef USE_MAP
      textureColor = texture2D(uTexture, vUv);
      mixValue = (vUv.y - (-uAnimType * 0.4 + 0.2) + 0.4 * (1.0 - vHideUv)) * 2.0;
      finalColor *= mix(vec4(uColor, 1.0), textureColor, smoothstep(0.0, 1.0, mixValue));
    #else
      finalColor = vec4(uColor, vHideUv);
    #endif

    finalColor.a = vHideUv;
    gl_FragColor = finalColor;
    #include <colorspace_fragment>
  }
`;

const NROWS = 3;
const NCOLS = 3;
const CARD_WIDTH = 1.1;
const CARD_HEIGHT = 1.7;
const GAP = 0.05;
const TOTAL_WIDTH = NCOLS * CARD_WIDTH + (NCOLS - 1) * GAP;

const IMAGE_PATHS = [
  '/images/hero-card-1.jpg',
  '/images/hero-card-2.jpg',
  '/images/hero-card-3.jpg',
  '/images/hero-card-4.jpg',
  '/images/hero-card-5.jpg',
  '/images/hero-card-6.jpg',
  '/images/hero-card-7.jpg',
  '/images/hero-card-8.jpg',
  '/images/hero-card-9.jpg',
];

interface CardData {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  initialPosition: THREE.Vector3;
  enterTime: number;
  centerAngle: number;
  angle_v: number;
  angle_x: number;
  angle_y: number;
  displacement: THREE.Vector3;
}

function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

export default function HeroScene({ heroSpacerRef }: { heroSpacerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneObjectsRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    raycaster: THREE.Raycaster;
    mouseVector: THREE.Vector2;
    plane: THREE.Mesh;
    virtualCursor: THREE.Mesh;
    cards: CardData[];
    scrollProgress: number;
    clock: THREE.Clock;
    rafId: number;
    tl: gsap.core.Timeline | null;
  } | null>(null);

  useEffect(() => {
    if (!canvasContainerRef.current || !heroSpacerRef.current) return;

    const container = canvasContainerRef.current;
    const screenSize = {
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
    };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1A1110);

    const camera = new THREE.PerspectiveCamera(50, screenSize.width / screenSize.height, 0.1, 20);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(screenSize.width, screenSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.maxWidth = '100%';
    container.appendChild(renderer.domElement);

    // Raycasting plane
    const planeGeom = new THREE.PlaneGeometry(100, 100);
    const planeMat = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeom, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.5;
    scene.add(plane);

    // Virtual cursor
    const cursorGeom = new THREE.CircleGeometry(0.24, 32);
    const cursorMat = new THREE.MeshBasicMaterial({ visible: false });
    const virtualCursor = new THREE.Mesh(cursorGeom, cursorMat);
    scene.add(virtualCursor);

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // Load textures and create cards
    const loader = new THREE.TextureLoader();
    const cards: CardData[] = [];

    const colors = [0xFFF8EF, 0xE8D8C3, 0xFFF8EF, 0xE8D8C3, 0xFFF8EF, 0xE8D8C3, 0xFFF8EF, 0xE8D8C3, 0xFFF8EF];

    IMAGE_PATHS.forEach((path, index) => {
      const texture = loader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;

      const row = Math.floor(index / NCOLS);
      const col = index % NCOLS;

      const geometry = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT, 64, 64);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uColor: { value: new THREE.Color(colors[index]) },
          uAnimType: { value: 0.0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uAspect: { value: CARD_WIDTH / CARD_HEIGHT },
          uStrength: { value: 0.0 },
          uCenter: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0.0 },
          uCenterAngle: { value: 0.0 },
          uHide: { value: 0.0 },
          uHideInner: { value: 0.0 },
        },
        transparent: true,
        defines: {
          USE_MAP: '',
        },
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        col * (CARD_WIDTH + GAP) - TOTAL_WIDTH / 2 + CARD_WIDTH / 2,
        row * (CARD_HEIGHT + GAP) - (NROWS * CARD_HEIGHT + (NROWS - 1) * GAP) / 2 + CARD_HEIGHT / 2,
        0
      );

      scene.add(mesh);

      const posX = mesh.position.x;
      const posY = mesh.position.y;

      cards.push({
        mesh,
        initialPosition: mesh.position.clone(),
        enterTime: 0,
        centerAngle: Math.atan2(posY, posX),
        angle_v: 0,
        angle_x: 0,
        angle_y: 0,
        displacement: new THREE.Vector3(0, 0, 0),
      });
    });

    const clock = new THREE.Clock();
    let scrollProgress = 0;
    let tl: gsap.core.Timeline | null = null;

    sceneObjectsRef.current = {
      renderer,
      scene,
      camera,
      raycaster,
      mouseVector,
      plane,
      virtualCursor,
      cards,
      scrollProgress,
      clock,
      rafId: 0,
      tl,
    };

    // Card entrance animation
    function animateInCards() {
      gsap.set(cards.map((c) => c.mesh), { visible: false });

      const enterTimeline = gsap.timeline();

      cards.forEach((card, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);

        enterTimeline.add(() => {
          card.mesh.visible = true;
          card.mesh.material.uniforms.uTime.value = 0;

          gsap.fromTo(
            card.mesh.rotation,
            { x: 0.24, y: -(col * 0.7 - 0.35) },
            { x: 0, y: 0, duration: 1.75, ease: 'power2.out' }
          );
          gsap.fromTo(
            card.mesh.position,
            { z: -20 },
            { z: card.initialPosition.z, duration: 1.75, ease: 'power2.inOut' }
          );
          gsap.fromTo(
            card.mesh.material.uniforms.uAnimType,
            { value: 1 },
            { value: 0, duration: 1.75, ease: 'power2.out' }
          );
          gsap.fromTo(
            card.mesh.scale,
            { x: 0, y: 0 },
            { x: 1, y: 1, duration: 1.75, ease: 'power2.inOut' }
          );
        }, `${(2 - col) * 0.1 + row * 0.1}`);
      });
    }

    animateInCards();

    // Scroll-driven center animation
    if (heroSpacerRef.current) {
      const stTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSpacerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (sceneObjectsRef.current) {
              sceneObjectsRef.current.scrollProgress = self.progress;
              updateCenterAnimation(self.progress);
            }
          },
        },
      });
      sceneObjectsRef.current.tl = stTl;
    }

    function updateCenterAnimation(progress: number) {
      const localTl = gsap.timeline();

      // Center card (index 4) zoom
      localTl.to(
        cards[4].mesh.position,
        { z: 2.7, duration: 1, ease: 'power1.inOut' },
        0
      );
      localTl.to(
        cards[4].mesh.material.uniforms.uCenterAngle,
        { value: 3.5, duration: 1, ease: 'power1.inOut' },
        0
      );

      // All cards bulge
      cards.forEach((card) => {
        localTl.to(
          card.mesh.material.uniforms.uStrength,
          { value: 0.45, duration: 1, ease: 'power1.inOut' },
          0.3
        );
        localTl.to(
          card.mesh.material.uniforms.uAnimType,
          { value: 1.0, duration: 1, ease: 'power1.inOut' },
          0.3
        );
      });

      localTl.progress(progress);

      // Damped reset
      cards.forEach((card) => {
        card.mesh.position.z = lerp(0, card.mesh.position.z, 0.92);
      });
    }

    // Cursor interaction
    function handleMouseMove(e: MouseEvent) {
      handleCursorRaycastInteraction(e.clientX, e.clientY);
    }

    function handleCursorRaycastInteraction(clientX: number, clientY: number) {
      const so = sceneObjectsRef.current;
      if (!so) return;

      so.mouseVector.set(
        (clientX / screenSize.width) * 2 - 1,
        -(clientY / screenSize.height) * 2 + 1
      );

      so.raycaster.setFromCamera(so.mouseVector, so.camera);
      const intersects = so.raycaster.intersectObject(so.plane);

      if (intersects.length === 0) return;

      so.virtualCursor.position.copy(intersects[0].point);

      so.cards.forEach((card) => {
        const mesh = card.mesh;
        const localPosition = mesh.worldToLocal(
          so.virtualCursor.position.clone()
        );

        mesh.material.uniforms.uMouse.value.set(
          THREE.MathUtils.clamp(localPosition.x + 0.5, 0, 1),
          THREE.MathUtils.clamp(localPosition.y + 0.5, 0, 1)
        );

        card.enterTime += 0.005;
        mesh.material.uniforms.uTime.value += 0.005;
        mesh.material.uniforms.uCenterAngle.value += 0.005;

        const speed = 0.1;
        const radius = 0.45;
        const maxAngle = 2 * Math.PI;

        card.angle_v += 0.05;
        card.angle_x += card.angle_v * Math.cos(card.centerAngle) * radius;
        card.angle_y += card.angle_v * Math.sin(card.centerAngle) * radius;

        card.angle_x = THREE.MathUtils.clamp(card.angle_x, -maxAngle, maxAngle);
        card.angle_y = THREE.MathUtils.clamp(card.angle_y, -maxAngle, maxAngle);

        card.angle_v *= 0.92;

        card.displacement.set(
          Math.cos(card.angle_x) * speed,
          Math.cos(card.angle_y) * speed,
          Math.sin(card.displacement.z + card.enterTime) * speed
        );

        mesh.position.copy(card.initialPosition);
        mesh.position.x += card.displacement.x;
        mesh.position.y += card.displacement.y;
        mesh.position.z += card.displacement.z;

        const rotationSpeed = 0.00075;
        const cardPosition =
          (mesh.position.x + TOTAL_WIDTH / 2) / TOTAL_WIDTH;
        const cardAngle = THREE.MathUtils.lerp(0.05, 0.3, cardPosition);

        mesh.rotation.y = (cardPosition - 0.5) * cardAngle;
        mesh.rotation.y += card.angle_x * rotationSpeed;
        mesh.rotation.x += card.angle_y * rotationSpeed;
      });
    }

    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    function handleResize() {
      screenSize.width = document.documentElement.clientWidth;
      screenSize.height = window.innerHeight;
      camera.aspect = screenSize.width / screenSize.height;
      camera.updateProjectionMatrix();
      renderer.setSize(screenSize.width, screenSize.height);
    }
    window.addEventListener('resize', handleResize);

    // Animation loop
    function animate() {
      const rafId = requestAnimationFrame(animate);
      if (sceneObjectsRef.current) {
        sceneObjectsRef.current.rafId = rafId;
      }
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (sceneObjectsRef.current) {
        cancelAnimationFrame(sceneObjectsRef.current.rafId);
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [heroSpacerRef]);

  return (
    <div
      ref={canvasContainerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}