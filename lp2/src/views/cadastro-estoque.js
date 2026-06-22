import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroEstoque() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/estoques`;

  const [id, setId] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const [produtoId, setProdutoId] = useState('');
  const [produtos, setProdutos] = useState([]);

  const [setDados] = useState(null);

  function inicializar() {
    setId('');
    setQuantidade('');
    setProdutoId('');
  }

  async function buscarProdutos() {
    try {
      const response = await axios.get(`${BASE_URL}/produtos`);
      setProdutos(response.data);
    } catch (error) {
      mensagemErro('Erro ao carregar produtos.');
    }
  }

  async function salvar() {
    const data = {
      id,
      quantidade,
      produto: {
        id: produtoId,
      },
    };

    if (idParam == null) {
      await axios
        .post(baseURL, data)
        .then(() => {
          mensagemSucesso('Estoque cadastrado com sucesso!');
          navigate('/listagem-estoque');
        })
        .catch((error) => {
          mensagemErro(error.response?.data || 'Erro ao cadastrar.');
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data)
        .then(() => {
          mensagemSucesso('Estoque alterado com sucesso!');
          navigate('/listagem-estoque');
        })
        .catch((error) => {
          mensagemErro(error.response?.data || 'Erro ao alterar.');
        });
    }
  }

  async function buscar() {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);

      const estoque = response.data;

      setDados(estoque);
      setId(estoque.id);
      setQuantidade(estoque.quantidade);

      if (estoque.produto) {
        setProdutoId(estoque.produto.id);
      }
    } catch (error) {
      mensagemErro('Erro ao carregar estoque.');
    }
  }

  useEffect(() => {
    buscarProdutos();

    if (idParam) {
      buscar();
    }
  }, []);

  return (
    <div className='container'>
      <Card title='Cadastro de Estoque'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Produto: *' htmlFor='inputProduto'>
                <select
                  type='text'
                  id='inputProduto'
                  className='form-control'
                  value={produtoId}
                  onChange={(e) => setProdutoId(e.target.value)}
                >
                  <option value=''>Selecione um produto</option>

                  {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                <input
                  type='number'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  {idParam ? 'Alterar' : 'Cadastrar'}
                </button>

                <button
                  onClick={() => {
                    inicializar();
                    navigate(-1);
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

export default CadastroEstoque;