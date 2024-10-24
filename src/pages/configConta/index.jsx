import './index.scss';
import { Link } from 'react-router-dom';
import perfil from '../../assets/images/perfil2.webp';
import casa from '../../assets/images/casa.png';

export default function ConfigurarConta() {
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
                    <input type="text" placeholder='Nome de exibição' />
                </div>
                <div className='botao-salvar'>
                    <button type="button" className='salvar'>Salvar</button>
                </div>
            </section>

            <section className='box-excluir'>
                <div className='exibição'> 
                        <h1>Excluir conta</h1>
                        <p>A exclusão da sua conta é permanente e não pode ser desfeita.</p>
                    </div>
                    <div className='botao-excluir'>
                        <p >Esta ação é irreversível</p>
                        <button type="button" className='excluir'>Excluir</button>
                    </div>
            </section>
        </div>
    );
}
