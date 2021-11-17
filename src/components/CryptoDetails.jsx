import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const cryptoDetails = data?.data?.coin;

  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(data?.data?.coin.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${data?.data?.coin.volume && millify(data?.data?.coin.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${data?.data?.coin.marketCap && millify(data?.data?.coin.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(data?.data?.coin.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: data?.data?.coin.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: data?.data?.coin.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: data?.data?.coin.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(data?.data?.coin.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(data?.data?.coin.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

   

  return (
    <>
      <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
            {cryptoDetails.name} ({cryptoDetails.slug}) Price
          </Title>
        </Col>
      </Col>
      </>
    )
}

export default CryptoDetails
