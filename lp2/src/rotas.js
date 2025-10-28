import React from 'react';

import ListagemCliente from './views/listagem-cliente';
import ListagemGerente from './views/listagem-gerente';
import ListagemProprietario from './views/listagem-proprietario';
import ListagemEstabelecimento from './views/listagem-estabelecimento';
import ListagemCupom from './views/listagem-cupom';

import Login from './views/login'

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/*
        <Route
          path='/cadastro-cliente/:idParam?'
          element={<CadastroCliente />}
        />
        <Route
          path='/cadastro-cliente/:idParam?'
          element={<CadastroGerente />}
        />
        <Route
          path='/cadastro-cliente/:idParam?'
          element={<CadastroProprietario />}
        />
        */}
      
        <Route
          path='/listagem-cliente/'
          element={<ListagemCliente/>}
        />
        <Route
          path='/listagem-gerente/'
          element={<ListagemGerente/>}
        />
        <Route
          path='/listagem-proprietario/'
          element={<ListagemProprietario/>}
        />
        <Route
          path='/listagem-estabelecimento/'
          element={<ListagemEstabelecimento/>}
        />
         <Route
          path='/listagem-cupom/'
          element={<ListagemCupom/>}
        />
        </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
