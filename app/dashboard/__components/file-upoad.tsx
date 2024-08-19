'use client';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useState } from 'react';
import { error } from 'console';

export default function FileUpload({setResume}) {
  const [response, setResponse ] = useState("hello")

  const handleProccessFile = (error:any, file:any) => {
    if(error) {
      console.error("Error processing file:", error)
      return
    }

    const serverResponse = file.serverId
    setResponse(serverResponse)
    setResume(serverResponse)
    console.log('Server response:', serverResponse)
  }
  return (
    <div>
    <FilePond
      server={{
        process: {
          url:'/api/pdf',
          method: "POST",
          onload: (response) => response,
          onerror: (response) => response
        },
        fetch: null,
        revert: null,
      }}
      onprocessfile={handleProccessFile}
    />
    </div>
  );
}