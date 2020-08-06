import React from 'react';
import classes from './BuilderControls.module.css';
import BuildControlElement from './BuildControlElement/BuildControlElement';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];

const builderControls = (props) => {
	return (
		<div className={classes.BuilderControls}>
			{controls.map((elem) => {
				return (
					<BuildControlElement
						type={elem.type}
						key={elem.label}
						label={elem.label}
						added={() => props.ingredientAdded(elem.type)}
						removed={() => props.ingredientRemoved(elem.type)}
						disabled={props.disabled[elem.type]}
					/>
				);
			})}
		</div>
	);
};

export default builderControls;
