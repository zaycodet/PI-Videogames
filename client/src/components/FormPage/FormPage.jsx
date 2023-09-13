import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { validations } from "./validations";
import styles from './FormPage.module.css';

const FormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    platforms: [],
    release_date: "",
    rating: 0,
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    release_date: "",
    rating: 0,
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validations(form));
  }, [form]);

  // Handler para inputs (name, img, description)
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
  };

// Handler para el select de géneros
const handleGenreChange = (genreName) => {
  const updatedGenres = form.genres.includes(genreName)
    ? form.genres.filter((name) => name !== genreName)
    : [...form.genres, genreName];
  setForm({ ...form, genres: updatedGenres });
};

// Handler para plataformas
const handlePlatformChange = (platformName) => {
  const updatedPlatforms = form.platforms.includes(platformName)
    ? form.platforms.filter((name) => name !== platformName)
    : [...form.platforms, platformName];
  setForm({ ...form, platforms: updatedPlatforms });
};


  // Handler para el submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data:", form); // Agregar este console.log
    dispatch(postVideogame(form));
    history.push("/videogames");
    setForm({
      name: "",
      description: "",
      platforms: [],
      background_image: "",
      release_date: "",
      rating: 0,
      genres: [],
    });
  };

  // Agrega console.log para verificar los valores de genres y platforms
  console.log("genres:", genres);
  console.log("platforms:", platforms);

  return (
    <div className={styles.formContainer}>
      <h2>Add a New Videogame</h2>
      <form className={styles.formDetails} onSubmit={handleSubmit}>
        <div className={styles.formColumns}>
          <div className={styles.formColumn}>
            <div className={styles.inputGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label>Image (URL):</label>
              <input
                type="text"
                name="background_image"
                value={form.background_image}
                onChange={handleChange}
              />
              {errors.background_image && (
                <p className="error">{errors.background_image}</p>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>Description:</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Platforms:</label>
              <div className={styles.listContainer}>
                <ul className={styles.scrollableList}>
                {platforms.map((platform) => (
                  <li key={platform.id}>
                    <input
                      type="checkbox"
                      checked={form.platforms.includes(platform)}
                      onChange={() => handlePlatformChange(platform)} // Pasar el nombre de la plataforma
                    />
                    {platform}
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.formColumn}>
            <div className={styles.inputGroup}>
              <label>Release Date:</label>
              <input
                type="date"
                name="release_date"
                value={form.release_date}
                onChange={handleChange}
              />
              {errors.release_date && (
                <p className="error">{errors.release_date}</p>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label>Rating:</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={form.rating}
                onChange={handleChange}
              />
              {errors.rating && <p className="error">{errors.rating}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label>Genres:</label>
              <div className={styles.listContainer}>
              {genres.map((genre) => (
                <div className={styles.scrollableList} key={genre.id}>
                  <input
                    type="checkbox"
                    checked={form.genres.includes(genre)}
                    onChange={() => handleGenreChange(genre)} // Pasar el nombre del género
                  />
                  {genre}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.customButton} type="submit">
            Create
          </button>
          <button
            className={styles.customButton}
            onClick={() => history.push("/videogames")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}  

export default FormPage;
