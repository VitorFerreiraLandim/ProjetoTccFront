import './index.scss';
import img2 from '../../assets/images/img2.png';
import olho from '../../assets/images/olho2.png';
import olhofechado from '../../assets/images/olho.png';
import { Link } from 'react-router-dom';
import perfil from '../../assets/images/email.webp';
import { useState } from 'react';
import exclamacao from '../../assets/images/exclamation.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/axios';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagemErro, setMensagemErro] = useState('');


    const navigate = useNavigate()

    async function entrar() {
        const usuario = {
            "email": email,
            "senha": senha
        }


        const url = `/entrar/`
        let resp = await api.post(url, usuario)

        
        if (resp.data.erro != undefined) {
            setMensagemErro('E-mail ou senha incorretos. Verifique e tente novamente.');
            return;
        } else {
            localStorage.setItem('USUARIO', resp.data.token)
            localStorage.setItem('USUARIO_ID', resp.data.id);
            localStorage.setItem('NOME_USUARIO', resp.data.nome);
            localStorage.setItem('TELEFONE_USUARIO', resp.data.telefone);
            localStorage.setItem('IMAGEM_PERFIL', resp.data.imagem_perfil);
            navigate('/inicio')
        }

        
    }
    const limparMensagemErro = () => {
        setMensagemErro('');
    };

    return (
        <div className='div2'>
            <div className='login'>
                <div className='informaçoes'>
                    <h1>Login</h1>
                    <div className='inp'>
                        <div className='in1'>
                            <img className='img1' src={perfil} alt="" />
                            <input 
                            type="text" 
                            placeholder='E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onClick={limparMensagemErro}
                            />
                        </div>
                        <div className='in2'>
                            <img className='img1' src={img2} alt="" />
                            <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder='senha' 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            onClick={limparMensagemErro}
                            />
                            <img 
                                className='password' 
                                src={showPassword ? olho : olhofechado} 
                                alt="" 
                                onClick={() => setShowPassword(!showPassword)} 
                            />
                        </div>
                    </div> 
                    <Link to='/redefinicaoSenha' className='senha1'>esqueceu sua senha?</Link>   
                    {mensagemErro && <div className='error-message'><img src={exclamacao} alt="" />{mensagemErro}</div>} 
                    <div className='botao'> 
                        <Link to='/cadastro' className='b1'>cadastrar-se</Link>
                        <Link  className='b2' onClick={entrar}  >entrar</Link>
                    </div>
                </div>
                <div className='bem-vinda'>
                    <h1 className='h1'>Bem-Vinda!</h1>
                    <h1 className='h2'>Pronta para realçar sua beleza?</h1>
                </div>
            </div>
        </div>
    );
}
