'use client'

export default function DebugCSS() {
  return (
    <div style={{ backgroundColor: '#000', color: '#e8e8e8', padding: '20px', fontFamily: 'monospace' }}>
      <h1>CSS Debug Test</h1>
      
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #6366f1' }}>
        <h2 style={{ color: '#6366f1' }}>✓ Inline Styles Working</h2>
      </div>

      <div className="card" style={{ marginTop: '20px', padding: '20px' }}>
        <h2 style={{ color: '#818cf8' }}>✓ Card Class Applied</h2>
        <p>This should have the .card class styles</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Animation Test</h2>
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '20px', 
          border: '1px solid #2d2d2d',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          ✓ Fade-in animation should play
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Status Badges</h2>
        <span className="status-badge status-scheduled">Scheduled</span>
        <span className="status-badge status-in-flight" style={{ marginLeft: '10px' }}>In Flight</span>
      </div>
    </div>
  )
}
