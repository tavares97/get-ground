import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, TextField } from '@mui/material';

import { getBooksFetch } from '../features/books/booksSlice';

export class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchFilter: '',
		};
	}

	render() {
		return (
			<div style={{ display: 'flex' }}>
				<TextField
					fullWidth
					id='outlined-basic'
					label='Search for a book'
					variant='outlined'
					size='small'
					onChange={e => this.setState({ searchFilter: e.target.value })}
				/>
				<Button
					variant='contained'
					style={{ marginLeft: '30px' }}
					onClick={() =>
						this.props.getBooksFetch({ filter: this.state.searchFilter })
					}
				>
					SEARCH
				</Button>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	books: state.books?.data?.books,
});

const mapDispatchToProps = { getBooksFetch };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
