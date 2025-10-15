import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import './fogado.css';
import Button from 'react-bootstrap/Button';

function App() {
  const [rooms, setRooms] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:3000/szobak')
      .then((res) => {
        return res.json();
      })
      .then(setRooms)
      .catch((err) => console.error('Error loading /szobak:', err));
  
    
    fetch('http://localhost:3000/kihasznaltsag')
      .then((res) => {
        
        return res.json();
      })
      .then(setOccupancy)
      .catch((err) => console.error('Error loading /kihasznaltsag:', err));
  
    
    fetch('http://localhost:3000/szoba-foglaltsag')
      .then((res) => {
        
        return res.json();
      })
      .then(setBookings)
      .catch((err) => console.error('Error loading /szoba-foglaltsag:', err));
  }, []);

  return (
    <>
            <div>
        <div><img src="./img/top.jpg" alt="" className="bg-fej" /></div>
      </div>

      <div >
        <div className='container'>
          <div className='container' id='bg-torzs'>
            <h3>Napraforgós Nemzeti Tanúsító Védjegy célja</h3>
                A falusi szálláshelyek napraforgós Nemzeti Tanúsító Védjegye a FATOSZ által több mint tíz éve létrehozott, és működtetett minősítési rendszer alapjaira épülve 2011 óta a minőségi falusi turizmus szimbóluma. 
                A védjegy alapvető célja, hogy – összhangban az egyes szálláshelyek működtetéséről szóló 239/2009. 
                Korm. rendeletben foglaltakkal – garanciát nyújtson a szálláshely szolgáltatás minőségének megfelelő színvonalára. 
                A falusi vendégházak 1-4 napraforgós besorolást nyerhetnek el a külső, belső megjelenés, a felszereltség, a szolgáltatások színvonala, valamint a szállásadó személyes felkészültségének, szakmai képzettségének függvényében.
                <p></p>
                    <img src="./img/logo.png" alt="" />
                    <img src="./img/holloko_masolata.jpg" alt="" id='hollokokep'/>
            </div>
          </div>
          <div className='container' id='bg-torzs2'>
            <h3>Falusi szálláshely fajtái</h3>
            <ul>
            <li>Vendégszoba: a vendégek rendelkezésére bocsátható önálló lakóegység, amely egy lakóhelyiségből, és a minősítéstől függően a hozzátartozó mellékhelyiségekből áll.</li> <li>Lakrész: önálló épület kettő, illetve több szobából álló lehatárolt része a minősítéstől függően hozzátartozó mellékhelyiségekkel együtt</li> <li>Vendégház: önálló épület, több szobával, mellékhelyiségekkel és főzési lehetőséggel rendelkező lakó-, illetve üdülőegység, családok vagy kisebb csoportok elszállásolására.</li> <li>Sátorozóhely: csak valamelyik falusi szálláshely típus mellett, mintegy azt kiegészítve üzemeltethető az előírt feltételek megléte esetén. Pl.: falusi vendégház sátorozóhellyel.</li>
            </ul>
            <img src="./img/ketagyas.jpg" alt="" id='ketagyaskep'/>
          </div>
          <div className='container' id='bg-torzs3'>
            <h3>A hét törpe fogadó</h3>
            
            <table className="Tablesek">
              <thead>
                <tr>
                  <th>Szoba neve</th>
                  <th>Ágyak száma</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => (
                  <tr key={i}>
                    <td >{room['sznev']}</td>
                    <td>{room['agy']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul>
            <li>Ruhásszekrény</li>
              <li>Saját fürdőszoba zuhanytálca</li>
              <li>WC (fürdőszobával egyben)</li>
            </ul>
          </div>
        </div>
      <div>
            <h3>A szobák kihasználtsága:</h3>
            <table className="Tables">
              <thead>
                <tr>
                  <th>Szoba</th>
                  <th>Vendégek száma</th>
                  <th>Vendégéjszakák</th>
                </tr>
              </thead>
              <tbody>
                {occupancy.map((o, i) => (
                  <tr key={i}>
                    <td>{o.szoba}</td>
                    <td>{o.vendegek}</td>
                    <td>{o.vendegejszakak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

      <div>
      <div>
  <div>
    <div>
      <h3>A vendégszobák foglaltsága</h3>
          <table className="Tables">
            <thead>
              <tr>
                <th>Szoba</th>
                <th>Érkezés</th>
                <th>Távozás</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b['Szobanév']}</td>
                  <td>{b['Érkezés'] ? b['Érkezés'].split('T')[0] : '—'}</td>
                  <td>{b['Távozás'] ? b['Távozás'].split('T')[0] : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  </div>
</div>
      </div>
    </>
  );
}

export default App;