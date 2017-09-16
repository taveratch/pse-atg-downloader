import React from 'react';
import { Provider } from 'react-redux';

import createStore from 'src/utils/create-store';
import Routes from './routes';

export default props => (
	<Provider store={createStore()}>
		<Routes {...props} />
	</Provider>
);