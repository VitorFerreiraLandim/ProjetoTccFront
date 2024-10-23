import './index.scss'
import { Link } from 'react-router-dom'
import perfil from '../../assets/images/perfil2.webp'
import casa from '../../assets/images/casa.png'

export default function ConfigurarConta(){
    return(
        <div className='config'>
            <div className='header'>
                <Link to='/inicio'><img src={casa} alt="" /></Link>
            </div>
            <div className='linha'></div>
            <h1 className='h1'>Configurações de Conta</h1>

            {/* Foto */}
            <div className='foto-cliente'>
                <div className='texto-foto'>
                    <div className='text'>
                        <h1 className='alterar'>Alterar foto do perfil</h1> 
                        <p className='carregar-text'>Carregue uma nova foto para alterar sua foto de perfil.</p>
                    </div>
                    <img className='icone' src={perfil} alt="" />
                    
                </div>
                <div className='botoes'>
                    <div className='classB'>
                    <button className='b1'>Remover foto</button>
                    <button className='b2'>Carregar foto</button>
                    </div>
                </div>
            </div>

            {/* Troca de Nome */}
            <div className='troca-nome '>
                <div className='nome-troca'>
                    <h1>Trocar nome de exibição</h1>
                    <input type="text"  placeholder='Nome de exibição'/>
                </div>

                <div className='botao-salvar'>
                    <button className='salvar'>Salvar</button>
                </div>

            </div>


            {/* excluir */}
            
            <div className='box-excluir'>
                

            </div>





        </div>
    )
}