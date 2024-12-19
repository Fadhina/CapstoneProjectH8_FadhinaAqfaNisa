export const saveArticle = (article) => {
  return {
    type: "SAVE_ARTICLE",
    payload: article,
  };
};
export const unsaveArticle = (title) => {
  return {
    type: "UNSAVE_ARTICLE",
    payload: title,
  };
};
