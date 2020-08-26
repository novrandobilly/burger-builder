import { useState, useEffect } from 'react';

export default httpClient => {
   const [ withError, setWithError ] = useState(null);

   const reqInterceptor = httpClient.interceptors.request.use(req => {
      setWithError(null);
      return req;
   });
   const resInterceptor = httpClient.interceptors.response.use(
      res => res,
      error => {
         setWithError(error);
      }
   );

   useEffect(
      () => {
         return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
         };
      },
      [ reqInterceptor, resInterceptor, httpClient ]
   );

   const errorConfirmedHandler = () => {
      setWithError(null);
   };

   return [ withError, errorConfirmedHandler ];
};
