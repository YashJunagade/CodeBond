import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const Header = ({ user }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className={`flex items-center justify-between p-4 border-b dark:border-gray-700 ${theme}`}
    >
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        CodeBond<span className="text-black dark:text-white">🖤</span>
        <p className="text-sm font-normal">
          Where friendships and code are forged together
        </p>
      </h1>

      <nav className="flex gap-6">
        <a className="font-medium text-black dark:text-white" href="#">
          Dashboard
        </a>
        <a className="font-medium text-gray-500 dark:text-gray-300" href="#">
          Problems
        </a>
        <a className="font-medium text-gray-500 dark:text-gray-300" href="#">
          Custom Problem
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-600 p-2 rounded-full"
          title="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="text-black" />
          ) : (
            <Sun className="text-yellow-300" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img src={user.avatar} className="w-10 h-10 rounded-full border" />
          <div>
            <p className="text-sm text-black dark:text-white">
              Hey {user.name},
            </p>
            <p className="text-xs text-gray-500">
              Day - | Week - | Total Score -
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
