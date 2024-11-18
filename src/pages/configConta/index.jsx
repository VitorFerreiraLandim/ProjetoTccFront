import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import perfilPadrao from '../../assets/images/perfil2.webp'; 
import casa from '../../assets/images/casa.png';
import { useEffect, useState } from 'react';
import { api } from '../service/axios';

export default function ConfigurarConta() {
    const [modal, setModal] = useState(false);
    const [modalSucesso, setModalSucesso] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(perfilPadrao); 

    const navigate = useNavigate();

    useEffect(() => {
        const idUsuario = localStorage.getItem('USUARIO_ID');
        if (!idUsuario) {
            navigate('/login');
            return;
        }
    }, [navigate]);

    const deletarUsuario = async () => {
        const idUsuario = localStorage.getItem('USUARIO_ID');
        try {
            await api.delete(`/usuario/${idUsuario}`);
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    const renomearNome = async () => {
        const idUsuario = localStorage.getItem('USUARIO_ID');
        try {
            await api.put(`/usuarios/${idUsuario}`, { nome: novoNome });
            localStorage.setItem('NOME_USUARIO', novoNome); 
            setModalSucesso(true);
        } catch (error) {
            console.error('Erro ao renomear nome:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPerfil(URL.createObjectURL(file))
        }
        e.target.value = null;
    };
    
    const removerFoto = () => {
        setFotoPerfil(perfilPadrao); 
    };
    
    return (
        <div className='config'>
            <header className='header'>
                <Link to='/'><img src={casa} alt="Início" /></Link>
            </header>
            <hr className='linha' />
            <h1 className='h1'>Configurações de Conta</h1>

            <section className='foto-cliente'>
                <div className='texto-foto'>
                    <div className='text'>
                        <h1 className='alterar'>Alterar foto do perfil</h1>
                        <p className='carregar-text'>Carregue uma nova foto para alterar sua foto de perfil.</p>
                    </div>
                    <img className='icone' src={fotoPerfil} alt="Perfil" />
                </div>
                <div className='botoes'>
                    <button type="button" className='b1' onClick={removerFoto}>Remover foto</button>
                    <label className='b2'>
                        Carregar foto
                        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    </label>
                </div>

            </section>

            <section className='troca-nome'>
                <div className='exibição'> 
                    <h1>Trocar nome de exibição</h1>
                    <input 
                        type="text" 
                        placeholder="Nome de exibição (máximo 26 caracteres)" 
                        value={novoNome} 
                        maxLength={26} 
                        onChange={(e) => setNovoNome(e.target.value)} 
                    />
                    <p className='p' style={{ color: novoNome.length === 26 ? 'red' : 'gray' }}>
                        {novoNome.length}/26 caracteres
                    </p>
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
                        <button onClick={() => setModalSucesso(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
