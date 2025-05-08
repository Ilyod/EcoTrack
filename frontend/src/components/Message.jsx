import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiMessage } from '../features/api/apiSlice';

export default function Message() {
  const dispatch = useDispatch();
  const { message, status, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiMessage());
  }, [dispatch]);

  return (
    <div>
      {status === 'loading' && <p>Chargement...</p>}
      {status === 'failed' && <p>Erreur : {error}</p>}
      {status === 'succeeded' && <p>Message : {message}</p>}
    </div>
  );
}
