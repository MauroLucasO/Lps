import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroItemPedido() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}-2/itempedido`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [valorTotal, setValorTotal] = useState(0);

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setQuantidade(1);
      setValorTotal(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setQuantidade(dados.quantidade);
      setValorTotal(dados.valorTotal);
    }
  }

  async function salvar() {
    let data = { id, nome, quantidade, valorTotal };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Item de pedido ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-itemPedido`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Item de pedido ${nome} alterado com sucesso!`);
          navigate(`/listagem-itemPedido`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
      setId(dados.id);
      setNome(dados.nome);
      setQuantidade(dados.quantidade);
      setValorTotal(dados.valorTotal);
  }

  useEffect(() => {
    buscar();
    // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Item de Pedido'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Item: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  name='quantidade'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Valor Total: *' htmlFor='inputValorTotal'>
                <input
                  type='text'
                  id='inputValorTotal'
                  value={valorTotal}
                  className='form-control'
                  name='valorTotal'
                  onChange={(e) => setValorTotal(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Cadastrar
                </button>

                <button
                  onClick={() => {
                    if (!nome && !quantidade && !valorTotal) {
                      navigate(-1);
                    } else {
                      const confirmar = window.confirm(
                        'Deseja realmente cancelar e sair da página? As alterações não salvas serão perdidas.'
                      );
                      if (confirmar) {
                        navigate(-1);
                      } else {
                        inicializar();
                      }
                    }
                  }}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroItemPedido;
