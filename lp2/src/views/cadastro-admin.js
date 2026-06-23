import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroAdmin() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/usuarios`;

  const [id, setId] = useState('');
  const [cpf, setCpf] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepeticao, setSenhaRepeticao] = useState('');

  async function salvar() {
    let payload = { 
      admin: true, 
      cpf, 
      login, 
      senha, 
      senhaRepeticao 
    };
    
    let data = JSON.stringify(payload);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Administrador ${login} cadastrado com sucesso!`);
          navigate(`/`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || "Erro ao cadastrar");
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Administrador ${login} alterado com sucesso!`);
          navigate(`/`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data || "Erro ao alterar");
        });
    }
  }

  async function buscar() {
    if (!idParam) return;
    
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      const dadosDoBackend = response.data;
      
      setId(dadosDoBackend.id);
      setCpf(dadosDoBackend.cpf || '');
      setLogin(dadosDoBackend.login);
      setSenha('');
      setSenhaRepeticao('');
    }).catch(() => {
      mensagemErro("Erro ao buscar dados do administrador.");
    });
  }

  useEffect(() => {
    buscar();
    // eslint-disable-next-line
  }, [idParam]);

  return (
    <div 
      className='container d-flex justify-content-center align-items-center' 
      style={{ minHeight: '80vh' }}
    >
      <div className='col-lg-5 col-md-6 col-sm-8'>
        <Card title='Cadastro de Administrador'>
          <div className='row'>
            <div className='bs-component'>
              
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  id='inputCpf'
                  maxLength='11'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Login: *' htmlFor='inputLogin'>
                <input
                  type='text'
                  id='inputLogin'
                  value={login}
                  className='form-control'
                  name='login'
                  onChange={(e) => setLogin(e.target.value)}
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

              <FormGroup label='Repita a Senha: *' htmlFor='inputSenhaRepeticao'>
                <input
                  type='password'
                  id='inputSenhaRepeticao'
                  value={senhaRepeticao}
                  className='form-control'
                  name='senhaRepeticao'
                  onChange={(e) => setSenhaRepeticao(e.target.value)}
                />
              </FormGroup>
              
              <Stack spacing={1} padding={2} direction='row' justifyContent='center'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
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
        </Card>
      </div>
    </div>
  );
}

export default CadastroAdmin;