import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
   return props => {
      const [ withError, errorConfirmedHandler ] = useHttpErrorHandler(axios);

      return (
         <Auxiliary>
            <Modal show={withError} modalClosed={errorConfirmedHandler}>
               {withError && withError.message}
            </Modal>
            <WrappedComponent {...props} />;
         </Auxiliary>
      );
   };
};

export default withErrorHandler;
