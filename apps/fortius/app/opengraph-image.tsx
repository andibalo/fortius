import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Fortius Esports — Fight. Dominate. Win.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, #9b00e8 0%, transparent 70%)',
            opacity: 0.4,
            borderRadius: '50%',
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(155,0,232,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(155,0,232,0.07) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Dot */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#9b00e8',
            }}
          />
          <span style={{ color: '#ffffff', fontSize: '18px', letterSpacing: '0.3em', fontWeight: 700 }}>
            FORTIUS ESPORTS
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', zIndex: 1 }}>
          <span
            style={{
              fontSize: '140px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
            }}
          >
            FIGHT.
          </span>
          <span
            style={{
              fontSize: '140px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
            }}
          >
            DOMINATE.
          </span>
          <span
            style={{
              fontSize: '140px',
              fontWeight: 900,
              color: '#9b00e8',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
            }}
          >
            WIN.
          </span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #9b00e8, transparent)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
