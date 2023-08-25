import React, { useEffect, useState } from 'react'
import Post from '../Post'

function IndexPage() {
  const [post, setPost] = useState([])
  useEffect(() => {
      fetch('http://localhost:4000/post').then(response =>{
        response.json().then(post => {
          setPost(post)
          console.log(post)
        })
      })
  }, [])
  
  return (
    <>

      {post.length > 0 && post.map((post)=>{
        return <Post {...post}/>
      })}
       
    </>
  )
}

export default IndexPage