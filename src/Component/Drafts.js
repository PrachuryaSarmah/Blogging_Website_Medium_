
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/get/myPost', { headers })
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleDelete = (postId) => {
        axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`, { headers })
            .then((response) => {
                console.log(response.data);
                setPosts(posts.filter(post => post.id !== postId));
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    }

    return (
        <div>
            <h2 className='drft'>DRAFTS----</h2>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <div className="post-details">
                        <h3>{post.title}</h3>
                        <p>Topic: {post.topic}</p>
                        <p>Author: {post.author}</p>
                        <Link to={`/post/${post.id}`}>View Details</Link>
                        <div className="edit-delete-options">
                            <Link to={`/post/${post.id}/edit`}>Edit</Link>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                    <img src={post.image} alt={post.title} />
                </div>
            ))}
        </div>
    );
};

export default MyPost;






