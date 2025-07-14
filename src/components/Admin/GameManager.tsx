import React, { useState, useEffect } from 'react';
import styles from './GameManager.module.css';
import { gameService } from '../../services/api/gameService';
import { categoryService } from '../../services/api/categoryService';
import { platformService } from '../../services/api/platformService';

export const GameManager = () => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    releaseDate: ''
  });
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    plataforma: '',
    precio: '',
    categoria: '', // Debe ser el ID de la categoría
    fecha_lanzamiento: '',
    estado: 'draft',
    plataformas: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  // Cargar juegos, categorías y plataformas reales al montar el componente
  useEffect(() => {
    fetchGames();
    fetchCategories();
    fetchPlatforms();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await gameService.getGames();
      if (response.success) {
        setGames(response.data);
      } else {
        setError('No se pudieron obtener los juegos');
      }
    } catch (err) {
      setError('Error al obtener los juegos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (response.success) setCategories(response.data);
    } catch (err) {
      // opcional: setError('No se pudieron obtener las categorías');
    }
  };

  const fetchPlatforms = async () => {
    try {
      const response = await platformService.getPlatforms();
      if (response.success) setPlatforms(response.data);
    } catch (err) {
      // opcional: setError('No se pudieron obtener las plataformas');
    }
  };

  // Handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // AGREGAR JUEGO
  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Mapear campos del formulario a los requeridos por el backend
      const newGame = {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        categoria_id: Number(form.categoria), // ID de la categoría
        plataformas: form.plataformas ? form.plataformas.split(',').map((id: string) => Number(id.trim())) : [],
        estado: form.estado === "true",
      };
      const response = await gameService.createGame(newGame);
      if (response.success) {
        await fetchGames();
        setShowForm(false);
        setForm({ nombre: '', plataforma: '', precio: '', categoria: '', fecha_lanzamiento: '', estado: 'draft', plataformas: '' });
      } else {
        setError(response.message || 'No se pudo agregar el juego');
      }
    } catch (err) {
      setError('Error al agregar el juego');
    } finally {
      setLoading(false);
    }
  };

  // EDITAR JUEGO
  const handleEditGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setError(null);
    setLoading(true);
    try {
      const updatedGame = {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        categoria_id: Number(form.categoria),
        plataformas: form.plataformas ? form.plataformas.split(',').map((id: string) => Number(id.trim())) : [],
        estado: form.estado === "true",
      };
      const response = await gameService.updateGame(editingId, updatedGame);
      if (response.success) {
        await fetchGames();
        setShowForm(false);
        setEditingId(null);
        setForm({ nombre: '', plataforma: '', precio: '', categoria: '', fecha_lanzamiento: '', estado: 'draft', plataformas: '' });
      } else {
        setError(response.message || 'No se pudo editar el juego');
      }
    } catch (err) {
      setError('Error al editar el juego');
    } finally {
      setLoading(false);
    }
  };

  // ELIMINAR JUEGO
  const handleDeleteGame = async (id: string) => {
    setError(null);
    setLoading(true);
    try {
      const response = await gameService.deleteGame(id);
      if (response.success) {
        await fetchGames();
      } else {
        setError(response.message || 'No se pudo eliminar el juego');
      }
    } catch (err) {
      setError('Error al eliminar el juego');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filtrado según los filtros seleccionados y búsqueda
  const filteredGames = games.filter((game: any) => {
    const matchCategory = filters.category ? game.categoria === filters.category : true;
    const matchMinPrice = filters.minPrice ? game.precio >= parseFloat(filters.minPrice) : true;
    const matchMaxPrice = filters.maxPrice ? game.precio <= parseFloat(filters.maxPrice) : true;
    const matchReleaseDate = filters.releaseDate ? game.fecha_lanzamiento === filters.releaseDate : true;
    const matchSearch = search
      ? game.nombre.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCategory && matchMinPrice && matchMaxPrice && matchReleaseDate && matchSearch;
  });

  // Renderizado (puedes mantener la UI actual, solo cambia la fuente de datos)
  return (
    <div className={styles.container}>
      <h2>Gestión de Juegos</h2>
      {loading && <p>Cargando juegos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Aquí va el resto de la UI, usando filteredGames para mostrar los juegos */}

      {/* Barra de búsqueda */}
      <div className={styles.formContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre de juego..."
          value={search}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '0.7rem',
            borderRadius: '6px',
            border: '1px solid #cfd8dc',
            marginBottom: '1.5rem'
          }}
        />
      </div>

      {/* Filtros */}
      <div className={styles.formContainer}>
        <form className={styles.form} style={{ marginBottom: '1.5rem' }}>
          <h3>Filtrar Juegos</h3>
          <div className={styles.formGroup}>
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              {/* uniqueCategories.map(cat => ( */}
              {/* <option key={cat} value={cat}>{cat}</option> */}
              {/* ))} */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="releaseDate">Fecha de lanzamiento</label>
            <input
              id="releaseDate"
              name="releaseDate"
              type="date"
              value={filters.releaseDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="minPrice">Precio mínimo</label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              step="0.01"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="maxPrice">Precio máximo</label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              step="0.01"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="100"
            />
          </div>
        </form>
      </div>

      {/* Formulario para agregar/editar juegos */}
      {showForm && (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={editingId ? handleEditGame : handleAddGame}>
            <h3>{editingId ? 'Editar Juego' : 'Agregar Juego'}</h3>
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Título</label>
              <input
                id="nombre"
                name="nombre"
                required
                placeholder="Título del juego"
                value={form.nombre || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="plataforma">Plataforma</label>
              <input
                id="plataforma"
                name="plataforma"
                required
                placeholder="Ej: PC, PS5"
                value={form.plataforma || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="precio">Precio</label>
              <input
                id="precio"
                name="precio"
                type="number"
                step="0.01"
                required
                placeholder="Precio"
                value={form.precio || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="categoria">Categoría</label>
              <select
                id="categoria"
                name="categoria"
                required
                value={form.categoria || ""}
                onChange={handleFormChange}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="plataformas">Plataformas <span style={{fontWeight: 'normal', fontSize: '0.9em'}}>(Ctrl+Click para seleccionar varias)</span></label>
              <select
                id="plataformas"
                name="plataformas"
                multiple
                size={Math.min(5, platforms.length)}
                value={form.plataformas ? form.plataformas.split(',') : []}
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                  setForm({ ...form, plataformas: selected.join(',') });
                }}
                style={{ minWidth: '180px', minHeight: '80px' }}
              >
                {platforms.map((plat: any) => (
                  <option key={plat.id} value={plat.id}>{plat.nombre}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fecha_lanzamiento">Fecha de lanzamiento</label>
              <input
                id="fecha_lanzamiento"
                name="fecha_lanzamiento"
                type="date"
                required
                value={form.fecha_lanzamiento || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                required
                value={form.estado}
                onChange={handleFormChange}
              >
                <option value="true">Publicado</option>
                <option value="false">Borrador</option>
              </select>
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                {editingId ? 'Guardar Cambios' : 'Agregar Juego'}
              </button>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm({
                    nombre: '',
                    plataforma: '',
                    precio: '',
                    categoria: '',
                    fecha_lanzamiento: '',
                    estado: 'draft',
                    plataformas: ''
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.gamesList}>
        {filteredGames.map(game => (
          <div key={game.id} className={styles.gameCard}>
            <div className={styles.gameImage}>
              <img src={game.imagen} alt={game.nombre} />
            </div>
            <div className={styles.gameContent}>
              <div className={styles.gameHeader}>
                <h3>{game.nombre}</h3>
                <span className={`${styles.status} ${styles[game.estado]}`}>
                  {game.estado === 'published' ? 'Publicado' : 'Borrador'}
                </span>
              </div>
              <div className={styles.meta}>
                <span>Plataforma: {game.plataforma}</span>
                <span>Categoría: {game.categoria}</span>
                <span>Precio: ${game.precio}</span>
                <span>Lanzamiento: {game.fecha_lanzamiento}</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.editButton} onClick={() => {
                  // Mapear nombre de categoría a ID
                  let categoriaId = '';
                  if (categories.length && game.categoria_nombre) {
                    const cat = categories.find((c: any) => c.nombre === game.categoria_nombre);
                    if (cat) categoriaId = String(cat.id);
                  } else if (game.categoria_id) {
                    categoriaId = String(game.categoria_id);
                  }
                  // Mapear nombres de plataformas a IDs
                  let plataformasIds = '';
                  if (platforms.length && Array.isArray(game.plataformas)) {
                    const ids = game.plataformas.map((platName: string) => {
                      const plat = platforms.find((p: any) => p.nombre === platName);
                      return plat ? plat.id : null;
                    }).filter(Boolean);
                    plataformasIds = ids.join(',');
                  } else if (Array.isArray(game.plataformas)) {
                    plataformasIds = game.plataformas.join(',');
                  }
                  setForm({
                    nombre: game.nombre,
                    plataforma: game.plataforma || '',
                    precio: game.precio?.toString() || '',
                    categoria: categoriaId,
                    fecha_lanzamiento: game.fecha_lanzamiento || '',
                    estado: typeof game.estado === 'boolean' ? String(game.estado) : (game.estado || 'true'),
                    plataformas: plataformasIds
                  });
                  setEditingId(game.id);
                  setShowForm(true);
                }}>
                  Editar
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteGame(game.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredGames.length === 0 && (
          <div style={{ padding: '1rem', color: '#888' }}>
            No se encontraron juegos con los filtros o búsqueda seleccionados.
          </div>
        )}
      </div>
    </div>
  );
};