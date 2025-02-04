import Image from "next/image";
import React from 'react';
import QuillEditor from '../../components/QuillEditor';
export default function Home() {
  return (
    <div>
      <h1>Next.js Quill Text Editor</h1>
      <QuillEditor />
    </div>
  );
}
