import './index.scss';
import img1 from '../../assets/images/img1.jpg';
import perfil from '../../assets/images/perfil2.webp'
import lene from '../../assets/images/lene.png'
import cabelo1 from '../../assets/images/cabelo1.jpg'
import cabelo2 from '../../assets/images/cabelo2.avif'
import cabelo3 from '../../assets/images/cabelo3.webp'
import cabelo4 from '../../assets/images/cabelo5.avif'
import cabelo5 from '../../assets/images/escova.webp'
import { Link } from 'react-router-dom'
import { GoogleMap, useJsApiLoader , Marker} from '@react-google-maps/api';
import { useState, useEffect } from 'react';


export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAzC_kDPsUhwFwZ0E7t2SOvRyK5Y8YVDE8"
    });

    const position = {
        lat: -23.680318798076144,
        lng: -46.70840936899394 
    }

    const openModal = () => {
        setIsModalOpen(true);
    }
        
    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset'; 
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <div className='div'>
            <div className='header'>
                <img className='lene' src={lene} alt="" />
                <Link className='Link'>sobre</Link>
                <Link className='Link'>serviços</Link>
                <Link to='/servicos' className='Link'>agendar</Link>
                <Link className='Link'>contato</Link>
                <Link to='/agendamentosCliente' className='Link'>agendamentos</Link>
                <Link to='/ConfigConta' className='Link'>ConfigConta</Link>
                <Link onClick={openModal}><img className='perfil' src={perfil} alt="" /></Link>
                
            </div>
            <div className='vitin-do-capa'>
                <div className='botao'>
                    <h1>CORTES MORDENOS!</h1>
                    <button>AGENDE JÁ</button>
                </div>
                <img className='img2' src={img1} alt="" />
            </div>
            <div className='sobre' id='sobre'>
                <h1>Aqui o seu cabelo se torna uma obra de arte</h1>
                <div className='cards'>
                    <div className='card1'>
                        <img src={cabelo1} alt="" />
                        <div className='p'>
                            <p>·Utilizamos apenas os melhores produtos e técnicas modernas.</p>
                            <p>·Fazemos também cortes de cabelo, para todo o tipo de cabelo.</p>
                            <p>·Nossa missão é garantir que você se sinta linda e confiante.</p>
                        </div>
                    </div>
                    <div className='card2'>
                        <div className='p'>
                            <p>·Aqui, você encontrará um ambiente acolhedor, onde a beleza é celebrada em todas as suas formas</p>
                            <p>· Venha nos visitar e descubra como podemos realçar a sua beleza natural.</p>
                            <p>·Cada corte de cabelo é uma nova chance para brilhar. Venha nos visitar!</p>
                        </div>
                        <img src={cabelo2} alt="" />
                    </div>
                </div>
            </div>
            <div className='seviços'>
                <h1>Serviços</h1>
                <div className='servicoCard'>
                    <div className='imgCortes'>
                        <div className='img1'>
                            <img src={cabelo5} alt="" />
                            <p>Hidratação + Escova e <br /> Prancha</p>
                        </div>
                        <div className='img2'>
                            <img src={cabelo4}alt="" />
                            <p>Selagem</p>
                        </div>
                        <div className='img3'>
                            <img src={cabelo3} alt="" />
                            <p>Progressiva</p>
                        </div>
                    </div>
                    <button>VER MAIS</button>
                </div>
            </div>
            <div className='contato'>
                <h1>contato</h1>
                <div className='fuboca'>
                    <div className='informacoes'>
                        <p className='visita'>VENHA NOS FAZER UMA VISITA</p>
                        <p className='local'>Av. Coronel Octaviano de Freitas Costa, 440 - Veleiros, São Paulo - SP, 04773-000</p>
                        <div className='tel'>
                            <p className='p1'>TEL :</p><p className='p2'>(11) 97822-4398</p>
                        </div>
                        <div className='hora'>
                            <p className='p1'>Terça a  Sabado:</p><p className='p2'>09:00 às 19:00</p>
                        </div>
                        <div className='hora2'>
                            <p className='p1'>Domingo e Segunda-feira:</p><p className='p2'>fechado</p>
                        </div>
                    </div>
                    <div className='mensagem'>
                        <div className='h2'>
                            <h2>FALE COM A GENTE</h2>
                        </div>
                        <div className='inputs'>
                            <div className='nomeEmail'>
                                <input className='in1' type="text" placeholder='nome' />
                                <input className='in2' type="text" placeholder='email' />
                            </div>
                            <textarea className="in3" placeholder="Digite sua mensagem aqui..."></textarea>

                        </div>
                        <button>enviar</button>
                    </div>
                </div>
            </div>
            <div>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '55vh' }} 
                        center={position}
                        zoom={15 }
                    >
                        <Marker position={position}/>
                    </GoogleMap>
                ) : null} {}
            </div>
            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                    <span className='close' onClick={closeModal}>&times;</span>
                    </div>
                </div>
            )}
        </div>
    );
}