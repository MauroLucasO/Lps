import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import api from '../config/axios';

function CadastroCategoria() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `/categorias`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');

  const [dados, setDados] = useState(null);
  const [dadosNome, setDadosNome] = useState([]);

  useEffect(() => {
    api.get(baseURL)
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
    }
  }

  async function salvar() {
    const data = JSON.stringify({ id, nome, nomeProduto });

    try {
      if (!idParam) {
        await api.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Categoria ${nome} cadastrada com sucesso!`);
      } else {
        await api.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
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
          const response = await api.get(`${baseURL}/${idParam}`);
          const d = response.data;
          setDados(d);
          setId(d.id);
          setNome(d.nome);
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

              <FormGroup label='Nome da Categoria: *' htmlFor='inputNomeCategoria'>
                <input
                  type='text'
                  id='inputNomeCategoria'
                  value={nome}
                  className='form-control'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Cadastrar
                </button>

                <button

                  onClick={() => {
                  if (!nome) {
                    navigate(-1);
                  } else {
                    inicializar();
                    navigate(-1);
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
