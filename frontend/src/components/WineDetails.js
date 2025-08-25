import React from 'react';

const WineDetails = ({ wine, onClose }) => {
    if (!wine) return null;

    const getBuyingTips = (wine) => {
        const tips = [];
        
        if (wine.preco < 70) {
            tips.push("💰 Excelente custo-benefício para o dia a dia");
        } else if (wine.preco > 100) {
            tips.push("💎 Vinho premium ideal para ocasiões especiais");
        }
        
        if (wine.tipo === 'Tinto') {
            tips.push("🍷 Deixe respirar por 30 minutos antes de servir");
        } else if (wine.tipo === 'Branco' || wine.tipo === 'Rosé') {
            tips.push("❄️ Sirva bem gelado, direto da geladeira");
        } else if (wine.tipo === 'Espumante') {
            tips.push("🥂 Mantenha inclinado ao servir para preservar as bolhas");
        }
        
        return tips;
    };

    const getStorageTips = (wine) => {
        const tips = [];
        
        if (wine.guarda.includes('anos')) {
            tips.push("📅 Pode ser guardado por anos em local adequado");
        } else {
            tips.push("⏰ Melhor consumir em até 2 anos");
        }
        
        tips.push("🌡️ Armazene em temperatura entre 12-16°C");
        tips.push("🔒 Mantenha deitado em local escuro e sem vibração");
        
        return tips;
    };

    const getServingSteps = (wine) => {
        const steps = [];
        
        if (wine.tipo === 'Tinto') {
            steps.push("1. Abra 30-60 minutos antes do consumo");
            steps.push("2. Decante se for um vinho mais encorpado");
            steps.push(`3. Sirva entre ${wine.temperatura}`);
        } else if (wine.tipo === 'Branco' || wine.tipo === 'Rosé') {
            steps.push("1. Mantenha refrigerado até o momento de servir");
            steps.push(`2. Sirva entre ${wine.temperatura}`);
            steps.push("3. Não deixe esquentar na mesa");
        } else if (wine.tipo === 'Espumante') {
            steps.push("1. Resfrie por pelo menos 3 horas");
            steps.push("2. Abra cuidadosamente inclinando a garrafa");
            steps.push("3. Sirva imediatamente em taças geladas");
        }
        
        return steps;
    };

    const buyingTips = getBuyingTips(wine);
    const storageTips = getStorageTips(wine);
    const servingSteps = getServingSteps(wine);

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
                width: '95%',
                maxWidth: '900px',
                maxHeight: '95vh',
                overflowY: 'auto',
                padding: '0'
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
                    color: 'white',
                    padding: '25px',
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
                            {wine.name}
                        </h2>
                        <p style={{ margin: '8px 0 0 0', fontSize: '16px', opacity: 0.9 }}>
                            {wine.regiao} • {wine.tipo}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            fontSize: '24px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            width: '40px',
                            height: '40px'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '30px' }}>
                    {/* Price & Basic Info */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', opacity: 0.9 }}>💰 Preço</h3>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
                                R$ {wine.preco.toFixed(2)}
                            </p>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', opacity: 0.9 }}>🍾 Álcool</h3>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
                                {wine.alcohol}
                            </p>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', opacity: 0.9 }}>🌡️ Temperatura</h3>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
                                {wine.temperatura}
                            </p>
                        </div>
                    </div>

                    {/* Description & Tasting Notes */}
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            border: '1px solid #e9ecef',
                            borderRadius: '10px',
                            padding: '25px'
                        }}>
                            <h3 style={{ color: '#8B0000', margin: '0 0 15px 0', fontSize: '20px' }}>
                                🍇 Sobre este Vinho
                            </h3>
                            <p style={{ margin: '0 0 20px 0', fontSize: '16px', lineHeight: '1.8' }}>
                                {wine.descricao}
                            </p>
                            <div style={{
                                backgroundColor: '#fff3cd',
                                border: '1px solid #ffeaa7',
                                borderRadius: '8px',
                                padding: '15px',
                                borderLeft: '4px solid #fdcb6e'
                            }}>
                                <p style={{ margin: 0, fontStyle: 'italic', color: '#856404', fontSize: '15px' }}>
                                    <strong>Notas de Degustação:</strong> {wine.notas_degustacao}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How to Serve */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#8B0000', margin: '0 0 20px 0', fontSize: '22px' }}>
                            🥂 Como Servir Perfeitamente
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px'
                        }}>
                            <div style={{
                                backgroundColor: 'white',
                                border: '1px solid #e9ecef',
                                borderRadius: '8px',
                                padding: '20px'
                            }}>
                                <h4 style={{ color: '#495057', margin: '0 0 15px 0' }}>📋 Passo a Passo</h4>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    {servingSteps.map((step, index) => (
                                        <li key={index} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div style={{
                                backgroundColor: 'white',
                                border: '1px solid #e9ecef',
                                borderRadius: '8px',
                                padding: '20px'
                            }}>
                                <h4 style={{ color: '#495057', margin: '0 0 15px 0' }}>🥃 Taças Ideais</h4>
                                <p style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
                                    {wine.tacas}
                                </p>
                                <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                                    A taça certa realça os aromas e sabores, proporcionando uma experiência completa.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Food Pairing */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#8B0000', margin: '0 0 20px 0', fontSize: '22px' }}>
                            🍽️ Harmonização Gastronômica
                        </h3>
                        <div style={{
                            backgroundColor: '#e8f5e8',
                            border: '1px solid #c3e6c3',
                            borderRadius: '10px',
                            padding: '25px'
                        }}>
                            <p style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
                                Combina perfeitamente com:
                            </p>
                            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.8' }}>
                                {wine.harmonizacao}
                            </p>
                        </div>
                    </div>

                    {/* Technical Info */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#8B0000', margin: '0 0 20px 0', fontSize: '22px' }}>
                            📊 Informações Técnicas
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '15px'
                        }}>
                            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666', fontWeight: 'bold' }}>
                                    🍇 VARIETAIS
                                </p>
                                <p style={{ margin: 0, fontSize: '16px' }}>{wine.uva}</p>
                            </div>
                            
                            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666', fontWeight: 'bold' }}>
                                    📅 POTENCIAL DE GUARDA
                                </p>
                                <p style={{ margin: 0, fontSize: '16px' }}>{wine.guarda}</p>
                            </div>
                            
                            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666', fontWeight: 'bold' }}>
                                    📍 REGIÃO
                                </p>
                                <p style={{ margin: 0, fontSize: '16px' }}>{wine.regiao}</p>
                            </div>
                        </div>
                    </div>

                    {/* Buying & Storage Tips */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            backgroundColor: '#fff7ed',
                            border: '1px solid #fed7aa',
                            borderRadius: '10px',
                            padding: '20px'
                        }}>
                            <h4 style={{ color: '#9a3412', margin: '0 0 15px 0' }}>
                                💡 Dicas de Compra
                            </h4>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#9a3412' }}>
                                {buyingTips.map((tip, index) => (
                                    <li key={index} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div style={{
                            backgroundColor: '#f0f9ff',
                            border: '1px solid #bae6fd',
                            borderRadius: '10px',
                            padding: '20px'
                        }}>
                            <h4 style={{ color: '#0c4a6e', margin: '0 0 15px 0' }}>
                                📦 Como Armazenar
                            </h4>
                            <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e' }}>
                                {storageTips.map((tip, index) => (
                                    <li key={index} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '15px 30px',
                                backgroundColor: '#f8f9fa',
                                color: '#495057',
                                border: '2px solid #dee2e6',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            ← Voltar
                        </button>
                        
                        <button
                            onClick={() => {
                                // Aqui poderia integrar com um sistema de e-commerce
                                alert(`Informações de compra do ${wine.name} seriam exibidas aqui!`);
                            }}
                            style={{
                                padding: '15px 30px',
                                background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            🛒 Onde Comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WineDetails;