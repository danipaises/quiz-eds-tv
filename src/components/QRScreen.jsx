/* ============================================================
   QRScreen — Gera QR Code para conectar tablets
   ============================================================ */
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const S = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    background: '#14141e',
    borderRadius: '16px',
    border: '1px solid #2a2a4e',
  },
  title: {
    color: '#8888a0',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  link: {
    color: '#00f0ff',
    fontSize: '14px',
    textAlign: 'center',
    wordBreak: 'break-all',
    fontFamily: 'monospace',
  },
  hint: {
    color: '#5a5a70',
    fontSize: '11px',
    textAlign: 'center',
  },
};

export default function QRScreen({ baseUrl }) {
  const [tabletUrl, setTabletUrl] = useState('');

  useEffect(() => {
    const url = baseUrl || `${window.location.origin}${window.location.pathname}?view=tablet`;
    setTabletUrl(url);
  }, [baseUrl]);

  if (!tabletUrl) return null;

  return (
    <div style={S.container}>
      <span style={S.title}>📱 Conecte seu tablet</span>
      <QRCodeSVG
        value={tabletUrl}
        size={180}
        bgColor="#14141e"
        fgColor="#00f0ff"
        level="M"
        style={{ border: '2px solid #2a2a4e', borderRadius: '12px', padding: '8px', background: '#14141e' }}
      />
      <span style={S.link}>{tabletUrl}</span>
      <span style={S.hint}>Abra no navegador do tablet ou escaneie o QR Code</span>
    </div>
  );
}
