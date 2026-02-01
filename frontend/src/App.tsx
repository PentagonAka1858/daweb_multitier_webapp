import { useState, useEffect } from 'react';

type Greeting = {
  id: number;
  name: string;
};

export default function LandingPage() {
  const [greeting, setGreeting] = useState<Greeting>();

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(setGreeting)
      .catch(console.error);
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #581c87 0%, #1e3a8a 50%, #312e81 100%)'
  };

  const blobContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3
  };

  const blob1Style = {
    position: 'absolute',
    top: 0,
    left: '-1rem',
    width: '18rem',
    height: '18rem',
    backgroundColor: '#a855f7',
    borderRadius: '9999px',
    mixBlendMode: 'multiply',
    filter: 'blur(64px)',
    animation: 'blob 7s infinite'
  };

  const blob2Style = {
    ...blob1Style,
    left: 'auto',
    right: '-1rem',
    backgroundColor: '#eab308',
    animationDelay: '2s'
  };

  const blob3Style = {
    ...blob1Style,
    top: 'auto',
    bottom: '-2rem',
    left: '5rem',
    backgroundColor: '#ec4899',
    animationDelay: '4s'
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '3.75rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.5rem',
    textShadow: '0 10px 15px rgba(0, 0, 0, 0.3)'
  };

  const nameStyle = {
    fontSize: '1.875rem',
    color: '#e5e7eb',
    textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const loadingStyle = {
    fontSize: '1.5rem',
    color: '#d1d5db',
    animation: 'pulse 2s infinite'
  };

  return (
    <div style={containerStyle}>
      {/* Animated background */}
      <div style={backgroundStyle}>
        <div style={blobContainerStyle}>
          <div style={blob1Style}></div>
          <div style={blob2Style}></div>
          <div style={blob3Style}></div>
        </div>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <h1 style={titleStyle}>
          Welcome
        </h1>
        {greeting ? (
          <p style={nameStyle}>
            {greeting.name}
          </p>
        ) : (
          <p style={loadingStyle}>
            Loading...
          </p>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
