"use client"

import React from 'react'
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'


const PromptCardList = ({ data, handleTagCLick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
      data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagCLick={handleTagCLick}
        />
      ))
      }
    </div>
  )
}


const Feed = () => {


  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);


  const handleSearchChange = (e) => {

  }

  useEffect(()=> {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      // console.log("hello1",data);
      setPosts(data);
    }

    fetchPosts();
  },[])

  return (
    <section className='feed'>

      <form 
        className='relative w-full flex-center'
      >
        <input 
        type="text"
        onChange={handleSearchChange}
        placeholder='Search for tag or a username.' 
        value={searchText}
        className='search_input peer'
        required
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagCLick={()=>{}}
      />

    </section>
  )
}

export default Feed
