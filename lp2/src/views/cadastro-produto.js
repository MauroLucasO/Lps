import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CadastroProduto() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}-2/produtos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idCategoria, setIdCategoria] = useState(0);

  const [dados, setDados] = useState([]);
  const [dadosCategoria, setDadosCategoria] = useState(null);
  const [dadosProduto, setDadosProduto] = useState(null);

  const inicializar = () => {
    if (!idParam) {
      setId('');
      setNome('');
      setValor('');
      setDescricao('');
      setIdCategoria(0);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setValor(dados.valor);
      setDescricao(dados.descricao);
      setIdCategoria(dados.idCategoria);
    }
  };

  const salvar = async () => {
    let data = { id, nome, valor, descricao, idCategoria };
    data = JSON.stringify(data);

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Produto ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Produto ${nome} alterado com sucesso!`);
      }
      navigate(`/listagem-produto`);
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar produto');
    }
  };

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const d = response.data;
        setDados(d);
        setId(d.id);
        setNome(d.nome);
        setValor(d.valor);
        setDescricao(d.descricao);
        setIdCategoria(d.idCategoria);
      } catch (error) {
        mensagemErro('Erro ao buscar produto');
      }
    }
  }, [idParam, baseURL]);

  useEffect(() => {
    axios.get(`${BASE_URL}-2/categorias`).then((response) => {
      setDadosCategoria(response.data);
    });

    axios.get(`${BASE_URL}-2/produtos`).then((response) => {
      setDadosProduto(response.data);
    });
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  if (!dadosCategoria || !dadosProduto) return null;

  const categoriaSelecionada =
    dadosCategoria.find((c) => c.id === idCategoria) || null;

  const produtoSelecionado =
    dadosProduto.find((p) => p.nome === nome) || null;

  return (
    <div className='container'>
      <Card title='Cadastro de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome do Produto: *' htmlFor='comboNome'>
                <Autocomplete
                  id='comboNome'
                  options={dadosProduto}
                  value={produtoSelecionado}
                  getOptionLabel={(option) => option.nome}
                  onChange={(event, newValue) => {
                    setNome(newValue ? newValue.nome : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder='Selecione o produto...'
                      variant='outlined'
                      size='small'
                    />
                  )}
                />
              </FormGroup>

              <FormGroup label='Valor do Produto: *' htmlFor='inputValor'>
                <input
                  type='text'
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='valor'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Descrição do Produto: *' htmlFor='inputDescricao'>
                <input
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Categoria:' htmlFor='comboCategoria'>
                <Autocomplete
                  id='comboCategoria'
                  options={dadosCategoria}
                  value={categoriaSelecionada}
                  getOptionLabel={(option) => option.nome}
                  onChange={(event, newValue) => {
                    setIdCategoria(newValue ? newValue.id : 0);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder='Selecione...'
                      variant='outlined'
                      size='small'
                    />
                  )}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Cadastrar
                </button>

                <button
                  onClick={() => {
                    if (!nome && !valor && !descricao) {
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

export default CadastroProduto;
