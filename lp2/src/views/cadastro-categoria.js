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

function CadastroCategoria() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}-2/categorias`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');

  const [dados, setDados] = useState(null);
  const [dadosNome, setDadosNome] = useState([]);

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => setDadosNome(response.data))
      .catch((error) => mensagemErro('Erro ao carregar categorias.'));
  }, [baseURL]);

  function inicializar() {
    if (!idParam) {
      setId('');
      setNome('');
      setNomeProduto('');
    } else if (dados) {
      setId(dados.id);
      setNome(dados.nome);
      setNomeProduto(dados.nomeProduto);
    }
  }

  async function salvar() {
    const data = JSON.stringify({ id, nome, nomeProduto });

    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Categoria ${nome} cadastrada com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Categoria ${nome} alterada com sucesso!`);
      }
      navigate('/listagem-categoria');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar categoria.');
    }
  }

  useEffect(() => {
    async function buscar() {
      if (idParam) {
        try {
          const response = await axios.get(`${baseURL}/${idParam}`);
          const d = response.data;
          setDados(d);
          setId(d.id);
          setNome(d.nome);
          setNomeProduto(d.nomeProduto);
        } catch {
          mensagemErro('Erro ao buscar categoria.');
        }
      }
    }
    buscar();
  }, [idParam, baseURL]);

  if (!dadosNome) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Categoria'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome da Categoria: *' htmlFor='comboNome'>
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

              <FormGroup label='Nome do Produto: *' htmlFor='inputNomeProduto'>
                <input
                  type='text'
                  id='inputNomeProduto'
                  value={nomeProduto}
                  className='form-control'
                  onChange={(e) => setNomeProduto(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Cadastrar
                </button>

                <button
                  onClick={() => {
                    if (!nome && !nomeProduto) {
                      navigate(-1);
                    } else {
                      if (window.confirm('Deseja realmente cancelar e sair da página? As alterações não salvas serão perdidas.')) {
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

export default CadastroCategoria;
