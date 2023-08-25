import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import { Form, Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';

function EditPost() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [cover, setCover] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false);
    const [content, setContent] = useState('')
    const { id } = useParams();
    async function editPost (ev) {
        ev.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id', id)
        if( files?.[0]){
            data.set('file', files?.[0])
        }
        const response = await fetch(`http://localhost:4000/post/`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if(response.ok){
            setRedirect(true)
        }
        
    }
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then((response)=>{
            response.json().then((postInfo)=>{
                setTitle(postInfo.title)
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        })
    }, [])
    
    if(redirect){
        return (<Navigate to={'/post/' + id} />)
    }

    return (
        <>
            <form onSubmit={editPost}>
                <input type="title" placeholder='title' value={title} onChange={ev => setTitle(ev.target.value)} />
                <input type="summary" placeholder='summary' value={summary} onChange={ev => setSummary(ev.target.value)} />
                <input type="file" onChange={ev => setFiles(ev.target.files)} />
                <Editor onChange={setContent} value={content}/>
                <button style={{ marginTop: '5px' }}>Edit Post</button>
            </form>
        </>
    )
}

export default EditPost