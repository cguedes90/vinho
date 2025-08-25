import React, { useState } from 'react';
import WineDetails from './WineDetails';

const WineQuiz = ({ onClose, onRecommendation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const [showWineDetails, setShowWineDetails] = useState(false);

    const questions = [
        {
            id: 'ocasiao',
            question: 'Para qual ocasião você está escolhendo o vinho?',
            type: 'single',
            options: [
                { value: 'romantico', label: '💕 Jantar romântico', points: { elegante: 3, suave: 2 } },
                { value: 'churrasco', label: '🥩 Churrasco/BBQ', points: { encorpado: 3, tinto: 2 } },
                { value: 'praia', label: '🏖️ Praia/Piscina', points: { fresco: 3, branco: 2, rose: 2 } },
                { value: 'festa', label: '🎉 Festa/Celebração', points: { espumante: 3, alegre: 2 } },
                { value: 'relaxar', label: '🛋️ Relaxar em casa', points: { suave: 2, versatil: 2 } },
                { value: 'presentear', label: '🎁 Presentear alguém', points: { premium: 3, elegante: 2 } }
            ]
        },
        {
            id: 'experiencia',
            question: 'Como você descreveria sua experiência com vinhos?',
            type: 'single',
            options: [
                { value: 'iniciante', label: '🌱 Iniciante - Pouca experiência', points: { suave: 3, doce: 2 } },
                { value: 'casual', label: '😊 Casual - Bebo às vezes', points: { versatil: 2, medio: 2 } },
                { value: 'entusiasta', label: '🍷 Entusiasta - Gosto de experimentar', points: { complexo: 2, variado: 2 } },
                { value: 'expert', label: '🎯 Expert - Conheço bem vinhos', points: { premium: 3, complexo: 2 } }
            ]
        },
        {
            id: 'sabor',
            question: 'Que tipos de sabores você geralmente prefere?',
            type: 'multiple',
            options: [
                { value: 'doce', label: '🍯 Sabores doces', points: { doce: 2, suave: 1 } },
                { value: 'seco', label: '🌿 Sabores secos', points: { seco: 2, complexo: 1 } },
                { value: 'frutado', label: '🍓 Frutado e fresco', points: { frutado: 2, fresco: 1 } },
                { value: 'terroso', label: '🌍 Terroso e mineral', points: { mineral: 2, complexo: 1 } },
                { value: 'amadeirado', label: '🪵 Amadeirado', points: { amadeirado: 2, encorpado: 1 } },
                { value: 'citrico', label: '🍋 Cítrico e ácido', points: { citrico: 2, branco: 1 } }
            ]
        },
        {
            id: 'comida',
            question: 'Com que tipo de comida você mais toma vinho?',
            type: 'single',
            options: [
                { value: 'carne_vermelha', label: '🥩 Carnes vermelhas', points: { tinto: 3, encorpado: 2 } },
                { value: 'peixe', label: '🐟 Peixes e frutos do mar', points: { branco: 3, fresco: 2 } },
                { value: 'massa', label: '🍝 Massas e pizzas', points: { medio: 2, versatil: 2 } },
                { value: 'queijo', label: '🧀 Queijos e antepastos', points: { complexo: 2, elegante: 2 } },
                { value: 'sobremesa', label: '🍰 Sobremesas', points: { doce: 3, licoroso: 2 } },
                { value: 'aperitivo', label: '🥂 Como aperitivo', points: { espumante: 3, fresco: 2 } }
            ]
        },
        {
            id: 'intensidade',
            question: 'Que intensidade de sabor você prefere?',
            type: 'single',
            options: [
                { value: 'suave', label: '😌 Suave e delicado', points: { suave: 3, leve: 2 } },
                { value: 'medio', label: '⚖️ Médio e equilibrado', points: { medio: 3, equilibrado: 2 } },
                { value: 'intenso', label: '💪 Intenso e marcante', points: { intenso: 3, encorpado: 2 } },
                { value: 'muito_intenso', label: '🔥 Muito intenso', points: { muito_intenso: 3, boldness: 2 } }
            ]
        },
        {
            id: 'preco',
            question: 'Qual faixa de preço você considera ideal?',
            type: 'single',
            options: [
                { value: 'economico', label: '💰 Até R$ 60 - Econômico', points: { economico: 2, custo_beneficio: 2 } },
                { value: 'medio', label: '💵 R$ 60-100 - Médio', points: { medio_preco: 2, qualidade: 1 } },
                { value: 'premium', label: '💎 R$ 100+ - Premium', points: { premium: 3, luxo: 2 } },
                { value: 'qualquer', label: '🤷 Não importa o preço', points: { flexivel: 1 } }
            ]
        },
        {
            id: 'momento',
            question: 'Em que momento do dia você mais aprecia vinho?',
            type: 'single',
            options: [
                { value: 'almoco', label: '☀️ Almoço', points: { leve: 2, fresco: 2 } },
                { value: 'tarde', label: '🌅 Fim de tarde', points: { rose: 2, relaxante: 2 } },
                { value: 'jantar', label: '🌙 Jantar', points: { elegante: 2, complexo: 1 } },
                { value: 'noite', label: '🌜 Final da noite', points: { encorpado: 2, contemplativo: 1 } },
                { value: 'qualquer', label: '🕐 Qualquer hora', points: { versatil: 2 } }
            ]
        }
    ];

    const wineDatabase = {
        'Malbec Argentino Premium': {
            id: 4,
            perfil: ['tinto', 'encorpado', 'churrasco', 'carne_vermelha', 'intenso', 'medio_preco'],
            preco: 89.90,
            tipo: 'Tinto',
            regiao: 'Mendoza, Argentina',
            harmonizacao: 'Carnes vermelhas, churrasco, cordeiro',
            descricao: 'Vinho tinto encorpado da região de Mendoza, ideal para carnes vermelhas e churrasco',
            alcohol: '14%',
            temperatura: '16-18°C',
            tacas: 'Taça Bordeaux (bojo largo)',
            guarda: '5-8 anos',
            uva: 'Malbec 100%',
            notas_degustacao: 'Notas de frutas vermelhas maduras, especiarias e taninos sedosos'
        },
        'Pinot Noir Francês': {
            id: 6,
            perfil: ['tinto', 'elegante', 'romantico', 'suave', 'complexo', 'premium'],
            preco: 128.00,
            tipo: 'Tinto',
            regiao: 'Borgonha, França',
            harmonizacao: 'Salmão, aves, cogumelos',
            descricao: 'Vinho elegante e suave da Borgonha, ideal para jantares românticos',
            alcohol: '12.5%',
            temperatura: '14-16°C',
            tacas: 'Taça Borgonha (bojo amplo)',
            guarda: '8-12 anos',
            uva: 'Pinot Noir 100%',
            notas_degustacao: 'Elegante, com notas de cerejas, rosas e especiarias finas'
        },
        'Sauvignon Blanc Neozelandês': {
            id: 8,
            perfil: ['branco', 'fresco', 'praia', 'peixe', 'citrico', 'leve', 'medio_preco'],
            preco: 79.90,
            tipo: 'Branco',
            regiao: 'Marlborough, Nova Zelândia',
            harmonizacao: 'Peixes, frutos do mar, saladas',
            descricao: 'Branco refrescante com notas cítricas, perfeito para dias quentes',
            alcohol: '12%',
            temperatura: '8-10°C',
            tacas: 'Taça para brancos (menor que tintos)',
            guarda: '2-3 anos',
            uva: 'Sauvignon Blanc 100%',
            notas_degustacao: 'Cítrico vibrante, com notas de maracujá e erva-cidreira'
        },
        'Espumante Brut Brasileiro': {
            id: 13,
            perfil: ['espumante', 'festa', 'aperitivo', 'alegre', 'fresco', 'medio_preco'],
            preco: 85.00,
            tipo: 'Espumante',
            regiao: 'Serra Gaúcha, Brasil',
            harmonizacao: 'Aperitivos, sushi, sobremesas',
            descricao: 'Espumante de alta qualidade da Serra Gaúcha, método tradicional',
            alcohol: '12%',
            temperatura: '6-8°C',
            tacas: 'Taça flauta (para manter as bolhas)',
            guarda: '3-5 anos',
            uva: 'Chardonnay e Pinot Noir',
            notas_degustacao: 'Espuma fina, notas de maçã verde e brioche'
        },
        'Rosé de Provence': {
            id: 11,
            perfil: ['rose', 'praia', 'tarde', 'fresco', 'elegante', 'premium'],
            preco: 92.80,
            tipo: 'Rosé',
            regiao: 'Provence, França',
            harmonizacao: 'Saladas, aperitivos, comida mediterrânea',
            descricao: 'Rosé seco e elegante da França, perfeito para piscina e dias de verão',
            alcohol: '12.5%',
            temperatura: '8-10°C',
            tacas: 'Taça para brancos/rosés',
            guarda: '1-2 anos',
            uva: 'Grenache, Syrah, Cinsault',
            notas_degustacao: 'Delicado, com notas de morangos e flores'
        },
        'Merlot Brasileiro': {
            id: 7,
            perfil: ['tinto', 'suave', 'versatil', 'iniciante', 'massa', 'economico'],
            preco: 67.90,
            tipo: 'Tinto',
            regiao: 'Serra Gaúcha, Brasil',
            harmonizacao: 'Massas, pizza, queijos suaves',
            descricao: 'Tinto macio e aveludado da Serra Gaúcha, versátil para diversas ocasiões',
            alcohol: '13%',
            temperatura: '16-18°C',
            tacas: 'Taça universal (versátil)',
            guarda: '3-5 anos',
            uva: 'Merlot 100%',
            notas_degustacao: 'Suave, com notas de ameixas e chocolate'
        },
        'Vinho do Porto Tawny': {
            id: 15,
            perfil: ['licoroso', 'sobremesa', 'doce', 'premium', 'contemplativo'],
            preco: 125.50,
            tipo: 'Licoroso',
            regiao: 'Douro, Portugal',
            harmonizacao: 'Sobremesas, queijos azuis, chocolate',
            descricao: 'Vinho fortificado português, ideal para sobremesas',
            alcohol: '20%',
            temperatura: '16-18°C',
            tacas: 'Taça pequena para licorosos',
            guarda: '10+ anos',
            uva: 'Blend português tradicional',
            notas_degustacao: 'Complexo, com notas de caramelo, nozes e frutas secas'
        }
    };

    const handleAnswer = (questionId, value, isMultiple = false) => {
        if (isMultiple) {
            const currentAnswers = answers[questionId] || [];
            const newAnswers = currentAnswers.includes(value)
                ? currentAnswers.filter(a => a !== value)
                : [...currentAnswers, value];
            setAnswers({ ...answers, [questionId]: newAnswers });
        } else {
            setAnswers({ ...answers, [questionId]: value });
        }
    };

    const calculateRecommendation = () => {
        const scores = {};
        
        // Calcular pontuação baseada nas respostas
        Object.entries(answers).forEach(([questionId, answer]) => {
            const question = questions.find(q => q.id === questionId);
            
            if (Array.isArray(answer)) {
                // Resposta múltipla
                answer.forEach(value => {
                    const option = question.options.find(o => o.value === value);
                    if (option) {
                        Object.entries(option.points).forEach(([trait, points]) => {
                            scores[trait] = (scores[trait] || 0) + points;
                        });
                    }
                });
            } else {
                // Resposta única
                const option = question.options.find(o => o.value === answer);
                if (option) {
                    Object.entries(option.points).forEach(([trait, points]) => {
                        scores[trait] = (scores[trait] || 0) + points;
                    });
                }
            }
        });

        // Encontrar o vinho que melhor combina com o perfil
        let bestMatch = null;
        let bestScore = -1;

        Object.entries(wineDatabase).forEach(([wineName, wineData]) => {
            let wineScore = 0;
            
            wineData.perfil.forEach(trait => {
                if (scores[trait]) {
                    wineScore += scores[trait];
                }
            });

            if (wineScore > bestScore) {
                bestScore = wineScore;
                bestMatch = { name: wineName, ...wineData, score: wineScore };
            }
        });

        return bestMatch;
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const result = calculateRecommendation();
            setRecommendation(result);
            setShowResult(true);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setShowResult(false);
        setRecommendation(null);
    };

    const isQuestionAnswered = () => {
        const currentQ = questions[currentQuestion];
        const answer = answers[currentQ.id];
        
        if (currentQ.type === 'multiple') {
            return answer && answer.length > 0;
        }
        return answer !== undefined;
    };

    const renderQuestion = () => {
        const question = questions[currentQuestion];
        const userAnswer = answers[question.id];

        return (
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <span style={{ color: '#666', fontSize: '14px' }}>
                            Pergunta {currentQuestion + 1} de {questions.length}
                        </span>
                        <div style={{ 
                            width: '200px', 
                            height: '6px', 
                            backgroundColor: '#e0e0e0', 
                            borderRadius: '3px' 
                        }}>
                            <div style={{ 
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                                height: '100%',
                                backgroundColor: '#8B0000',
                                borderRadius: '3px',
                                transition: 'width 0.3s ease'
                            }} />
                        </div>
                    </div>

                    <h3 style={{ color: '#8B0000', fontSize: '22px', marginBottom: '30px' }}>
                        {question.question}
                    </h3>
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                    {question.options.map((option) => {
                        const isSelected = question.type === 'multiple' 
                            ? (userAnswer || []).includes(option.value)
                            : userAnswer === option.value;

                        return (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(question.id, option.value, question.type === 'multiple')}
                                style={{
                                    padding: '15px 20px',
                                    border: `2px solid ${isSelected ? '#8B0000' : '#e0e0e0'}`,
                                    backgroundColor: isSelected ? '#8B0000' : 'white',
                                    color: isSelected ? 'white' : '#333',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    textAlign: 'left',
                                    transition: 'all 0.3s ease',
                                    ':hover': {
                                        borderColor: '#8B0000'
                                    }
                                }}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>

                {question.type === 'multiple' && (
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '15px' }}>
                        💡 Você pode selecionar múltiplas opções
                    </p>
                )}
            </div>
        );
    };

    const renderResult = () => {
        if (!recommendation) return null;

        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '30px', 
                    borderRadius: '12px',
                    marginBottom: '30px'
                }}>
                    <h2 style={{ color: '#8B0000', margin: '0 0 10px 0' }}>
                        🎉 Sua Recomendação Perfeita!
                    </h2>
                    <h3 style={{ color: '#333', margin: '0 0 20px 0' }}>
                        {recommendation.name}
                    </h3>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginTop: '30px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: '#8B0000', margin: '0 0 10px 0' }}>💰 Preço</h4>
                            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                                R$ {recommendation.preco.toFixed(2)}
                            </p>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: '#8B0000', margin: '0 0 10px 0' }}>🍷 Tipo</h4>
                            <p style={{ fontSize: '18px', margin: 0 }}>{recommendation.tipo}</p>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: '#8B0000', margin: '0 0 10px 0' }}>📍 Região</h4>
                            <p style={{ fontSize: '16px', margin: 0 }}>{recommendation.regiao}</p>
                        </div>
                    </div>
                </div>

                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                        <h4 style={{ color: '#8B0000', margin: '0 0 15px 0' }}>🍽️ Harmonização</h4>
                        <p style={{ margin: 0, lineHeight: '1.6' }}>{recommendation.harmonizacao}</p>
                    </div>
                    
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                        <h4 style={{ color: '#8B0000', margin: '0 0 15px 0' }}>🥂 Como Servir</h4>
                        <p style={{ margin: '0 0 10px 0' }}><strong>Temperatura:</strong> {recommendation.temperatura}</p>
                        <p style={{ margin: 0 }}><strong>Taças:</strong> {recommendation.tacas}</p>
                    </div>
                    
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                        <h4 style={{ color: '#8B0000', margin: '0 0 15px 0' }}>📊 Detalhes</h4>
                        <p style={{ margin: '0 0 8px 0' }}><strong>Álcool:</strong> {recommendation.alcohol}</p>
                        <p style={{ margin: '0 0 8px 0' }}><strong>Uva:</strong> {recommendation.uva}</p>
                        <p style={{ margin: 0 }}><strong>Guarda:</strong> {recommendation.guarda}</p>
                    </div>
                </div>

                <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                    <h4 style={{ color: '#856404', margin: '0 0 15px 0' }}>🍇 Notas de Degustação</h4>
                    <p style={{ color: '#856404', margin: 0, fontStyle: 'italic' }}>
                        {recommendation.notas_degustacao}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={restartQuiz}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#f8f9fa',
                            color: '#8B0000',
                            border: '2px solid #8B0000',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        🔄 Novo Guia
                    </button>
                    
                    <button
                        onClick={() => setShowWineDetails(true)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#8B0000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        🛒 Ver Detalhes de Compra
                    </button>
                </div>
            </div>
        );
    };

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
                    <h2 style={{ margin: 0, fontSize: '24px' }}>
                        🍷 {showResult ? 'Seu Vinho Ideal' : 'Guia Personalizado de Vinhos'}
                    </h2>
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

                {/* Content */}
                <div style={{ padding: '30px' }}>
                    {showResult ? renderResult() : renderQuestion()}
                </div>

                {/* Navigation */}
                {!showResult && (
                    <div style={{
                        padding: '20px 30px',
                        borderTop: '1px solid #e0e0e0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <button
                            onClick={prevQuestion}
                            disabled={currentQuestion === 0}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: currentQuestion === 0 ? '#f5f5f5' : '#f8f9fa',
                                color: currentQuestion === 0 ? '#ccc' : '#8B0000',
                                border: '1px solid #e0e0e0',
                                borderRadius: '6px',
                                cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            ← Anterior
                        </button>

                        <div style={{ color: '#666', fontSize: '14px' }}>
                            {currentQuestion + 1} / {questions.length}
                        </div>

                        <button
                            onClick={nextQuestion}
                            disabled={!isQuestionAnswered()}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: !isQuestionAnswered() ? '#f5f5f5' : '#8B0000',
                                color: !isQuestionAnswered() ? '#ccc' : 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: !isQuestionAnswered() ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {currentQuestion === questions.length - 1 ? 'Ver Resultado 🎯' : 'Próxima →'}
                        </button>
                    </div>
                )}
            </div>
            
            {/* Wine Details Modal */}
            {showWineDetails && recommendation && (
                <WineDetails 
                    wine={recommendation} 
                    onClose={() => setShowWineDetails(false)} 
                />
            )}
        </div>
    );
};

export default WineQuiz;