import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroEstabelecimento() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/estabelecimentos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [pontoDeReferencia, setPontoDeReferencia] = useState('');

  useEffect(() => {
    if (idParam) {
      async function buscar() {
        try {
          const response = await axios.get(`${baseURL}/${idParam}`);
          const d = response.data;

          setId(d.id);
          setNome(d.nome);
          setCnpj(d.cnpj);
          setTelefone(d.telefone);
          setCidade(d.cidade);
          setLogradouro(d.logradouro);
          setPontoDeReferencia(d.pontoDeReferencia);
        } catch (error) {
          mensagemErro('Erro ao buscar estabelecimento.');
          console.error(error);
        }
      }

      buscar();
    }
  }, [idParam]);

  async function salvar() {
    const data = {
      id,
      nome,
      cnpj,
      telefone,
      cidade,
      logradouro,
      pontoDeReferencia
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data);
        mensagemSucesso(`Estabelecimento ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data);
        mensagemSucesso(`Estabelecimento ${nome} alterado com sucesso!`);
      }

      navigate('/listagem-estabelecimento');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar estabelecimento.');
    }
  }

  return (
    <div className='container'>
      <Card title='Cadastro de Estabelecimento'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome do Estabelecimento: *' htmlFor='inputNome'>
                <TextField
                  id='inputNome'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </FormGroup>

              <FormGroup label='CNPJ: *' htmlFor='inputCnpj'>
                <input
                  type='text'
                  id='inputCnpj'
                  value={cnpj}
                  className='form-control'
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type='text'
                  id='inputTelefone'
                  value={telefone}
                  className='form-control'
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Ponto de Referência: *' htmlFor='inputPonto'>
                <input
                  type='text'
                  id='inputPonto'
                  value={pontoDeReferencia}
                  className='form-control'
                  onChange={(e) => setPontoDeReferencia(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Cadastrar
                </button>

                <button
                  onClick={() => navigate(-1)}
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

export default CadastroEstabelecimento;