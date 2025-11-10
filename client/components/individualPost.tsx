import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
interface Posts {
  id: number;
  created_at: string;
  user_id: number;
  country: string;
  category: string;
  title: string;
  text: string;
  image: string;
}

export default function IndividualPost({ allData }) {
  const { id } = useParams();
  const post = allData.find((post) => post.id === Number(id));

  if (!post) {
    return <p>Post not found!</p>;
  }
  return (
    <>
      <header className='text-7xl px-5 py-5'>{post.title}</header>
      <img src={post.image} width='500px' height='300px'></img>
      <p>{post.created_at}</p>
      <p>{post.text}</p>
    </>
  );
}
