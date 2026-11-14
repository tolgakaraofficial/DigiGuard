import React, { useState, useEffect, useCallback } from 'react';
import {
  Cpu, Lock, Fingerprint, Network, Shield, Brain,
  Activity, X, Terminal, ChevronRight, Zap, Gauge,
} from 'lucide-react';
import { generateHex } from '../lib/crypto';

interface AlbisModule {
  id: number;
  name: string;
  function: string;
  icon: React.ElementType;
  color: string;
  status: 'ONLINE' | 'OPTIMAL';
  cpuLoad: number;
  latency: number;
  throughput: number;
  sparkline: number[];
  subroutines: { name: string; status: 'ACTIVE' | 'IDLE' | 'STANDBY'; detail: string }[];
}

const ALBIS_MODULES: Omit<AlbisModule, 'cpuLoad' | 'latency' | 'throughput' | 'sparkline' | 'status'>[] = [
  {
    id: 1,
    name: 'ALBIS-1',
    function: 'Core Ingestion & Consensus',
    icon: Cpu,
    color: '#00e5ff',
    subroutines: [
      { name: 'Entropy Harvester', status: 'ACTIVE', detail: 'Collecting environmental entropy: 3.2k bits/s' },
      { name: 'Payload Sanitizer', status: 'ACTIVE', detail: 'Filtering malformed edge requests' },
      { name: 'Ingress Router', status: 'ACTIVE', detail: 'Routing validated traffic to ALBIS-2' },
      { name: 'Consensus Listener', status: 'IDLE', detail: 'Awaiting DAG tip selection events' },
    ],
  },
  {
    id: 2,
    name: 'ALBIS-2',
    function: 'Post-Quantum Cryptographic Shield',
    icon: Lock,
    color: '#39ff14',
    subroutines: [
      { name: 'Kyber-1024 KEM', status: 'ACTIVE', detail: 'Lattice-based key encapsulation in progress' },
      { name: 'Dilithium Signer', status: 'ACTIVE', detail: 'Quantum-resistant signature generation' },
      { name: 'Key Rotation Engine', status: 'STANDBY', detail: 'Next rotation in 4h 12m' },
      { name: 'AES-256-GCM Cipher', status: 'ACTIVE', detail: 'Symmetric encryption pipeline active' },
    ],
  },
  {
    id: 3,
    name: 'ALBIS-3',
    function: 'Zero-Knowledge Proof Verifier',
    icon: Fingerprint,
    color: '#a855f7',
    subroutines: [
      { name: 'ZK-SNARK Circuit', status: 'ACTIVE', detail: 'Verifying Ghost ID proofs < 12ms' },
      { name: 'Challenge Generator', status: 'ACTIVE', detail: 'Issuing randomized cryptographic challenges' },
      { name: 'Witness Validator', status: 'ACTIVE', detail: 'Checking proof witnesses without PII exposure' },
      { name: 'Proof Cache', status: 'IDLE', detail: '14 cached proofs available for batch verification' },
    ],
  },
  {
    id: 4,
    name: 'ALBIS-4',
    function: 'DAG Topology Orchestrator',
    icon: Network,
    color: '#f97316',
    subroutines: [
      { name: 'Tip Selection', status: 'ACTIVE', detail: 'Resolving DAG tips via MCMC algorithm' },
      { name: 'Vertex Router', status: 'ACTIVE', detail: 'Mapping state events to parent vertices' },
      { name: 'Finality Monitor', status: 'ACTIVE', detail: 'Consensus finality: 47ms avg' },
      { name: 'Topology Sync', status: 'STANDBY', detail: 'Network topology refresh in 2m' },
    ],
  },
  {
    id: 5,
    name: 'ALBIS-5',
    function: 'Lattice Watermarking & Forensics',
    icon: Shield,
    color: '#fbbf24',
    subroutines: [
      { name: 'Watermark Embedder', status: 'ACTIVE', detail: 'Embedding lattice-based integrity seals' },
      { name: 'Forensic Scanner', status: 'ACTIVE', detail: 'Scanning 1,247 assets for tampering' },
      { name: 'Ownership Verifier', status: 'IDLE', detail: 'Awaiting verification requests' },
      { name: 'Tamper Detector', status: 'ACTIVE', detail: '0 integrity violations detected' },
    ],
  },
  {
    id: 6,
    name: 'ALBIS-6',
    function: 'Autonomous Threat Intelligence',
    icon: Brain,
    color: '#ef4444',
    subroutines: [
      { name: 'Cerebro Sentinel AI', status: 'ACTIVE', detail: 'PUKO cycle: Proactive phase' },
      { name: 'Anomaly Detector', status: 'ACTIVE', detail: 'Heuristic scoring: 847 events/min' },
      { name: 'Threat Classifier', status: 'ACTIVE', detail: 'Classifying: quantum probes, deepfakes, phishing' },
      { name: 'Isolation Protocol', status: 'STANDBY', detail: 'No malicious nodes detected' },
    ],
  },
];

