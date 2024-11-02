import React, { useEffect, useState } from 'react';
// Context
import { useModalContext } from '../../context/ModalContext';

function ConnectToDeviceModal() {
  const { toggleConnectToDeviceModal } = useModalContext();
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [socket, setSocket] = useState(null);

  // Connect to WebSocket server
  const connectToDevice = () => {
    const ws = new WebSocket('ws://device-ip-address:port'); // Replace with your device's IP and port

    ws.onopen = () => {
      setConnectionStatus('connected');
      console.log('Connected to the device');
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      console.log('Disconnected from the device');
    };

    ws.onerror = (error) => {
      console.error('Connection error:', error);
      setConnectionStatus('error');
    };

    // Save the WebSocket instance to state
    setSocket(ws);
  };

  // Clean up WebSocket on component unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <section className='grid outline outline-main-colour outline-2 z-20 rounded-lg bg-secondary-colour w-1/3 h-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <section className='grid grid-cols-2 gap-6 mt-4'>
        <div className='grid justify-center'>
          <button
            onClick={toggleConnectToDeviceModal}
            className='grid bg-red-400 w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
          >
            Close
          </button>
        </div>
        <div className='grid justify-center'>
          <button
            onClick={connectToDevice}
            className='grid bg-main-colour w-full h-fit px-4 sm:px-10 py-2 rounded-lg text-secondary-colour cursor-pointer hover:brightness-110 active:scale-95 shadow-lg'
          >
            {connectionStatus === 'connected' ? 'Connected' : 'Connect'}
          </button>
        </div>
      </section>
      {connectionStatus === 'error' && (
        <div className='text-red-500 text-center mt-4'>Connection failed. Try again.</div>
      )}
    </section>
  );
}

export default ConnectToDeviceModal;
