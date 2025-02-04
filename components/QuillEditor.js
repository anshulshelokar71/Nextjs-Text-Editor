"use client";

import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = () => {
  const [title, setTitle] = useState('');
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    const quillInstance = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'], // Add image button
        ],
      },
    });

    quillInstance.getModule('toolbar').addHandler('image', () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = () => {
        const file = input.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const range = quillInstance.getSelection();
            quillInstance.insertEmbed(range.index, 'image', reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
    });

    setQuill(quillInstance);
  }, []);

  const handleSave = async () => {
    const content = quill.getContents(); // Get the delta format
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert('Blog saved successfully!');
    } else {
      alert('Error saving blog');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px', width: '100%', padding: '8px', fontSize: '18px' }}
      />
      <div id="editor" style={{ height: '400px', border: '1px solid #ccc' }}></div>
      <button onClick={handleSave} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Save Blog
      </button>
    </div>
  );
};

export default QuillEditor;
