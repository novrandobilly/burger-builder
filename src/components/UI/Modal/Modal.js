import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = props => {
   // shouldComponentUpdate (nextProps, nextState) {
   //    return nextProps.show !== props.show || nextProps.children !== props.children;
   // }

   return (
      <Auxiliary>
         <Backdrop show={props.show} clicked={props.modalClosed} />
         <div
            style={{
               transform :
                  props.show ? 'translateY(0)' :
                  'translateY(-100vh)',
               opacity   :
                  props.show ? '1' :
                  '0'
            }}
            className={classes.Modal}>
            {props.children}
         </div>
      </Auxiliary>
   );
};

export default React.memo(
   Modal,
   (prevProps, nextProps) =>
      nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
