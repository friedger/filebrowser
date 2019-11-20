import React, {useRef} from 'react'
import { useFile } from 'react-blockstack'

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

function NoteField ({placeholder}) {
  const [note, setNote] = useFile("note")
  const textfield = useRef()
  const spinner = useRef()
  const saveAction = () => {
    spinner.current.classList.remove('hide')
    setNote(textfield.current.value)
    setTimeout(() => spinner.current.classList.add('hide'), 1500)
  }
  return(
    <div className="input-group ">
      <div className="input-group-prepend">
        <span className="input-group-text">Note</span>
      </div>
      <input type="text" ref={textfield} className="form-control" disabled={note === undefined}
             defaultValue={ note || ""} placeholder={placeholder}
             onKeyUp={(e) => {if (e.key === "Enter") saveAction()}}/>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button"
                disabled={!setNote} onClick={saveAction}>
          <div ref={spinner} role="status"
               className="hide spinner-border spinner-border-sm text-info align-text-top mr-2"/>
          Save
        </button>
      </div>
    </div>
  )
}

export default function Profile ({ person }) {
  return (
    <div className="panel-welcome" id="section-2">
      <div className="avatar-section">
        <img src={ (person && person.avatarUrl()) || avatarFallbackImage }
             className="img-rounded avatar" id="avatar-image" alt="Avatar"/>
      </div>
      <h1>Hello, <span id="heading-name">{ (person && person.name()) || 'Nameless Person' }</span>!</h1>
      <div className="lead row mt-5">
        <div className="mx-auto col-md-8 col-lg-6 px-3">
          <NoteField placeholder="Note to your future self..."/>
        </div>
      </div>
    </div>
  )
}
