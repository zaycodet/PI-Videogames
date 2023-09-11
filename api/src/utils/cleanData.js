const cleanData = (rawData) => {
    return rawData.map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description || "There's no description",
      platforms: game.platforms?.map((platform) => platform.name) || [],
      background_image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres?.map((genre) => genre.name) || [],
      createdVideoGame: false,
    }));
  };
  
  module.exports = {
    cleanData,
  };
  