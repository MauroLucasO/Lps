import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroCupom() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}-1/cupons`;

  const [id, setId] = useState('');
  const [desconto, setDesconto] = useState('');
  const [duracao, setDuracao] = useState('');
  const [nome, setNome] = useState('');
  const [estabelecimento, setEstabelecimento] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDesconto('');
      setDuracao('');
      setNome('');
      setEstabelecimento('');
    } else {
      setId(dados.id);
      setDesconto(dados.desconto);
      setDuracao(dados.duracao);
      setNome(dados.nome);
      setEstabelecimento(dados.estabelecimento);
    }
  }

  async function salvar() {
    let data = { id, desconto, duracao, nome, estabelecimento };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, { headers: { 'Content-Type': 'application/json' } })
        .then(function () {
          mensagemSucesso(`Cupom ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-cupom`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro ao cadastrar cupom');
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso(`Cupom ${nome} alterado com sucesso!`);
          navigate(`/listagem-cupom`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || 'Erro ao atualizar cupom');
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setDesconto(dados.desconto);
      setDuracao(dados.duracao);
      setNome(dados.nome);
      setEstabelecimento(dados.estabelecimento);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Cupom'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Desconto: *' htmlFor='inputDesconto'>
                <input
                  type='text'
                  id='inputDesconto'
                  value={desconto}
                  className='form-control'
                  name='desconto'
                  onChange={(e) => setDesconto(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Duração: *' htmlFor='inputDuracao'>
                <input
                  type='text'
                  id='inputDuracao'
                  value={duracao}
                  className='form-control'
                  name='duracao'
                  onChange={(e) => setDuracao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Estabelecimento: *' htmlFor='inputEstabelecimento'>
                <input
                  type='text'
                  id='inputEstabelecimento'
                  value={estabelecimento}
                  className='form-control'
                  name='estabelecimento'
                  onChange={(e) => setEstabelecimento(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} 
                type='button' 
                className='btn btn-success'
                >
                  Cadastrar
                </button>

                <button
                  onClick={() => {
                    if (!nome && !desconto && !duracao && !estabelecimento) {
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

export default CadastroCupom;
