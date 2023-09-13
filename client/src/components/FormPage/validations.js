export const validations = (form) => {
    let errors = [];
  
    const regexNombre = /^[A-Za-z0-9\s]+$/;
    const regexDescription = /^[A-Za-z0-9\s]*[A-Za-z0-9][A-Za-z0-9\s]*$/;
    const regexImagen = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  
    if (!form.name.trim()) {
      errors.name = "Name is required";
    } else if (!regexNombre.test(form.name)) {
      errors.name = "Name is invalid";
    } else if (form.name.length < 2 || form.name.length > 100) {
      errors.name = "The name should be between 2 to 100 characters";
    } else {
      errors.name = "";
    }
  
    if (!form.description.trim()) {
      errors.description = "Description is required";
    } else if (form.description.length < 50 || form.description.length > 1000) {
      errors.description =
        "The description should be between 50 to 1000 characters";
    } else if (!regexDescription.test(form.description)) {
      errors.description = "The description is invalid";
    } else {
      errors.description = "";
    }
  
    if (!form.platforms.length) {
      errors.platforms = "At least one platform is required";
    } else {
      errors.platforms = "";
    }
  
    if (!form.background_image.trim()) {
      errors.background_image = "The image URL is required";
    } else if (!regexImagen.test(form.background_image)) {
      errors.background_image = "Invalid image URL";
    } else {
      errors.background_image = "";
    }
  
    if (!form.release_date.trim()) {
      errors.release_date = "Released date is required";
    } else errors.release_date = "";
  
    if (form.rating === 0) {
      errors.rating = "Rating up to 0 is required";
    } else errors.rating = "";
  
    if (!form.genres.length) {
      errors.genres = "At least one genre is required";
    } else {
      errors.genres = "";
    }
  
    return errors;
  };