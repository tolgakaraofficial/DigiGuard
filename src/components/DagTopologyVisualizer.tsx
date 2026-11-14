import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Network, Cpu, CheckCircle, Activity, Layers, Zap, X,
} from 'lucide-react';

interface DagNode {
  id: string;
  x: number;
  y: number;
  type: 'validator' | 'relay' | 'sentinel';
  parents: string[];
  active: boolean;
  confirming: boolean;
  confirmed: boolean;
  depth: number;
}

const NODE_TYPES = {
  validator: { color: '#00e5ff', icon: CheckCircle, label: 'Validator' },
  relay: { color: '#f97316', icon: Network, label: 'Relay' },
  sentinel: { color: '#39ff14', icon: Cpu, label: 'Sentinel' },
};

function generateDag(): DagNode[] {
  const nodes: DagNode[] = [];
  const cols = 6;
  const rows = 4;
  let id = 0;

  for (let c = 0; c < cols; c++) {
    const nodesInCol = c === 0 ? 2 : c < cols - 1 ? rows : 1;
    for (let r = 0; r < nodesInCol; r++) {
      const x = 10 + (c / (cols - 1)) * 80;
      const y = 15 + (r / Math.max(1, nodesInCol - 1)) * 70;
      const parents: string[] = [];

      if (c === 0) {
        parents.push('genesis');
      } else {
        const prevColNodes = nodes.filter((n) => n.depth === c - 1);
        const numParents = Math.min(2, prevColNodes.length);
        for (let i = 0; i < numParents; i++) {
          const parent = prevColNodes[Math.floor(Math.random() * prevColNodes.length)];
          if (!parents.includes(parent.id)) parents.push(parent.id);
        }
      }

      const type: DagNode['type'] = c % 3 === 0 ? 'sentinel' : c % 2 === 0 ? 'validator' : 'relay';
      nodes.push({
        id: `n${id}`,
        x, y,
        type,
        parents,
        active: true,
        confirming: false,
        confirmed: c < 2,
        depth: c,
      });
      id++;
    }
  }
  return nodes;
}

