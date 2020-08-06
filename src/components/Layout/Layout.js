import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

const Layout = (props) => {
	return (
		<Auxiliary>
			<div>toolbar, sidebar, backdrop </div>
			<main className={classes.Content}>{props.children}</main>
		</Auxiliary>
	);
};

export default Layout;
