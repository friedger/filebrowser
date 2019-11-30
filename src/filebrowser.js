import React, {useState, useEffect, useCallback} from 'react'
import { useBlockstack, useFilesList} from 'react-blockstack'
import FileSaver, { saveAs } from 'file-saver'
import {fromEvent} from 'file-selector'
import { Atom, swap, useAtom } from "@dbeining/react-atom"

const matchAtom = Atom.of({match: ""})

export function useMatchGlobal() {
  const setMatch = (match) => swap(matchAtom, state => ({...state, match:match}))
  const {match} = useAtom(matchAtom)
  return [match, setMatch]
}

const uploadAtom = Atom.of([])

export function injectFile (file) {
  swap(uploadAtom, files => [file, ...files])
}

export function useFiles() {
  console.log("Load files")
  const uploaded = useAtom(uploadAtom)
  const [files] = useFilesList()
  return ([...uploaded, ...files])
}

export function useBrowser () {

}

function defaultFilter (type, match) {
  return ({"start": (name) => name.startsWith(match),
           "regexp": (name) => match.exec(name)
         }[type])
}

export function useFilter (match) {
  const [reg, setReg] = useState()
  useEffect( () => {
     try {
       setReg(new RegExp(match) )
     }
     catch {
       setReg(null)
     }
  }, [match])
  const filter = useCallback(reg && defaultFilter("regexp", reg ), [reg])
  return ([filter])
}

export function useSave(content, filepath, onCompletion) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
          if (content) {
            setProgress(30)
            const blob =  (content && !(content instanceof Blob)) // always text?
                        ? new Blob([content], {type: "text/plain;charset=utf-8"})
                        : content
            setProgress(60)
            saveAs(blob, filepath)
            setProgress(100)
          }
        }, [content, filepath])
  useEffect(() => {
    if (progress === 100 && onCompletion) {
      onCompletion()}
    }, [progress, onCompletion])
  return {progress: progress, saved: progress === 100}
}