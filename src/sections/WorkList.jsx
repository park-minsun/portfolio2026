import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import thumbImg from '../assets/images/@thumb.png'

const WORK_ITEMS = [1, 2, 3, 4, 5]

export default function WorkList() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const cursor = section.querySelector('.cursor')
    const links = section.querySelectorAll('.work-list a')

    const ctx = gsap.context(() => {
      const list = gsap.utils.toArray(section.querySelectorAll('.work-list li'))

      gsap.to(list, {
        xPercent: -100 * (list.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'center center',
          end: '200%',
        },
      })

      gsap.set(cursor, { xPercent: -50, yPercent: -130 })
    }, section)

    const handlePointerMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' })
    }
    const showCursor = () => {
      gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
    }
    const hideCursor = () => {
      gsap.to(cursor, { opacity: 0, scale: 0.3, duration: 0.3, ease: 'power2.in' })
    }

    document.addEventListener('pointermove', handlePointerMove)
    links.forEach((link) => {
      link.addEventListener('mouseenter', showCursor)
      link.addEventListener('mouseleave', hideCursor)
    })

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      links.forEach((link) => {
        link.removeEventListener('mouseenter', showCursor)
        link.removeEventListener('mouseleave', hideCursor)
      })
      ctx.revert()
    }
  }, [])

  return (
    <section className="sec2" ref={sectionRef}>
      <h2 className="title">WORK</h2>
      <div className="cursor">
        <span className="circle"></span>
      </div>
      <ul className="work-list">
        {WORK_ITEMS.map((item) => (
          <li key={item}>
            <a href="#">
              <div className="img">
                <img src={thumbImg} alt="" />
              </div>
              <div className="txt">
                <p>제목입니다.</p>
                <span>
                  View More <i className="arrow"></i>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
