import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';

function Home() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 20, fontWeight: 700 }}>ishro (customer)</div>
      <div style={{ marginTop: 8 }}>VITE_API_URL required.</div>
    </div>
  );
}

function PaymentReturn() {
  const navigate = useNavigate();

  useEffect(() => {
    const sub = CapApp.addListener('appUrlOpen', (event) => {
      const url = event.url || '';
      if (!url.startsWith('ishro-customer://')) return;

      try {
        const parsed = new URL(url);
        if (parsed.host === 'payment-return') {
          const paymentRef = parsed.searchParams.get('paymentRef') || '';
          navigate(`/payment/result?paymentRef=${encodeURIComponent(paymentRef)}`, { replace: true });
        }
      } catch {
      }
    });

    return () => {
      sub.remove();
    };
  }, [navigate]);

  return null;
}

type VerifyState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'success';
      data: {
        merchantReference: string;
        orderId: string;
        paymentStatus: string;
        orderStatus?: string;
        orderPaymentStatus?: string;
        transactionId?: string;
      };
    };

function PaymentResult() {
  const apiBaseUrl = import.meta.env.VITE_API_URL as string | undefined;
  const [params] = useSearchParams();
  const paymentRef = useMemo(() => params.get('paymentRef') || '', [params]);
  const [state, setState] = useState<VerifyState>({ status: 'idle' });

  useEffect(() => {
    if (!apiBaseUrl) {
      setState({ status: 'error', message: 'VITE_API_URL is not set' });
      return;
    }

    if (!paymentRef) {
      setState({ status: 'error', message: 'Missing paymentRef' });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading' });

    fetch(`${apiBaseUrl}/payments/moamalat/verify?paymentRef=${encodeURIComponent(paymentRef)}`)
      .then(async (r) => {
        const body = await r.json().catch(() => null);
        if (!r.ok) {
          const message = body?.message || body?.error || `HTTP ${r.status}`;
          throw new Error(message);
        }
        return body;
      })
      .then((body) => {
        if (cancelled) return;
        const data = body?.data || body;
        setState({
          status: 'success',
          data: {
            merchantReference: String(data.merchantReference || paymentRef),
            orderId: String(data.orderId || ''),
            paymentStatus: String(data.paymentStatus || ''),
            orderStatus: data.orderStatus ? String(data.orderStatus) : undefined,
            orderPaymentStatus: data.orderPaymentStatus ? String(data.orderPaymentStatus) : undefined,
            transactionId: data.transactionId ? String(data.transactionId) : undefined,
          },
        });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setState({ status: 'error', message: e instanceof Error ? e.message : 'Unknown error' });
      });

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, paymentRef]);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>Payment Result</div>
      <div style={{ marginTop: 8, color: '#374151' }}>paymentRef: {paymentRef || '-'}</div>

      <div style={{ marginTop: 12 }}>
        {state.status === 'idle' && <div>Waiting...</div>}
        {state.status === 'loading' && <div>Verifying...</div>}
        {state.status === 'error' && <div style={{ color: '#b91c1c' }}>{state.message}</div>}
        {state.status === 'success' && (
          <div style={{ marginTop: 8 }}>
            <div>paymentStatus: {state.data.paymentStatus}</div>
            <div>orderId: {state.data.orderId}</div>
            <div>orderStatus: {state.data.orderStatus || '-'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <PaymentReturn />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment/result" element={<PaymentResult />} />
      </Routes>
    </BrowserRouter>
  );
}
