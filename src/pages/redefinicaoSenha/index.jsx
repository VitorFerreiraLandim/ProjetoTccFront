import React, { useState } from 'react';
import './index.scss';
import { Link , useNavigate} from 'react-router-dom';
import emailIcon from '../../assets/images/email.webp';
import axios from 'axios';

export default function RedefinicaoSenha() {
    const [emailInput, setEmailInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
        setErrorMessage(''); 
        setSuccessMessage(''); 
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:5001/verificar-email2';
            const response = await axios.post(url, { email: emailInput });

            if (response.data.existe) {
                localStorage.setItem('emailRedefinicao', emailInput);
                localStorage.setItem('codigoEnviado', response.data.codigo);
                navigate('/codigoRedefinicao');
            } else {
                setErrorMessage('Email não encontrado. Verifique e tente novamente.');
            }
        } catch (error) {
            console.error(error); 
            setErrorMessage('Ocorreu um erro ao verificar o email.');
        }
    };

    return (
        <div className='div2'>
            <div className='login'>
                <div className='informacoes'>
                    <h1>Redefinição de Senha</h1>
                    <p>Insira seu email para redefinição de senha</p>
                    <form onSubmit={handleSubmit}>
                        <div className='input'>
                            <div className='inp1'>
                                <img src={emailIcon} alt="Ícone de Email" />
                                <input
                                    type="text"
                                    placeholder='E-mail'
                                    value={emailInput}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>
                        {errorMessage && <p className='error'>{errorMessage}</p>}
                        <div className='button'>
                            <button type='submit' className='b2'>Enviar</button>
                        </div>
                    </form>
                </div>
                <div className='bem-vinda'>
                    <h1 className='h1'>Esqueceu sua senha?</h1>
                </div>
            </div>
        </div>
    );
}
