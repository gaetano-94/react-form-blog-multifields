import React, { useState } from 'react';
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';

const FormContainer = () => {
  // Definizione dello stato iniziale del form
  const initialFormData = {
    title: '',
    image: null,
    content: '',
    category: 'Technology',
    tags: [],
    published: false,
  };

  // Definizione degli stati
  const [formData, setFormData] = useState({ ...initialFormData });
  const [articles, setArticles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  // Categorie disponibili
  const categories = ['Technology', 'Health', 'Finance'];

  // Gestione dell'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      setArticles([...articles, formData]);
      setFormData({ ...initialFormData });
      document.querySelector('input[type="file"]').value = null; // Svuota il campo dell'immagine
    }
  };

  // Gestione della cancellazione di un articolo
  const handleDelete = (index) => {
    const newArticles = articles.filter((_, i) => i !== index);
    setArticles(newArticles);
  };

  // Gestione dell'editing di un articolo
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...articles[index] });
  };

  // Salvataggio delle modifiche
  const handleSave = (index) => {
    const newArticles = articles.map((article, i) =>
      i === index ? editData : article
    );
    setArticles(newArticles);
    setEditIndex(null);
    setEditData(null);
  };

  // Gestione dei cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'tags') {
      const updatedTags = checked
        ? [...formData.tags, value]
        : formData.tags.filter((tag) => tag !== value);
      setFormData((prevData) => ({
        ...prevData,
        tags: updatedTags,
      }));
    } else if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Gestione dei cambiamenti nei campi del form in modalità di modifica
  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'tags') {
      const updatedTags = checked
        ? [...editData.tags, value]
        : editData.tags.filter((tag) => tag !== value);
      setEditData((prevData) => ({
        ...prevData,
        tags: updatedTags,
      }));
    } else if (type === 'checkbox') {
      setEditData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setEditData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="App">
      <h1>Blog Articles</h1>
      <ArticleForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleChange}
        onCheckboxChange={handleChange}
        categories={categories}
        buttonText="Aggiungi Articolo"
      />
      <ArticleList
        articles={articles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {editIndex !== null && (
        <div className="edit-form-container">
          <h2>Modifica Articolo</h2>
          <ArticleForm
            formData={editData}
            onChange={handleEditChange}
            onSubmit={() => handleSave(editIndex)}
            onFileChange={handleEditChange}
            onCheckboxChange={handleEditChange}
            categories={categories}
            buttonText="Salva"
          />
        </div>
      )}
    </div>
  );
};

export default FormContainer;
