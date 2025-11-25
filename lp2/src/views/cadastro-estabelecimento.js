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
    axios.get(baseURL).then((response) => {
      setDadosNome(response.data);
    });
  }, []);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCnpj('');
      setTelefone('');
      setCidade('');
      setLogradouro('');
      setPontoDeReferencia('');
    } else {
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
    let data = { id, nome, cnpj, telefone, cidade, logradouro, pontoDeReferencia };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso(`Estabelecimento ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-estabelecimento`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso(`Estabelecimento ${nome} alterado com sucesso!`);
          navigate(`/listagem-estabelecimento`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      const d = response.data;

      setDados(d);
      setId(d.id);
      setNome(d.nome);
      setCnpj(d.cnpj);
      setTelefone(d.telefone);
      setCidade(d.cidade);
      setLogradouro(d.logradouro);
      setPontoDeReferencia(d.pontoDeReferencia);
    });
  }

  useEffect(() => {
    if (idParam) {
      buscar();
    }
  }, [idParam]);

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
                  onChange={(event, newValue) => {
                    setNome(newValue ? newValue.nome : '');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      size='small'
                      placeholder='Selecione...'
                    />
                  )}
                />
              </FormGroup>

              <FormGroup label='CNPJ: *' htmlFor='inputCnpj'>
                <input
                  type='text'
                  id='inputCnpj'
                  value={cnpj}
                  className='form-control'
                  name='cnpj'
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type='text'
                  id='inputTelefone'
                  value={telefone}
                  className='form-control'
                  name='telefone'
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  name='cidade'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  name='logradouro'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Ponto de Referência: *' htmlFor='inputPontoDeReferencia'>
                <input
                  type='text'
                  id='inputPontoDeReferencia'
                  value={pontoDeReferencia}
                  className='form-control'
                  name='pontoDeReferencia'
                  onChange={(e) => setPontoDeReferencia(e.target.value)}
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
