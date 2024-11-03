import React, { useState } from 'react';

function ConnectToDeviceComponent() {
  const [isConnectingViaWifi, setIsConnectingViaWifi] = useState(false);
  const [isConnectingViaBluetooth, setIsConnectingViaBluetooth] =
    useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const connectViaWifi = () => {
    setIsConnectingViaWifi(true);
    setTimeout(() => {
      setIsConnectingViaWifi(false);
      setIsConnected(true);
    }, 5000);
  };

  const connectViaBluetooth = () => {
    setIsConnectingViaBluetooth(true);
    setTimeout(() => {
      setIsConnectingViaBluetooth(false);
      setIsConnected(true);
    }, 5000);
  };
  return (
    <section>
      {/* Render Connection Section or Device Info based on connection status */}
      {isConnected ? (
        <section className='grid stripped_border p-4'>
          <h2 className='text-xl text-colour5 font-semibold mb-4'>
            Device Connected
          </h2>
          <div className='grid gap-4 bg-colour1 p-6 rounded-lg'>
            <p className='text-colour5'>Device Information:</p>
            <ul className='list-disc pl-5 text-colour5'>
              <li>Device Name: Custom Device</li>
              <li>Dimensions: Custom Dimensions</li>
              <li>Battery Status: 85%</li>
              {/* Additional device features can be added here */}
            </ul>
            <button className='mt-4 bg-colour2 text-white py-2 px-4 rounded hover:brightness-110'>
              Launch Device Features
            </button>
          </div>
        </section>
      ) : (
        <div>
          <section className='grid stripped_border p-2'>
            <div className='grid lg:grid-cols-2 gap-4 bg-colour1 py-6 px-8'>
              {/* Connection Instructions */}
              <section className='grid'>
                <article>
                  <div className='text-xl text-colour5 font-semibold'>
                    <h3>Connect to Device</h3>
                  </div>
                </article>
              </section>

              {/* Connection Options */}
              <section className='grid'>
                {isConnectingViaBluetooth || isConnectingViaWifi ? (
                  <div className='text-center text-colour5 font-medium'>
                    Connecting...
                  </div>
                ) : (
                  <div className='grid gap-4'>
                    <button
                      onClick={connectViaWifi}
                      className='bg-colour2 text-white py-2 px-4 rounded hover:brightness-110'
                    >
                      Connect Via Wifi
                    </button>
                    <button
                      onClick={connectViaBluetooth}
                      className='bg-colour2 text-white py-2 px-4 rounded hover:brightness-110'
                    >
                      Connect Via Bluetooth
                    </button>
                  </div>
                )}
              </section>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export default ConnectToDeviceComponent;
