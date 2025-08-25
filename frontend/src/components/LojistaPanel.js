import React, { useState, useEffect } from 'react';
import { wineService } from '../services/api';

const LojistaPanel = () => {
    const [wines, setWines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingWine, setEditingWine] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        tipo: '',
        harmonizacao: '',
        estoque: ''
    });
    const [error, setError] = useState('');

    const loadWines = async () => {
        setLoading(true);
        try {
            const response = await wineService.getMyWines();
            setWines(response.data);
        } catch (error) {
            console.error('Erro ao carregar vinhos:', error);
            setError('Erro ao carregar vinhos');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadWines();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            tipo: '',
            harmonizacao: '',
            estoque: ''
        });
        setEditingWine(null);
        setShowForm(false);
        setError('');
    };

    const handleEdit = (wine) => {
        setEditingWine(wine);
        setFormData({
            nome: wine.nome,
            descricao: wine.descricao || '',
            preco: wine.preco,
            tipo: wine.tipo,
            harmonizacao: wine.harmonizacao || '',
            estoque: wine.estoque || 0
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.nome || !formData.preco || !formData.tipo) {
            setError('Nome, preço e tipo são obrigatórios');
            return;
        }

        if (isNaN(parseFloat(formData.preco)) || parseFloat(formData.preco) < 0) {
            setError('Preço deve ser um número válido');
            return;
        }

        try {
            if (editingWine) {
                await wineService.update(editingWine.id, formData);
            } else {
                await wineService.create(formData);
            }
            
            await loadWines();
            resetForm();
        } catch (error) {
            setError(error.response?.data?.error || 'Erro ao salvar vinho');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este vinho?')) {
            return;
        }

        try {
            await wineService.delete(id);
            await loadWines();
        } catch (error) {
            setError(error.response?.data?.error || 'Erro ao excluir vinho');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: '#8B0000', margin: 0 }}>Painel do Lojista</h2>
                <button
                    onClick={() => setShowForm(true)}
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
                    + Adicionar Vinho
                </button>
            </div>

            {error && (
                <div style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '20px'
                }}>
                    {error}
                </div>
            )}

            {showForm && (
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
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        width: '500px',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, color: '#8B0000' }}>
                                {editingWine ? 'Editar Vinho' : 'Adicionar Vinho'}
                            </h3>
                            <button
                                onClick={resetForm}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Nome*:
                                </label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Descrição:
                                </label>
                                <textarea
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    rows="3"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '16px',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                        Preço*:
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="preco"
                                        value={formData.preco}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                        Estoque:
                                    </label>
                                    <input
                                        type="number"
                                        name="estoque"
                                        value={formData.estoque}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Tipo*:
                                </label>
                                <select
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleInputChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '16px'
                                    }}
                                >
                                    <option value="">Selecione um tipo</option>
                                    <option value="Tinto">Tinto</option>
                                    <option value="Branco">Branco</option>
                                    <option value="Rosé">Rosé</option>
                                    <option value="Espumante">Espumante</option>
                                    <option value="Licoroso">Licoroso</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Harmonização:
                                </label>
                                <input
                                    type="text"
                                    name="harmonizacao"
                                    value={formData.harmonizacao}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Carnes vermelhas, queijos"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        backgroundColor: '#f5f5f5',
                                        color: '#333',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        backgroundColor: '#8B0000',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    {editingWine ? 'Atualizar' : 'Adicionar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', margin: '40px 0' }}>
                    <p>Carregando vinhos...</p>
                </div>
            ) : (
                <div>
                    {wines.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}>
                            <p style={{ fontSize: '18px', color: '#666' }}>
                                Você ainda não cadastrou nenhum vinho.
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#8B0000',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    marginTop: '15px'
                                }}
                            >
                                Cadastrar Primeiro Vinho
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '20px'
                        }}>
                            {wines.map((wine) => (
                                <div key={wine.id} style={{
                                    backgroundColor: 'white',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '20px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: '#8B0000' }}>
                                        {wine.nome}
                                    </h4>
                                    <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>
                                        R$ {parseFloat(wine.preco).toFixed(2)}
                                    </p>
                                    <p style={{ margin: '10px 0', color: '#666', fontSize: '14px' }}>
                                        {wine.descricao}
                                    </p>
                                    <div style={{ margin: '10px 0', fontSize: '14px' }}>
                                        <span style={{ display: 'inline-block', marginRight: '15px' }}>
                                            <strong>Tipo:</strong> {wine.tipo}
                                        </span>
                                        <span style={{ display: 'inline-block' }}>
                                            <strong>Estoque:</strong> {wine.estoque}
                                        </span>
                                    </div>
                                    {wine.harmonizacao && (
                                        <p style={{ margin: '10px 0', fontSize: '14px' }}>
                                            <strong>Harmonização:</strong> {wine.harmonizacao}
                                        </p>
                                    )}
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <button
                                            onClick={() => handleEdit(wine)}
                                            style={{
                                                flex: 1,
                                                padding: '8px 16px',
                                                backgroundColor: '#f59e0b',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(wine.id)}
                                            style={{
                                                flex: 1,
                                                padding: '8px 16px',
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LojistaPanel;