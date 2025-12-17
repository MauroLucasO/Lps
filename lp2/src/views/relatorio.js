import React, { useState, useEffect } from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Relatorio() {

  const options = {
    indexAxis: 'y',
    elements: {
      bar: { borderWidth: 2 },
    },
    responsive: true,
    plugins: {
      legend: { position: 'right' },
    },
  };

  const labels = ['Quantidade'];

  const [idCliente, setIdCliente] = useState(0);
  const [clientes, setClientes] = useState([]);
  const [dadosPedidos, setDadosPedidos] = useState([]);
  const [idItem, setIdItem] = useState(0);
  const [idEstabelecimento, setIdEstabelecimento] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`)
      .then((res) => setClientes(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (idCliente !== 0) {
      axios.get(`${BASE_URL}-2/pedido?idCliente=${idCliente}`)
        .then(async (res) => {
          const rawData = Array.isArray(res.data) ? res.data : [];

          const enrichedData = await Promise.all(
            rawData.map(async (item) => {
              let produtoNome = 'Sem Nome';
              let categoriaNome = 'Sem Categoria';
              let produtoDescricao = '';
              let itemDetails = {};

              if (item.idItemPedido) {
                try {
                  const itemRes = await axios.get(
                    `${BASE_URL}-2/itemPedidos/${item.idItemPedido}`
                  );
                  itemDetails = itemRes.data;

                  if (itemDetails.idProduto) {
                    try {
                      const prodRes = await axios.get(
                        `${BASE_URL}-2/produtos/${itemDetails.idProduto}`
                      );
                      produtoNome = prodRes.data.nome || 'Sem Nome';
                      categoriaNome = prodRes.data.nomeCategoria || 'Sem Categoria';
                      produtoDescricao = prodRes.data.descricao || '';
                    } catch (prodErr) {
                      console.error(`Erro ao buscar produto ${itemDetails.idProduto}`, prodErr);
                    }
                  }
                } catch (error) {
                  console.error(
                    `Erro ao buscar detalhes do item ${item.idItemPedido}`,
                    error
                  );
                }
              }

              return {
                ...item,
                ...itemDetails,
                idCategoria: item.idCategoria || 0,
                nomeCategoria: categoriaNome,
                valor: itemDetails.valorTotal ? String(itemDetails.valorTotal) : '0',
                quantidade: itemDetails.quantidade || 0,
                status: 'CONCLUIDO',
                descricao: produtoDescricao,
                produto: produtoNome,
              };
            })
          );

          setDadosPedidos(enrichedData);
        })
        .catch((err) => {
          console.log(err);
          setDadosPedidos([]);
        });

      axios.get(`${BASE_URL}-2/pedido?idCliente=${idCliente}`)
        .then((res) => setIdItem(res.data))
        .catch((err) => console.log(err));

      axios.get(`${BASE_URL}-2/pedido?idCliente=${idCliente}`)
        .then((res) => setIdEstabelecimento(res.data))
        .catch((err) => console.log(err));
    } else {
      setDadosPedidos([]);
      setIdItem(0);
      setIdEstabelecimento(0);
    }
  }, [idCliente]);

  useEffect(() => {
    if (idCliente !== 0) {
      axios.get(`${BASE_URL}-3/relatorios`)
        .catch((err) => console.log(err));
    }
  }, [idCliente]);

  if (!clientes.length) return <p>Carregando clientes...</p>;

  const totalPedidos = dadosPedidos.length;
  const pedidosConcluidos = dadosPedidos.filter(p => p.status === 'CONCLUIDO').length;
  const pedidosPendentes = totalPedidos - pedidosConcluidos;

  const percentualConcluido = totalPedidos ? (pedidosConcluidos * 100) / totalPedidos : 0;
  const percentualPendente = 100 - percentualConcluido;

  const dadosGraficoDoughnut = {
    labels: ['Concluídos', 'Pendentes'],
    datasets: [
      {
        label: '% Pedidos',
        data: [percentualConcluido, percentualPendente],
        backgroundColor: ['rgba(75,192,192,0.5)', 'rgba(255,99,132,0.5)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 2,
      },
    ],
  };

  let orderedList = [...dadosPedidos].sort((a, b) => a.idCategoria - b.idCategoria);

  const datasetsBar = [];
  let i = 0;

  while (i < orderedList.length) {
    let idCat = orderedList[i].idCategoria;
    let nomeCat = orderedList[i].nomeCategoria;
    let soma = 0;

    while (i < orderedList.length && orderedList[i].idCategoria === idCat) {
      soma++;
      i++;
    }

    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);

    datasetsBar.push({
      label: nomeCat,
      data: [soma],
      backgroundColor: `rgba(${R},${G},${B},0.5)`,
      borderColor: `rgb(${R},${G},${B})`,
      borderWidth: 2
    });
  }

  const dadosGraficoBarras = {
    labels,
    datasets: datasetsBar,
  };

  return (
    <div className='container'>
      <Card title='Acompanhamento de Pedidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <FormGroup label='Cliente:' htmlFor='clientes'>
              <select
                className='form-select'
                id='clientes'
                value={idCliente}
                onChange={(e) => setIdCliente(Number(e.target.value))}
              >
                <option value='0'></option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </FormGroup>

            <div className='row mt-4'>
              <div className='col-lg-3'>
                <h5>Pedidos:</h5>
                <h6>Total: {totalPedidos}</h6>
                <h6>Concluídos: {pedidosConcluidos}</h6>
                <h6>Pendentes: {pedidosPendentes}</h6>
              </div>

              <div className='col-lg-2'>
                <Doughnut data={dadosGraficoDoughnut} />
              </div>

              <div className='col-lg-5'>
                <Bar options={options} data={dadosGraficoBarras} />
              </div>
            </div>

            <table className='table table-hover mt-4'>

              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Descricao</th>
                  <th>Valor</th>
                </tr>
              </thead>

              <tbody>
                {dadosPedidos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.produto}</td>
                    <td>{p.quantidade}</td>
                    <td>{p.descricao}</td>
                    <td>{p.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </Card >
    </div >
  );
}

export default Relatorio;
