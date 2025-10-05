import { twitterSvg, githubSvg } from "../icons/icons"
import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full  bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <h2 className="font-bold text-gray-800 dark:text-gray-100 sm:text-2xl text-lg tracking-tight">
          Link Shortener Tool
        </h2>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Sidharth77777/next-link-shortener"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-white"
          >
            {githubSvg}
          </Link>
          <Link
            href="https://x.com/cryptoSid1564"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400"
          >
            {twitterSvg}
          </Link>
        </div>
      </div>
    </header>
  )
}
