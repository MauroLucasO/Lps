import React from 'react';

import ListagemCliente from './views/listagem-cliente';
import ListagemGerente from './views/listagem-gerente';
import ListagemProprietario from './views/listagem-proprietario';
import ListagemEstabelecimento from './views/listagem-estabelecimento';
import ListagemCupom from './views/listagem-cupom';
import ListagemProduto from './views/listagem-produto';
import ListagemEstoque from './views/listagem-estoque';
import ListagemItemPedido from './views/listagem-itemPedido';
import ListagemCategoria from './views/listagem-categoria';

import CadastroCliente from './views/cadastro-cliente';
import CadastroGerente from './views/cadastro-gerente';
import CadastroProprietario from './views/cadastro-proprietario';
import CadastroEstabelecimento from './views/cadastro-estabelecimento';
import CadastroCupom from './views/cadastro-cupom';
import CadastroCategoria from './views/cadastro-categoria';
import CadastroItemPedido from './views/cadastro-itemPedido';
import CadastroEstoque from './views/cadastro-estoque';
import CadastroProduto from './views/cadastro-produto';

import Login from './views/login'

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} 
        />
         <Route
          path='/cadastro-cliente/:idParam?'
          element={<CadastroCliente />}
        />
    
        <Route
          path='/cadastro-gerente/:idParam?'
          element={<CadastroGerente />}
        />
        
         <Route
          path='/cadastro-proprietario/:idParam?'
          element={<CadastroProprietario />}
        />

        <Route
          path='/cadastro-estabelecimento/:idParam?'
          element={<CadastroEstabelecimento />}
        />

        <Route
          path='/cadastro-cupom/:idParam?'
          element={<CadastroCupom />}
        />

         <Route
          path='/cadastro-categoria/:idParam?'
          element={<CadastroCategoria />}
        />

        <Route
          path='/cadastro-itemPedido/:idParam?'
          element={<CadastroItemPedido />}
        />

        <Route
          path='/cadastro-estoque/'
          element={<CadastroEstoque/>}
        />

        <Route
          path='/cadastro-produto/'
          element={<CadastroProduto/>}
        />

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
        <Route
          path='/listagem-produto/'
          element={<ListagemProduto/>}
        />
        <Route
          path='/listagem-estoque/'
          element={<ListagemEstoque/>}
        />
        <Route
          path='/listagem-itemPedido/'
          element={<ListagemItemPedido/>}
        />
        <Route
          path='/listagem-categoria/'
          element={<ListagemCategoria/>}
        />
        </Routes>
        
    </BrowserRouter>
  );
}

export default Rotas;
