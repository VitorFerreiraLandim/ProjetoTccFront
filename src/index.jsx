import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/inicial'
import LoginPage from './pages/login';
import RegisterPage from './pages/cadastro';
import RedefinicaoSenha from './pages/redefinicaoSenha';
import Servicos from './pages/serviços';
import CodigoDeRedefinição from './pages/codigoDeRefinicao';
import RedefinicaoNovaSenha from './pages/novaSenha';
import ConfigurarConta from './pages/configConta';
import AgendamentosCliente from './pages/agendamentoCliente';
import AgendamentosAdm from './pages/agendamentosAdm';
import PaginaNãoEncontrada from './pages/404';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/inicio' element={<HomePage />} />
          <Route path='/cadastro' element={<RegisterPage/>} />
          <Route path='/redefinicaoSenha' element={<RedefinicaoSenha/>} />
          <Route path='/servicos' element={<Servicos/>} />
          <Route path='/codigoRedefinicao' element={<CodigoDeRedefinição/>}/>
          <Route path='/novaSenha' element={<RedefinicaoNovaSenha/>}/>
          <Route path='/ConfigConta' element={<ConfigurarConta/>}/>
          <Route path='/AgendamentosCliente' element={<AgendamentosCliente/>}/>
          <Route path='/AgendamentosAdm' element={<AgendamentosAdm/>}/>
          <Route path='*' element={<PaginaNãoEncontrada/>}/> 
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
