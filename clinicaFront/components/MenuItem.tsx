import { ChevronRightIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { MenuItemProps } from "@/types/next-auth"
import { AnimatePresence, motion } from "framer-motion"

const MenuItem: React.FC<MenuItemProps> = ({
  isOpen,
  toggleMenu,
  title,
  icon,
  links,
}) => (
  <div className="w-full select-none">
    <span
      className="flex items-center gap-2 cursor-pointer w-fit"
      onClick={toggleMenu}
    >
      {icon}
      {title}
      <ChevronRightIcon
        className={`w-4 h-4 ${
          isOpen ? "rotate-90" : ""
        } transition-all ease-in-out duration-200`}
      />
    </span>
    <AnimatePresence>
      {isOpen ? (
        <motion.div className="flex flex-col gap-1 mt-2 ml-2">
          {links.map((link) => (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              key={link.href}
            >
              <Link
                href={link.href}
                className="flex items-center w-full gap-2 p-2 px-3 text-sm text-gray-700 rounded-md dark:text-muted-foreground group hover:bg-gray-100 dark:hover:bg-accent"
              >
                <span className="flex items-center transition-all duration-200 ease-in-out group-hover:translate-x-2">
                  <span className="mr-2">{link.icon}</span>
                  {link.text}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  </div>
)

export default MenuItem
