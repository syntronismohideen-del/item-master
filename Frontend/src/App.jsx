import React ,{ useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';

const API = 'https://crud-01-elfw.onrender.com/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock_quantity: 0,
  });
const fetchItems = async () => {
    try {
      const res = await axios.get(API);
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editItem) {
      await axios.put(`${API}/${editItem.id}`, form);
    } else {
      await axios.post(API, form);
    }
    await fetchItems();
    setOpen(false);
    setForm({
      name: '',
      category: '',
      price: '',
      description: '',
      stock_quantity: 0,
    });
    setEditItem(null);
  } catch (err) {
    console.error('SAVE ERROR', err);
    alert('Saving failed. Check console for error.');
  }
};


  const handleEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name || '',
      category: item.category || '',
      price: item.price || '',
      description: item.description || '',
      stock_quantity: item.stock_quantity || 0,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      await fetchItems();
    } catch (err) {
      console.error(err);
      alert('Failed to delete item');
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        background: 'linear-gradient(100deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
      }}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography
          variant="h3"
          style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}
        >
          Item Master 
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          style={{ marginBottom: '2rem', background: 'gold' }}
        >
          Add New Item
        </Button>

        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <CardContent>
                    <Typography variant="h5">{item.name}</Typography>
                    {item.category && (
                      <Chip
                        label={item.category}
                        color="primary"
                        style={{ margin: '0.5rem 0' }}
                      />
                    )}
                    {item.price !== undefined && (
                      <Typography>💰 {item.price}</Typography>
                    )}
                    {item.description && (
                      <Typography>📝 {item.description}</Typography>
                    )}
                    <Typography>📦 Stock: {item.stock_quantity}</Typography>
                    <div style={{ marginTop: '1rem' }}>
                      <Button
                        startIcon={<Edit />}
                        onClick={() => handleEdit(item)}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        startIcon={<Delete />}
                        onClick={() => handleDelete(item.id)}
                        color="error"
                        size="small"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Stock Quantity"
              type="number"
              value={form.stock_quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock_quantity: parseInt(e.target.value || '0', 10),
                })
              }
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Item
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default App;
