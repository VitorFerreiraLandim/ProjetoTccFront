import './index.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import casa from '../../assets/images/casa.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AgendamentosAdm() {
    const [agendamentos, setAgendamentos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await axios.get('http://localhost:5001/agendamentos_adm');
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

    return (
        <div className='agendaAdm'>
            <div className='agendamento'>
                <div className='topo'>
                <Link to='/inicio'>
                    <img  className='casa' src={casa} alt="" />
                </Link>
                
                <h1 className='HM'>HORÁRIOS MARCADOS</h1>
                </div>
                <div className='content'>
                    <div className='esq'>
                        <h1>HOJE</h1>
                        {agendamentosHoje.map((agendamento, index) => (
                            <div className='cards' key={index}>
                                <div className='info'>
                                    <div className='nome-hora'>
                                        <p className='nome'>Nome: {agendamento.cliente_nome}</p>
                                        <p className='hora'>Horario: {agendamento.hora}</p>
                                    </div>
                                    <div className='servico-valor'>
                                        <p className='serv'>{agendamento.trabalho}</p>
                                        <p className='valor'>R$ {agendamento.valor}</p>
                                    </div>
                                </div>
                                <div className='divisao2'></div>
                                <div className='botoes'>
                                    <button className='b1'>desmarcar</button>
                                    <button className='b2'>mensagem</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='divisao'></div>
                    <div className='dir'>
                        <h1>PROXIMOS DIAS</h1>
                        {proximosAgendamentos.map((agendamento, index) => (
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
                                    <button className='b1'>desmarcar</button>
                                    <button className='b2'>mensagem</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
