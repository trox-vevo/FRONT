import React, { useState } from 'react';
import styles from './GameManager.module.css';

// Eliminar mockGames y lógica mockeada. Si no hay lógica real, dejar solo el esqueleto del componente o un mensaje de "No hay juegos disponibles".

const GameManager = () => {
  // Aquí deberías implementar la lógica real para obtener los juegos desde la API
  // Por ahora, solo muestra un mensaje si no hay datos
  return (
    <div>
      <h2>Gestión de Juegos</h2>
      <p>No hay juegos disponibles.</p>
    </div>
  );
};

export default GameManager;