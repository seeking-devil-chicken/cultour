import React, { useState } from 'react';

interface Post {
  id: number;
  created_at: string;
  user_id: number;
  country: string;
  category: string;
  title: string;
  text: string;
  image: string;
}

interface PostsProps {
  countries?: Post[];
}

const Posts: React.FC<PostsProps> = ({ countries }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    category: '',
    title: '',
    text: '',
    image: '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const countryfilter = Array.isArray(countries)
    ? countries.map((item) => item.country)
    : [];

  const newSet = new Set(countryfilter);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData({ ...formData, image: result });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/userpost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log('✅ New post:', data);

      setFormData({
        country: '',
        category: '',
        title: '',
        text: '',
        image: '',
      });
      setImagePreview(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error posting:', err);
    }
  };

  return (
    <div className='relative flex flex-col items-center'>
      <button
        onClick={() => setShowForm(!showForm)}
        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition'
      >
        Post
      </button>

      {showForm && (
        <>
          <div
            className='fixed inset-0 z-40'
            onClick={() => setShowForm(false)}
          />
          <div
            className='absolute top-full mt-2 bg-white border border-blue-400 shadow-lg rounded-lg w-[300px] p-4 z-50'
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className='post-form flex flex-col gap-3'
              onSubmit={handleSubmit}
            >
              <h2 className='flex justify-center'>Create a Post</h2>

              <label>Country</label>
              <select
                name='country bg-blue-500'
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
              >
                <option value=''>Choose a country</option>
                {Array.from(newSet).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label>Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value=''>Choose a category</option>
                <option value='Food'>Food</option>
                <option value='Customs'>Customs</option>
                <option value='Games'>Games</option>
                <option value='Rituals'>Rituals</option>
                <option value='Media'>Media</option>
              </select>

              <label>Title</label>
              <textarea
                placeholder='Title'
                className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />

              <label>Description</label>
              <textarea
                placeholder='Write your post here...'
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                required
              />

              <label>Image (optional)</label>
              <div
                className={`image-dropzone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='image-preview'
                  />
                ) : (
                  <div className='dropzone-text'>
                    <p>Drag & drop an image here</p>
                    <p>or click to browse</p>
                  </div>
                )}
              </div>
              <input
                type='file'
                id='fileInput'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleFileInput}
              />

              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition'
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
