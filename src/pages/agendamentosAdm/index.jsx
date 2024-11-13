import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import casa from '../../assets/images/casa.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { api } from '../service/axios';
import agenda from '../../assets/images/5709577.png';

export default function AgendamentosAdm() {
    const [agendamentos, setAgendamentos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('USUARIO');
    
        if (!token) {
            navigate('/'); 
        }
    }, [navigate]);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await api.get('/agendamentos_adm');
                console.log('Agendamentos recebidos:', response.data);
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };

        fetchAgendamentos();
    }, []);

    const hoje = new Date().toISOString().split('T')[0];
    console.log('Hoje:', hoje);

    const agendamentosHoje = agendamentos.filter(agendamento => 
        agendamento.dia.split('T')[0] === hoje
    ).sort((a, b) => a.hora.localeCompare(b.hora)); 

    console.log('Agendamentos de hoje:', agendamentosHoje);

    const proximosAgendamentos = agendamentos
        .filter(agendamento => agendamento.dia.split('T')[0] > hoje)
        .sort((a, b) => {
            const diaA = new Date(a.dia);
            const diaB = new Date(b.dia);
            if (diaA.getTime() === diaB.getTime()) {
                return a.hora.localeCompare(b.hora); 
            }
            return diaA.getTime() - diaB.getTime(); 
        });

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    };


    const WhatsApp = (telefone) => {
        const url = `https://web.whatsapp.com/send?phone=${telefone}`;
        window.open(url, '_blank');
    };

    useEffect(() => {
        const token = localStorage.getItem('USUARIO');
    
        if (!token) {
            navigate('/login'); 
        }
    }, [navigate]);
     

    return (
        <div className='agendaAdm'>
            <div className='agendamento'>
                <div className='topo'>
                <Link to='/'>
                    <img  className='casa' src={casa} alt="" />
                </Link>
                
                <h1 className='HM'>HORÁRIOS MARCADOS</h1>
                </div>
                <div className='content'>
                    <div className='esq'>
                        <h1>HOJE</h1>
                        {agendamentosHoje.length === 0 ? (
                            <div className='sem-agendamentos'>
                            <img className='sem-agenda' src={agenda} alt="" />
                            <p>Sem agendamentos hoje.</p>
                        </div>
                        ) : (
                            agendamentosHoje.map((agendamento, index) => (
                                <div className='cards' key={index}>
                                    <div className='info'>
                                        <div className='nome-hora'>
                                            <p className='nome'>Nome: {agendamento.cliente_nome}</p>
                                            <p className='hora'>Horário: {agendamento.hora}</p>
                                        </div>
                                        <div className='servico-valor'>
                                            <p className='serv'>{agendamento.trabalho}</p>
                                            <p className='valor'>R$ {agendamento.valor}</p>
                                        </div>
                                    </div>
                                    <div className='divisao2'></div>
                                    <div className='botoes'>
                                        <button className='b2' onClick={() => WhatsApp(agendamento.cliente_telefone)}>Mensagem</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='divisao'></div>
                    <div className='dir'>
                        <h1>PROXIMOS DIAS</h1>
                        {proximosAgendamentos.length === 0? (
                            <div className='sem-agendamentos'>
                                <img className='sem-agenda' src={agenda} alt="" />
                            <p>Sem agendamentos próximos.</p>
                        </div>
                        ) : (
                        proximosAgendamentos.map((agendamento, index) => (
                            <div className='cards' key={index}>
                                <div className='info'>
                                    <div className='nome-hora'>
                                        <p className='nome'>Nome: {agendamento.cliente_nome}</p>
                                        <p className='hora'>Horario: {agendamento.hora}</p>
                                        <p className='dia'>Dia: {formatarData(agendamento.dia)}</p>
                                    </div>
                                    <div className='servico-valor'>
                                        <p className='serv'>{agendamento.trabalho}</p>
                                        <p className='valor'>R$ {agendamento.valor}</p>
                                    </div>
                                </div>
                                <div className='divisao2'></div>
                                <div className='botoes'>
                                    <button className='b2'onClick={() => WhatsApp(agendamento.cliente_telefone)}>mensagem</button>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    );
}
