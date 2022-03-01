import { call, put, takeEvery } from 'redux-saga/effects';
import { getBooksFailure, getBooksSuccess } from '../features/books/booksSlice';

//worker saga - will watch for dispatched actions and fork a worker on every action
function* workerGetBooksFetch(action) {
	//Saves page on const
	const page = action?.payload?.page;
	const filter = action?.payload?.filter;

	//adds current page number to params
	const params = {
		page: page,
		itemsPerPage: 10,
	};
	if (filter) params.filters = [{ type: 'all', values: [filter] }];

	const books = yield call(() =>
		fetch('http://nyx.vima.ekt.gr:3000/api/books', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		}),
	);

	//Checks if response was ok, if not sends an error
	if (!books.ok) {
		yield put(getBooksFailure());
	}
	//saves the result as JSON
	const booksFormatted = yield books.json();

	//passes the object as a payload
	yield put(getBooksSuccess(booksFormatted));
}

//watcher saga - will handle the action and terminate
function* bookSaga() {
	yield takeEvery('books/getBooksFetch', workerGetBooksFetch);
	//Updates book state every time page changes
	yield takeEvery('books/getPagination', workerGetBooksFetch);
}

export default bookSaga;
