import React, { useState, useEffect } from 'react';
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

function CadastroEstabelecimento() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}-1/estabelecimento`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');       
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [pontoDeReferencia, setPontoDeReferencia] = useState('');

  const [dados, setDados] = useState([]);
  const [dadosNome, setDadosNome] = useState(null);

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        setDadosNome(response.data);
      })
      .catch((error) => {
        mensagemErro("Erro ao carregar estabelecimentos.");
        console.error(error);
      });
  }, [baseURL]);

  function inicializar() {
    if (!idParam) {
      setId('');
      setNome('');
      setCnpj('');
      setTelefone('');
      setCidade('');
      setLogradouro('');
      setPontoDeReferencia('');
    } else if (dados) {
      setId(dados.id);
      setNome(dados.nome);
      setCnpj(dados.cnpj);
      setTelefone(dados.telefone);
      setCidade(dados.cidade);
      setLogradouro(dados.logradouro);
      setPontoDeReferencia(dados.pontoDeReferencia);
    }
  }

  async function salvar() {
    const data = JSON.stringify({ id, nome, cnpj, telefone, cidade, logradouro, pontoDeReferencia });

    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Estabelecimento ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Estabelecimento ${nome} alterado com sucesso!`);
      }
      navigate(`/listagem-estabelecimento`);
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar estabelecimento.");
    }
  }

  useEffect(() => {
    async function buscar() {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const d = response.data;

        setDados(d);
        setId(d.id);
        setNome(d.nome);
        setCnpj(d.cnpj);
        setTelefone(d.telefone);
        setCidade(d.cidade);
        setLogradouro(d.logradouro);
        setPontoDeReferencia(d.pontoDeReferencia);
      } catch (error) {
        mensagemErro("Erro ao buscar estabelecimento.");
        console.error(error);
      }
    }

    if (idParam) {
      buscar();
    }
  }, [idParam, baseURL]);

  if (!dadosNome) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Estabelecimento'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome do Estabelecimento: *' htmlFor='comboNome'>
                <Autocomplete
                  id='comboNome'
                  options={dadosNome}
                  value={dadosNome.find((d) => d.nome === nome) || null}
                  getOptionLabel={(option) => option.nome}
                  onChange={(event, newValue) => setNome(newValue ? newValue.nome : '')}
                  renderInput={(params) => (
                    <TextField {...params} 
                    variant='outlined' 
                    size='small' 
                    placeholder='Selecione...' />
                  )}
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

              <FormGroup label='Cidade: *' htmlFor='comboCidade'>
                <Autocomplete
                  id='comboCidade'
                  options={dadosNome}
                  value={dadosNome.find((d) => d.cidade === cidade) || null}
                  getOptionLabel={(option) => option.cidade || ''}
                  onChange={(event, newValue) => setCidade(newValue ? newValue.cidade : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      size='small'
                      placeholder='Selecione a cidade...'
                    />
                  )}
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

              <FormGroup label='Ponto de Referência: *' htmlFor='inputPontoDeReferencia'>
                <input
                  type='text'
                  id='inputPontoDeReferencia'
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
                  onClick={() => {
                    if (!nome && !cnpj && !telefone && !cidade && !logradouro && !pontoDeReferencia) {
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

export default CadastroEstabelecimento;
