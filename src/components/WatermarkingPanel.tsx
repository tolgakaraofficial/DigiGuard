import React, { useState, useEffect } from 'react';
import {
  Shield, FileText, Music, Video, Image as ImageIcon,
  CheckCircle, AlertTriangle, Fingerprint, Lock, Eye,
} from 'lucide-react';
import { generateAssetHash, generateHex } from '../lib/crypto';

interface WatermarkAsset {
  id: string;
  name: string;
  type: 'text' | 'audio' | 'video';
  icon: React.ElementType;
  color: string;
  owner: string;
  watermarkHash: string;
  embedStrength: number;
  integrityScore: number;
  embedded: boolean;
  verified: boolean;
  tampered: boolean;
  license: string;
  details: string;
}

const SAMPLE_ASSETS: WatermarkAsset[] = [
  {
    id: 'asset-text',
    name: 'Cerebro Constitution — Volume 1',
    type: 'text',
    icon: FileText,
    color: '#00e5ff',
    owner: 'Tolga Kara / Karprime Technology',
    watermarkHash: generateAssetHash(),
    embedStrength: 94,
    integrityScore: 99.7,
    embedded: true,
    verified: true,
    tampered: false,
    license: 'Proprietary — All Rights Reserved',
    details: 'Lattice-based watermark embedded across 18,432 text segments. Forensic signature verified via ALBIS-5.',
  },
  {
    id: 'asset-audio',
    name: 'ALBIS Engine Telemetry — Audio Signature',
    type: 'audio',
    icon: Music,
    color: '#39ff14',
    owner: 'Cerebro Network',
    watermarkHash: generateAssetHash(),
    embedStrength: 88,
    integrityScore: 97.2,
    embedded: true,
    verified: true,
    tampered: false,
    license: 'Internal Research — Confidential',
    details: 'Frequency-domain lattice watermark embedded at 14kHz carrier. Inaudible to human perception, extractable via forensic scan.',
  },
  {
    id: 'asset-video',
    name: 'DigiGuard Platform Demo Reel',
    type: 'video',
    icon: Video,
    color: '#f97316',
    owner: 'Karprime Technology Inc.',
    watermarkHash: generateAssetHash(),
    embedStrength: 82,
    integrityScore: 95.8,
    embedded: true,
    verified: false,
    tampered: true,
    license: 'Evaluation License — Non-Commercial',
    details: 'Per-frame lattice watermark detected. Integrity scan flagged 3 frames with anomalous modifications. Forensic audit recommended.',
  },
];

