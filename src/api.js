const API_URL = 'http://localhost:5000/items';

export const fetchItems = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

export const addItem = async (name) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    return res.json();
};

export const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}