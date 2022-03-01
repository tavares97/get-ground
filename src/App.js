import { Container, Typography } from '@mui/material';
import ListBooks from './components/List';

import Search from './components/Search';

function App() {
	return (
		<Container maxWidth='lg'>
			<Typography variant='h1' gutterBottom style={{ textAlign: 'center' }}>
				Get Ground book list
			</Typography>
			<Search />

			<ListBooks />
		</Container>
	);
}

export default App;
