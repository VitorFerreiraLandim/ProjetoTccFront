import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        const agendamentoDate = new Date(agendamento.dia + ' ' + agendamento.hora);
        return agendamentoDate < new Date();
    };

    const Remarcar = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/agendamento/${id}`);
            setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
            navigate('/servicos');
        } catch (error) {
            console.error('Erro ao desmarcar o agendamento:', error);
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
                                    <button className='b1' onClick={() => handleDesmarcarClick(agendamento.id)} disabled={isAgendamentoFinalizado(agendamento)}>Desmarcar</button>
                                    <button className='b2' onClick={() => Remarcar(agendamento.id)} disabled={isAgendamentoFinalizado(agendamento)}>Remarcar</button>
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
                <div className='dir'></div>
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
