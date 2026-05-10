import { useEffect, useState } from "react";
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';

type TabId = "graficos" | "tabla" | "proyectos";

interface Project {
  id: number;
  nombre: string;
  estado: "En Progreso" | "Completado" | "Planificado";
  fechaInicio: string;
  fechaFin: string;
  responsable: string;
}

interface AnalysisRow {
  id: number;
  fecha: string;
  sentimiento: "Positivo" | "Neutral" | "Negativo";
  confianza: string;
  texto: string;
  palabrasClave: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    nombre: "Rediseño Web Corporativa",
    estado: "En Progreso",
    fechaInicio: "2026-04-01",
    fechaFin: "2026-06-30",
    responsable: "María García",
  },
  {
    id: 2,
    nombre: "App Móvil iOS",
    estado: "Completado",
    fechaInicio: "2026-01-15",
    fechaFin: "2026-04-20",
    responsable: "Carlos Ruiz",
  },
  {
    id: 3,
    nombre: "Sistema CRM",
    estado: "Planificado",
    fechaInicio: "2026-06-01",
    fechaFin: "2026-09-30",
    responsable: "Ana Martínez",
  },
];

const STATUS_STYLES: Record<Project["estado"], { bg: string; text: string; label: string }> = {
  "En Progreso": { bg: "bg-blue-100", text: "text-blue-700", label: "En Progreso" },
  Completado: { bg: "bg-green-100", text: "text-green-800", label: "Completado" },
  Planificado: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Planificado" },
};

const ANALYSIS_ROWS: AnalysisRow[] = [
  {
    id: 1,
    fecha: "2026-05-06",
    sentimiento: "Positivo",
    confianza: "92%",
    texto: "Excelente servicio, muy profesional y rápido",
    palabrasClave: ["excelente", "profesional", "rápido"],
  },
  {
    id: 2,
    fecha: "2026-05-06",
    sentimiento: "Positivo",
    confianza: "88%",
    texto: "La calidad del producto superó mis expectativas",
    palabrasClave: ["calidad", "producto"],
  },
  {
    id: 3,
    fecha: "2026-05-05",
    sentimiento: "Neutral",
    confianza: "65%",
    texto: "El servicio es aceptable, nada excepcional",
    palabrasClave: ["servicio", "aceptable"],
  },
  {
    id: 4,
    fecha: "2026-05-05",
    sentimiento: "Negativo",
    confianza: "78%",
    texto: "La entrega tardó más de lo esperado",
    palabrasClave: ["entrega", "tardó"],
  },
  {
    id: 5,
    fecha: "2026-05-04",
    sentimiento: "Positivo",
    confianza: "95%",
    texto: "Totalmente recomendado, atención al cliente impecable",
    palabrasClave: ["recomendado", "atención", "impecable"],
  },
];

const SENTIMENT_STYLES: Record<AnalysisRow["sentimiento"], { bg: string; text: string }> = {
  Positivo: { bg: "bg-[#DCFCE7]", text: "text-[#15803D]" },
  Neutral: { bg: "bg-[#FEF3C7]", text: "text-[#A16207]" },
  Negativo: { bg: "bg-[#FEE2E2]", text: "text-[#DC2626]" },
};

type ChartDatum = {
  label: string;
  count: number;
  percentage: number;
  color: string;
};

type HoverInfo = {
  label: string;
  count: number;
  percentage: number;
  color: string;
};

const SENTIMENT_CHART_DATA: ChartDatum[] = [
  { label: "Positivo", count: 160, percentage: 52, color: "#3B82F6" },
  { label: "Neutral", count: 100, percentage: 33, color: "#F59E0B" },
  { label: "Negativo", count: 46, percentage: 15, color: "#EF4444" },
];

const BAR_TICKS = [0, 40, 80, 120, 160];

function describePieSlice(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const startRadians = (Math.PI / 180) * startAngle;
  const endRadians = (Math.PI / 180) * endAngle;
  const startX = cx + radius * Math.cos(startRadians);
  const startY = cy + radius * Math.sin(startRadians);
  const endX = cx + radius * Math.cos(endRadians);
  const endY = cy + radius * Math.sin(endRadians);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    "Z",
  ].join(" ");
}

