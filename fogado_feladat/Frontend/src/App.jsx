import { useState, useEffect } from 'react';

function App() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    // Backend API hívás a szobák adatainak lekérésére
    fetch('http://localhost:3000/szobak')
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error('Hiba az API hívás során:', error));

    // Backend API hívás a szobák kihasználtságának lekérésére
    fetch('http://localhost:3000/kihasznaltsag')
      .then((response) => response.json())
      .then((data) => setUsageData(data))
      .catch((error) => console.error('Hiba az API hívás során:', error));
  }, []);

  const handleRoomSelect = (roomName) => {
    // Szoba foglaltságának lekérése
    fetch(`http://localhost:3000/szoba-foglaltsag?sznev=${roomName}`)
      .then((response) => response.json())
      .then((data) => setSelectedRoom(data))
      .catch((error) => console.error('Hiba az API hívás során:', error));
  };

  return (
    <>
      <h1>Falusi szálláshely fajtái:</h1>
      <ul>
        <li>Vendégszoba: a vendégek rendelkezésére bocsátható önálló lakóegység...</li>
        <li>Lakrész: önálló épület kettő, illetve több szobából álló lehatárolt része...</li>
        <li>Vendégház: önálló épület, több szobával, mellékhelyiségekkel...</li>
        <li>Sátorozóhely: csak valamelyik falusi szálláshely típus mellett...</li>
      </ul>

      <h1>A hét törpe fogadó</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Szoba neve</th>
            <th>Ágyak száma</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => handleRoomSelect(room.sznev)}
              >
                {room.sznev}
              </td>
              <td>{room.agy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRoom && (
        <>
          <h2>A választott szoba foglaltsága: {selectedRoom.sznev}</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Szoba neve</th>
                <th>Érkezés dátuma</th>
                <th>Távozás dátuma</th>
              </tr>
            </thead>
            <tbody>
              {selectedRoom.foglaltsag.map((foglalas, index) => (
                <tr key={index}>
                  <td>{foglalasok.sznev}</td>
                  <td>{foglalas.erkezes}</td>
                  <td>{foglalas.tavozas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <h1>A Szobák kihasználtsága:</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Szoba neve</th>
            <th>Vendégek száma</th>
            <th>Vendégéjszakák száma</th>
          </tr>
        </thead>
        <tbody>
          {usageData.map((usage, index) => (
            <tr key={index}>
              <td>{usage.sznev}</td>
              <td>{usage.vendegekSzama} fő</td>
              <td>{usage.vendegejszakakSzama} éjszaka</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;