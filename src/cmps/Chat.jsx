import { useEffect, useRef, useState } from "react"

export function Chat() {
  const [msgs, setMsgs] = useState([])
  const [txt, setTxt] = useState('')
  const nextIdRef = useRef(1)
  const listRef = useRef(null)

  function addMsg(from, text) {
    setMsgs(prev => [...prev, { id: nextIdRef.current++, from, txt: text }])
  }

  function onSubmit(ev) {
    ev.preventDefault()
    const clean = txt.trim()
    if (!clean) return
    addMsg('user', clean)
    setTxt('')
    setTimeout(() => addMsg('bot', getAutoReply(clean)), 600)
  }

  function getAutoReply(userTxt) {
    const replies = [
      'Got it 👍',
      'Sounds good!',
      'Interesting…',
      'I agree.',
      `Do you mean: "${userTxt}"?`,
      'Passing it along 📨',
      'Handled!',
      'Working on it 🔧',
      'Thanks for the update!',
      'Let me check that.'
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [msgs])

  return (
    <section className="chat">
      <div ref={listRef} className="chat__list">
        <ul className="chat__items clean-list">
          {msgs.map(m => (
            <li
              key={m.id}
              className={`chat__item ${m.from === 'user' ? 'chat__item--user' : 'chat__item--bot'}`}
            >
              <b>{m.from === 'user' ? 'You:' : 'Bot:'}</b>&nbsp;
              <span>{m.txt}</span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={onSubmit} className="chat__form">
        <input
          className="chat__input"
          value={txt}
          onChange={ev => setTxt(ev.target.value)}
          placeholder="Say something…"
        />
        <button className="btn primary">Send</button>
      </form>
    </section>
  )
}
