import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import perfil from '../../assets/images/perfil2.webp';
import casa from '../../assets/images/casa.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ConfigurarConta() {
    const [modal, setModal] = useState(false);
    const [modalSucesso, setModalSucesso] = useState(false);
    const [novoNome, setNovoNome] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('USUARIO');

        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const deletarUsuario = async () => {
        let idUsuario = localStorage.getItem('USUARIO_ID');
        try {
            await axios.delete(`http://localhost:5001/usuario/${idUsuario}`);
            await axios.delete(`http://localhost:5001/agendamento/${idUsuario}`);
            await axios.delete(`http://localhost:5001/agendamento_adm/${idUsuario}`);
            localStorage.removeItem('USUARIO');
            localStorage.removeItem('NOME_USUARIO');
            localStorage.removeItem('USUARIO_ID');
            localStorage.removeItem('TELEFONE_USUARIO');
            navigate('/');
        } catch (error) {
            console.error('Erro ao deletar usuario:', error);
        } 
    };

    const renomearNome = async () => {
        let idUsuario = localStorage.getItem('USUARIO_ID');
        try {
            await axios.put(`http://localhost:5001/usuarios/${idUsuario}`, { nome: novoNome });
            localStorage.setItem('NOME_USUARIO', novoNome); 
            setModalSucesso(true);
        } catch (error) {
            console.error('Erro ao renomear nome:', error);
        }
    };

    return (
        <div className='config'>
            <header className='header'>
                <Link to='/inicio'>
                    <img src={casa} alt="Início" />
                </Link>
            </header>
            <hr className='linha' />
            <h1 className='h1'>Configurações de Conta</h1>

            <section className='foto-cliente'>
                <div className='texto-foto'>
                    <div className='text'>
                        <h1 className='alterar'>Alterar foto do perfil</h1>
                        <p className='carregar-text'>Carregue uma nova foto para alterar sua foto de perfil.</p>
                    </div>
                    <img className='icone' src={perfil} alt="Perfil" />
                </div>
                <div className='botoes'>
                    <div className='classB'>
                        <button type="button" className='b1'>Remover foto</button>
                        <button type="button" className='b2'>Carregar foto</button>
                    </div>
                </div>
            </section>

            <section className='troca-nome'>
                <div className='exibição'> 
                    <h1>Trocar nome de exibição</h1>
                    <input 
                        type="text" 
                        placeholder='Nome de exibição' 
                        value={novoNome} 
                        onChange={(e) => setNovoNome(e.target.value)} 
                    />
                </div>
                <div className='botao-salvar'>
                    <button type="button" className='salvar' onClick={renomearNome}>Salvar</button>
                </div>
            </section>

            <section className='box-excluir'>
                <div className='exibição'> 
                    <h1>Excluir conta</h1>
                    <p>A exclusão da sua conta é permanente e não pode ser desfeita.</p>
                </div>
                <div className='botao-excluir'>
                    <p>Esta ação é irreversível</p>
                    <button type="button" className='excluir' onClick={() => setModal(true)}>Excluir</button>
                </div>
            </section>
            {modal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Tem certeza que você deseja excluir sua conta?</p>
                        <div className="botoes-modal">
                            <button type="button" className='cancelar' onClick={() => setModal(false)}>Cancelar</button>
                            <button type="button" className='confirmar' onClick={deletarUsuario}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
            {modalSucesso && (
                <div className="modal-overlay-sucesso">
                    <div className="modal-content-sucesso">
                    <p>Nome de exibição alterado com sucesso!</p>
                    <button onClick={() => setModalSucesso(false)}>fechar</button>
                    </div>
                </div>
            )}
                
            
        </div>
    );
}
