"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ── Palette ────────────────────────────────────────────────────────────────────
const NAVY = "#1e3a5f";
const GOLD = "#c4a76d";
const COLORS = ["#1e3a5f", "#c4a76d", "#2d5a8e", "#8c6e35", "#065f46", "#92400e", "#3730a3", "#6b7280"];

// ── Formatters ─────────────────────────────────────────────────────────────────
const fmtEur = (v: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

const fmtK = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k€` : `${v}€`;

// ── Tooltip personnalisé ───────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "white", border: "1.5px solid #e2ddd5", borderRadius: 10, padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,.1)", fontSize: 13 }}>
      <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#071827" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ margin: "2px 0", color: p.color, fontWeight: 600 }}>
          {p.name} : {typeof p.value === "number" && p.value > 100 ? fmtEur(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

// ── Graphique évolution CA (Area) ──────────────────────────────────────────────
export function EvolutionCAChart({ data }: { data: Array<{ mois: string; ca: number; commissions: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradCA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={NAVY} stopOpacity={0.15} />
            <stop offset="95%" stopColor={NAVY} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradComm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={GOLD} stopOpacity={0.2} />
            <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" vertical={false} />
        <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#5c6a76" }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmtK} tick={{ fontSize: 11, fill: "#5c6a76" }} axisLine={false} tickLine={false} width={48} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Area type="monotone" dataKey="ca" name="CA primes" stroke={NAVY} strokeWidth={2.5} fill="url(#gradCA)" dot={false} activeDot={{ r: 5 }} />
        <Area type="monotone" dataKey="commissions" name="Commissions" stroke={GOLD} strokeWidth={2} fill="url(#gradComm)" dot={false} activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Graphique contrats mensuels (Bar) ──────────────────────────────────────────
export function ContratsChart({ data }: { data: Array<{ mois: string; contrats: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" vertical={false} />
        <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#5c6a76" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#5c6a76" }} axisLine={false} tickLine={false} width={28} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="contrats" name="Nouveaux contrats" fill={NAVY} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Graphique répartition par assureur (Bar horizontal) ───────────────────────
export function AssureurChart({ data }: { data: Array<{ assureur: string; ca: number; part: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" horizontal={false} />
        <XAxis type="number" tickFormatter={fmtK} tick={{ fontSize: 11, fill: "#5c6a76" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="assureur" tick={{ fontSize: 12, fill: "#071827", fontWeight: 600 }} axisLine={false} tickLine={false} width={110} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="ca" name="CA" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Graphique répartition par produit (Pie) ────────────────────────────────────
export function ProduitPieChart({ data }: { data: Array<{ produit: string; ca: number; part: number }> }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="ca"
          nameKey="produit"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={55}
          paddingAngle={3}
          label={(props) => { const p = (props as unknown as { part?: number }).part; return p ? `${p}%` : ''; }}
          labelLine={false}
        >
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(v) => fmtEur(Number(v))} />
        <Legend
          formatter={(value) => <span style={{ fontSize: 12, color: "#071827" }}>{value}</span>}
          wrapperStyle={{ paddingTop: 8 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// ── Tunnel de conversion (Bar) ─────────────────────────────────────────────────
export function TunnelChart({ data }: { data: Array<{ etape: string; nombre: number; taux: number; couleur: string }> }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" horizontal={false} />
        <XAxis type="number" domain={[0, "dataMax"]} tick={{ fontSize: 11, fill: "#5c6a76" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="etape" tick={{ fontSize: 12, fill: "#071827", fontWeight: 600 }} axisLine={false} tickLine={false} width={140} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="nombre" name="Nombre" radius={[0, 6, 6, 0]}>
          {data.map((entry, i) => <Cell key={i} fill={entry.couleur} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Gauge de rétention (simple) ────────────────────────────────────────────────
export function RetentionGauge({ taux }: { taux: number }) {
  const data = [
    { name: "Retenus", value: taux, fill: "#065f46" },
    { name: "Perdus", value: 100 - taux, fill: "#fee2e2" },
  ];
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="80%"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
        </Pie>
        <text x="50%" y="72%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 28, fontWeight: 800, fill: "#071827" }}>
          {taux.toFixed(1)}%
        </text>
        <text x="50%" y="82%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 12, fill: "#5c6a76", fontWeight: 600 }}>
          Taux de rétention
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}
