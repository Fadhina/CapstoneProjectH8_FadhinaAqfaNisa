import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedArticles: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    saveArticle: (state, action) => {
      state.savedArticles.push(action.payload);
    },
    unsaveArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        (article) => article.title !== action.payload
      );
    },
  },
});

// Export the action
export const { saveArticle, unsaveArticle } = articlesSlice.actions;

// Export the reducer
export default articlesSlice.reducer;
