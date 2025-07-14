// Mapeo de nombres de juegos a archivos de imagen
export const gameImageMapping: Record<string, string> = {
  // Juegos principales
  'Cyberpunk 2077': 'cyberpunkcover.jpg',
  'The Last of Us Parte II': 'TLOU2.jpg',
  'Halo Infinite': 'HALO.jpg',
  'God of War Ragnarök': 'GOWLOGO.jpg',
  'Elden Ring': 'eldenringlogo.jpg',
  'FIFA 25': 'fifa25logo.jpg',
  'Street Fighter 6': 'STREETFIGHTER6LOGO.jpg',
  'The Legend of Zelda: Tears of the Kingdom': 'zelda cover.jfif',
  "Marvel's Spider-Man Remastered": 'SPIDERMAN.jpg',
  'Red Dead Redemption 2': 'REDEADREDEMPTION.jpg',
  'GTA V': 'GTAV.jpg',
  'Star Wars Jedi: Fallen Order': 'STARWARS.jpg',
  'Uncharted 5': 'uncharted-5-pc-jogo-cover.jpg',
  'GTA Vice City': 'vicecitylogo.jpg',
  'Days Gone': 'days-gonelogo.jpg',
  
  // Juegos adicionales que podrían estar en la base de datos
  'Death Stranding': 'deathstrandinglogo.jpg',
  'Horizon Zero Dawn': 'horizonlogo.jpg',
  'Infamous Second Son': 'infamouslogo.jpg',
  'Plants vs Zombies': 'PVSZ.jpg',
  'The Avengers': 'VENGADORESLOGO.jpg',
  'Formula 1 2025': 'F1LOGO.jpg',
  'Suicide Squad': 'ESCUDADRONSUCIDALOGO.jpg',
  'MultiVersus': 'multiversuslogo.jpg'
};

// Función para obtener la imagen de un juego
export const getGameImage = (gameName: string): string => {
  const imageFile = gameImageMapping[gameName];
  if (imageFile) {
    return `/images/games/covers/${imageFile}`;
  }
  // Imagen por defecto si no se encuentra
  return '/images/games/covers/default-game.jpg';
};

// Función para obtener imágenes de screenshots
export const getGameScreenshots = (gameName: string): string[] => {
  const screenshotMapping: Record<string, string[]> = {
    'Cyberpunk 2077': [
      '/images/games/screenshots/cyberpunk/screen1.jfif',
      '/images/games/screenshots/cyberpunk/screen2.jfif',
      '/images/games/screenshots/cyberpunk/screen3.jpg'
    ],
    'The Last of Us Parte II': [
      '/images/games/screenshots/last-of-us/screen1.jfif',
      '/images/games/screenshots/last-of-us/screen2.avif',
      '/images/games/screenshots/last-of-us/screen3.jfif',
      '/images/games/screenshots/last-of-us/thelastofus2SS.jpg'
    ],
    'Halo Infinite': [
      '/images/games/screenshots/halo/screen1.jfif',
      '/images/games/screenshots/halo/screen2.jfif',
      '/images/games/screenshots/halo/screen3.jpg'
    ],
    'Red Dead Redemption 2': [
      '/images/games/screenshots/reddead2/screen1.jpg',
      '/images/games/screenshots/reddead2/screen2.jpg',
      '/images/games/screenshots/reddead2/screen3.jpg'
    ],
    'GTA V': [
      '/images/games/screenshots/gtav/screen1.jpg',
      '/images/games/screenshots/gtav/screen2.jpg',
      '/images/games/screenshots/gtav/screen3.jpg'
    ],
    'Spider-Man': [
      '/images/games/screenshots/spiderman/screen1.jpg',
      '/images/games/screenshots/spiderman/screen2.jpg',
      '/images/games/screenshots/spiderman/screen3.jpg'
    ],
    'Star Wars Jedi: Fallen Order': [
      '/images/games/screenshots/starwars/screen1.jpg',
      '/images/games/screenshots/starwars/screen2.jpg',
      '/images/games/screenshots/starwars/screen3.jpg'
    ],
    'Street Fighter 6': [
      '/images/games/screenshots/streetfighter6/screen1.jpg',
      '/images/games/screenshots/streetfighter6/screen2.jpg',
      '/images/games/screenshots/streetfighter6/screen3.jpg'
    ],
    'Uncharted 5': [
      '/images/games/screenshots/uncharted5/screen1.jpg',
      '/images/games/screenshots/uncharted5/screen2.jpg',
      '/images/games/screenshots/uncharted5/screen3.jpg'
    ],
    'GTA Vice City': [
      '/images/games/screenshots/vicecity/screen1.jpg',
      '/images/games/screenshots/vicecity/screen2.jpg',
      '/images/games/screenshots/vicecity/screen3.jpg'
    ],
    'The Legend of Zelda: Tears of the Kingdom': [
      '/images/games/screenshots/zelda/screen1.jfif',
      '/images/games/screenshots/zelda/screen2.jfif',
      '/images/games/screenshots/zelda/screen3.jpg'
    ]
  };

  return screenshotMapping[gameName] || [];
};

// Mapeo de trailers (URLs de YouTube)
export const gameTrailerMapping: Record<string, string> = {
  'Cyberpunk 2077': 'https://www.youtube.com/embed/8X2kIfS6fb8',
  'The Last of Us Parte II': 'https://www.youtube.com/embed/IIOtLtdaGcQ',
  'Halo Infinite': 'https://www.youtube.com/embed/PyMlV5_HRWk',
  'God of War Ragnarök': 'https://www.youtube.com/embed/EE-4GvjKcfs',
  'Elden Ring': 'https://www.youtube.com/embed/E3Huy2cdih0',
  'FIFA 25': 'https://www.youtube.com/embed/1X7yoopUOB4',
  'Street Fighter 6': 'https://www.youtube.com/embed/qjVQ9bXbirk',
  'The Legend of Zelda: Tears of the Kingdom': 'https://www.youtube.com/embed/uHGShqcAHlQ',
  "Marvel's Spider-Man Remastered": 'https://www.youtube.com/embed/8pru0SwVwR0',
  'Red Dead Redemption 2': 'https://www.youtube.com/embed/eaW0tYpxyp0',
  'GTA V': 'https://www.youtube.com/embed/QkkoHAzjnUs',
  'Star Wars Jedi: Fallen Order': 'https://www.youtube.com/embed/0GLbwkYYYZg',
  'Uncharted 5': 'https://www.youtube.com/embed/IIOtLtdaGcQ', // Placeholder
  'GTA Vice City': 'https://www.youtube.com/embed/8X2kIfS6fb8', // Placeholder
  'Days Gone': 'https://www.youtube.com/embed/svS3a4QITWg'
};

// Función para obtener el trailer de un juego
export const getGameTrailer = (gameName: string): string => {
  return gameTrailerMapping[gameName] || '';
}; 