export const DagTopologyVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<DagNode[]>(generateDag);
  const [stats, setStats] = useState({ activeNodes: 0, dagDepth: 6, finalityTime: 47, txPending: 0, tps: 0 });
  const [selectedNode, setSelectedNode] = useState<DagNode | null>(null);
  const [tick, setTick] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        if (next[idx]) {
          next[idx] = {
            ...next[idx],
            confirming: !next[idx].confirmed && Math.random() > 0.5,
            confirmed: next[idx].confirmed || (Math.random() > 0.7 && next[idx].depth > 1),
          };
        }
        return next;
      });
      setTick((t) => t + 1);
      setStats((s) => ({
        ...s,
        activeNodes: nodes.filter((n) => n.active).length,
        finalityTime: 35 + Math.random() * 25,
        tps: 1200 + Math.random() * 1800,
        txPending: Math.floor(Math.random() * 50),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, [nodes]);

  const nodeColor = useCallback((n: DagNode) => NODE_TYPES[n.type].color, []);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Network className="h-5 w-5 text-dag-400" />
        <h2 className="text-lg font-bold text-white">DAG Topology & Serverless Network Visualizer</h2>
      </div>

      {/* Network metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <NetMetric label="Active Nodes" value={stats.activeNodes.toString()} icon={Activity} color="#00e5ff" />
        <NetMetric label="DAG Depth" value={stats.dagDepth.toString()} icon={Layers} color="#f97316" />
        <NetMetric label="Finality Time" value={`${stats.finalityTime.toFixed(0)}ms`} icon={Zap} color="#39ff14" />
        <NetMetric label="Throughput" value={`${Math.round(stats.tps).toLocaleString()} tx/s`} icon={Cpu} color="#a855f7" />
      </div>

      {/* DAG Visualization */}
      <div className="card p-4 dag-border dag-glow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-white">Asynchronous DAG Consensus</span>
          <div className="flex items-center gap-3">
            {Object.entries(NODE_TYPES).map(([key, val]) => {
              const Icon = val.icon;
              return (
                <div key={key} className="flex items-center gap-1">
                  <Icon className="h-3 w-3" style={{ color: val.color }} />
                  <span className="text-[9px] text-slate-500 font-mono">{val.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative w-full aspect-[16/10] bg-slate-950/60 rounded-lg border border-slate-800 overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Genesis node marker */}
            <line x1="5" y1="50" x2="10" y2="25" stroke="rgba(0,229,255,0.15)" strokeWidth="0.2" strokeDasharray="0.5,0.5" />
            <line x1="5" y1="50" x2="10" y2="65" stroke="rgba(0,229,255,0.15)" strokeWidth="0.2" strokeDasharray="0.5,0.5" />
            <circle cx="5" cy="50" r="1.2" fill="#00e5ff" opacity="0.4" />

            {/* Edges */}
            {nodes.map((n) =>
              n.parents.filter((p) => p !== 'genesis').map((pid) => {
                const parent = nodes.find((pn) => pn.id === pid);
                if (!parent) return null;
                const color = nodeColor(n);
                const active = n.confirming || (n.confirmed && tick % 4 < 2);
                return (
                  <line
                    key={`${n.id}-${pid}`}
                    x1={parent.x}
                    y1={parent.y}
                    x2={n.x}
                    y2={n.y}
                    stroke={active ? color : 'rgba(100,116,139,0.15)'}
                    strokeWidth="0.25"
                    strokeDasharray={n.confirming ? '0.8,0.4' : undefined}
                    opacity={active ? 0.6 : 0.15}
                  >
                    {n.confirming && (
                      <animate attributeName="stroke-dashoffset" from="0" to="-2" dur="0.5s" repeatCount="indefinite" />
                    )}
                  </line>
                );
              })
            )}

            {/* Nodes */}
            {nodes.map((n) => {
              const color = nodeColor(n);
              const Icon = NODE_TYPES[n.type].icon;
              return (
                <g
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Pulse ring for confirming nodes */}
                  {n.confirming && (
                    <circle cx={n.x} cy={n.y} r="3" fill="none" stroke={color} strokeWidth="0.15" opacity="0.5">
                      <animate attributeName="r" from="2" to="5" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.confirmed ? 1.8 : 1.5}
                    fill={n.confirmed ? color : `${color}40`}
                    stroke={color}
                    strokeWidth="0.2"
                    opacity={n.active ? 1 : 0.4}
                  >
                    {n.confirming && (
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
                    )}
                  </circle>
                  {n.confirmed && (
                    <circle cx={n.x} cy={n.y} r="0.6" fill="#ffffff" opacity="0.8" />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Live indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 border border-slate-800">
            <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
            <span className="text-[9px] font-mono text-slate-400">LIVE · ASYNC CONSENSUS</span>
          </div>

          {/* Tick counter */}
          <div className="absolute bottom-3 left-3 text-[9px] font-mono text-slate-600">
            tick: {tick} · vertices: {nodes.length}
          </div>
        </div>

        <p className="text-[10px] text-slate-500 mt-3 text-center">
          Directed Acyclic Graph — no miners, no blocks. Each vertex validates prior unconfirmed events in parallel. Finality in &lt; 50ms.
        </p>
      </div>

      {/* Pending transactions */}
      <div className="card p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-white">Pending Vertex Pool</span>
          <span className="text-[10px] font-mono text-slate-500">{stats.txPending} awaiting confirmation</span>
        </div>
        <div className="flex items-end gap-0.5 h-12">
          {Array.from({ length: 30 }).map((_, i) => {
            const h = 20 + Math.sin(i * 0.3 + tick * 0.2) * 15 + Math.random() * 20;
            return (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all duration-300"
                style={{
                  height: `${Math.max(5, h)}%`,
                  background: `linear-gradient(to top, ${i < 20 ? '#00e5ff30' : '#f9731630'}, ${i < 20 ? '#00e5ff' : '#f97316'})`,
                  opacity: 0.4 + (i / 30) * 0.6,
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-slate-600">
          <span>Confirmed</span>
          <span>Pending</span>
        </div>
      </div>

      {/* Node detail popup */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedNode(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative max-w-sm w-full rounded-xl border p-5"
            style={{ background: '#0a0f1e', borderColor: `${nodeColor(selectedNode)}30` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${nodeColor(selectedNode)}15`, border: `1px solid ${nodeColor(selectedNode)}30` }}>
                  {React.createElement(NODE_TYPES[selectedNode.type].icon, { className: 'h-5 w-5', style: { color: nodeColor(selectedNode) } })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">{selectedNode.id.toUpperCase()}</h3>
                  <p className="text-[10px] text-slate-500">{NODE_TYPES[selectedNode.type].label} Node</p>
                </div>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              <DetailRow label="Type" value={NODE_TYPES[selectedNode.type].label} color={nodeColor(selectedNode)} />
              <DetailRow label="Depth" value={`Layer ${selectedNode.depth}`} color="#00e5ff" />
              <DetailRow label="Parent Vertices" value={selectedNode.parents.length.toString()} color="#f97316" />
              <DetailRow label="Status" value={selectedNode.confirmed ? 'CONFIRMED' : selectedNode.confirming ? 'CONFIRMING' : 'PENDING'} color={selectedNode.confirmed ? '#39ff14' : '#f59e0b'} />
              <DetailRow label="Consensus" value="Asynchronous DAG" color="#a855f7" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NetMetric: React.FC<{ label: string; value: string; icon: React.ElementType; color: string }> = ({ label, value, icon: Icon, color }) => (
  <div className="card p-3 border border-slate-800">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="h-3.5 w-3.5" style={{ color }} />
      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-lg font-bold text-white font-mono">{value}</p>
  </div>
);

const DetailRow: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
    <span className="text-[11px] text-slate-500">{label}</span>
    <span className="text-[11px] font-mono font-bold" style={{ color }}>{value}</span>
  </div>
);
