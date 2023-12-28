import { useEffect } from "react"
import { Button } from "./ui/button"
import { AnimatePresence, motion } from "framer-motion"

const Modal = ({ open, onClose, children }: any) => {
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex justify-center items-center dark:bg-background/50 backdrop-blur-sm bg-white bg-opacity-50 z-[200]">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative p-2 bg-white rounded-md shadow-lg dark:bg-background border dark:border-border"
        >
          {children}
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="self-center mx-auto mt-2"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Modal
