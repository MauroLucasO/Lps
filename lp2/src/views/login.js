import React from 'react';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso } from '../components/toastr';

import api from '../config/axios'; 

import '../custom.css';

class Login extends React.Component {
  state = {
    login: '',
    senha: '',
  };

  logar = async () => {
    const { login, senha } = this.state;

    try {
      const response = await api.post('/usuarios/auth', { login, senha });
      
const token = response.data.token; 

      if (token) {
        localStorage.setItem('meu_token', token);
        
        mensagemSucesso(`Cliente ${login} logado com sucesso!`);

        window.location.href = '/';
        
        console.log("Agora sim! Token atualizado:", localStorage.getItem('meu_token'));
      } else {
        console.error("O backend respondeu com sucesso, mas não veio nenhuma propriedade 'token' no JSON. Verifique a estrutura:", response.data);
      }

    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert('Erro ao logar. Verifique seu login e senha.');
    }
  };

  cancelar = () => {
    this.setState({
      login: '',
      senha: '',
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='col-lg-4'>
          <Card title='Acesso'>
            <div className='row'>
              <div className='bs-component'>
                <FormGroup label='Login: *' htmlFor='inputLogin'>
                  <input
                    type='text'
                    id='inputLogin'
                    value={this.state.login}
                    className='form-control'
                    name='login'
                    onChange={(e) => this.setState({ login: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label='Senha: *' htmlFor='inputSenha'>
                  <input
                    type='password'
                    id='inputSenha'
                    value={this.state.senha}
                    className='form-control'
                    name='senha'
                    onChange={(e) => this.setState({ senha: e.target.value })}
                  />
                </FormGroup>
                <Stack spacing={1} padding={1} direction='row'>
                  <button
                    onClick={this.logar}
                    type='button'
                    className='btn btn-success'
                  >
                    Entrar
                  </button>
                  <button
                    onClick={this.cancelar}
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
}

export default Login;