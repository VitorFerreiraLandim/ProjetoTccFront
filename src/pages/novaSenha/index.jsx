import './index.scss';
import img2 from '../../assets/images/img2.png';
import olho from '../../assets/images/olho2.png';
import olhofechado from '../../assets/images/olho.png';
import check from '../../assets/images/check.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/axios';
import exclamacao from '../../assets/images/exclamation.png';

export default function RedefinicaoNovaSenha() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            setErrorMessage('As senhas não coincidem.');
            return;
        }

        try {
            const email = localStorage.getItem('emailRedefinicao'); 
            const response = await api.post('/redefinir-senha', { novaSenha, email });

            if (response.data.success) {
                setModalAberto(true) 
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Ocorreu um erro ao redefinir a senha.');
        }
    };

    const voltarLogin = () => {
        navigate('/login')
    };

    return (
        <div className='div2'>
            <div className='login'>
                <div className='informaçoes'>
                    <h1>Redefina sua senha</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='inp'>
                            <div className='in1'>
                                <img className='img' src={img2} alt="" />
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder='Insira sua nova senha' 
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />
                                <img 
                                    className='password' 
                                    src={showPassword ? olho : olhofechado} 
                                    alt="" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                />
                            </div>
                            <div className='in2'>
                                <img className='img1' src={img2} alt="" />
                                <input 
                                    type={showPassword2 ? 'text' : 'password'} 
                                    placeholder='Confirmar a nova senha' 
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                                <img 
                                    className='password' 
                                    src={showPassword2 ? olho : olhofechado} 
                                    alt="" 
                                    onClick={() => setShowPassword2(!showPassword2)} 
                                />
                            </div>
                        </div>   
                        {errorMessage && <p className='error'><img src={exclamacao} alt="" />{errorMessage}</p>}
                        <div className='botao'> 
                            <button className='b2'>Redefinir</button>
                        </div>
                    </form>
                </div>
                <div className='bem-vinda'>
                    <h1 className='h1'>Bem-Vinda!</h1>
                    <h1 className='h2'>Pronta para realçar sua beleza?</h1>
                </div>
            </div>
            {modalAberto && (
                <div className="modal">
                    <div className="modal-content">
                        <img src={check} alt="" />
                        <h2>PARABÉNS!</h2>
                        <p>Senha redefinida com sucesso!</p>
                        <button onClick={voltarLogin}>ir para login</button>
                    </div>
                </div>
            )}
        </div>
    );
}
