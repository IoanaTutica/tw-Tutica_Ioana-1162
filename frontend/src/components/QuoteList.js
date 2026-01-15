import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteList = ({ onLogout }) => {
    const [quotes, setQuotes] = useState([]);
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [translation, setTranslation] = useState('');

    const fetchQuotes = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:8080/api/quotes', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQuotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const addQuote = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8080/api/quotes', 
                { text, author }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setText('');
            setAuthor('');
            fetchQuotes();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteQuote = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/quotes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchQuotes();
        } catch (err) {
            console.error(err);
        }
    };

    const translateQuote = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`http://localhost:8080/api/quotes/${id}/translate?lang=ro`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTranslation(`Traducere: ${res.data.translated}`);
            alert(`Original: ${res.data.original}\nTraducere: ${res.data.translated}`);
        } catch (err) {
            console.error(err);
            alert('Eroare la traducere');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Lista Citate</h2>
                <button onClick={onLogout} style={{ padding: '5px 10px' }}>Logout</button>
            </div>

            <form onSubmit={addQuote} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                <h3>Adauga Citat</h3>
                <input
                    type="text"
                    placeholder="Textul citatului"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px 15px' }}>Adauga</button>
            </form>

            {translation && <p style={{ padding: '10px', background: '#e0f7fa' }}>{translation}</p>}

            <div>
                {quotes.map(quote => (
                    <div key={quote.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                        <p style={{ fontStyle: 'italic' }}>"{quote.text}"</p>
                        <p><strong>- {quote.author}</strong></p>
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={() => translateQuote(quote.id)} style={{ marginRight: '10px' }}>
                                Traduce in RO
                            </button>
                            <button onClick={() => deleteQuote(quote.id)} style={{ color: 'red' }}>
                                Sterge
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuoteList;