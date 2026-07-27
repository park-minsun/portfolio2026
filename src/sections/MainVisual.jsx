import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import pinkStar from '../assets/images/pink_star.png'
import blueStar from '../assets/images/blue_star.png'

export default function MainVisual() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current

    const ctx = gsap.context(() => {
      gsap.to(root.querySelectorAll('.ani-text .year, .ani-text .txt1'), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.to(root.querySelector('.ani-text .txt2'), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.0,
      })
    }, root)

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 1) * 2
      const y = (e.clientY / window.innerHeight - 1) * 4

      gsap.to(root.querySelector('.star.pink'), { x: x * 100, y: y * 60, duration: 1, ease: 'power2.out' })
      gsap.to(root.querySelector('.star.blue'), { x: -x * 100, y: -y * 60, duration: 1, ease: 'power2.out' })
    }
    root.addEventListener('mousemove', handleMouseMove)

    return () => {
      root.removeEventListener('mousemove', handleMouseMove)
      ctx.revert()
    }
  }, [])

  return (
    <div className="main-visual" ref={rootRef}>
      <div className="ani-text">
        <div className="line">
          <p className="year">(2026)</p>
        </div>
        <div className="line">
          <p className="txt1 en2">
            Welcome <span className="en1">to</span> My
          </p>
        </div>
        <div className="line">
          <p className="txt2 en1">Portfolio</p>
        </div>
      </div>
      <div className="bg">
        <div className="star pink">
          <img src={pinkStar} alt="" />
        </div>
        <div className="star blue">
          <img src={blueStar} alt="" />
        </div>
      </div>
    </div>
  )
}
