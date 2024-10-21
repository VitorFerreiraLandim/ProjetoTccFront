import './index.scss';
import servicos from '../../assets/images/servicos.webp';
import seta from '../../assets/images/seta2.jpg';
import seta2 from '../../assets/images/next.png';
import x from '../../assets/images/x.png';
import { Link } from 'react-router-dom';
import Servico from '../../components/serviços';
import { useState } from 'react';
import axios from 'axios';

export default function Servicos() {
    const [modalAberto, setModalAberto] = useState(false);
    const [modalAdicionarServicoAberto, setModalAdicionarServicoAberto] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const [horaSelecionada, setHoraSelecionada] = useState(null);
    const [indiceInicioDia, setIndiceInicioDia] = useState(0);
    const [indiceDiaSelecionado, setIndiceDiaSelecionado] = useState(null);
    const [animando, setAnimando] = useState(false);
    const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
    const [offsetHora, setOffsetHora] = useState(0);
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const horasPorConjunto = 6;
    
    

    const servicosList = [
        { 'trabalho': 'Escova e Prancha', 'valor': '30,00' },
        { 'trabalho': 'Hidratação + Escova e Prancha', 'valor': '50,00' },
        { 'trabalho': 'Cronograma capilar', 'valor': '100,00' },
        { 'trabalho': 'Progressiva sem formol', 'valor': '70,00' },
        { 'trabalho': 'Progressiva com formol', 'valor': '90,00' },
        { 'trabalho': 'Botox', 'valor': '60,00' },
        { 'trabalho': 'Selagem', 'valor': '120,00' },
        { 'trabalho': 'Limpeza de pele profunda', 'valor': '50,00' },
        { 'trabalho': 'massagem facial', 'valor': '45,00' },
        { 'trabalho': 'massagem relaxante corporal', 'valor': '100,00' },
    ];

    const agendar = (trabalho, valor) => {
        const novoServico = { trabalho, valor };
        setServicoSelecionado(novoServico);
        if (!servicosSelecionados.some(service => service.trabalho === trabalho && service.valor === valor)) {
            setServicosSelecionados(prev => [...prev, novoServico]);
        }
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setServicoSelecionado(null);
        setHoraSelecionada(null);
        setIndiceInicioDia(0);
        setIndiceDiaSelecionado(null);
        setPeriodoSelecionado(null);
        setOffsetHora(0);
    };

    const abrirModalAdicionarServico = () => {
        setModalAdicionarServicoAberto(true);
    };

    const fecharModalAdicionarServico = () => {
        setModalAdicionarServicoAberto(false);
    };

    const confirmarSelecao = async () => {
        const checkboxes = document.querySelectorAll('.adi-sev input[type="checkbox"]');
        const novosServicosSelecionados = [];

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                novosServicosSelecionados.push(servicosList[index]);
            }
        });

        setServicosSelecionados(prev => [...prev, ...novosServicosSelecionados]);
        fecharModalAdicionarServico();
    };

    const removerServico = (servicoParaRemover) => {
        setServicosSelecionados(prev => prev.filter(servico => servico !== servicoParaRemover));
    };

    const obterHoras = () => {
        const horas = [];
        for (let i = 9; i <= 19; i += 0.5) {
            const hora = i % 1 === 0 ? `${i}:00` : `${i - 0.5}:30`;
            horas.push(hora);
        }
        return horas;
    };

    const obterDias = () => {
        const dias = [];
        const hoje = new Date();
        for (let i = 0; i < 7; i++) {
            const data = new Date(hoje);
            data.setDate(hoje.getDate() + (indiceInicioDia + i));
            const nomeDia = data.toLocaleString('pt-BR', { weekday: 'short' });
            const isDisabled = nomeDia === 'dom.' || nomeDia === 'seg.';
            dias.push({
                dia: nomeDia,
                data: data.getDate(),
                fullDate: data.toISOString().split('T')[0], 
                disabled: isDisabled
            });
        }
        return dias;
    };

    const obterMesAno = () => {
        const hoje = new Date();
        hoje.setDate(hoje.getDate() + indiceInicioDia);
        return hoje.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    };

    const manejarSemanaAnterior = () => {
        if (indiceInicioDia > 0) {
            setAnimando(true);
            setTimeout(() => {
                setIndiceInicioDia(indiceInicioDia - 7);
                setAnimando(false);
            }, 300);
        }
    };

    const manejarProximaSemana = () => {
        setAnimando(true);
        setTimeout(() => {
            setIndiceInicioDia(indiceInicioDia + 7);
            setAnimando(false);
        }, 300);
    };

    const manejarClickDia = (index) => {
        setIndiceDiaSelecionado(index);
    };

    const manejarClickPeriodo = (periodo) => {
        setPeriodoSelecionado(periodo);
        if (periodo === 'manha') {
            setOffsetHora(0);
        } else if (periodo === 'tarde') {
            setOffsetHora(6);
        } else if (periodo === 'noite') {
            setOffsetHora(16);
        }
    };

    const obterHorasExibidas = () => {
        const horas = obterHoras();
        const startIndex = offsetHora;
        return horas.slice(startIndex, startIndex + horasPorConjunto);
    };

    const manejarHorasAnteriores = () => {
        setOffsetHora(prev => Math.max(prev - horasPorConjunto, 0));
    };

    const manejarProximasHoras = () => {
        setOffsetHora(prev => {
            const novoOffset = prev + horasPorConjunto;
            return novoOffset < obterHoras().length ? novoOffset : prev;
        });
    };

    
    const finalizarAgendamento = async () => {
        const clienteId = localStorage.getItem('USUARIO_ID')
        const agendamento = {
            cliente_id: clienteId,
            trabalho: servicosSelecionados.map(s => s.trabalho).join(', '),
            valor: servicosSelecionados.reduce((total, s) => total + parseFloat(s.valor.replace(',', '.')), 0).toFixed(2),
            dia: obterDias()[indiceDiaSelecionado]?.fullDate, 
            hora: horaSelecionada,
        };
    
        console.log('Agendamento:', agendamento); 
    
        try {
            const url = `http://localhost:5001/agendamentos`;
            let resp = await axios.post(url, agendamento);
            
            console.log('Resposta da API:', resp); 
    
            if (resp.status === 201) {
                alert('Agendamento realizado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao agendar:', error);
        }
    };

    const Linha = () => <div className="linha"></div>;

    return (
        <div className='divmae'>
            <div className='ser'>
            <div className='imgsev'>
                <img src={servicos} alt="" />
                <h1>serviços</h1>
            </div>
            <div className='sevicos'>
                <div className='voltar'>
                    <Link to='/inicio'>
                        <img src={seta2} alt="" />
                    </Link>
                    <h1>voltar</h1>
                </div>
                <Linha />
                {servicosList.map((item, index) => (
                    <Servico
                        key={index}
                        trabalho={item.trabalho}
                        valor={item.valor}
                        onAgendar={() => agendar(item.trabalho, item.valor)}
                    />
                ))}
            </div>
            </div>

            {modalAberto && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img className='x' src={x} alt="" onClick={fecharModal} />
                        <h1>{obterMesAno()}</h1>
                        <div className={`dias ${animando ? 'animating' : ''}`}>
                            <a className='setaE' onClick={manejarSemanaAnterior}>
                                <img className='imgE' src={seta} alt="Seta para esquerda" />
                            </a>
                            {obterDias().map((dia, index) => (
                                <div
                                    className={`dia ${indiceDiaSelecionado === index ? 'selected' : ''} ${dia.disabled ? 'disabled' : ''}`}
                                    key={index}
                                    onClick={() => !dia.disabled && manejarClickDia(index)}
                                >
                                    <p className='d1'>{dia.dia}</p>
                                    <p className='d2'>{dia.data}</p>
                                </div>
                            ))}
                            <a className='setaD' onClick={manejarProximaSemana}>
                                <img className='imgD' src={seta} alt="Seta para direita" style={{ transform: 'rotate(180deg)' }} />
                            </a>
                        </div>
                        <div className='linha-modal'></div>
                        <div className='horario-marcado'>
                            <div className='periodo'>
                                <div
                                    className={`dia ${periodoSelecionado === 'manha' ? 'selected' : ''}`}
                                    onClick={() => manejarClickPeriodo('manha')}
                                >
                                    <p>Manhã</p>
                                </div>
                                <div
                                    className={`tarde ${periodoSelecionado === 'tarde' ? 'selected' : ''}`}
                                    onClick={() => manejarClickPeriodo('tarde')}
                                >
                                    <p>Tarde</p>
                                </div>
                                <div
                                    className={`noite ${periodoSelecionado === 'noite' ? 'selected' : ''}`}
                                    onClick={() => manejarClickPeriodo('noite')}
                                >
                                    <p>Noite</p>
                                </div>
                            </div>
                            <div className='horas'>
                                <a className='setaE' onClick={manejarHorasAnteriores}>
                                    <img className='imgE' src={seta} alt="Seta para esquerda" />
                                </a>
                                <div className='tempo'>
                                    {obterHorasExibidas().map((hora, index) => (
                                        <div
                                            key={index}
                                            className={`tem ${horaSelecionada === hora ? 'selected' : ''}`}
                                            onClick={() => setHoraSelecionada(hora)}
                                        >
                                            <p>{hora}</p>
                                        </div>
                                    ))}
                                </div>
                                <a className='setaD' onClick={manejarProximasHoras}>
                                    <img className='imgD' src={seta} alt="Seta para direita" style={{ transform: 'rotate(180deg)' }} />
                                </a>
                            </div>
                        </div>
                        <div className='in'>
                            {servicosSelecionados.map((servico, index) => (
                                <div key={index} className='informacoes'>
                                    <div className='detalhes'>
                                        <div className='E'>
                                            <p className='trabalho'>{servico.trabalho}</p>
                                        </div>
                                        <div className='D'>
                                            <p className='valor'>R$ {servico.valor}</p>
                                            {horaSelecionada && <p className='hora'>Horário: {horaSelecionada}</p>}
                                        </div>
                                    </div>
                                    <div className='separacao'></div>
                                    <p className='remover' onClick={() => removerServico(servico)}>remover serviço</p>
                                </div>
                            ))}
                        </div>
                        <div className='adicionar-serviço'>
                            <p className='adicionar' onClick={abrirModalAdicionarServico}>+ adicionar outro serviço</p>
                        </div>
                        <div className='separacao'></div>
                        <div className='finalizar'>
                            <div className='total'>
                                <p className='p1'>Total :</p>
                                <p className='p2'>R$ {servicosSelecionados.reduce((total, s) => total + parseFloat(s.valor.replace(',', '.')), 0).toFixed(2)}</p>
                            </div>
                            <button onClick={finalizarAgendamento}>Agendar</button>
                        </div>
                    </div>
                </div>
            )}
            {modalAdicionarServicoAberto && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h1 className='h1'>Adicionar Novo Serviço</h1>
                        <div className='linha2'></div>
                        <p className='p'>Selecione um serviço:</p>
                        {servicosList.map((item, index) => (
                            <div className='adi-sev' key={index}>
                                <div className='check'>
                                    <input type='checkbox' />
                                    <p>{item.trabalho}</p>
                                </div>
                                <div className='valor'>
                                    <p>{item.valor}</p>
                                </div>
                            </div>
                        ))}
                        <div className='b'>
                            <button className="confirm-button" onClick={confirmarSelecao}>Confirmar Seleção</button>
                        </div>
                        <img className='x' src={x} alt="Fechar" onClick={fecharModalAdicionarServico} />
                    </div>
                </div>
            )}
        </div>
    );
}