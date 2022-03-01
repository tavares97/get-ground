import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
	page: 1,
	error: null,
	isLoading: false,
};

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		getBooksFetch: state => {
			state.isLoading = true;
		},
		getBooksSuccess: (state, action) => {
			state.data = action.payload;
			state.error = null;
			state.isLoading = false;
		},
		getBooksFailure: state => {
			state.error = 'An Error as occurred, please try again later';
			state.isLoading = false;
		},
		getPagination: (state, action) => {
			state.page = action.payload.page;
			state.isLoading = true;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	getBooksFailure,
	getBooksFetch,
	getBooksSuccess,
	getPagination,
} = booksSlice.actions;

export default booksSlice.reducer;
