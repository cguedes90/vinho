import React from 'react';

const WineGuide = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '0'
            }}>
                {/* Header */}
                <div style={{
                    backgroundColor: '#8B0000',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ margin: 0, fontSize: '24px' }}>🍷 Guia Rápido de Escolha de Vinhos</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '28px',
                            cursor: 'pointer'
                        }}
                    >
                        ×
                    </button>
                </div>

                <div style={{ padding: '30px' }}>
                    {/* 1. Defina a ocasião */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ color: '#8B0000', fontSize: '20px', marginBottom: '15px' }}>
                            1. Defina a ocasião 🍽️
                        </h3>
                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px' }}><strong>Jantar romântico:</strong> escolha um tinto suave ou um espumante</li>
                                <li style={{ marginBottom: '8px' }}><strong>Churrasco:</strong> Malbec (Argentina) ou Cabernet Sauvignon (Chile)</li>
                                <li style={{ marginBottom: '8px' }}><strong>Praia/piscina:</strong> prefira brancos leves (Sauvignon Blanc) ou rosés</li>
                                <li style={{ marginBottom: '8px' }}><strong>Presentear:</strong> aposte nos premiados ou embalagens bonitas</li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. Escolha pela uva */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ color: '#8B0000', fontSize: '20px', marginBottom: '15px' }}>
                            2. Escolha pela uva (fácil de lembrar) 🍇
                        </h3>
                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px' }}><strong>Tinto encorpado:</strong> Malbec (Argentina), Cabernet Sauvignon (Chile)</li>
                                <li style={{ marginBottom: '8px' }}><strong>Tinto leve e suave:</strong> Pinot Noir, Merlot</li>
                                <li style={{ marginBottom: '8px' }}><strong>Branco fresco:</strong> Sauvignon Blanc, Pinot Grigio</li>
                                <li style={{ marginBottom: '8px' }}><strong>Branco cremoso:</strong> Chardonnay (especialmente os que passam por barrica)</li>
                                <li style={{ marginBottom: '8px' }}><strong>Rosé refrescante:</strong> Provence (França) ou rosés secos portugueses</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. Pense no que vai comer */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ color: '#8B0000', fontSize: '20px', marginBottom: '15px' }}>
                            3. Pense no que vai comer 🍽️
                        </h3>
                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px' }}><strong>Carnes vermelhas:</strong> Malbec ou Cabernet Sauvignon</li>
                                <li style={{ marginBottom: '8px' }}><strong>Massas com molho vermelho:</strong> Sangiovese (Itália)</li>
                                <li style={{ marginBottom: '8px' }}><strong>Peixes e frutos do mar:</strong> Sauvignon Blanc ou Chardonnay leve</li>
                                <li style={{ marginBottom: '8px' }}><strong>Queijos:</strong> Merlot ou espumante brut</li>
                                <li style={{ marginBottom: '8px' }}><strong>Sobremesas:</strong> Vinho do Porto ou Moscatel</li>
                            </ul>
                        </div>
                    </div>

                    {/* 4. Olhe o rótulo */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ color: '#8B0000', fontSize: '20px', marginBottom: '15px' }}>
                            4. Olhe o rótulo com atenção 🏷️
                        </h3>
                        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '8px' }}>Prefira vinhos de regiões famosas (Mendoza, Douro, Toscana, Bordeaux)</li>
                                <li style={{ marginBottom: '12px' }}>Veja o teor alcoólico:</li>
                                <ul style={{ paddingLeft: '20px' }}>
                                    <li style={{ marginBottom: '4px' }}><strong>11–12%</strong> → mais leve</li>
                                    <li style={{ marginBottom: '4px' }}><strong>13–14%</strong> → médio</li>
                                    <li style={{ marginBottom: '4px' }}><strong>14%+</strong> → encorpado</li>
                                </ul>
                            </ul>
                        </div>
                    </div>

                    {/* 5. Dicas para não errar */}
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: '#8B0000', fontSize: '20px', marginBottom: '15px' }}>
                            5. Se estiver em dúvida, escolha: 👌
                        </h3>
                        <div style={{
                            backgroundColor: '#e7f3ff',
                            border: '2px solid #4dabf7',
                            padding: '20px',
                            borderRadius: '8px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '20px', marginRight: '10px' }}>👉</span>
                                <strong>Argentino Malbec</strong> (ótimo custo-benefício e agrada a maioria)
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '20px', marginRight: '10px' }}>👉</span>
                                <strong>Português do Douro</strong> (sempre equilibrado)
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '20px', marginRight: '10px' }}>👉</span>
                                <strong>Espumante Brut brasileiro</strong> (Brasil é top em espumantes)
                            </div>
                        </div>
                    </div>

                    {/* Dica de ouro */}
                    <div style={{
                        backgroundColor: '#fff3cd',
                        border: '2px solid #ffc107',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h4 style={{ color: '#856404', margin: '0 0 10px 0' }}>💡 Dica de Ouro para Não Errar</h4>
                        <p style={{ margin: 0, color: '#856404', fontWeight: 'bold' }}>
                            Para iniciantes: Tinto médio (Merlot ou Cabernet), Branco fresco (Sauvignon Blanc)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WineGuide;