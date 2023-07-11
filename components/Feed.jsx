"use client"

import React from 'react'
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'




const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
      data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))
      }
    </div>
  )
}


const Feed = () => {

  

  const [searchText, setSearchText] = useState("");
  // to get all posts
  const [posts, setPosts] = useState([]);
  const [searchedResults,setSearchedResults] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const searchResults = filterPrompts(e.target.value);
    setSearchedResults(searchResults)
  }
    const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    // console.log("hello1",data);
    setPosts(data);
  };

  useEffect(()=> {
    fetchPosts();
  },[])

  const filterPrompts = (searchText) => {
    // i flag is for case sensitive search
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) => 
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)
    );
  };

  const handleTagClick = (tagName) => { 
    // alert("clicked");
    setSearchText(tagName);
    const searchResults = filterPrompts(tagName);
    setSearchedResults(searchResults);
  }

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

      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      )
      : (<PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />)}

    </section>
  )
}

export default Feed
