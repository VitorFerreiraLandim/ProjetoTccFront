// NotFound.js
import './index.scss'
import erro from '../../assets/images/404.webp'

export default function PaginaNãoEncontrada() {
    return (
        <div className="not-found">
            <img src={erro} alt="" />
            <h1>Pagina não encontrada</h1>
            <p>O conteúdo que você solicitou não foi encontrada em nossos servidores.</p>
        </div>
    )
}


