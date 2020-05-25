import React, { Fragment, useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import Axios from "axios";
import { Cancion } from "./components/Cancion";
import { Info } from "./components/Info";

function App() {
  //definir el primer state de la app
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [informacion, guardarInformacion] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([Axios(url), Axios(url2)]);
      guardarLetra(letra.data.lyrics);
      guardarInformacion(informacion.data.artists[0]);
    };
    consultarAPILetra();
  }, [busquedaletra, informacion]);
  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info informacion={informacion} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
