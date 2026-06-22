import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function Navbar(props) {
  // 👇 1. Verifica se existe um token salvo no navegador
  const isLogado = localStorage.getItem('meu_token') !== null;

  // 👇 2. Função para apagar o token e voltar para o login
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
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-cliente'
              label='Cliente'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-gerente'
              label='Gerente'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-proprietario'
              label='Proprietario'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-estabelecimento'
              label='Estabelecimento'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-cupom'
              label='Cupom'
            />
          </ul>
          <ul className='navbar-nav'>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Produto
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href='/listagem-produto?categoria=sobremesas'>
                  Sobremesas
                </DropdownItem>
                <DropdownItem href='/listagem-produto?categoria=bebidas'>
                  Bebidas
                </DropdownItem>
                <DropdownItem href='/listagem-produto?categoria=lanches'>
                  Lanches
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href='/listagem-produto'>
                  Todos
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-categoria'
              label='Categoria'
            />
          </ul>
        </div>
      </div>
      
      {/* 👇 3. Aqui acontece a mágica da troca de botões! */}
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