function genSparkline(base: number): number[] {
  return Array.from({ length: 20 }, (_, i) => {
    const wave = Math.sin(i * 0.4) * 8 + Math.random() * 6 - 3;
    return Math.max(5, Math.min(95, base + wave));
  });
}

export const AlbisTelemetryGrid: React.FC = () => {
  const [modules, setModules] = useState<AlbisModule[]>(
    ALBIS_MODULES.map((m) => ({
      ...m,
      status: 'ONLINE',
      cpuLoad: 30 + Math.random() * 40,
      latency: 5 + Math.random() * 20,
      throughput: 800 + Math.random() * 1200,
      sparkline: genSparkline(50 + Math.random() * 20),
    }))
  );
  const [selected, setSelected] = useState<AlbisModule | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setModules((prev) =>
        prev.map((m) => {
          const cpuDelta = (Math.random() - 0.5) * 12;
          const newCpu = Math.max(8, Math.min(92, m.cpuLoad + cpuDelta));
          const newSpark = [...m.sparkline.slice(1), Math.max(5, Math.min(95, newCpu + Math.random() * 5 - 2))];
          return {
            ...m,
            cpuLoad: newCpu,
            latency: Math.max(2, Math.min(45, m.latency + (Math.random() - 0.5) * 4)),
            throughput: Math.max(200, Math.min(3000, m.throughput + (Math.random() - 0.5) * 200)),
            status: newCpu < 85 ? 'OPTIMAL' : 'ONLINE',
            sparkline: newSpark,
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const generateLog = useCallback((m: AlbisModule) => {
    const events = [
      `[${new Date().toISOString().split('T')[1].slice(0, 12)}] ${m.name} :: subroutine "${m.subroutines[Math.floor(Math.random() * m.subroutines.length)].name}" cycled OK`,
      `[${new Date().toISOString().split('T')[1].slice(0, 12)}] ${m.name} :: throughput=${Math.round(m.throughput)} tx/s latency=${m.latency.toFixed(1)}ms`,
      `[${new Date().toISOString().split('T')[1].slice(0, 12)}] ${m.name} :: entropy pool refreshed, seal=${generateHex(8).toUpperCase()}`,
      `[${new Date().toISOString().split('T')[1].slice(0, 12)}] ${m.name} :: health check PASSED, neural_load=${m.cpuLoad.toFixed(1)}%`,
    ];
    return events[Math.floor(Math.random() * events.length)];
  }, []);

  useEffect(() => {
    if (!selected) return;
    const interval = setInterval(() => {
      setLogs((prev) => [generateLog(selected), ...prev].slice(0, 12));
    }, 1500);
    return () => clearInterval(interval);
  }, [selected, generateLog]);

  const openDetail = (m: AlbisModule) => {
    setSelected(m);
    setLogs(Array.from({ length: 8 }, () => generateLog(m)));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-cyber-400" />
          <h2 className="text-lg font-bold text-white">ALBIS Engine Telemetry Grid</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400">ALL MODULES ONLINE</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {modules.map((m) => {
          const Icon = m.icon;
          const isOptimal = m.status === 'OPTIMAL';
          return (
            <button
              key={m.id}
              onClick={() => openDetail(m)}
              className="card p-4 text-left transition-all duration-200 hover:scale-[1.02] group"
              style={{ borderColor: `${m.color}25` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg" style={{ background: `${m.color}15`, border: `1px solid ${m.color}30` }}>
                    <Icon className="h-4 w-4" style={{ color: m.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white font-mono">{m.name}</p>
                    <p className="text-[10px] text-slate-500">{m.function}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: isOptimal ? '#39ff14' : m.color }} />
                  <span className="text-[9px] font-mono font-bold" style={{ color: isOptimal ? '#39ff14' : m.color }}>{m.status}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <Metric label="NEURAL" value={`${m.cpuLoad.toFixed(0)}%`} color={m.cpuLoad > 75 ? '#ef4444' : m.color} />
                <Metric label="LATENCY" value={`${m.latency.toFixed(0)}ms`} color={m.latency > 30 ? '#f59e0b' : '#39ff14'} />
                <Metric label="TX/S" value={Math.round(m.throughput).toLocaleString()} color={m.color} />
              </div>

              {/* Sparkline */}
              <div className="flex items-end gap-0.5 h-8 mb-2">
                {m.sparkline.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-300"
                    style={{
                      height: `${v}%`,
                      background: `linear-gradient(to top, ${m.color}40, ${m.color})`,
                      opacity: i === m.sparkline.length - 1 ? 1 : 0.5 + (i / m.sparkline.length) * 0.5,
                    }}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-mono">Live telemetry</span>
                <span className="flex items-center gap-1 text-slate-600 group-hover:text-slate-400 transition-colors">
                  Inspect <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg h-full overflow-y-auto border-l"
            style={{ background: '#0a0f1e', borderColor: `${selected.color}30` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="sticky top-0 z-10 p-5 border-b" style={{ background: '#0a0f1e', borderColor: `${selected.color}20` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg" style={{ background: `${selected.color}15`, border: `1px solid ${selected.color}30` }}>
                    <selected.icon className="h-5 w-5" style={{ color: selected.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">{selected.name}</h3>
                    <p className="text-xs text-slate-400">{selected.function}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Live metrics */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                <Metric label="NEURAL LOAD" value={`${selected.cpuLoad.toFixed(0)}%`} color={selected.color} />
                <Metric label="LATENCY" value={`${selected.latency.toFixed(0)}ms`} color="#39ff14" />
                <Metric label="THROUGHPUT" value={`${Math.round(selected.throughput)}`} color={selected.color} />
                <Metric label="STATUS" value={selected.status} color={selected.status === 'OPTIMAL' ? '#39ff14' : selected.color} />
              </div>
            </div>

            {/* Subroutines */}
            <div className="p-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5" style={{ color: selected.color }} />
                Active Subroutines
              </h4>
              <div className="space-y-2 mb-5">
                {selected.subroutines.map((sr, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: sr.status === 'ACTIVE' ? '#39ff14' : sr.status === 'STANDBY' ? '#f59e0b' : '#64748b',
                          animation: sr.status === 'ACTIVE' ? 'dagPulse 2s ease-in-out infinite' : 'none',
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{sr.name}</span>
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: sr.status === 'ACTIVE' ? 'rgba(57,255,20,0.1)' : sr.status === 'STANDBY' ? 'rgba(245,158,11,0.1)' : 'rgba(100,116,139,0.1)',
                            color: sr.status === 'ACTIVE' ? '#39ff14' : sr.status === 'STANDBY' ? '#f59e0b' : '#94a3b8',
                          }}
                        >
                          {sr.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{sr.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal logs */}
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" style={{ color: selected.color }} />
                Live Terminal Logs
              </h4>
              <div className="rounded-lg bg-black/60 border border-slate-800 p-3 font-mono text-[10px] space-y-1 max-h-64 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="leading-relaxed" style={{ color: i === 0 ? selected.color : '#64748b' }}>
                    <span style={{ opacity: 0.6 }}>$ </span>{log}
                  </div>
                ))}
                <div className="text-slate-600 terminal-blink" style={{ color: selected.color }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Metric: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
    <p className="text-[8px] text-slate-600 uppercase tracking-wider mb-0.5">{label}</p>
    <p className="text-sm font-mono font-bold" style={{ color }}>{value}</p>
  </div>
);
