import React, {useEffect,useState} from 'react';

import mapMarkerImg from '../images/map-marker.svg';

import {Link} from 'react-router-dom';

import {FiArrowRight, FiPlus} from 'react-icons/fi';

import '../styles/pages/orphanages-map.css'
import { Map, TileLayer,Marker,Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage{
    id:number;
    name:string;
    latitude:number;
    longitude:number;
}


function OrphanagesMap(){
    // definindo que o tipo da variavel é Orphanage e é um array de objetos
    const [orphanages,setOrphanages] = useState<Orphanage[]>([])

    //useEffect -> primeiro parametro sera a funcao a ser chamada o segundo seria quando a acao sera chamada

    useEffect(() => {
        api.get('orphanages').then(r => {
            setOrphanages(r.data)
            //Rendeniza todo componente novamente
        })
    }, [])

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>

                </header>

                <footer>
                    <strong>Pratapolis</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map
                center={[-20.7447805,-46.8688071]}
                zoom={15}
                style={{width:'100%', height:'100%'}}
            >
                <TileLayer url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                
                {orphanages.map(orp => {
                    return (
                        <Marker icon= {mapIcon} position={[orp.latitude, orp.longitude]} key={orp.id}>
                            <Popup closeButton= {false} minWidth={240} maxWidth={240} className= "map-popup">
                                {orp.name}
                                <Link to= {`/orphanages/${orp.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>    
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;