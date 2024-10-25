import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import lene from '../../assets/images/lene.png';

export default function AgendamentosCliente() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const clienteId = localStorage.getItem('USUARIO_ID');

        const fetchAgendamentos = async () => {
            try {
                const url = `http://localhost:5001/agendamento?cliente_id=${clienteId}`;
                const resp = await axios.get(url);
                setAgendamentos(resp.data);
            } catch (error) {
                console.error('Erro ao carregar agendamentos:', error);
            }
        };
        fetchAgendamentos();
    }, []);

    const handleDesmarcarClick = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleDesmarcar = async () => {
        try {
            await axios.delete(`http://localhost:5001/agendamento/${selectedId}`);
            setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== selectedId));
            setIsModalOpen(false);
            setSelectedId(null);
        } catch (error) {
            console.error('Erro ao desmarcar agendamento:', error);
            setIsModalOpen(false);
            setSelectedId(null);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedId(null);
    };

    const isAgendamentoFinalizado = (agendamento) => {

        const agendamentoDate = new Date(agendamento.dia);
    
        if (isNaN(agendamentoDate.getTime())) {
            console.error('Data de agendamento inválida:', agendamentoDate);
            return false; 
        }
    
        const currentDate = new Date();
    
        console.log('Agendamento Date:', agendamentoDate);
        console.log('Current Date:', currentDate);
    
        return agendamentoDate < currentDate;
    };
 
    const Remarcar = async (id) => {
        const agendamento = agendamentos.find(a => a.id === id);
        
        if (isAgendamentoFinalizado(agendamento)) {
            navigate('/servicos');
        } else {
            try {
                await axios.delete(`http://localhost:5001/agendamento/${id}`);
                setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
                navigate('/servicos');
            } catch (error) {
                console.error('Erro ao desmarcar o agendamento:', error);
            }
        }
    };
    
    return (
        <div className='div-mae'>
            <div className='agenda'>
                <div className='esq2'> 
                    <h1 className='my-agenda'>Meus Agendamentos</h1>
                    {agendamentos.slice().reverse().map((agendamento) => (
                        <div className='card-info' key={agendamento.id}>
                            <div className='esq'>
                                <p className={isAgendamentoFinalizado(agendamento) ? 'finalizada' : 'confirma'}>
                                    {isAgendamentoFinalizado(agendamento) ? 'Finalizada' : 'Confirmada'}
                                </p>
                                <p className='serviço'>{agendamento.trabalho}</p>
                                <div className='butao'>
                                    {!isAgendamentoFinalizado(agendamento) && (
                                        <button className='b1' onClick={() => handleDesmarcarClick(agendamento.id)}>Desmarcar</button>
                                    )}
                                    <button className='b2' onClick={() => Remarcar(agendamento.id)}>Remarcar</button>
                                </div>
                            </div>
                            <div className='divisao2'></div>
                            <div className='dir'>
                                <div className='linha-'></div>
                                <div className='ps'>
                                    <p className='p1'>{new Date(agendamento.dia).toLocaleString('pt-BR', { month: 'long' })}</p>
                                    <p className='p2'>{new Date(agendamento.dia).getDate()}</p>
                                    <p className='p3'>{agendamento.hora}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className='divisao'></div>
                <div className='dir'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10334.777086337894!2d-46.709191277947156!3d-23.679695505774813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce502d3b230a8d%3A0x89668535360273da!2sLene%20Cabeleireiros!5e0!3m2!1spt-BR!2sbr!4v1729645944119!5m2!1spt-BR!2sbr"
                        width="79%" 
                        height="310" 
                        style={{border: '0', borderRadius: '2dvh'}}
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className='map'
                    />
                    <div className={`card-info ${isModalOpen ? 'hidden' : ''}`}>
                        <img src={lene} alt="" />
                        <div className='txt'>
                            <p className='p1'>Lene Cabeleira</p>
                            <p className='p2'>Av. Coronel Octaviano de Freitas Costa, 440 - Veleiros, São Paulo - SP, 04773-000</p>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>Confirmação</h2>
                        <p>Você tem certeza que deseja desmarcar este agendamento?</p>
                        <button className='sim' onClick={handleDesmarcar}>Sim</button>
                        <button className='nao' onClick={handleCancel}>Não</button>
                    </div>
                </div>
            )}
        </div>
    );
}
