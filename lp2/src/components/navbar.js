import React, { useState, useEffect } from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import api from '../config/axios';

function Navbar(props) {
  // 1. A variável que usamos para saber se o usuário está logado
  const isLogado = localStorage.getItem('meu_token') !== null;
  
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Só tenta buscar as categorias se o usuário estiver logado, poupando requisições!
    if (isLogado) {
      api.get('/categorias') 
        .then((response) => {
          setCategorias(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar as categorias para a Navbar:", error);
        });
    }
  }, [isLogado]);

  const desconectar = () => {
    localStorage.removeItem('meu_token');
    window.location.href = '/login';
  };

  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          Sistema de Lanchonete
        </a>
        
        {/* Só mostra o botão do menu hambúrguer no celular se estiver logado */}
        {isLogado && (
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarResponsive'
            aria-controls='navbarResponsive'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        )}

        <div className='collapse navbar-collapse' id='navbarResponsive'>
          
          {/* 👇 2. A MÁGICA AQUI: O && garante que tudo abaixo só renderiza se logado! */}
          {isLogado && (
            <>
              <ul className='navbar-nav'>
                <NavbarItem render='true' href='/listagem-cliente' label='Cliente' />
              </ul>
              <ul className='navbar-nav'>
                <NavbarItem render='true' href='/listagem-gerente' label='Gerente' />
              </ul>
              <ul className='navbar-nav'>
                <NavbarItem render='true' href='/listagem-proprietario' label='Proprietario' />
              </ul>
              <ul className='navbar-nav'>
                <NavbarItem render='true' href='/listagem-estabelecimento' label='Estabelecimento' />
              </ul>
              <ul className='navbar-nav'>
                <NavbarItem render='true' href='/listagem-cupom' label='Cupom' />
              </ul>
              <ul className='navbar-nav'>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Produto
                  </DropdownToggle>
                  <DropdownMenu end>
                    {categorias.map((categoria) => (
                      <DropdownItem 
                        key={categoria.id} 
                        href={`/listagem-produto?categoria=${categoria.nome}`}
                      >
                        {categoria.nome}
                      </DropdownItem>
                    ))}
                    <DropdownItem divider />
                    <DropdownItem href='/listagem-produto'>
                      Todos
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </ul>
              <ul className='navbar-nav'>
                <NavbarItem render='true' href='/listagem-categoria' label='Categoria' />
              </ul>
            </>
          )} 
          {/* 👆 Fim do bloco protegido */}
          
        </div>
      </div>
      
      {/* Botão de Login / Desconectar sempre visível */}
      <ul className='navbar-nav' style={{ marginRight: '30px' }}>
        {isLogado ? (
          <li className="nav-item d-flex align-items-center">
            <button 
              onClick={desconectar} 
              className="btn btn-danger btn-sm" 
              style={{ cursor: 'pointer' }}
            >
              Desconectar
            </button>
          </li>
        ) : (
          <NavbarItem
            render='true'
            href='/login'
            label='Login'
          />
        )}
      </ul>
    </div>
  );
}

export default Navbar;