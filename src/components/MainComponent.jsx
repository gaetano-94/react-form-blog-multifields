import React, { useState } from 'react';
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';

const FormContainer = () => {
  // Stato iniziale per i dati del form
  const initialFormData = {
    title: '',
    image: null,
    content: '',
    category: 'Technology',
    tags: [],
    published: false,
  };

  // Stati per gestire i dati del form, la lista degli articoli, e l'editing
  const [formData, setFormData] = useState({ ...initialFormData }); // Dati del form per l'aggiunta di un nuovo articolo
  const [articles, setArticles] = useState([]); // Lista degli articoli
  const [editIndex, setEditIndex] = useState(null); // Indice dell'articolo in fase di modifica
  const [editData, setEditData] = useState(null); // Dati temporanei per l'articolo in fase di modifica

  // Array delle categorie disponibili per gli articoli
  const categories = ['Technology', 'Health', 'Finance'];

  // Funzione per gestire l'invio del form per l'aggiunta di un nuovo articolo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      setArticles([...articles, formData]); // Aggiungi nuovo articolo alla lista degli articoli
      setFormData({ ...initialFormData, image: null }); // Resetta il form dopo l'aggiunta dell'articolo
    }
  };

  // Funzione per gestire la cancellazione di un articolo
  const handleDelete = (index) => {
    const newArticles = articles.filter((_, i) => i !== index); // Filtra gli articoli escludendo quello da cancellare
    setArticles(newArticles); // Aggiorna la lista degli articoli
  };

  // Funzione per iniziare la modifica di un articolo
  const handleEdit = (index) => {
    setEditIndex(index); // Imposta l'indice dell'articolo in fase di modifica
    setEditData({ ...articles[index] }); // Copia i dati dell'articolo da modificare in editData
  };

  // Funzione per salvare le modifiche apportate a un articolo in fase di modifica
  const handleSave = (index) => {
    const newArticles = articles.map(
      (article, i) => (i === index ? editData : article) // Aggiorna l'articolo modificato nella lista degli articoli
    );
    setArticles(newArticles); // Aggiorna la lista degli articoli con le modifiche salvate
    setEditIndex(null); // Resetta l'indice dell'articolo in fase di modifica
    setEditData(null); // Resetta i dati temporanei per l'articolo in fase di modifica
  };

  // Funzione per gestire il cambio dei dati nel form per l'aggiunta di un nuovo articolo
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'tags') {
      // Gestione dei tags: aggiungi/rimuovi il tag selezionato
      const updatedTags = checked
        ? [...formData.tags, value]
        : formData.tags.filter((tag) => tag !== value);
      setFormData((prevData) => ({
        ...prevData,
        tags: updatedTags,
      }));
    } else if (type === 'checkbox') {
      // Gestione delle checkbox: aggiorna lo stato in base a se la checkbox è selezionata o meno
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      // Gestione del campo file: aggiorna lo stato con il file selezionato
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      // Altrimenti, gestione degli input di testo normale: aggiorna lo stato con il valore dell'input
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Funzione per gestire il cambio dei dati nel form per la modifica di un articolo esistente
  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'tags') {
      // Gestione dei tags: aggiungi/rimuovi il tag selezionato
      const updatedTags = checked
        ? [...editData.tags, value]
        : editData.tags.filter((tag) => tag !== value);
      setEditData((prevData) => ({
        ...prevData,
        tags: updatedTags,
      }));
    } else if (type === 'checkbox') {
      // Gestione delle checkbox: aggiorna lo stato in base a se la checkbox è selezionata o meno
      setEditData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      // Gestione del campo file: aggiorna lo stato con il file selezionato
      setEditData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      // Altrimenti, gestione degli input di testo normale: aggiorna lo stato con il valore dell'input
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="App">
      <h1>Blog Articles</h1>
      {/* Componente del form per aggiungere un nuovo articolo */}
      <ArticleForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleChange}
        onCheckboxChange={handleChange}
        categories={categories}
      />
      {/* Componente per mostrare la lista degli articoli */}
      <ArticleList
        articles={articles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* Mostra il form di modifica solo se c'è un articolo in fase di modifica */}
      {editIndex !== null && (
        <div className="edit-form-container">
          <h2>Modifica Articolo</h2>
          {/* Componente del form per modificare un articolo esistente */}
          <ArticleForm
            formData={editData}
            onChange={handleEditChange}
            onSubmit={() => handleSave(editIndex)}
            onFileChange={handleEditChange}
            onCheckboxChange={handleEditChange}
            categories={categories}
          />
        </div>
      )}
    </div>
  );
};

export default FormContainer;