function ChartInfoCard({ info }: { info: HoverInfo | null }) {
  if (!info) {
    return (
      <div className="rounded-[12px] border border-dashed border-[#C7D2FE] bg-[#F8FAFC] px-4 py-3 text-sm text-[#64748B]">
        Pasa el mouse por una barra o una porción para ver sus valores.
      </div>
    );
  }

  return (
    <div className="rounded-[12px] border border-[#E2E8F0] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: info.color }} />
        <span className="text-sm font-semibold text-[#0F172B]">{info.label}</span>
      </div>
      <div className="mt-2 flex items-center gap-4 text-sm text-[#475569]">
        <span>
          Cantidad: <strong className="text-[#0F172B]">{info.count}</strong>
        </span>
        <span>
          Porcentaje: <strong className="text-[#0F172B]">{info.percentage}%</strong>
        </span>
      </div>
    </div>
  );
}

function SentimentBars({
  onHover,
  onClear,
}: {
  onHover: (info: HoverInfo) => void;
  onClear: () => void;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative h-[340px] sm:h-[280px] overflow-visible rounded-[12px] border border-[#E2E8F0] bg-white px-4 pt-4 pb-10">
      <div className="absolute inset-x-4 top-4 bottom-10">
        {BAR_TICKS.map((tick) => (
          <div
            key={tick}
            className="absolute left-10 right-0 border-t border-dashed border-[#E5EAF3]"
            style={{ bottom: `${(tick / 160) * 100}%` }}
          >
            <span className="absolute -left-9 -top-2 text-xs font-medium text-[#64748B]">
              {tick}
            </span>
          </div>
        ))}

        <div className="absolute inset-x-10 top-0 bottom-0 flex items-end gap-5">
          {SENTIMENT_CHART_DATA.map((item, index) => {
            const barHeight = `${(item.count / 160) * 100}%`;

            return (
              <button
                key={item.label}
                type="button"
                title={`${item.label}: ${item.count} (${item.percentage}%)`}
                onMouseEnter={() => onHover(item)}
                onMouseLeave={onClear}
                onFocus={() => onHover(item)}
                onBlur={onClear}
                className="group relative flex h-full flex-1 flex-col items-center justify-end outline-none"
              >
                <div
                  className="w-[78%] rounded-t-[10px] shadow-[0_8px_18px_rgba(59,130,246,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{
                    height: barHeight,
                    backgroundColor: item.color,
                    transform: animate ? "scaleY(1)" : "scaleY(0.08)",
                    transformOrigin: "bottom",
                    transitionDelay: `${index * 120}ms`,
                  }}
                />

                <div
                  className={`absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 rounded-[10px] border border-[#E2E8F0] bg-white px-3 py-2 text-left text-sm shadow-lg transition-all duration-200 ${
                    animate ? "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0" : "opacity-0"
                  }`}
                >
                  <div className="font-semibold text-[#0F172B]">{item.label}</div>
                  <div className="mt-1 text-[#3B82F6]">Cantidad: {item.count}</div>
                </div>

                <span className="mt-3 text-sm font-medium text-[#475569]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm text-[#3B82F6]">
        <span className="h-3 w-3 rounded-[2px] bg-[#3B82F6]" />
        Cantidad
      </div>
    </div>
  );
}

function SentimentPie({
  onHover,
  onClear,
}: {
  onHover: (info: HoverInfo) => void;
  onClear: () => void;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const cx = 170;
  const cy = 118;
  const radius = 78;
  const labelRadius = 122;
  const total = SENTIMENT_CHART_DATA.reduce((sum, item) => sum + item.count, 0);

  let currentAngle = -90;

  return (
    <div className="relative h-[340px] sm:h-[280px] overflow-visible rounded-[12px] border border-[#E2E8F0] bg-white px-4 pt-4 pb-6">
      <svg viewBox="0 0 360 240" className="h-full w-full overflow-visible">
        {SENTIMENT_CHART_DATA.map((item, index) => {
          const sliceAngle = (item.count / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;
          currentAngle = endAngle;

          const midAngle = startAngle + sliceAngle / 2;
          const radians = (Math.PI / 180) * midAngle;
          const labelX = cx + labelRadius * Math.cos(radians);
          const labelY = cy + labelRadius * Math.sin(radians);
          const labelAnchor = labelX >= cx ? "start" : "end";

          return (
            <g key={item.label}>
              <path
                d={describePieSlice(cx, cy, radius, startAngle, endAngle)}
                fill={item.color}
                stroke="#FFFFFF"
                strokeWidth="1.5"
                tabIndex={0}
                role="img"
                aria-label={`${item.label}: ${item.count} (${item.percentage}%)`}
                onMouseEnter={() => onHover(item)}
                onMouseLeave={onClear}
                onFocus={() => onHover(item)}
                onBlur={onClear}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "transform 700ms ease, opacity 700ms ease",
                  transitionDelay: `${index * 120}ms`,
                  transform: animate ? "scale(1)" : "scale(0.1)",
                  opacity: animate ? 1 : 0.35,
                  cursor: "pointer",
                }}
              />
              <title>{`${item.label}: ${item.count} (${item.percentage}%)`}</title>
              <text
                x={labelX}
                y={labelY}
                fill={item.color}
                fontSize="12"
                fontWeight="500"
                textAnchor={labelAnchor}
                dominantBaseline="middle"
              >
                {item.label}: {item.percentage}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function BrainIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M16 6.66667C16.0016 6.13337 15.8965 5.60515 15.6909 5.11307C15.4854 4.62098 15.1835 4.17497 14.803 3.80126C14.4226 3.42755 13.9712 3.1337 13.4755 2.93697C12.9799 2.74025 12.4498 2.64464 11.9167 2.65575C11.3835 2.66686 10.8579 2.78448 10.3708 3.00169C9.88379 3.21889 9.44509 3.5313 9.08053 3.92054C8.71598 4.30977 8.43294 4.76798 8.24807 5.2682C8.06319 5.76843 7.98021 6.30057 8.004 6.83333C7.22027 7.03485 6.49267 7.41207 5.87631 7.93642C5.25994 8.46077 4.77098 9.1185 4.44646 9.8598C4.12193 10.6011 3.97034 11.4065 4.00318 12.2151C4.03602 13.0236 4.25242 13.8141 4.636 14.5267C3.96157 15.0746 3.43123 15.779 3.09112 16.5786C2.751 17.3782 2.61141 18.2488 2.68448 19.1146C2.75756 19.9805 3.04109 20.8154 3.5104 21.5467C3.97972 22.278 4.62062 22.8835 5.37733 23.3107C5.28389 24.0336 5.33965 24.7681 5.54118 25.4687C5.74271 26.1693 6.08573 26.8211 6.54904 27.3839C7.01236 27.9468 7.58614 28.4086 8.23496 28.741C8.88377 29.0734 9.59383 29.2692 10.3213 29.3164C11.0488 29.3637 11.7782 29.2612 12.4645 29.0155C13.1508 28.7697 13.7795 28.3859 14.3117 27.8877C14.8439 27.3895 15.2682 26.7874 15.5586 26.1188C15.849 25.4501 15.9992 24.729 16 24V6.66667Z" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6.66667C15.9984 6.13337 16.1035 5.60515 16.3091 5.11307C16.5146 4.62098 16.8165 4.17497 17.197 3.80126C17.5774 3.42755 18.0288 3.1337 18.5245 2.93697C19.0201 2.74025 19.5502 2.64464 20.0833 2.65575C20.6165 2.66686 21.1421 2.78448 21.6292 3.00169C22.1162 3.21889 22.5549 3.5313 22.9195 3.92054C23.284 4.30977 23.5671 4.76798 23.7519 5.2682C23.9368 5.76843 24.0198 6.30057 23.996 6.83333C24.7797 7.03485 25.5073 7.41207 26.1237 7.93642C26.7401 8.46077 27.229 9.1185 27.5535 9.8598C27.8781 10.6011 28.0297 11.4065 27.9968 12.2151C27.964 13.0236 27.7476 13.8141 27.364 14.5267C28.0384 15.0746 28.5688 15.779 28.9089 16.5786C29.249 17.3782 29.3886 18.2488 29.3155 19.1146C29.2424 19.9805 28.9589 20.8154 28.4896 21.5467C28.0203 22.278 27.3794 22.8835 26.6227 23.3107C26.7161 24.0336 26.6603 24.7681 26.4588 25.4687C26.2573 26.1693 25.9143 26.8211 25.451 27.3839C24.9876 27.9468 24.4139 28.4086 23.765 28.741C23.1162 29.0734 22.4062 29.2692 21.6787 29.3164C20.9512 29.3637 20.2218 29.2612 19.5355 29.0155C18.8492 28.7697 18.2205 28.3859 17.6883 27.8877C17.1561 27.3895 16.7318 26.7874 16.4414 26.1188C16.151 25.4501 16.0008 24.729 16 24V6.66667Z" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 17.3333C18.8806 16.9395 17.9031 16.2227 17.1911 15.2733C16.4791 14.324 16.0646 13.1849 16 12C15.9354 13.1849 15.5209 14.324 14.8089 15.2733C14.0969 16.2227 13.1194 16.9395 12 17.3333" stroke="#155DFC" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8" stroke="#155DFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.25 1.75C12.5152 1.48478 12.8749 1.33578 13.25 1.33578C13.6251 1.33578 13.9848 1.48478 14.25 1.75C14.5152 2.01521 14.6642 2.37493 14.6642 2.75C14.6642 3.12507 14.5152 3.48478 14.25 3.75L8.24136 9.75933C8.08305 9.9175 7.88749 10.0333 7.67269 10.096L5.75735 10.656C5.69999 10.6727 5.63918 10.6737 5.58129 10.6589C5.52341 10.6441 5.47057 10.614 5.42832 10.5717C5.38607 10.5294 5.35595 10.4766 5.34112 10.4187C5.32629 10.3608 5.32729 10.3 5.34402 10.2427L5.90402 8.32733C5.96704 8.1127 6.08304 7.91737 6.24136 7.75933L12.25 1.75Z" stroke="#155DFC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H14" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3334 14.6667H4.66671C4.00004 14.6667 3.33337 14 3.33337 13.3333V4" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.33337 4.00001V2.66668C5.33337 2.00001 6.00004 1.33334 6.66671 1.33334H9.33337C10 1.33334 10.6667 2.00001 10.6667 2.66668V4.00001" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66663 7.33331V11.3333" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33337 7.33331V11.3333" stroke="#E7000B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FolderChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V8C22 7.46957 21.7893 6.96086 21.4142 6.58579C21.0391 6.21071 20.5304 6 20 6H12.07C11.7406 5.9983 11.4167 5.91525 11.1271 5.75824C10.8375 5.60123 10.5912 5.37512 10.41 5.1L9.59 3.9C9.40882 3.62488 9.1625 3.39877 8.8729 3.24176C8.58331 3.08475 8.25941 3.0017 7.93 3H4C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V18C2 19.1 2.9 20 4 20Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10V14" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 10V12" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10V16" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function StatCard({
  label,
  value,
  valueColor,
  icon,
}: {
  label: string;
  value: string;
  valueColor: string;
  icon: React.ReactNode;
}) {
  return (
    <IonCard className="m-0 h-full min-w-0 rounded-[14px] border border-[#E2E8F0] shadow-sm">
      <IonCardContent className="px-6 pt-6 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-normal text-[#45556C]">{label}</span>
          <span className={`text-[30px] font-bold leading-9 ${valueColor}`}>{value}</span>
        </div>
        <div className="opacity-20">{icon}</div>
      </div>
      </IonCardContent>
    </IonCard>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42 30C42 31.0609 41.5786 32.0783 40.8284 32.8284C40.0783 33.5786 39.0609 34 38 34H14L6 42V10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6H38C39.0609 6 40.0783 6.42143 40.8284 7.17157C41.5786 7.92172 42 8.93913 42 10V30Z" stroke="#2B7FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 14L27 31L17 21L4 34" stroke="#00C950" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 14H44V26" stroke="#00C950" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BrainIconLarge() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 9.99999C24.0024 9.20006 23.8448 8.40772 23.5364 7.66959C23.2281 6.93146 22.7752 6.26245 22.2046 5.70189C21.6339 5.14132 20.9569 4.70054 20.2133 4.40546C19.4698 4.11037 18.6748 3.96695 17.875 3.98362C17.0752 4.00029 16.2869 4.17672 15.5563 4.50253C14.8257 4.82834 14.1677 5.29695 13.6208 5.8808C13.074 6.46466 12.6494 7.15196 12.3721 7.9023C12.0948 8.65263 11.9703 9.45085 12.006 10.25C10.8304 10.5523 9.73903 11.1181 8.81449 11.9046C7.88995 12.6911 7.1565 13.6777 6.66971 14.7897C6.18292 15.9016 5.95555 17.1098 6.0048 18.3226C6.05406 19.5355 6.37866 20.7212 6.95403 21.79C5.94239 22.6119 5.14688 23.6684 4.6367 24.8679C4.12653 26.0673 3.91714 27.3732 4.02675 28.672C4.13637 29.9708 4.56166 31.2231 5.26564 32.32C5.96962 33.417 6.93095 34.3253 8.06603 34.966C7.92586 36.0505 8.00951 37.1522 8.3118 38.203C8.6141 39.2539 9.12862 40.2317 9.8236 41.0759C10.5186 41.9201 11.3792 42.6129 12.3525 43.1115C13.3257 43.6101 14.3908 43.9039 15.482 43.9747C16.5732 44.0455 17.6673 43.8918 18.6968 43.5232C19.7263 43.1546 20.6693 42.5788 21.4675 41.8315C22.2658 41.0842 22.9024 40.1811 23.338 39.1781C23.7735 38.1751 23.9989 37.0935 24 36V9.99999Z" stroke="#AD46FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 9.99999C23.9977 9.20006 24.1553 8.40772 24.4636 7.66959C24.772 6.93146 25.2248 6.26245 25.7955 5.70189C26.3662 5.14132 27.0432 4.70054 27.7867 4.40546C28.5302 4.11037 29.3253 3.96695 30.125 3.98362C30.9248 4.00029 31.7132 4.17672 32.4438 4.50253C33.1743 4.82834 33.8324 5.29695 34.3792 5.8808C34.9261 6.46466 35.3506 7.15196 35.6279 7.9023C35.9052 8.65263 36.0297 9.45085 35.994 10.25C37.1696 10.5523 38.261 11.1181 39.1856 11.9046C40.1101 12.6911 40.8436 13.6777 41.3303 14.7897C41.8171 15.9016 42.0445 17.1098 41.9953 18.3226C41.946 19.5355 41.6214 20.7212 41.046 21.79C42.0577 22.6119 42.8532 23.6684 43.3633 24.8679C43.8735 26.0673 44.0829 27.3732 43.9733 28.672C43.8637 29.9708 43.4384 31.2231 42.7344 32.32C42.0304 33.417 41.0691 34.3253 39.934 34.966C40.0742 36.0505 39.9905 37.1522 39.6883 38.203C39.386 39.2539 38.8714 40.2317 38.1765 41.0759C37.4815 41.9201 36.6208 42.6129 35.6476 43.1115C34.6744 43.6101 33.6093 43.9039 32.5181 43.9747C31.4269 44.0455 30.3327 43.8918 29.3033 43.5232C28.2738 43.1546 27.3308 42.5788 26.5325 41.8315C25.7342 41.0842 25.0977 40.1811 24.6621 39.1781C24.2265 38.1751 24.0012 37.0935 24 36V9.99999Z" stroke="#AD46FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 26C28.3209 25.4093 26.8546 24.334 25.7867 22.91C24.7187 21.486 24.0969 19.7773 24 18C23.9031 19.7773 23.2813 21.486 22.2133 22.91C21.1454 24.334 19.6791 25.4093 18 26" stroke="#AD46FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2V10" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 7L8 10L11 7" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.33331 13H12.6666" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("graficos");
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(SENTIMENT_CHART_DATA[0]);
  const [chartAnimationKey, setChartAnimationKey] = useState(0);

  useEffect(() => {
    if (activeTab === "graficos") {
      setChartAnimationKey((value) => value + 1);
      setHoverInfo(SENTIMENT_CHART_DATA[0]);
    }
  }, [activeTab]);

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: "graficos", label: "Gráficos y Análisis" },
    { id: "tabla", label: "Tabla Detallada" },
    { id: "proyectos", label: "Gestión de Proyectos" },
  ];

  return (
    <IonPage>
      <IonContent fullscreen className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
        <div className="min-h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] font-[Inter,sans-serif]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-3">
                <BrainIcon />
                <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172B] leading-10">
                  Panel de Administración
                </h1>
              </div>
              <p className="text-base text-[#45556C] font-normal leading-6">
                Análisis de sentimientos con IA integrada
              </p>
            </div>

            <IonGrid className="mb-10 p-0">
              <IonRow className="ion-justify-content-between ion-align-items-stretch">
                <IonCol size="12" sizeMd="4" className="mb-4 mb-md-0">
                  <StatCard
                    label="Total Análisis"
                    value="300"
                    valueColor="text-[#0F172B]"
                    icon={<ChatBubbleIcon />}
                  />
                </IonCol>
                <IonCol size="12" sizeMd="4" className="mb-4 mb-md-0">
                  <StatCard
                    label="Sentimiento Positivo"
                    value="52%"
                    valueColor="text-[#00A63E]"
                    icon={<TrendingUpIcon />}
                  />
                </IonCol>
                <IonCol size="12" sizeMd="4">
                  <StatCard
                    label="Precisión IA"
                    value="86%"
                    valueColor="text-[#9810FA]"
                    icon={<BrainIconLarge />}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonSegment
              value={activeTab}
              onIonChange={(event) => {
                const nextTab = event.detail.value as TabId | undefined;
                if (nextTab) {
                  setActiveTab(nextTab);
                }
              }}
              className="mb-6"
            >
              {tabs.map((tab) => (
                <IonSegmentButton key={tab.id} value={tab.id} className="text-sm sm:text-base">
                  <IonLabel>{tab.label}</IonLabel>
                </IonSegmentButton>
              ))}
            </IonSegment>

            {activeTab === "graficos" && (
              <IonGrid className="p-0">
                <IonRow>
                  <IonCol size="12" sizeLg="6" className="mb-4 mb-lg-0">
                    <IonCard className="m-0 h-full rounded-[14px] border border-[#E2E8F0] shadow-sm">
                      <IonCardContent className="px-6 py-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h2 className="text-[22px] font-semibold leading-8 text-[#0F172B]">
                            Distribución de Sentimientos
                          </h2>
                          <div className="w-[260px] hidden md:block">
                            <ChartInfoCard info={hoverInfo} />
                          </div>
                        </div>

                        <SentimentBars
                          key={`bars-${chartAnimationKey}`}
                          onHover={setHoverInfo}
                          onClear={() => setHoverInfo(SENTIMENT_CHART_DATA[0])}
                        />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>

                  <IonCol size="12" sizeLg="6">
                    <IonCard className="m-0 h-full rounded-[14px] border border-[#E2E8F0] shadow-sm">
                      <IonCardContent className="px-6 py-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h2 className="text-[22px] font-semibold leading-8 text-[#0F172B]">
                            Proporción de Sentimientos
                          </h2>
                          <div className="w-[260px] hidden md:block">
                            <ChartInfoCard info={hoverInfo} />
                          </div>
                        </div>

                        <SentimentPie
                          key={`pie-${chartAnimationKey}`}
                          onHover={setHoverInfo}
                          onClear={() => setHoverInfo(SENTIMENT_CHART_DATA[0])}
                        />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            )}

            {activeTab === "tabla" && (
              <IonCard className="m-0 rounded-[14px] border border-[#E2E8F0] shadow-sm overflow-hidden">
                <IonCardContent className="p-0">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
                    <h2 className="text-[22px] font-semibold leading-8 text-[#0F172B]">
                      Análisis Detallado
                    </h2>
                    <IonButton fill="solid" color="primary" className="ion-no-margin">
                      <ExportIcon />
                      <span className="ml-2">Exportar JSON</span>
                    </IonButton>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px]">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          {[
                            "ID",
                            "FECHA",
                            "SENTIMIENTO",
                            "CONFIANZA",
                            "TEXTO",
                            "PALABRAS CLAVE",
                          ].map((column) => (
                            <th
                              key={column}
                              className="px-6 py-4 text-left text-[12px] font-semibold uppercase tracking-[0.06em] leading-4 text-[#64748B]"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ANALYSIS_ROWS.map((row) => {
                          const sentiment = SENTIMENT_STYLES[row.sentimiento];

                          return (
                            <tr key={row.id} className="border-b border-[#E2E8F0] last:border-b-0">
                              <td className="px-6 py-[18px] text-sm font-normal text-[#0F172B] leading-5">
                                {row.id}
                              </td>
                              <td className="px-6 py-[18px] text-sm font-normal text-[#475569] leading-5 whitespace-nowrap">
                                {row.fecha}
                              </td>
                              <td className="px-6 py-[18px]">
                                <IonBadge className={`${sentiment.bg} ${sentiment.text} px-3 py-1`}>
                                  {row.sentimiento}
                                </IonBadge>
                              </td>
                              <td className="px-6 py-[18px] text-sm font-semibold text-[#0F172B] leading-5 whitespace-nowrap">
                                {row.confianza}
                              </td>
                              <td className="px-6 py-[18px] text-sm font-normal text-[#475569] leading-5">
                                {row.texto}
                              </td>
                              <td className="px-6 py-[18px]">
                                <div className="flex flex-wrap gap-2">
                                  {row.palabrasClave.map((keyword) => (
                                    <IonBadge key={keyword} color="light" className="text-[#2B59FF] px-3 py-1">
                                      {keyword}
                                    </IonBadge>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </IonCardContent>
              </IonCard>
            )}

            {activeTab === "proyectos" && (
              <IonCard className="m-0 rounded-[14px] border border-[#E2E8F0] shadow-sm overflow-hidden">
                <IonCardContent className="p-0">
                  <div className="flex items-center justify-between px-6 py-6 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <FolderChartIcon />
                      <h2 className="text-xl font-semibold text-[#0F172B] leading-7">
                        Gestión de Proyectos
                      </h2>
                    </div>
                    <IonButton fill="solid" color="primary" className="ion-no-margin">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3.33337 8H12.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 3.33334V12.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="ml-2">Nuevo Proyecto</span>
                    </IonButton>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          {["ID", "Proyecto", "Estado", "Fecha Inicio", "Fecha Fin", "Responsable", "Acciones"].map((col) => (
                            <th
                              key={col}
                              className="px-6 py-3 text-left text-xs font-medium text-[#45556C] uppercase tracking-[0.6px] leading-4"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project, idx) => {
                          const status = STATUS_STYLES[project.estado];
                          return (
                            <tr
                              key={project.id}
                              className={`border-b border-[#E2E8F0] last:border-b-0 ${idx % 2 === 0 ? "" : ""}`}
                            >
                              <td className="px-6 py-[22px] text-sm font-normal text-[#0F172B] leading-5">
                                {project.id}
                              </td>
                              <td className="px-6 py-[22px] text-sm font-medium text-[#0F172B] leading-5 whitespace-nowrap">
                                {project.nombre}
                              </td>
                              <td className="px-6 py-[22px]">
                                <IonBadge className={`${status.bg} ${status.text} px-2.5 py-0.5`}>
                                  {status.label}
                                </IonBadge>
                              </td>
                              <td className="px-6 py-[22px] text-sm font-normal text-[#45556C] leading-5 whitespace-nowrap">
                                {project.fechaInicio}
                              </td>
                              <td className="px-6 py-[22px] text-sm font-normal text-[#45556C] leading-5 whitespace-nowrap">
                                {project.fechaFin}
                              </td>
                              <td className="px-6 py-[22px] text-sm font-normal text-[#45556C] leading-5 whitespace-nowrap">
                                {project.responsable}
                              </td>
                              <td className="px-6 py-[22px]">
                                <div className="flex items-center gap-2">
                                  <IonButton fill="clear" size="small" className="w-8 h-8" title="Editar">
                                    <EditIcon />
                                  </IonButton>
                                  <IonButton fill="clear" size="small" className="w-8 h-8" title="Eliminar" onClick={() => handleDelete(project.id)}>
                                    <DeleteIcon />
                                  </IonButton>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {projects.length === 0 && (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#45556C]">
                              No hay proyectos disponibles.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </IonCardContent>
              </IonCard>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
