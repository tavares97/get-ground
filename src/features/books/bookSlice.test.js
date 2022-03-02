import reducer, { getBooksSuccess } from './booksSlice';

//TESTS IF INITIAL STATE IS BEING RENDERED
test('should return the initial state', () => {
	expect(reducer(undefined, {})).toEqual({
		data: null,
		page: 1,
		error: null,
		isLoading: false,
	});
});

//TESTS REDUCER TO SEE IF DATA IS BEING ADDED
test('should handle a list being added to data', () => {
	const previousState = {};
	expect(
		reducer(
			previousState,
			getBooksSuccess([
				{
					id: 1,
					book: 'hello',
				},
			]),
		),
	).toEqual({
		data: [{ book: 'hello', id: 1 }],
		error: null,
		isLoading: false,
	});
});
