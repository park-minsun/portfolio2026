import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Contact() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none none',
          },
        })
        .to(section.querySelector('.left'), { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
        .to(section.querySelector('.right'), { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    }, section)

    return () => ctx.revert()
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="sec4" ref={sectionRef}>
      <div className="inner">
        <div className="left">
          <p>
            Thank you for <br />
            reviewing my portfolio <br />
            I look forward to <br />
            connecting with you!
          </p>
        </div>
        <div className="right">
          <ul className="info">
            <li>Park Min Sun</li>
            <li>+82) 10-4005-2540</li>
            <li>io1203@naver.com</li>
          </ul>
          <div className="link-btn">
            <a href="#" onClick={(e) => e.preventDefault()}>
              view resume
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              view github
            </a>
          </div>
        </div>
      </div>

      <button className="top-btn" onClick={handleScrollTop}>
        <span className="en2">TOP</span>
      </button>
    </section>
  )
}
