import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 20, fontWeight: 700 }}>ishro (merchant)</div>
      <div style={{ marginTop: 8 }}>MVP scope: products, orders, sliders, inventory, ads.</div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
