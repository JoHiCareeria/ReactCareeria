import './App.css'; //
import React, {useState, useEffect} from 'react';

const Posts = () => { 

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts") 
      .then(res => res.json()) 
      .then(oliot => setPosts(oliot))
    },[]);


  return ( 
    <>
      <h2>Posts from typicode</h2>
      <table className="taulu" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => ( // mapataan posts-taulukko ja luodaan jokaiselle postaukselle taulukkorivi (tr), jossa näytetään id, userId, title ja body. Key-attribuutti on tärkeä Reactille, jotta se osaa optimoida uudelleenrenderöinnin.
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Posts; // Tämä komponentti hakee dataa ulkoisesta API:sta (https://jsonplaceholder.typicode.com/posts) ja näyttää sen taulukkomuodossa. useEffect-hookin avulla varmistetaan, että data haetaan vain kerran komponentin elinkaaren aikana.
