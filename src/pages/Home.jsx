import MainVisual from '../sections/MainVisual.jsx'
import AboutPin from '../sections/AboutPin.jsx'
import WorkList from '../sections/WorkList.jsx'
import Skills from '../sections/Skills.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  return (
    <div className="main-cont">
      <MainVisual />
      <AboutPin />
      <WorkList />
      <Skills />
      <Contact />
    </div>
  )
}
