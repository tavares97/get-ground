import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import booksReducer from '../features/books/booksSlice';
import bookSaga from '../saga/booksSaga';
import logger from 'redux-logger';

const saga = createSagaMiddleware();
export const store = configureStore({
	reducer: {
		books: booksReducer,
	},
	middleware: [saga, logger],
});

saga.run(bookSaga);
