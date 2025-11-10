import { useState, useEffect } from 'react';
import type { JSX } from 'react';

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

export default function Food({ post }) {
  return (
    <>
      <header>{post.title}</header>
      <img src={post.image} width='500px' height='300px'></img>
      <p>{post.created_at}</p>
      <p>{post.text}</p>
    </>
  );
}
