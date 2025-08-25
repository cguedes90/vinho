import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [lojistas, setLojistas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [vinhos, setVinhos] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3002/api';

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadDashboard = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE}/admin/dashboard`);
            setDashboard(response.data);
        } catch (error) {
            setError('Erro ao carregar dashboard: ' + error.response?.data?.error || error.message);
        }
        setLoading(false);
    };

    const loadUsuarios = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE}/admin/usuarios`);
            setUsuarios(response.data);
        } catch (error) {
            setError('Erro ao carregar usuários: ' + error.response?.data?.error || error.message);
        }
        setLoading(false);
    };

    const loadLojistas = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE}/admin/lojistas`);
            setLojistas(response.data);
        } catch (error) {
            setError('Erro ao carregar lojistas: ' + error.response?.data?.error || error.message);
        }
        setLoading(false);
    };

    const loadClientes = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE}/admin/clientes`);
            setClientes(response.data);
        } catch (error) {
            setError('Erro ao carregar clientes: ' + error.response?.data?.error || error.message);
        }
        setLoading(false);
    };

    const loadVinhos = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE}/admin/vinhos`);
            setVinhos(response.data);
        } catch (error) {
            setError('Erro ao carregar vinhos: ' + error.response?.data?.error || error.message);
        }
        setLoading(false);
    };

    const deleteUser = async (id, nome) => {
        if (!window.confirm(`Tem certeza que deseja excluir o usuário "${nome}"? Esta ação não pode ser desfeita.`)) {
            return;
        }

        try {
            await axios.delete(`${API_BASE}/admin/usuarios/${id}`);
            
            // Recarregar dados
            if (activeTab === 'usuarios') loadUsuarios();
            else if (activeTab === 'lojistas') loadLojistas();
            else if (activeTab === 'clientes') loadClientes();
            
            loadDashboard(); // Atualizar estatísticas
            
        } catch (error) {
            alert('Erro ao excluir usuário: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError('');
        
        switch (tab) {
            case 'usuarios':
                loadUsuarios();
                break;
            case 'lojistas':
                loadLojistas();
                break;
            case 'clientes':
                loadClientes();
                break;
            case 'vinhos':
                loadVinhos();
                break;
            default:
                break;
        }
    };

    const renderDashboard = () => (
        <div>
            <h3 style={{ color: '#8B0000', marginBottom: '30px' }}>Dashboard Geral</h3>
            
            {dashboard && (
                <>
                    {/* Estatísticas Gerais */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        marginBottom: '40px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '20px',
                            borderRadius: '12px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Total Usuários</h4>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
                                {dashboard.estatisticas.totalUsuarios}
                            </p>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            padding: '20px',
                            borderRadius: '12px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Lojistas</h4>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
                                {dashboard.estatisticas.totalLojistas}
                            </p>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            padding: '20px',
                            borderRadius: '12px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Clientes</h4>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
                                {dashboard.estatisticas.totalClientes}
                            </p>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            padding: '20px',
                            borderRadius: '12px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Total Vinhos</h4>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
                                {dashboard.estatisticas.totalVinhos}
                            </p>
                        </div>
                    </div>

                    {/* Top Lojistas */}
                    <div style={{ marginBottom: '40px' }}>
                        <h4 style={{ color: '#8B0000' }}>Top Lojistas (Por Quantidade de Vinhos)</h4>
                        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: '#f8f9fa' }}>
                                    <tr>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>Nome</th>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>Vinhos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dashboard.topLojistas.map((lojista, index) => (
                                        <tr key={index} style={{ borderTop: '1px solid #dee2e6' }}>
                                            <td style={{ padding: '12px' }}>{lojista.nome}</td>
                                            <td style={{ padding: '12px' }}>{lojista.email}</td>
                                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                                <span style={{
                                                    background: '#8B0000',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '14px'
                                                }}>
                                                    {lojista.total_vinhos}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Vinhos por Tipo */}
                    <div>
                        <h4 style={{ color: '#8B0000' }}>Distribuição de Vinhos por Tipo</h4>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '15px'
                        }}>
                            {dashboard.vinhosPorTipo.map((tipo, index) => (
                                <div key={index} style={{
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    border: '1px solid #dee2e6'
                                }}>
                                    <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>{tipo.tipo}</h5>
                                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#8B0000' }}>
                                        {tipo.quantidade}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    const renderUsuarios = () => (
        <div>
            <h3 style={{ color: '#8B0000', marginBottom: '20px' }}>Todos os Usuários</h3>
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Nome</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Tipo</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Vinhos</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} style={{ borderTop: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>{usuario.id}</td>
                                <td style={{ padding: '12px' }}>{usuario.nome}</td>
                                <td style={{ padding: '12px' }}>{usuario.email}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <span style={{
                                        backgroundColor: usuario.tipo_usuario === 'lojista' ? '#28a745' : '#007bff',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}>
                                        {usuario.tipo_usuario}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>{usuario.total_vinhos}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => deleteUser(usuario.id, usuario.nome)}
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            padding: '6px 12px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderLojistas = () => (
        <div>
            <h3 style={{ color: '#8B0000', marginBottom: '20px' }}>Lojistas Cadastrados</h3>
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Nome</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Vinhos</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Estoque Total</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Preço Médio</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lojistas.map((lojista) => (
                            <tr key={lojista.id} style={{ borderTop: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>{lojista.nome}</td>
                                <td style={{ padding: '12px' }}>{lojista.email}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>{lojista.total_vinhos}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>{lojista.estoque_total}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    R$ {parseFloat(lojista.preco_medio || 0).toFixed(2)}
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => deleteUser(lojista.id, lojista.nome)}
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            padding: '6px 12px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderClientes = () => (
        <div>
            <h3 style={{ color: '#8B0000', marginBottom: '20px' }}>Clientes Cadastrados</h3>
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Nome</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id} style={{ borderTop: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>{cliente.id}</td>
                                <td style={{ padding: '12px' }}>{cliente.nome}</td>
                                <td style={{ padding: '12px' }}>{cliente.email}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => deleteUser(cliente.id, cliente.nome)}
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            padding: '6px 12px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderVinhos = () => (
        <div>
            <h3 style={{ color: '#8B0000', marginBottom: '20px' }}>Todos os Vinhos</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '20px'
            }}>
                {vinhos.map((vinho) => (
                    <div key={vinho.id} style={{
                        backgroundColor: 'white',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        padding: '20px'
                    }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#8B0000' }}>{vinho.nome}</h4>
                        <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#28a745' }}>
                            R$ {parseFloat(vinho.preco).toFixed(2)}
                        </p>
                        <p style={{ margin: '10px 0', color: '#666', fontSize: '14px' }}>
                            {vinho.descricao}
                        </p>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                            <p style={{ margin: '5px 0' }}><strong>Tipo:</strong> {vinho.tipo}</p>
                            <p style={{ margin: '5px 0' }}><strong>Estoque:</strong> {vinho.estoque}</p>
                            <p style={{ margin: '5px 0' }}><strong>Lojista:</strong> {vinho.lojista_nome}</p>
                            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {vinho.lojista_email}</p>
                            {vinho.harmonizacao && (
                                <p style={{ margin: '5px 0' }}><strong>Harmonização:</strong> {vinho.harmonizacao}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const tabs = [
        { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
        { id: 'usuarios', label: '👥 Todos Usuários', icon: '👥' },
        { id: 'lojistas', label: '🏪 Lojistas', icon: '🏪' },
        { id: 'clientes', label: '👤 Clientes', icon: '👤' },
        { id: 'vinhos', label: '🍷 Vinhos', icon: '🍷' }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: '#8B0000', margin: 0 }}>🔧 Super Admin Dashboard</h2>
                <div style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }}>
                    SUPER ADMIN
                </div>
            </div>

            {error && (
                <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '20px'
                }}>
                    {error}
                </div>
            )}

            {/* Tabs */}
            <div style={{
                display: 'flex',
                borderBottom: '2px solid #dee2e6',
                marginBottom: '30px',
                gap: '5px',
                flexWrap: 'wrap'
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        style={{
                            padding: '12px 20px',
                            border: 'none',
                            backgroundColor: activeTab === tab.id ? '#8B0000' : 'transparent',
                            color: activeTab === tab.id ? 'white' : '#8B0000',
                            cursor: 'pointer',
                            borderRadius: '6px 6px 0 0',
                            fontSize: '14px',
                            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '30px',
                borderRadius: '8px',
                minHeight: '400px'
            }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <p>Carregando dados...</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'usuarios' && renderUsuarios()}
                        {activeTab === 'lojistas' && renderLojistas()}
                        {activeTab === 'clientes' && renderClientes()}
                        {activeTab === 'vinhos' && renderVinhos()}
                    </>
                )}
            </div>
        </div>
    );
};

export default SuperAdminDashboard;