export const WatermarkingPanel: React.FC = () => {
  const [selectedId, setSelectedId] = useState('asset-text');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [waveform, setWaveform] = useState<number[]>(Array.from({ length: 40 }, () => Math.random()));

  const selected = SAMPLE_ASSETS.find((a) => a.id === selectedId)!;

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveform(Array.from({ length: 40 }, (_, i) => {
        const base = Math.sin(i * 0.3 + Date.now() * 0.001) * 0.4 + 0.5;
        return Math.max(0.1, Math.min(0.95, base + (Math.random() - 0.5) * 0.2));
      }));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const runScan = () => {
    setScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return p + 4;
      });
    }, 60);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-amber-400" />
        <h2 className="text-lg font-bold text-white">Digital Watermarking & Forensic Verification</h2>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Lattice-based digital watermarking provides tamper-proof ownership verification for audio, video, and text assets.
        Embedded forensic signatures are extractable via ALBIS-5 without degrading asset quality.
      </p>

      {/* Asset selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SAMPLE_ASSETS.map((asset) => {
          const Icon = asset.icon;
          const isActive = asset.id === selectedId;
          return (
            <button
              key={asset.id}
              onClick={() => setSelectedId(asset.id)}
              className="card p-4 text-left transition-all duration-200 hover:scale-[1.02]"
              style={{
                borderColor: isActive ? `${asset.color}50` : 'rgba(51,65,85,0.4)',
                background: isActive ? `${asset.color}08` : undefined,
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg" style={{ background: `${asset.color}15`, border: `1px solid ${asset.color}30` }}>
                  <Icon className="h-4 w-4" style={{ color: asset.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{asset.name}</p>
                  <p className="text-[9px] text-slate-500 uppercase">{asset.type}</p>
                </div>
                {asset.verified && !asset.tampered ? (
                  <CheckCircle className="h-4 w-4 text-matrix-400 flex-shrink-0" />
                ) : asset.tampered ? (
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${asset.integrityScore}%`, background: asset.tampered ? '#ef4444' : asset.color }} />
                </div>
                <span className="text-[9px] font-mono" style={{ color: asset.tampered ? '#ef4444' : asset.color }}>
                  {asset.integrityScore.toFixed(1)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected asset detail */}
      <div className="card p-5" style={{ borderColor: `${selected.color}25` }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl" style={{ background: `${selected.color}12`, border: `1px solid ${selected.color}30` }}>
              <selected.icon className="h-6 w-6" style={{ color: selected.color }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{selected.name}</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">{selected.owner}</p>
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{
              background: selected.tampered ? 'rgba(239,68,68,0.1)' : 'rgba(57,255,20,0.1)',
              border: `1px solid ${selected.tampered ? 'rgba(239,68,68,0.3)' : 'rgba(57,255,20,0.3)'}`,
            }}
          >
            {selected.tampered ? (
              <>
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-xs font-bold text-red-400">TAMPERED</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-matrix-400" />
                <span className="text-xs font-bold text-matrix-400">VERIFIED</span>
              </>
            )}
          </div>
        </div>

        {/* Forensic details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <ForensicMetric label="Embed Strength" value={`${selected.embedStrength}%`} color={selected.color} />
          <ForensicMetric label="Integrity Score" value={`${selected.integrityScore}%`} color={selected.tampered ? '#ef4444' : '#39ff14'} />
          <ForensicMetric label="Watermark" value={selected.embedded ? 'EMBEDDED' : 'NONE'} color="#a855f7" />
          <ForensicMetric label="License" value={selected.license.split('—')[0].trim()} color="#f59e0b" />
        </div>

        {/* Watermark hash */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 mb-4">
          <Fingerprint className="h-3.5 w-3.5 flex-shrink-0" style={{ color: selected.color }} />
          <span className="text-[9px] text-slate-500 flex-shrink-0">FORENSIC HASH</span>
          <span className="text-[10px] font-mono break-all flex-1" style={{ color: selected.color }}>
            {selected.watermarkHash}
          </span>
        </div>

        {/* Asset preview based on type */}
        {selected.type === 'audio' && (
          <div className="mb-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Music className="h-3 w-3" style={{ color: selected.color }} />
              Audio Waveform with Embedded Watermark
            </p>
            <div className="flex items-center gap-0.5 h-16 bg-slate-950/60 rounded-lg border border-slate-800 p-2">
              {waveform.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all duration-100"
                  style={{
                    height: `${v * 100}%`,
                    background: `linear-gradient(to top, ${selected.color}30, ${selected.color})`,
                  }}
                />
              ))}
            </div>
            <p className="text-[9px] text-slate-600 mt-1 font-mono">Carrier: 14kHz lattice · Inaudible · Forensically extractable</p>
          </div>
        )}

        {selected.type === 'video' && (
          <div className="mb-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Video className="h-3 w-3" style={{ color: selected.color }} />
              Per-Frame Watermark Integrity Map
            </p>
            <div className="grid grid-cols-12 gap-0.5">
              {Array.from({ length: 24 }).map((_, i) => {
                const isTampered = selected.tampered && (i === 7 || i === 14 || i === 15);
                return (
                  <div
                    key={i}
                    className="aspect-video rounded-sm transition-all"
                    style={{
                      background: isTampered ? 'rgba(239,68,68,0.3)' : `${selected.color}20`,
                      border: `1px solid ${isTampered ? 'rgba(239,68,68,0.5)' : `${selected.color}30`}`,
                    }}
                    title={isTampered ? `Frame ${i + 1}: ANOMALY DETECTED` : `Frame ${i + 1}: VERIFIED`}
                  />
                );
              })}
            </div>
            <p className="text-[9px] text-slate-600 mt-1 font-mono">
              {selected.tampered ? '3 frames flagged with anomalous modifications' : 'All 24 frames verified — integrity intact'}
            </p>
          </div>
        )}

        {selected.type === 'text' && (
          <div className="mb-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3" style={{ color: selected.color }} />
              Text Segment Watermark Distribution
            </p>
            <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-sm transition-all"
                    style={{
                      background: `${selected.color}${Math.floor(20 + Math.random() * 60).toString(16)}`,
                      opacity: 0.4 + Math.random() * 0.6,
                    }}
                  />
                ))}
              </div>
              <p className="text-[9px] text-slate-600 mt-2 font-mono">18,432 text segments · Lattice watermark distributed across all segments</p>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 mb-4">
          <p className="text-xs text-slate-300 leading-relaxed">{selected.details}</p>
        </div>

        {/* Scan button */}
        <button
          onClick={runScan}
          disabled={scanning}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: scanning ? `${selected.color}20` : `${selected.color}10`,
            border: `1px solid ${selected.color}40`,
            color: selected.color,
          }}
        >
          {scanning ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Forensic Scan in Progress... {scanProgress}%
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Run Forensic Integrity Scan
            </>
          )}
        </button>

        {scanning && (
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="h-full rounded-full transition-all duration-75" style={{ width: `${scanProgress}%`, background: selected.color }} />
          </div>
        )}

        {!scanning && scanProgress === 100 && (
          <div
            className="mt-3 flex items-center gap-2 p-3 rounded-lg animate-fade-in"
            style={{
              background: selected.tampered ? 'rgba(239,68,68,0.08)' : 'rgba(57,255,20,0.08)',
              border: `1px solid ${selected.tampered ? 'rgba(239,68,68,0.2)' : 'rgba(57,255,20,0.2)'}`,
            }}
          >
            {selected.tampered ? (
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle className="h-4 w-4 text-matrix-400 flex-shrink-0" />
            )}
            <span className="text-xs" style={{ color: selected.tampered ? '#ef4444' : '#39ff14' }}>
              {selected.tampered
                ? 'FORENSIC AUDIT COMPLETE: Integrity violations detected. Tamper-evident watermarking flagged unauthorized modifications.'
                : 'FORENSIC AUDIT COMPLETE: Watermark integrity verified. No tampering detected. Ownership confirmed.'}
            </span>
          </div>
        )}
      </div>

      {/* Watermark technology summary */}
      <div className="card p-4 border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Lock className="h-4 w-4 text-ghost-400" />
          Lattice-Based Watermarking Technology
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TechItem label="Algorithm" value="Lattice-based embedding" color="#a855f7" />
          <TechItem label="Robustness" value="Resists compression, scaling, cropping" color="#00e5ff" />
          <TechItem label="Imperceptibility" value="Below human perception threshold" color="#39ff14" />
          <TechItem label="Verification" value="ALBIS-5 forensic extraction" color="#f59e0b" />
        </div>
      </div>
    </div>
  );
};

const ForensicMetric: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2.5 text-center">
    <p className="text-[8px] text-slate-600 uppercase tracking-wider mb-0.5">{label}</p>
    <p className="text-sm font-mono font-bold" style={{ color }}>{value}</p>
  </div>
);

const TechItem: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
    <div>
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-xs text-white">{value}</p>
    </div>
  </div>
);
