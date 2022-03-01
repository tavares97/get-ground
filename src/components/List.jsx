import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getBooksFetch, getPagination } from '../features/books/booksSlice';
import { Button, CircularProgress } from '@mui/material';

export default function ListBooks() {
	const books = useSelector(state => state.books?.data?.books);
	const page = useSelector(state => state.books?.page);
	const loading = useSelector(state => state.books?.isLoading);
	const error = useSelector(state => state.books?.error);

	const dispatch = useDispatch();

	useEffect(() => {
		//dispatches book fetch action
		dispatch(getBooksFetch());
	}, []);

	return (
		<>
			{error ? (
				<p>{error}</p>
			) : (
				<>
					<TableContainer component={Paper} style={{ marginTop: '30px' }}>
						{!loading ? (
							<Table
								sx={{ minWidth: 650 }}
								size='small'
								aria-label='a list of books'
							>
								<TableHead>
									<TableRow>
										<TableCell>Author</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Year Publish</TableCell>
										<TableCell>Country Published</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{books?.map(book => (
										<TableRow key={book.id}>
											<TableCell component='th' scope='row'>
												{book.book_author[0]}
											</TableCell>
											<TableCell component='th' scope='row'>
												{book.book_title}
											</TableCell>
											<TableCell component='th' scope='row'>
												{book.book_publication_year}
											</TableCell>
											<TableCell component='th' scope='row'>
												{book.book_publication_country}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									padding: '8rem 0 8rem 0',
								}}
							>
								<CircularProgress />
							</div>
						)}
					</TableContainer>

					{page > 1 && (
						<Button onClick={() => dispatch(getPagination({ page: page - 1 }))}>
							Last Page
						</Button>
					)}

					<Button onClick={() => dispatch(getPagination({ page: page + 1 }))}>
						Next Page
					</Button>
				</>
			)}
		</>
	);
}
