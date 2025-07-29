 // 메인 비주얼 별 마우스 모션
  const mainVisual = document.querySelector(".main-visual");

  mainVisual.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth - 1) * 2;
    let y = (e.clientY / window.innerHeight - 1) * 4;

    gsap.to(".star.pink", {
      x: x * 100,
      y: y * 60,
      duration: 1,
      ease: "power2.out"
    });

      gsap.to(".star.blue", {
        x: -x * 100,
        y: -y * 60,
        duration: 1,
        ease: "power2.out"
      });
    });

    // 글자 애니메이션
    window.addEventListener('DOMContentLoaded', () => {
    gsap.to(".ani-text .year, .ani-text .txt1", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.to(".ani-text .txt2", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.0
    });
  });

    // sec1 스크롤 트리거

    gsap.registerPlugin(ScrollTrigger);

    // 텍스트들 모음
    const texts = gsap.utils.toArray(".right .text");

    // TL 생성
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sec1 .pin-wrap",
        start: "top top",  
        end: "+=300%",
        scrub: true,
        pin: true, 
        anticipatePin: 1
      }
    });

    // 각 text를 순서대로 보여주고 숨기기
    texts.forEach((text, i) => {
      tl.to(text, {
        opacity: 1,
        duration: 0.5
      }, "+=0.5"); // 약간의 간격
      
      tl.to(text, {
        opacity: 0,
        duration: 0.5
      }, "+=0.5"); // 사라지면서 다음으로 넘어감
    });

   // 1. Lottie 애니메이션 객체 생성
  const lottie1 = lottie.loadAnimation({
    container: document.getElementById('lottie1'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/images/lottie/vector1.json'
  });

  const lottie2 = lottie.loadAnimation({
    container: document.getElementById('lottie2'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/images/lottie/vector2.json'
  });

  const lottie3 = lottie.loadAnimation({
    container: document.getElementById('lottie3'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '/images/lottie/vector3.json'
  });

  // 2. ScrollTrigger로 순차 재생
  ScrollTrigger.create({
    trigger: '.sec1 .pin-wrap',
    start: 'top 20%',
    once: true,
    onEnter: () => {
      lottie1.play();
      setTimeout(() => lottie2.play(), 500);  // 0.5초 후 실행
      setTimeout(() => lottie3.play(), 1000); // 1초 후 실행
    }
  });


  // 가로스크롤

  	let list = gsap.utils.toArray('.work-list li');

    let scrollTween = gsap.to(list, {
			xPercent: -100 * (list.length - 1),
			ease: 'none',
			scrollTrigger: { 
				trigger: '.sec2',
				pin: true,
				scrub: 1,
				start: 'center center',
				end: '200%',
				//markers: true,
			}
		});

    // work 커서 모션
    (function () {
      const cursor = document.querySelector('.cursor');

      if (!cursor) return;

      // 커서 위치
      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -130,
      });

      // 마우스 움직임에 따라 커서 이동
      document.addEventListener('pointermove', (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      function showCursor() {
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      function hideCursor() {
        gsap.to(cursor, {
          opacity: 0,
          scale: 0.3,
          duration: 0.3,
          ease: 'power2.in'
        });
      }

      // hover 시 효과 적용
      document.querySelectorAll('.work-list a').forEach((link) => {
        link.addEventListener('mouseenter', showCursor);
        link.addEventListener('mouseleave', hideCursor);
      });

    })();


    /** 
     * matter.js
     */

    const {
      Engine, Render, Runner,
      Bodies, Composite, World,
      Mouse, MouseConstraint, Events
    } = Matter;

    const canvas = document.getElementById('world');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: '#f7f7f7',
      }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    const shapes = [];

    // ✅ 기준 너비 대비 축소 비율 계산
    function getScaleFactor() {
      const baseWidth = 1024;
      return Math.min(1, window.innerWidth / baseWidth);
    }

    // ✅ 텍스트 렌더링
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      const scale = getScaleFactor();
      const fontSize = 80 * scale;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `500 ${fontSize}px "ppNeuebit", sans-serif`;
      ctx.fillStyle = '#2d3436';

      shapes.forEach(obj => {
        const { x, y } = obj.shape.position;
        const angle = obj.shape.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle); // 도형 회전에 따라 텍스트도 회전
        ctx.fillText(obj.text, 0, 0);
        ctx.restore();
      });
    });

    // ✅ 도형 생성
    function createShapes() {
      const scale = getScaleFactor();
      const section = width / 5;

      const items = [
          {
          shape: Bodies.rectangle(section * 1, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale }, // 둥근 모서리 추가
            angle: Math.random() * 0.4 - 0.2, // 약간 기울이기
          }),
          text: 'GSAP',
          color: '#50f150ff'
        },
        {
          shape: Bodies.rectangle(section * 2, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'HTML',
          color: '#ff5151ff'
        },
        {
          shape: Bodies.rectangle(section * 3, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'CSS',
          color: '#00a5f1ff'
        },
        {
          shape: Bodies.rectangle(section * 4, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'SCSS',
          color: '#ff8fab'
        },
        {
          shape: Bodies.rectangle(section * 2, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'JS',
          color: '#ffee00ff'
        },
        {
          shape: Bodies.rectangle(section * 3, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'figma',
          color: '#d67cffff'
        },
        {
          shape: Bodies.rectangle(section * 4, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'Photoshop',
          color: '#2f78ffff'
        },
        {
          shape: Bodies.rectangle(section * 1, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'Illustration',
          color: '#ffae00ff'
        },
        {
          shape: Bodies.rectangle(section * 2, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'Git',
          color: '#63e7b4ff'
        }
      ];

      items.forEach(obj => {
        obj.shape.render.fillStyle = obj.color;
        obj.shape.render.strokeStyle = '#222';
        obj.shape.render.lineWidth = 1;
        obj.shape.label = obj.text;
        Composite.add(world, obj.shape);
        shapes.push(obj);
      });
    }

    // ✅ 기존 도형 제거
    function clearShapes() {
      shapes.forEach(obj => {
        Composite.remove(world, obj.shape);
      });
      shapes.length = 0;
    }

    // ✅ 벽 생성
    function createWalls() {
      const wallThickness = 100;

      const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true
      });

      const rightWall = Bodies.rectangle(width + wallThickness / 2 + 1, height / 2, wallThickness, height * 2, {
        isStatic: true
      });

      const ceiling = Bodies.rectangle(width / 2, -wallThickness, width, wallThickness, {
        isStatic: true
      });
      ceiling.render.fillStyle = '#f7f7f7';
      ceiling.render.strokeStyle = '#f7f7f7';
      ceiling.render.lineWidth = 0;

      World.add(world, [leftWall, rightWall, ceiling]);
    }

    // ✅ 바닥 생성
    function createGround() {
      const ground = Bodies.rectangle(width / 2, height + 50, width, 100, {
        isStatic: true
      });
      ground.render.fillStyle = '#f7f7f7';
      ground.render.strokeStyle = '#f7f7f7';
      ground.render.lineWidth = 0;
      Composite.add(world, ground);
    }

    // ✅ 마우스 드래그
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(world, mouseConstraint);

    // ✅ 리사이즈 반응
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      render.canvas.width = width;
      render.canvas.height = height;
      render.options.width = width;
      render.options.height = height;
      render.bounds.max.x = width;
      render.bounds.max.y = height;

      // 도형 리셋 및 재생성
      clearShapes();
      //createShapes();
    }

    // ✅ 초기 실행
    resizeCanvas();
    createGround();
    createWalls();

    window.addEventListener('resize', resizeCanvas);

    // ✅ 휠 스크롤 기본 동작 허용
    canvas.addEventListener('wheel', () => {}, { passive: true });
  canvas.addEventListener('touchmove', () => {}, { passive: true });


  // 스크롤 위치 시 다시 실행


ScrollTrigger.create({
  trigger: '.sec3',
  start: 'top center', // 화면 중간에 .sec3 top이 닿으면
  once: true, // 한 번만 실행 (원한다면 제거해도 됨)
  onEnter: () => {
    clearShapes();
    createShapes();
  }
});
