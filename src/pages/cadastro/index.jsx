import './index.scss';
import img2 from '../../assets/images/img2.png';
import perfil from '../../assets/images/perfil.png';
import telefone1 from '../../assets/images/telefone.png';
import email1 from '../../assets/images/email.webp';
import InputMask from 'react-input-mask';
import olho from '../../assets/images/olho2.png';
import olhofechado from '../../assets/images/olho.png';
import exclamacao from '../../assets/images/exclamation.png';
import check from '../../assets/images/check.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../service/axios';

// Spinner Component
const Spinner = () => (
    <div className="spinner-overlay">
        <div className="spinner"></div>
    </div>
);

export default function RegisterPage() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemErroSenha, setMensagemErroSenha] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [carregando, setCarregando] = useState(false); 


    async function verificarTelefone(numero) {
        const numeroComCodigo = numero.startsWith('+') ? numero : `+55${numero.replace(/\D/g, '')}`;
        const url = `https://api.veriphone.io/v2/verify?phone=%2B${numeroComCodigo}&key=92738FD110F8419E8507FB7682EFA868`;

        try {
            const response = await axios.get(url);
            console.log('Resposta da API de telefone:', response.data);
            return response.data.phone_valid; 
        } catch (error) {
            console.error('Erro ao verificar telefone:', error);
            return false;
        }
    }

    async function verificarEmail(email) {
        const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=5fae6172b8d6f7789a678d33f224a42667e52aaa`;
    
        try {
            const response = await axios.get(url);
            console.log('Resposta da API de email:', response.data);
            return response.data.data.status === "valid"; 
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }
    
    async function cadastrar() {
        setCarregando(true); 
        if (senha !== confirmSenha) {
            setCarregando(false);
            setMensagemErroSenha('As senhas não coincidem!');
            return;
        }

        const telefoneValido = await verificarTelefone(telefone);
        const emailValido = await verificarEmail(email);

        if (!telefoneValido) {
            setCarregando(false);
            setMensagemErro('Número de telefone inválido. Verifique e tente novamente.');
            
            return;
        }

        if (!emailValido) {
            setCarregando(false);
            setMensagemErro('E-mail não é válido. Verifique e tente novamente.');
            
            return;
        }

        setMensagemErro('');
        

        let userData = {
            "nome": nome,
            "telefone": telefone,
            "email": email,
            "senha": senha,
        };

        const url = '/cadastro/';
        try {
            let resp = await api.post(url, userData);
            setMensagemSucesso('Cadastro concluído. Id: ' + resp.data.novoId);
            setCarregando(false);
            setModalAberto(true);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            if (error.response && error.response.data.erro) {
                setCarregando(false);
                setMensagemErro(`Email ou telefone já cadastrados.`); 
            } else {
                setCarregando(false);
                setMensagemErro('Erro ao realizar cadastro. Tente novamente.');
            }
        } 
           
        
    }
    
    const limparMensagemErro = () => {
        setMensagemErro('');
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    return (
        <div className='div3'>
            {carregando && <Spinner />}
            <div className='login'>
                <div className='informaçoes'>
                    <h1> Cadastre-se</h1>
                    <div className='inp'>
                        <div className='in1'>
                            <img src={perfil} alt="" />
                            <input 
                                type="text" 
                                placeholder='Nome completo'
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                onClick={limparMensagemErro}
                            />
                        </div>
                        <div className='in2'>
                            <img src={telefone1} alt="" />
                            <InputMask 
                                mask="(99) 99999-9999" 
                                placeholder='Telefone' 
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                                onClick={limparMensagemErro}
                            >
                                {(inputProps) => <input {...inputProps} />} 
                            </InputMask>
                        </div>
                        <div className='in3'>
                            <img src={email1} alt="" />
                            <input 
                                type="text"
                                placeholder='E-mail'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onClick={limparMensagemErro}
                            />
                        </div>
                        
                        <div className='in4'>
                            <img src={img2} alt="" />
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='senha' 
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                onClick={limparMensagemErro}
                            />
                            <img 
                                className='password' 
                                src={showPassword ? olho : olhofechado} 
                                alt="" 
                                onClick={() => setShowPassword(!showPassword)} 
                            />
                        </div>
                        <div className='in4'>
                            <img src={img2} alt="" />
                            <input 
                                type={showpassword ? 'text' : 'password'}
                                placeholder='Confirmar senha'
                                value={confirmSenha}
                                onChange={e => setConfirmSenha(e.target.value)}
                                onClick={limparMensagemErro}
                            />
                            <img 
                                className='password' 
                                src={showpassword ? olho : olhofechado} 
                                alt="" 
                                onClick={() => setShowpassword(!showpassword)} 
                            />
                        </div>
                        {mensagemErro && <div className='error-message'><img src={exclamacao} alt="" />{mensagemErro}</div>}
                        {mensagemErroSenha && <div className='error-message'><img src={exclamacao} alt="" />{mensagemErroSenha}</div>}
                    </div>    
                    <div className='botao'> 
                        <button className='b1' onClick={cadastrar}>cadastrar</button>
                        <Link to='/login' className='b2'>voltar</Link> 
                    </div>
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
                        <p>Cadastro realizado com sucesso!</p>
                        <button onClick={fecharModal}>fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
