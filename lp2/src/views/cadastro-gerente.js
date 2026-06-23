import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import api from '../config/axios';

function CadastroGerente() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `/gerentes`;
  const estabelecimentosURL = `/estabelecimentos`;

  const [id, setId] = useState('');
  const [estabelecimento_id, setEstabelecimento] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepeticao, setSenhaRepeticao] = useState('');

  const [dados, setDados] = useState([]);
  const [listaEstabelecimentos, setListaEstabelecimentos] = useState([]);
  const [estabelecimentoSelecionado, setEstabelecimentoSelecionado] = useState(null);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setEstabelecimento('');
      setNome('');
      setCpf('');
      setTelefone('');
      setCep('');
      setCidade ('');
      setEstado ('');
      setLogradouro ('');
      setEmail ('');
      setSenha('');
      setSenhaRepeticao('');
    } else {
      setId(dados.id);
      setEstabelecimento(dados.estabelecimento_id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setTelefone(dados.telefone);
      setCep(dados.cep);
      setCidade (dados.cidade);
      setEstado (dados.estado);
      setLogradouro (dados.logradouro);
      setEmail ('');
      setSenha('');
      setSenhaRepeticao('');
    }

    if (dados.id_estabelecimento) {
        setEstabelecimentoSelecionado(dados.id_estabelecimento);
      }
  }

  async function salvar() {
    const idDoEstabelecimento = estabelecimentoSelecionado && typeof estabelecimentoSelecionado === 'object'
    ? estabelecimentoSelecionado.id
    : estabelecimentoSelecionado;

    let data = { id, idEstabelecimento: idDoEstabelecimento, nome, cpf, telefone, cep, cidade, estado, logradouro, email, senha, senhaRepeticao };
    data = JSON.stringify(data);

    if (idParam == null) {
      await api
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Gerente ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-gerente`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await api
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Gerente ${nome} alterado com sucesso!`);
          navigate(`/listagem-gerente`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

async function buscar() {
    await api.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setTelefone(dados.telefone);
      setCep(dados.cep);
      setCidade (dados.cidade);
      setEstado (dados.estado);
      setLogradouro (dados.logradouro);
      setEmail (dados.email);
      setSenha('');
      setSenhaRepeticao('');

      if (dados.estabelecimento) {
        setEstabelecimentoSelecionado(dados.estabelecimento);
      }
  }

  useEffect(() => {

    api.get(estabelecimentosURL)
      .then((response) => {
        setListaEstabelecimentos(response.data);
      })
      .catch(() => mensagemErro("Erro ao carregar lista de estabelecimentos."));
      
    buscar();
    // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Gerente'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Estabelecimento: *' htmlFor='comboEstabelecimento'>
                <Autocomplete
                  id='comboEstabelecimento'
                  options={listaEstabelecimentos}
                  value={estabelecimentoSelecionado}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.estabelecimento_id || option.nome || ''}
                  onChange={(event, newValue) => setEstabelecimentoSelecionado(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      size='small'
                      placeholder='Selecione o estabelecimento...'
                    />
                  )}
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
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type='text'
                  maxLength='15'
                  id='inputTelefone'
                  value={telefone}
                  className='form-control'
                  name='telefone'
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CEP: *' htmlFor='inputCep'>
                <input
                  type='text'
                  maxLength='9'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  name='cep'
                  onChange={(e) => setCep(e.target.value)}
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
               <FormGroup label='Estado: *' htmlFor='inputEstado'>
                <input
                  type='text'
                  id='inputEstado'
                  value={estado}
                  className='form-control'
                  name='estado'
                  onChange={(e) => setEstado(e.target.value)}
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
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  value={senha}
                  className='form-control'
                  name='senha'
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Repita a Senha: *' htmlFor='inputRepitaSenha'>
                <input
                  type='password'
                  id='inputRepitaSenha'
                  value={senhaRepeticao}
                  className='form-control'
                  name='senhaRepeticao'
                  onChange={(e) => setSenhaRepeticao(e.target.value)}
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
                    if (!nome && !estabelecimento_id && !cpf && !senha && !senhaRepeticao && !cidade && !estado && !cep && !logradouro && !email && !telefone) {
                    navigate(-1);
                    } else {
                        navigate(-1);
                        inicializar();
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

export default CadastroGerente;
