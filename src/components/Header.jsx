import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

const NAV_LINKS = [
  { to: '/', label: 'Design' },
  { to: '/publishing', label: 'Publishing' },
]

const RESUME_URL = 'https://power-plutonium-b90.notion.site/36ad872075d34cc684955c2e4938421b'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className={`logo${isMenuOpen ? ' hide' : ''}`}>
            <img src={logo} alt="로고" />
          </Link>
          <nav>
            <ul>
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} data-text={item.label}>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a href={RESUME_URL} data-text="Resume" target="_blank" rel="noreferrer">
                  <span>Resume</span> <i className="ico-blank"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <button
          type="button"
          className={`menu-btn${isMenuOpen ? ' active' : ''}`}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="top"></span>
          <span className="middle"></span>
          <span className="bottom"></span>
        </button>
      </header>

      <div className={`overlay${isMenuOpen ? ' open' : ''}`}>
        <nav className="overlay-menu en2">
          <ul>
            {NAV_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>
                Resume <i className="ico-blank"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
