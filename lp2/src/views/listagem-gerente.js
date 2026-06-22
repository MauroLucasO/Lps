import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from '../config/axios';

const baseURL = `/gerentes`;
const estabelecimentosURL = `/estabelecimentos`;

function ListagemGerente() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-gerente`);
  };

  const editar = (id) => {
    navigate(`/cadastro-gerente/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosEstabelecimento, setdadosEstabelecimento] = React.useState([]);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await api
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Gerente excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o gerente`);
      });
  }

  React.useEffect(() => {
    api.get(baseURL).then((response) => {
      setDados(response.data);
    });
    api.get(estabelecimentosURL).then((response) => {
      setdadosEstabelecimento(response.data);
    });
  }, []);

const obterNomeEstabelecimento = (dadoGerente) => {
  // Cenário A: O back-end já devolve o objeto do estabelecimento populado
  if (dadoGerente.estabelecimento && typeof dadoGerente.estabelecimento === 'object') {
    return dadoGerente.estabelecimento.nome || dadoGerente.estabelecimento.estabelecimento || '';
  }
  
  // Cenário B: Se a API trouxer como string direta
  if (dadoGerente.estabelecimento && typeof dadoGerente.estabelecimento === 'string') {
    return dadoGerente.estabelecimento;
  }

  // Nome do estabelecimento na listagem/cadastro de gerentes/cupons
  // Substituir o email pelo login
  // Colocar a seleção de proprietário no cadastro de estabelecimentos (ou somente arrumar no cadastro do proprietario)
  // Mapeie aqui todas as variações possíveis de nome que o seu Back-end pode estar enviando:
  const idEst = 
    dadoGerente.estabelecimento_id || 
    dadoGerente.id_estabelecimento || 
    dadoGerente.idEstabelecimento ||   // Comum em Java / Node (CamelCase)
    dadoGerente.estabelecimentoId;     // Comum em C# / Prisma ORM

  if (idEst && dadosEstabelecimento.length > 0) {
    // Garantimos a comparação convertendo ambos para String para evitar problemas de tipo (Ex: "1" === 1)
    const encontrado = dadosEstabelecimento.find((est) => String(est.id) === String(idEst));
    return encontrado ? (encontrado.nome || encontrado.estabelecimento) : 'Não localizado';
  }

  return 'Não informado';
};

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Gerente'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Gerente
              </button>
              <table className='table table-hover'>
                 <thead>
                  <tr>
                    <th scope='col'>id</th>             
                    <th scope='col'>nome</th>
                    <th scope='col'>cpf</th>
                    <th scope='col'>telefone</th>
                    <th scope='col'>email</th>
                    <th scope='col'>cep</th>
                    <th scope='col'>cidade</th>
                    <th scope='col'>estado</th>
                    <th scope='col'>logradouro</th>
                    <th scope='col'>estabelecimento</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.telefone}</td>
                      <td>{dado.email}</td>
                      <td>{dado.cep}</td>
                      <td>{dado.cidade}</td>
                      <td>{dado.estado}</td>
                      <td>{dado.logradouro}</td>
                      <td>{obterNomeEstabelecimento(dado)}</td>

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

export default ListagemGerente;
