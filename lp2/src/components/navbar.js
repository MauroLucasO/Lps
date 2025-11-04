import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
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
            <NavbarItem
              render='true'
              href='/listagem-produto'
              label='Produto'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-estoque'
              label='Estoque'
            />
          </ul>
           <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-itemPedido'
              label='ItemPedido'
            />
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
    </div>
  );
}

export default Navbar;
