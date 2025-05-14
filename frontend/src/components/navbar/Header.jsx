import { Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useState } from 'react'

const Header = ({ user }) => {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showProfilePopup, setShowProfilePopup] = useState(false)

  return (
    <header
      className={`flex flex-col md:flex-row md:items-center justify-between p-4 dark:bg-primaryBg ${theme} animate-navbar`}
    >
      <div className="flex items-center justify-between w-full md:w-auto">
        <div>
          <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white">
            CodeBond<span className="text-black dark:text-white">❤️</span>
          </h1>
          <p className="text-[10px] font-normal text-gray-600 dark:text-gray-400">
            Where friendships and code are forged together
          </p>
        </div>
        <button
          className="md:hidden p-2 rounded focus:outline-none text-gray-700 dark:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>
      </div>

      <nav
        className={`${menuOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row gap-4 md:gap-6 mt-4 md:mt-0`}
      >
        <a className="navbar-btn" href="#">
          Dashboard
        </a>
        <a className="navbar-btn" href="#">
          Problems
        </a>
        <a className="navbar-btn" href="#">
          Custom Problem
        </a>
      </nav>

      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <button
          onClick={toggleTheme}
          className="relative bg-gray-200 dark:bg-gray-600 p-1.5 md:p-2 rounded-full transition-colors duration-300 hover:bg-gray-300 dark:hover:bg-gray-500 overflow-hidden w-10 h-10 flex items-center justify-center"
          title="Toggle Theme"
        >
          <Moon
            className={`absolute transition-all duration-500 ease-in-out ${
              theme === 'light'
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-75 -rotate-90'
            } text-black`}
          />
          <Sun
            className={`absolute transition-all duration-500 ease-in-out ${
              theme === 'dark'
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-75 rotate-90'
            } text-yellow-300`}
          />
        </button>

        <div className="flex items-center gap-2 mr-5">
          <div className="relative">
            <img
              src={user.avatar}
              onClick={() => setShowProfilePopup(!showProfilePopup)}
              className="w-10 h-10 rounded-full border cursor-pointer"
            />
            {showProfilePopup && (
              <div
                className="absolute right-0 mt-2 w-80 backdrop-blur-lg  bg-white/70 dark:bg-[#1f1f1f]/80 border border-gray-300 dark:border-gray-700 shadow-xl dark:shadow-[0_4px_30px_rgba(0,0,0,0.7)] hover:shadow-2xl dark:hover:shadow-[0_6px_40px_rgba(0,0,0,0.8)] rounded-xl p-5 z-50 transition-all duration-300 transform scale-95 animate-fade-slide"
              >
                <div className="border-b-2 border-primaryBtn pb-2 mb-2">
                  <p className="text-sm font-semibold text-black dark:text-white tracking-wide">
                    👋 Hey {user.name},
                  </p>
                </div>

                <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                  <p>Day -</p>
                  <p>Week -</p>
                  <p>Total Score -</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
