import type { CSSProperties } from 'react'
import { atlas } from '../atlas/MouseAtlasAdapter'
import type { BrainRegion } from '../atlas/types'
import { useAppStore } from '../store/useAppStore'

const sectionTitleStyle: CSSProperties = {
  margin: '0 0 6px 0',
  fontSize: 13,
  letterSpacing: 0.5,
  color: '#b7c2d9',
  textTransform: 'uppercase',
}

const coordsRowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 8,
}

function formatMm(value: number): string {
  return `${value.toFixed(2)} mm`
}

export default function InfoPanel() {
  const selectedRegion = useAppStore((state) => state.selectedRegion)
  const setSelectedRegion = useAppStore((state) => state.setSelectedRegion)
  const region: BrainRegion | undefined = selectedRegion
    ? atlas.getRegion(selectedRegion)
    : undefined

  if (!region) {
    return (
      <aside
        style={{
          background: 'rgba(15,15,30,0.9)',
          color: '#e0e4ec',
          borderLeft: '3px solid #4a5366',
          borderRadius: 10,
          padding: 16,
        }}
      >
        Click a brain region to view details
      </aside>
    )
  }

  return (
    <aside
      style={{
        background: 'rgba(15,15,30,0.9)',
        color: '#e0e4ec',
        borderLeft: `3px solid ${region.color}`,
        borderRadius: 10,
        padding: 16,
        display: 'grid',
        gap: 14,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 22 }}>{region.name}</h2>
        <span
          style={{
            alignSelf: 'start',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: '#0c1020',
            background: region.color,
            borderRadius: 999,
            padding: '4px 10px',
          }}
        >
          {region.acronym}
        </span>
      </header>

      <p style={{ margin: 0, color: '#d0d7e8', lineHeight: 1.5 }}>{region.description}</p>

      <section>
        <h3 style={sectionTitleStyle}>Surgical Notes</h3>
        <p style={{ margin: 0, lineHeight: 1.5, color: '#d7def0' }}>
          {region.surgicalNotes}
        </p>
      </section>

      <section>
        <h3 style={sectionTitleStyle}>Connections</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {region.connections.length === 0 ? (
            <span style={{ color: '#97a4be' }}>No listed connections</span>
          ) : (
            region.connections.map((regionId) => (
              <button
                key={regionId}
                type="button"
                onClick={() => setSelectedRegion(regionId)}
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  color: '#e6ebf8',
                  cursor: 'pointer',
                  padding: '4px 10px',
                  fontSize: 12,
                }}
              >
                {regionId}
              </button>
            ))
          )}
        </div>
      </section>

      <section>
        <h3 style={sectionTitleStyle}>Coordinates</h3>
        <div style={coordsRowStyle}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8 }}>
            <div style={{ fontSize: 11, color: '#95a3bf', marginBottom: 2 }}>AP</div>
            <div>{formatMm(region.position[0])}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8 }}>
            <div style={{ fontSize: 11, color: '#95a3bf', marginBottom: 2 }}>ML</div>
            <div>{formatMm(region.position[1])}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8 }}>
            <div style={{ fontSize: 11, color: '#95a3bf', marginBottom: 2 }}>DV</div>
            <div>{formatMm(region.position[2])}</div>
          </div>
        </div>
      </section>
    </aside>
  )
}
