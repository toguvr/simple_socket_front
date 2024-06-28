import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const user_id = localStorage.getItem('user_id');
  const port = localStorage.getItem('port');
  const [message, setMessage] = useState('');
  const url = 'https://api-dev.hubees.com.br';
  // const url = `http://localhost:${port}`;
  // const url = `http://localhost:3333?user_id=${user_id}`;
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhM2JkODk4ZGE1MGE4OWViOWUxY2YwYjdhN2VmZTM1OTNkNDEwNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBwbmV0cGFya2RldiIsImF1ZCI6ImFwcG5ldHBhcmtkZXYiLCJhdXRoX3RpbWUiOjE3MDIzOTYxOTUsInVzZXJfaWQiOiJNQWlXSzJ2VGNLVU5xTnpwcWkwaFFLNUdqSzcyIiwic3ViIjoiTUFpV0sydlRjS1VOcU56cHFpMGhRSzVHaks3MiIsImlhdCI6MTcwMjM5NjE5NSwiZXhwIjoxNzAyMzk5Nzk1LCJlbWFpbCI6ImJlbGxhcXVhcmFudGErYmVlbW92aW5nOEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYmVsbGFxdWFyYW50YStiZWVtb3Zpbmc4QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.W47SE6_juVqt1SbC1Qywy9opGCUu41Rnt0wThRmAapygbFYGv6T5CcehIJihXTsXC6wWh6nkuki89VWmjaCJvi9NY4J9qDFtwJURIRngufPwKw5bhFCw1AlkmLfR63TFaFoIPVjhlvaSysCxQu3JDtW5mHOQ_owCNca5WGSGBlheTjP3Tn2qnoBWmTd4zATIo3yd9nEr8l8aWHJT5oF8im78VdGmZuV0wqMV0-36JS4-FCfctmaR9GIn4hA-yajJY4XGg9F_EcHpyoma4wqYIex98-s3cxGoGS9y42uUqzK7bdwb6SZNRn9CplXXELU88OtWxnktQwJ7ZeuTy9LWBQ';
  const socket = useMemo(() => {
    return io(url, {
      path: '/socket',
      transports: ['websocket'],
      auth: {
        authorization: 'Bearer ' + token,
      },
    });
  }, []);
  useEffect(() => {
    socket.on('CLIENT_PIX_PAID', (data) => {
      console.log('recebido', data);
      setMessage(JSON.stringify(data));
    });

    socket.on('error', (err) => console.log('error', err));
    socket.on('connect', () => console.log('connect'));
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          User: {user_id} | port: {port}
        </p>
        <p>msg recebida: {message}</p>
      </header>
    </div>
  );
}

export default App;
