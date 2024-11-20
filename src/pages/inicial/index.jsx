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
import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll'
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';


export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    }
        
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
        closeModal();
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);

    };

    const removerToken = () => {
        localStorage.removeItem('USUARIO')
        localStorage.removeItem('NOME_USUARIO')
        localStorage.removeItem('USUARIO_ID')
        localStorage.removeItem('TELEFONE_USUARIO');
        setIsLogoutModalOpen(false);
        navigate('/')
    }

    useEffect(() => {
        if (isModalOpen || isLogoutModalOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset'; 
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen, isLogoutModalOpen]);

    const nome = localStorage.getItem('NOME_USUARIO')

    const verMais = () => {
        navigate('/servicos')
    }


    const [mensagem, setMensagem]= useState('');


    const WhatsApp = () => {
        const phoneNumber = '5511980152875'; 

        const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(mensagem)}`;
    
        window.open(url, '_blank');
      };


    return (
        <div className='div'>
            <div className='header'>
                <img className='lene' src={lene} alt="" />
                <ScrollLink to='sobre' smooth={true} duration={500} className='Link'>sobre</ScrollLink>
                <ScrollLink to='servicos' smooth={true} duration={500} className='Link'>serviços</ScrollLink>
                <Link to='/servicos' className='Link'>agendar</Link>
                <ScrollLink to='contato' smooth={true} duration={500} className='Link'>contato</ScrollLink>
                <Link to={localStorage.getItem('USUARIO_ID') === '1' ?   '/AgendamentosAdm' : '/agendamentosCliente'} className='Link'>agendamentos</Link>
                <Link onClick={openModal}><img className='perfil' src={perfil} alt="" /></Link>
                
            </div>
            <div className='principal'>
                <div className='botao'>
                    <h1>CORTES MORDENOS!</h1>
                    <button onClick={verMais}>AGENDE JÁ</button>
                </div>
                <img className='img2' src={img1} alt="" />
            </div>
            <div className='sobre' >
                <h1>Aqui o seu cabelo se torna uma obra de arte</h1>
                <div id='sobre' className='cards'>
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
            <div  className='seviços'>
                <h1>Serviços</h1>
                <div id='servicos'  className='servicoCard'>
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
                    <button className='vermais' onClick={verMais}>VER MAIS</button>
                </div>
            </div>
            <div  id='contato' className='contato'>

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
                            </div>
                            <textarea className="in3" placeholder="Digite sua mensagem aqui..."
                             value={mensagem} onChange={e =>setMensagem(e.target.value)}></textarea>

                        </div>
                        <button onClick={WhatsApp}>enviar</button>
                    </div>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10334.777086337894!2d-46.709191277947156!3d-23.679695505774813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce502d3b230a8d%3A0x89668535360273da!2sLene%20Cabeleireiros!5e0!3m2!1spt-BR!2sbr!4v1729645944119!5m2!1spt-BR!2sbr"
            width="100%" 
            height="490" 
            style={{border: '0' }}
            allowfullscreen 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">           
            </iframe>
            {isModalOpen && (
               <div className='modal'>
               <div className='modal-content'>        
                   <span className='close' onClick={closeModal}>&times;</span>
                   <div className='informaceos'>
                       <img src={perfil} alt="" />
                       <p>{nome}</p>
                   </div>
                   <div className='linha2'></div> 
                   <div className='links'>
                        <Link to='/ConfigConta' className='configuracao'>configurar conta</Link>
                        <Link to='/login' className='sair'>Iniciar seção</Link>
                        <Link to='/' className='sair' onClick={openLogoutModal}>Sair da seção</Link>
                   </div>
               </div>
           </div>
           
            )}

            {isLogoutModalOpen && (
                <div className='modal sair'>
                    <div className='modal-content sair'>
                        <h2>Tem certeza que deseja sair?</h2>
                        <div className='modal-buttons'>
                            <button className='confirm-button' onClick={removerToken}>Sim</button>
                            <button className='cancel-button' onClick={closeLogoutModal}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}   