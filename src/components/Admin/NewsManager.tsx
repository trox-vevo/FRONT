import React, { useState, useEffect } from 'react';
import styles from './NewsManager.module.css';
import { auto } from '@popperjs/core';
import { AuthProvider } from '../../contexts/AuthContext';
import { newsService } from '../../services/api/newsService';

export const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    titulo: '',
    texto: '',
    imageUrl: '', // No se usa en backend, pero lo dejamos para el formulario
    status: 'draft', // No se usa en backend, pero lo dejamos para el formulario
    author: '', // No se usa en backend, pero lo dejamos para el formulario
    date: '' // No se usa en backend, pero lo dejamos para el formulario
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsService.getNews();
      if (response.success) {
        setNews(response.data);
      } else {
        setError('No se pudieron obtener las noticias');
      }
    } catch (err) {
      setError('Error al obtener las noticias');
    } finally {
      setLoading(false);
    }
  };

  // Centrar el formulario
  const centerFormStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEditNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        // Editar noticia
        const response = await newsService.updateNews(editingId, {
          titulo: form.titulo,
          texto: form.texto,
        });
        if (!response.success) setError(response.message || 'No se pudo editar la noticia');
      } else {
        // Agregar noticia
        const response = await newsService.createNews({
          titulo: form.titulo,
          texto: form.texto,
        });
        if (!response.success) setError(response.message || 'No se pudo agregar la noticia');
      }
      await fetchNews();
      setForm({ titulo: '', texto: '', imageUrl: '', status: 'draft', author: '', date: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      setError('Error al guardar la noticia');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const noticia = news.find((n: any) => n.id === id);
    if (noticia) {
      setForm({
        titulo: noticia.titulo,
        texto: noticia.texto,
        imageUrl: '',
        status: noticia.activo ? 'published' : 'draft',
        author: '',
        date: ''
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsService.deleteNews(id);
      if (!response.success) setError(response.message || 'No se pudo eliminar la noticia');
      await fetchNews();
      if (editingId === id) {
        setEditingId(null);
        setForm({ titulo: '', texto: '', imageUrl: '', status: 'draft', author: '', date: '' });
        setShowForm(false);
      }
    } catch (err) {
      setError('Error al eliminar la noticia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestión de Noticias</h2>
        <button
          className={styles.addButton}
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm({
              titulo: '',
              texto: '',
              imageUrl: '',
              status: 'draft',
              author: '',
              date: ''
            });
          }}
        >
          Agregar Noticia
        </button>
      </div>

      {showForm && (
        <div style={centerFormStyle}>
          <form className={styles.form} onSubmit={handleAddOrEditNews}>
            <h3>{editingId ? 'Editar Noticia' : 'Agregar Noticia'}</h3>
            <div className={styles.formGroup}>
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                placeholder="Ingresa el título de la noticia"
                value={form.titulo}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="texto">Descripción</label>
              <textarea
                id="texto"
                name="texto"
                required
                rows={4}
                placeholder="Ingresa la descripción de la noticia"
                value={form.texto}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imageUrl">URL de la imagen</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                required
                placeholder="Ingresa la URL de la imagen"
                value={form.imageUrl}
                onChange={handleFormChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                required
                value={form.status}
                onChange={handleFormChange}
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({
                    titulo: '',
                    texto: '',
                    imageUrl: '',
                    status: 'draft',
                    author: '',
                    date: ''
                  });
                }}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.submitButton}>
                {editingId ? 'Guardar Cambios' : 'Agregar Noticia'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.newsList}>
        {news.map((item: any) => (
          <div key={item.id} className={styles.newsCard}>
            <div className={styles.newsImage}>
              <img src={item.imageUrl} alt={item.titulo} />
            </div>
            <div className={styles.newsContent}>
              <div className={styles.newsHeader}>
                <h3>{item.titulo}</h3>
                <span className={`${styles.status} ${styles[item.activo ? 'published' : 'draft']}`}>
                  {item.activo ? 'Publicado' : 'Borrador'}
                </span>
              </div>
              <p className={styles.description}>{item.texto}</p>
              <div className={styles.newsMeta}>
                <span>Por {item.author}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.editButton} onClick={() => handleEdit(item.id)}>
                  Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <div style={{ padding: '1rem', color: '#888' }}>
            No hay noticias registradas.
          </div>
        )}
      </div>
    </div>
  );
};