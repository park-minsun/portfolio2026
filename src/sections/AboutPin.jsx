import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import lottie from 'lottie-web'
import meImg from '../assets/images/me.png'
import vector1 from '../assets/lottie/vector1.json'
import vector2 from '../assets/lottie/vector2.json'
import vector3 from '../assets/lottie/vector3.json'

export default function AboutPin() {
  const sectionRef = useRef(null)
  const lottie1Ref = useRef(null)
  const lottie2Ref = useRef(null)
  const lottie3Ref = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    const anim1 = lottie.loadAnimation({
      container: lottie1Ref.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: vector1,
    })
    const anim2 = lottie.loadAnimation({
      container: lottie2Ref.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: vector2,
    })
    const anim3 = lottie.loadAnimation({
      container: lottie3Ref.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: vector3,
    })

    const timeoutIds = []

    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray(section.querySelectorAll('.right .text'))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector('.pin-wrap'),
          start: 'top top',
          end: '+=300%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      texts.forEach((text) => {
        tl.to(text, { opacity: 1, duration: 0.5 }, '+=0.5')
        tl.to(text, { opacity: 0, duration: 0.5 }, '+=0.5')
      })

      ScrollTrigger.create({
        trigger: section.querySelector('.pin-wrap'),
        start: 'top 20%',
        once: true,
        onEnter: () => {
          anim1.play()
          timeoutIds.push(setTimeout(() => anim2.play(), 500))
          timeoutIds.push(setTimeout(() => anim3.play(), 1000))
        },
      })
    }, section)

    return () => {
      timeoutIds.forEach(clearTimeout)
      ctx.revert()
      anim1.destroy()
      anim2.destroy()
      anim3.destroy()
    }
  }, [])

  return (
    <section className="sec1" ref={sectionRef}>
      <div className="pin-wrap">
        <div className="left">
          <img className="me" src={meImg} alt="" />
          <div ref={lottie1Ref} className="obj obj1"></div>
          <div ref={lottie2Ref} className="obj obj2"></div>
          <div ref={lottie3Ref} className="obj obj3"></div>
        </div>
        <div className="right">
          <div className="text text1">
            <p>
              안녕하세요. <br />
              음악과 동물을 사랑하는 <br />
              웹 디자이너 겸 퍼블리셔 박민선 입니다.
            </p>
          </div>
          <div className="text text2">
            <p>
              비주얼 적인 요소를 만드는데 <br />
              매력을 느껴 UI의 세계에 입문, <br />
              그리고 나아가 UX까지 더 발전하고 싶습니다.
            </p>
          </div>
          <div className="text text3">
            <p>
              배움을 두려워하지 않고 <br />
              끈기와 열정으로 늘 도전하는 모습을 <br />
              보여드리겠습니다!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
