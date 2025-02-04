import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const ReadBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    };
    fetchBlogs();
  }, []);

  const renderContent = (content) => {
    const container = document.createElement('div');
    const quill = new Quill(container);
    quill.setContents(content); // Set the delta format content
    return container.innerHTML; // Render the HTML
  };

  return (
    <div>
      <h1>Read Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{ marginBottom: '40px' }}>
            <h2>{blog.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
              style={{ border: '1px solid #ccc', padding: '10px' }}
            ></div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReadBlogs;
