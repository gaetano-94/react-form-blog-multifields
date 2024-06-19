import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const From = () => {
  const [title, setTitle] = useState('');
  const [articles, setArticles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setArticles([...articles, title]);
      setTitle('');
    }
  };

  const handleDelete = (index) => {
    const newArticles = articles.filter((article, i) => i !== index);
    setArticles(newArticles);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(articles[index]);
  };

  const handleSave = (index) => {
    const newArticles = articles.map((article, i) =>
      i === index ? editTitle : article
    );
    setArticles(newArticles);
    setEditIndex(null);
    setEditTitle('');
  };

  return (
    <div className="App">
      <h1>Blog Articles</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Inserisci Titolo"
        />
        <button type="submit">Aggiungi Articolo</button>
      </form>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            {editIndex === index ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <h5 className="newTitle">{article}</h5>
            )}
            <div className="containerIcons">
              {editIndex === index ? (
                <FaSave
                  className="save-icon"
                  onClick={() => handleSave(index)}
                />
              ) : (
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEdit(index)}
                />
              )}
              <FaTrash
                className="delete-icon"
                onClick={() => handleDelete(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default From;
