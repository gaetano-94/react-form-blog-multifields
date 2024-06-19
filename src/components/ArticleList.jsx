import React, { useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ArticleList = ({ articles, onEdit, onDelete }) => {
  useEffect(() => {
    // Definizione della funzione da eseguire quando la checkbox di pubblicazione cambia
    const handlePublishAlert = () => {
      alert('Articolo pubblicato!');
    };

    // Aggiunta dell'event listener alla checkbox di ogni articolo
    const checkboxes = document.querySelectorAll('input[name="published"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', handlePublishAlert);
    });

    // Cleanup: rimozione dell'event listener al momento della disattivazione del componente
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('change', handlePublishAlert);
      });
    };
  }, [articles]); // Dipendenza da articles per assicurarsi che useEffect si aggiorni quando cambia la lista degli articoli

  return (
    <ul className="article-list">
      {articles.map((article, index) => (
        <li key={index}>
          <div className="article-info">
            <h5>{article.title}</h5>
            {article.image && (
              <img
                src={URL.createObjectURL(article.image)}
                alt={article.title}
              />
            )}
            <p>{article.content}</p>
            <p>Categoria: {article.category}</p>
            <p>Tags: {article.tags.join(', ')}</p>
            <p>{article.published ? 'Pubblicato' : 'Non Pubblicato'}</p>
          </div>
          <div className="icons">
            <FaEdit className="edit-icon" onClick={() => onEdit(index)} />
            <FaTrash className="delete-icon" onClick={() => onDelete(index)} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
