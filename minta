import { useState, useEffect } from "react";
import axios from "axios";
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';

function TablazatSzoba({ selectedRoom }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setData([]); // 🔴 Minden új választásnál töröljük az előző adatokat!
        
        if (!selectedRoom) {
            return (
                <p className="text-center text-muted">Válassz egy szobát a foglaltság megtekintéséhez.</p>
            ); // 🔴 Ha nincs kiválasztott szoba, ne kérjünk adatokat!
        }

        setLoading(true); // 🔄 Betöltési állapot
        console.log("Új szoba választva, adatok lekérése:", selectedRoom);

        axios.get(`http://localhost:3001/foglaltsag/${selectedRoom}`)
            .then(response => {
                console.log("Foglaltsági adatok frissítve:", response.data);
                setData(response.data);
            })
            .catch(error => console.error("Hiba:", error))
            .finally(() => setLoading(false)); // ✅ Betöltés vége

    }, [selectedRoom]); // 🔄 A useEffect minden selectedRoom változásnál lefut

    return (
        <div>
            <h2 className="text-center my-4">Szoba foglaltsága</h2>

            {/* 🔴 Ha nincs kiválasztott szoba, akkor egy üzenet jelenjen meg */}
            {!selectedRoom ? (
                <p className="text-center text-muted">Válassz egy szobát a foglaltság megtekintéséhez.</p>
            ) : loading ? (
                <p className="text-center">Adatok betöltése...</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>A vendég neve</th>
                            <th>Szoba neve</th>
                            <th className="text-center">Érkezés dátuma</th>
                            <th className="text-center">Távozás dátuma</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row) => (
                                <tr key={row.szazon}>
                                    <td>{row.vnev} </td>
                                    <td>{row.sznev} </td>
                                    <td className="text-center">{row.erk} </td>
                                    <td className="text-center">{row.tav} </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Nincs foglalás erre a szobára.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TablazatSzoba;
