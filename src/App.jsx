import { useState, useEffect } from 'react';
import axios from 'axios';
// IMPORTANT: Yahan deployment ke baad backend ka URL aayega
const API_URL = "https://backend-quick-share-h198l1edi-beena-anums-projects.vercel.app/";
 // Deployed Backend ka URL env variable se aayega
// Development ke liye
function App() {
const [text, setText] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
useEffect(() => {
fetchData();
}, []);
const fetchData = async () => {
try {

const res = await axios.get(API_URL);
setText(res.data.text);
} catch (err) {
console.error("Fetch error", err);
}
};

const handleSave = async () => {
setLoading(true);
try {
await axios.post(`${API_URL}/save`, { text });
setMessage("✅ Saved for this network!");
setTimeout(() => setMessage(""), 3000);
} catch (err) {
setMessage("❌ Error saving data");
}
setLoading(false);
};

return (
<div style={styles.container}>
<div style={styles.card}>
<h1 style={styles.title}>� QuickShare</h1>
<p style={styles.subtitle}>Jis device par ye page khulega, wahan ye text mil jayega.</p>

<textarea
style={styles.textarea}
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="Kuch type karein..."
/>

<button
onClick={handleSave}
disabled={loading}
style={loading ? {...styles.button, opacity: 0.7} : styles.button}
>
{loading ? "Saving..." : "Save / Sync"}
</button>

{message && <p style={styles.msg}>{message}</p>}
<p style={styles.footer}>Expires in 30 minutes of inactivity</p>
</div>
</div>
);
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px'
  },

  card: {
    width: '100%',
    maxWidth: '550px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px',
    padding: '35px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
    color: '#fff',
    transition: '0.3s ease'
  },

  title: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '10px',
    background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  subtitle: {
    color: '#cbd5e1',
    fontSize: '15px',
    marginBottom: '25px',
    lineHeight: '1.6'
  },

  textarea: {
    width: '100%',
    minHeight: '170px',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    resize: 'none',
    boxSizing: 'border-box',
    transition: '0.3s ease'
  },

  button: {
    width: '100%',
    marginTop: '20px',
    padding: '14px',
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    fontSize: '17px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    transition: '0.3s ease',
    boxShadow: '0 8px 20px rgba(59,130,246,0.35)'
  },

  msg: {
    marginTop: '16px',
    color: '#4ade80',
    fontWeight: '500',
    fontSize: '15px'
  },

  footer: {
    marginTop: '25px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#94a3b8',
    letterSpacing: '1px'
  }
};
export default App;
