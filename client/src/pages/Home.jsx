import React from 'react'

function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', e.target.file.files[0])
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    console.log(response);
  }
  return (
    <div>
      <form action="/api/upload" method="post" encType="multipart/form-data">
        <input type='file' name='file' />
        <button type='submit'>Upload</button>
      </form>
    </div>
  )
}

export default Home
