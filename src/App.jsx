import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const user_id = localStorage.getItem('user_id');
  const port = localStorage.getItem('port');
  const [message, setMessage] = useState('');
  const [sendMsg, setsendMsg] = useState('');
//   const url = 'https://api-dev.hubees.com.br';
  // const url = `http://localhost:${port}`;
  const url = `http://localhost:3333?user_id=${user_id}`;
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOGU2ZTNmNzg4ZDYwMTk0MDA1ZGJiYzE5NDc0YmY5Mjg5ZDM5ZWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBwbmV0cGFya2RldiIsImF1ZCI6ImFwcG5ldHBhcmtkZXYiLCJhdXRoX3RpbWUiOjE3MTgzNzA4MzYsInVzZXJfaWQiOiJ4dm1sQlI2S0FoUnpWQTloTDZrZk53ZmFBTTcyIiwic3ViIjoieHZtbEJSNktBaFJ6VkE5aEw2a2ZOd2ZhQU03MiIsImlhdCI6MTcxOTU5OTU1NSwiZXhwIjoxNzE5NjAzMTU1LCJlbWFpbCI6ImF1Z3VzdG90ZjkzK3NpbmdsZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYXVndXN0b3RmOTMrc2luZ2xlQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.qMG60ynsngBIIxdfX_WJjGwCQa5M1HUpPsNMXP65g0iAXm3ryHRAXN-Ebv5aT2eDp0ZnhBCxUb1D58knMm352qXoknFFZsPvOsPBAMhHCMbPISQkfn142MPJc74SABhLjjGAhgiIzZdZN4KKTlTtEwAuYHDOZeDww3j3KFqX4FAGlUCw61qujUT5GqgVKNsEkzWamsGDZoYUbOysJ0mcCO8gf1xKhP08wF-KfTLwNARJd8mxYaTOV2cqhJqqWhdfzNlv2omh2yu7dxv9DSM3DfGcKZtajelq3QCqs3GrzQ1X86xBb7Nds-6N8RgqJY8Pd1bbqrlRdQxFIbYu-EnSpA';
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
    socket.on('private_message', (data) => {
      console.log('recebido', data);
      setMessage(data.msg);
    });

    socket.on('error', (err) => console.log('error', err));
    socket.on('connect', () => console.log('connect'));
  }, [socket]);
  const sendMsgClicked = () => {
    console.log({
      anotherUserId: user_id == '1' ? '2' : '1',
      msg: sendMsg,
    });

    socket.emit('private_message', {
      anotherUserId: user_id == '1' ? '2' : '1',
      msg: sendMsg,
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <label htmlFor="">MENSAGEM PARA O OUTRO</label>

        <input
          type="text"
          onChange={(e) => setsendMsg(e.target.value)}
          value={sendMsg}
        />
        <button onClick={sendMsgClicked}>send</button>
        <p>
          User: {user_id} | port: {port}
        </p>
        <p>novo: {message}</p>
      </header>
    </div>
  );
}

export default App;
