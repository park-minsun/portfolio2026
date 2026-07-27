import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Matter from 'matter-js'

export default function Skills() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const { Engine, Render, Runner, Bodies, Composite, World, Mouse, MouseConstraint, Events } = Matter

    let width = window.innerWidth
    let height = window.innerHeight

    let walls = []
    let ground = null

    const engine = Engine.create()
    const world = engine.world

    const render = Render.create({
      canvas,
      engine,
      options: {
        wireframes: false,
        background: 'transparent',
      },
    })

    Render.run(render)
    const runner = Runner.create()
    Runner.run(runner, engine)

    const shapes = []

    function getScaleFactor() {
      const baseWidth = 1280
      return Math.min(1, window.innerWidth / baseWidth)
    }

    const handleAfterRender = () => {
      const ctx = render.context
      const scale = getScaleFactor()
      const fontSize = 80 * scale

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `500 ${fontSize}px "ppNeuebit", sans-serif`
      ctx.fillStyle = '#2d3436'

      shapes.forEach((obj) => {
        const { x, y } = obj.shape.position
        const angle = obj.shape.angle

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.fillText(obj.text, 0, 0)
        ctx.restore()
      })
    }
    Events.on(render, 'afterRender', handleAfterRender)

    function createShapes() {
      const scale = getScaleFactor()
      const section = width / 5

      const items = [
        {
          shape: Bodies.rectangle(section * 1, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'GSAP',
          color: '#50f150',
        },
        {
          shape: Bodies.rectangle(section * 2, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'HTML',
          color: '#ff5151',
        },
        {
          shape: Bodies.rectangle(section * 2, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'CSS',
          color: '#00a5f1',
        },
        {
          shape: Bodies.rectangle(section * 1, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'SCSS',
          color: '#ff8fab',
        },
        {
          shape: Bodies.rectangle(section * 3, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'JS',
          color: '#ffee00',
        },
        {
          shape: Bodies.rectangle(section * 3, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'figma',
          color: '#d67cff',
        },
        {
          shape: Bodies.rectangle(section * 1, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'Photoshop',
          color: '#2f78ff',
        },
        {
          shape: Bodies.rectangle(section * 2, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'Illustrator',
          color: '#ffae00ff',
        },
        {
          shape: Bodies.rectangle(section * 4, 200, 500 * scale, 200 * scale, {
            chamfer: { radius: 100 * scale },
            angle: Math.random() * 0.4 - 0.2,
          }),
          text: 'Git',
          color: '#63e7b4ff',
        },
      ]

      items.forEach((obj) => {
        obj.shape.render.fillStyle = obj.color
        obj.shape.render.strokeStyle = '#222'
        obj.shape.render.lineWidth = 1
        obj.shape.label = obj.text
        Composite.add(world, obj.shape)
        shapes.push(obj)
      })
    }

    function clearShapes() {
      shapes.forEach((obj) => Composite.remove(world, obj.shape))
      shapes.length = 0
    }

    function createWalls() {
      const wallThickness = 100

      walls.forEach((w) => Composite.remove(world, w))
      walls = []

      const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
      })
      const rightWall = Bodies.rectangle(width + wallThickness / 2 + 1, height / 2, wallThickness, height * 2, {
        isStatic: true,
      })
      const ceiling = Bodies.rectangle(width / 2, -wallThickness, width, wallThickness, {
        isStatic: true,
      })

      ;[leftWall, rightWall, ceiling].forEach((w) => {
        w.render.fillStyle = 'transparent'
        w.render.strokeStyle = 'transparent'
        w.render.lineWidth = 0
      })

      walls.push(leftWall, rightWall, ceiling)
      World.add(world, walls)
    }

    function createGround() {
      if (ground) Composite.remove(world, ground)

      ground = Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true })
      ground.render.fillStyle = 'transparent'
      ground.render.strokeStyle = 'transparent'
      ground.render.lineWidth = 0

      Composite.add(world, ground)
    }

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    })
    Composite.add(world, mouseConstraint)

    function resizeCanvas() {
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width
      canvas.height = height

      render.canvas.width = width
      render.canvas.height = height
      render.options.width = width
      render.options.height = height
      render.bounds.max.x = width
      render.bounds.max.y = height

      clearShapes()
      createShapes()
      createWalls()
      createGround()
    }

    resizeCanvas()
    createGround()
    createWalls()

    window.addEventListener('resize', resizeCanvas)

    const noop = () => {}
    canvas.addEventListener('wheel', noop, { passive: true })
    canvas.addEventListener('touchmove', noop, { passive: true })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      once: true,
      onEnter: () => {
        clearShapes()
        createShapes()
      },
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('wheel', noop)
      canvas.removeEventListener('touchmove', noop)
      Events.off(render, 'afterRender', handleAfterRender)
      trigger.kill()
      Runner.stop(runner)
      Render.stop(render)
      World.clear(world)
      Engine.clear(engine)
    }
  }, [])

  return (
    <section className="sec3" ref={sectionRef}>
      <h2 className="title">SKILLS</h2>
      <div className="skill-wrap">
        <canvas id="world" ref={canvasRef}></canvas>
      </div>
    </section>
  )
}
