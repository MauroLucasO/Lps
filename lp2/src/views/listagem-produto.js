import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate, useLocation } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}-2/produtos`;

function ListagemProduto() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-produto`);
  };

  const editar = (id) => {
    navigate(`/cadastro-produto/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Produto excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o produto`);
      });
  }

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoria = queryParams.get('categoria');

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      if (categoria) {
        const filteredData = response.data.filter(
          (item) =>
            item.nomeCategoria &&
            item.nomeCategoria.toLowerCase() === categoria.toLowerCase()
        );
        setDados(filteredData);
      } else {
        setDados(response.data);
      }
    });
  }, [categoria]);


  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Produto'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Produto
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>id</th>
                    <th scope='col'>nome</th>
                    <th scope='col'>valor</th>
                    <th scope='col'>descrição</th>
                    <th scope='col'>Categoria</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.valor}</td>
                      <td>{dado.descricao}</td>
                      <td>{dado.nomeCategoria}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemProduto;
