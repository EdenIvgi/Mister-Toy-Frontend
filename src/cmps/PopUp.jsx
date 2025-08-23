import { useEffect } from "react"

export function PopUp({ isOpen, onClose, heading = null, footing = null, children }) {
  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(ev) {
      if (ev.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function onBackdropClick(ev) {
    if (ev.target === ev.currentTarget) onClose?.()
  }

  return (
    <section className="popup-backdrop" onClick={onBackdropClick}>
      <div className="popup" role="dialog" aria-modal="true">
        {heading && <header className="popup__header">{heading}</header>}
        <main className="popup__main">{children}</main>
        {footing && <footer className="popup__footer">{footing}</footer>}
      </div>
    </section>
  )
}
