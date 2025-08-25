import React, { useState } from 'react';

const WineRecommendations = ({ recommendations }) => {
    const [activeTab, setActiveTab] = useState('harmonizacoes');

    if (!recommendations) {
        return null;
    }

    const tabs = [
        { id: 'harmonizacoes', label: 'O Que Comer Com' },
        { id: 'baratos', label: 'Melhores Preços' },
        { id: 'caros', label: 'Vinhos Premium' },
        { id: 'precos', label: 'Faixa de Preço' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'harmonizacoes':
                return (
                    <div>
                        <h3>Harmonizações Recomendadas:</h3>
                        {recommendations.harmonizacoes?.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {recommendations.harmonizacoes.map((harmonizacao, index) => (
                                    <li key={index} style={{
                                        background: '#f8f8f8',
                                        margin: '10px 0',
                                        padding: '15px',
                                        borderRadius: '6px',
                                        borderLeft: '4px solid #8B0000'
                                    }}>
                                        {harmonizacao}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhuma harmonização encontrada.</p>
                        )}
                    </div>
                );
            
            case 'baratos':
                return (
                    <div>
                        <h3>Melhores Preços:</h3>
                        {recommendations.topByPriceAsc?.length > 0 ? (
                            <div style={{ display: 'grid', gap: '15px' }}>
                                {recommendations.topByPriceAsc.map((vinho) => (
                                    <div key={vinho.id} style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '6px',
                                        padding: '15px',
                                        backgroundColor: '#fff'
                                    }}>
                                        <h4 style={{ margin: '0 0 10px 0', color: '#8B0000' }}>{vinho.nome}</h4>
                                        <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#22c55e' }}>R$ {parseFloat(vinho.preco).toFixed(2)}</p>
                                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{vinho.descricao}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum vinho encontrado.</p>
                        )}
                    </div>
                );
            
            case 'caros':
                return (
                    <div>
                        <h3>Vinhos Premium:</h3>
                        {recommendations.topByPriceDesc?.length > 0 ? (
                            <div style={{ display: 'grid', gap: '15px' }}>
                                {recommendations.topByPriceDesc.map((vinho) => (
                                    <div key={vinho.id} style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '6px',
                                        padding: '15px',
                                        backgroundColor: '#fff'
                                    }}>
                                        <h4 style={{ margin: '0 0 10px 0', color: '#8B0000' }}>{vinho.nome}</h4>
                                        <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#f59e0b' }}>R$ {parseFloat(vinho.preco).toFixed(2)}</p>
                                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{vinho.descricao}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum vinho encontrado.</p>
                        )}
                    </div>
                );
            
            case 'precos':
                return (
                    <div>
                        <h3>Análise de Preços:</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            margin: '20px 0'
                        }}>
                            <div style={{
                                background: '#f0fdf4',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px solid #bbf7d0'
                            }}>
                                <h4 style={{ color: '#166534', margin: '0 0 10px 0' }}>Preço Mínimo</h4>
                                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>
                                    R$ {recommendations.priceStats?.min?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div style={{
                                background: '#fef3c7',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px solid #fed7aa'
                            }}>
                                <h4 style={{ color: '#92400e', margin: '0 0 10px 0' }}>Preço Médio</h4>
                                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>
                                    R$ {recommendations.priceStats?.avg?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div style={{
                                background: '#fef2f2',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px solid #fecaca'
                            }}>
                                <h4 style={{ color: '#991b1b', margin: '0 0 10px 0' }}>Preço Máximo</h4>
                                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
                                    R$ {recommendations.priceStats?.max?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <div style={{ margin: '30px 0' }}>
            <div style={{ 
                display: 'flex', 
                borderBottom: '1px solid #ddd',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '5px'
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 20px',
                            border: 'none',
                            backgroundColor: activeTab === tab.id ? '#8B0000' : 'transparent',
                            color: activeTab === tab.id ? 'white' : '#8B0000',
                            cursor: 'pointer',
                            borderRadius: '4px 4px 0 0',
                            fontSize: '14px',
                            fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ 
                minHeight: '200px',
                padding: '20px',
                backgroundColor: '#fafafa',
                borderRadius: '8px'
            }}>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default WineRecommendations;