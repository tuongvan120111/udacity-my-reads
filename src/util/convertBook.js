export const convertBookObj = ({
  title = "",
  authors = [],
  imageLinks = "",
  id = "",
  shelf = "",
}) => {
  return {
    title,
    authors,
    backgroundImage: imageLinks.thumbnail,
    id,
    shelf,
  };
};

export const convertBookArray = (items) => {
  if (!items || !items.length) {
    return [];
  }

  return items.map((item) => convertBookObj(item));
};

export const convertBookCategorized = (items) => {
  if (!items || !items.length) {
    return [];
  }

  return items.map((item) => {
    const { id, shelf } = convertBookObj(item);
    return { id, shelf };
  });
};
