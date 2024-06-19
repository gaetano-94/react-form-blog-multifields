import React from 'react';

const ArticleForm = ({
  formData,
  onChange,
  onSubmit,
  onFileChange,
  onCheckboxChange,
  categories,
}) => {
  return (
    <div className="form-container">
      {/* Titolo dinamico in base a se si sta modificando o aggiungendo un articolo */}
      <h2>{formData.title ? 'Modifica Articolo' : 'Aggiungi Articolo'}</h2>
      <form onSubmit={onSubmit}>
        {/* Campo di input per il titolo */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Inserisci Titolo"
        />
        {/* Campo di input per l'immagine */}
        <input type="file" name="image" onChange={onFileChange} />
        {/* Campo di input per il contenuto */}
        <textarea
          name="content"
          value={formData.content}
          onChange={onChange}
          placeholder="Inserisci Contenuto"
        />
        {/* Selezione della categoria tramite menu a tendina */}
        <select name="category" value={formData.category} onChange={onChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Checkbox per selezionare i tags */}
        <div>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="JavaScript"
              checked={formData.tags.includes('JavaScript')}
              onChange={onCheckboxChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="React"
              checked={formData.tags.includes('React')}
              onChange={onCheckboxChange}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              name="tags"
              value="Node"
              checked={formData.tags.includes('Node')}
              onChange={onCheckboxChange}
            />
            Node
          </label>
        </div>
        {/* Checkbox per il flag "Pubblicato" */}
        <label>
          Pubblicato
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={onCheckboxChange}
          />
        </label>
        {/* Bottone per aggiungere o salvare l'articolo */}
        <button type="submit">{formData.title ? 'Salva' : 'Aggiungi'}</button>
      </form>
    </div>
  );
};

export default ArticleForm;
