import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { wineService } from './services/api';
import SearchForm from './components/SearchForm';
import WineRecommendations from './components/WineRecommendations';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LojistaPanel from './components/LojistaPanel';
import WineGuide from './components/WineGuide';

function AppContent() {
  const [wines, setWines] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLojistaPanel, setShowLojistaPanel] = useState(false);
  const [showWineGuide, setShowWineGuide] = useState(false);
  
  const { user, logout, isLojista } = useAuth();

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchQuery(query);
    
    try {
      const [winesResponse, recommendationsResponse] = await Promise.all([
        wineService.search(query),
        wineService.getRecommendations(query)
      ]);
      
      setWines(winesResponse.data);
      setRecommendations(recommendationsResponse.data);
    } catch (error) {
      console.error('Erro ao buscar vinhos:', error);
      alert('Erro ao buscar vinhos. Tente novamente.');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await wineService.getAll();
        setWines(response.data);
      } catch (error) {
        console.error('Erro ao carregar vinhos:', error);
      }
    };
    
    loadInitialData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{
        backgroundColor: '#8B0000',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h1 style={{ margin: 0, fontSize: '32px' }}>🍷 Vitrine de Vinhos</h1>
            <button
              onClick={() => setShowWineGuide(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              📖 Guia de Vinhos
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {user ? (
              <>
                <span>Olá, {user.nome}!</span>
                {isLojista && (
                  <>
                    <button
                      onClick={() => setShowLojistaPanel(!showLojistaPanel)}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {showLojistaPanel ? '← Voltar' : 'Painel Lojista'}
                    </button>
                  </>
                )}
                <button
                  onClick={logout}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Entrar
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: '#8B0000',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cadastrar
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {showLojistaPanel && isLojista ? (
          <LojistaPanel />
        ) : (
          <>
            <div style={{ textAlign: 'center', margin: '40px 0' }}>
              <h2 style={{ color: '#333', marginBottom: '10px' }}>
                Encontre o vinho perfeito para você
              </h2>
              <p style={{ color: '#666', fontSize: '18px' }}>
                Digite o tipo de vinho que procura e descobriremos as melhores opções e harmonizações
              </p>
            </div>

        <SearchForm onSearch={handleSearch} />

        {loading && (
          <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <p>Buscando vinhos...</p>
          </div>
        )}

        {searchQuery && !loading && (
          <div>
            <h3 style={{ color: '#8B0000', marginBottom: '20px' }}>
              Resultados para "{searchQuery}":
            </h3>
            
            {wines.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                {wines.map((wine) => (
                  <div key={wine.id} style={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#8B0000' }}>{wine.nome}</h4>
                    <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>
                      R$ {parseFloat(wine.preco).toFixed(2)}
                    </p>
                    <p style={{ margin: '10px 0', color: '#666' }}>{wine.descricao}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>
                      <strong>Tipo:</strong> {wine.tipo}
                    </p>
                    {wine.harmonizacao && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Harmonização:</strong> {wine.harmonizacao}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', margin: '40px 0', color: '#666' }}>
                Nenhum vinho encontrado para "{searchQuery}".
              </p>
            )}

            <WineRecommendations recommendations={recommendations} />
          </div>
        )}

        {!searchQuery && !loading && wines.length > 0 && (
          <div>
            <h3 style={{ color: '#8B0000', marginBottom: '20px' }}>
              Nossos Vinhos:
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {wines.slice(0, 6).map((wine) => (
                <div key={wine.id} style={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#8B0000' }}>{wine.nome}</h4>
                  <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>
                    R$ {parseFloat(wine.preco).toFixed(2)}
                  </p>
                  <p style={{ margin: '10px 0', color: '#666' }}>{wine.descricao}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Tipo:</strong> {wine.tipo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
          </>
        )}
      </main>

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showWineGuide && (
        <WineGuide
          onClose={() => setShowWineGuide(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
