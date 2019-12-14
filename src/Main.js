import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import {useUpload, useFiles } from './filebrowser'
import Browser from './Browser'
import Dropzone from './Dropzone'

export default function Main ({ person }) {
  const files = useFiles()
  const {handleUpload} = useUpload()
  const data = files
       .map((name) => ({fileName: name, fileSize: 0}))
  return (
    <main className="vh-100 m-auto" style={{maxWidth: "50rem"}}>
        <div className="h-50">
          {data &&
           <Browser data={data}/>}
         </div>
         <Dropzone className="mx-5 h-25"
                   handleUpload={handleUpload}>
           <FontAwesomeIcon className="mr-2 text-secondary" icon={faUpload}/>
         </Dropzone>
    </main>
  )
}
