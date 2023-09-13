import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../../redux/actions";
import styles from "./DetailPage.module.css";

const VideogameDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogame);

  useEffect(() => {
    console.log("Dispatching getVideogameById with ID:", id); // Verifica el ID que estás pasando
    dispatch(getVideogameById(id));
  }, [dispatch, id]);

  console.log("Videogame from useSelector:", videogame); // Verifica el contenido de videogame

    // Función para eliminar las etiquetas <p> del texto de descripción
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleClose = () => {
    history.push('/videogames'); // Función para volver atrás en el historial
  };

  return (
    <div className={styles.detailContainer}>
      {videogame ? (
        <div className={styles.videogameDetails}>
          <h1>{videogame.name}</h1>
          <img
            src={videogame.background_image}
            alt={videogame.name}
            className={styles.image}
          />
          <p>ID: {videogame.id}</p>
          <p>Platforms: {videogame.platforms && videogame.platforms.length
            ? videogame.platforms.map((platform) => platform.name || platform.platform.name).join(', ')
            : 'No platforms available'}
          </p>
          <p>Release Date: {videogame.released || videogame.release_date}</p>
          <p>Rating: {videogame.rating}</p>
          <p>Genres: {videogame.genres && videogame.genres.length
            ? videogame.genres.map((genre) => genre.name).join(', ')
            : 'No genres available'}</p>
          <p>{stripHtmlTags(videogame.description)}</p>
          <button className={styles.customButton} onClick={handleClose}>
            Close
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideogameDetails;
