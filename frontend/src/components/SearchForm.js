import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <form onSubmit={handleSubmit} style={{ display: 'inline-flex', gap: '10px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Digite o tipo de vinho (ex: vinho branco)"
                    style={{
                        padding: '12px',
                        fontSize: '16px',
                        width: '300px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        backgroundColor: '#8B0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Buscar
                </button>
            </form>
        </div>
    );
};

export default SearchForm;