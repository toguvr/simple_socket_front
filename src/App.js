import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const user_id = localStorage.getItem('user_id');
  const port = localStorage.getItem('port');
  const [message, setMessage] = useState('');
  const [sendMsg, setsendMsg] = useState('');

  const socket = useMemo(() => {
    return io(`http://localhost:${port}`, {
      query: {
        user_id,
      },
    });
  }, []);
  useEffect(() => {
    socket.on('private_message', (data) => {
      console.log('recebido', data);
      setMessage(data.msg);
    });
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
