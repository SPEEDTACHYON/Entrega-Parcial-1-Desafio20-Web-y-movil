import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonRouterLink
} from '@ionic/react';

interface Opinion {
  id: string;
  title: string;
  description: string;
  status: "considered" | "ai-analysis" | "received" | "not-received";
  statusLabel: string;
  date: string;
  category: string;
}

const opinions: Opinion[] = [
  {
    id: "001",
    title: "Mejora de alumbrado público",
    description:
      "Solicito mejor iluminación en la calle Principal esquina con Avenida Central",
    status: "considered",
    statusLabel: "Considerada en el informe final",
    date: "30 abr 2026",
    category: "Infraestructura",
  },
  {
    id: "002",
    title: "Parque infantil deteriorado",
    description: "El parque del barrio requiere mantenimiento urgente",
    status: "ai-analysis",
    statusLabel: "En análisis por IA",
    date: "2 may 2026",
    category: "Espacios públicos",
  },
  {
    id: "003",
    title: "Semáforo peatonal necesario",
    description: "Se requiere un semáforo peatonal en la zona escolar",
    status: "received",
    statusLabel: "Recibida",
    date: "4 may 2026",
    category: "Seguridad vial",
  },
  {
    id: "004",
    title: "Recolección de basura",
    description: "Mejorar frecuencia de recolección en zona residencial",
    status: "not-received",
    statusLabel: "No recibida",
    date: "6 may 2026",
    category: "Servicios públicos",
  },
  {
    id: "005",
    title: "Ciclovía en avenida principal",
    description: "Propuesta para construir una ciclovía segura",
    status: "received",
    statusLabel: "Recibida",
    date: "7 may 2026",
    category: "Movilidad",
  },
];

const statusConfig = {
  considered: {
    bg: "bg-[#2DD55B]",
    text: "text-black",
  },
  "ai-analysis": {
    bg: "bg-[#0163AA]",
    text: "text-white",
  },
  received: {
    bg: "bg-[#0054E9]",
    text: "text-white",
  },
  "not-received": {
    bg: "bg-[#C5000F]",
    text: "text-white",
  },
};

// TODO: Pasar estos iconos a los assets y usarlos como componentes reutilizables en toda la app

function FileCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-gray-700">
      <path d="M12.5 1.66667H5.00004C4.55801 1.66667 4.13409 1.84226 3.82153 2.15482C3.50897 2.46738 3.33337 2.89131 3.33337 3.33333V16.6667C3.33337 17.1087 3.50897 17.5326 3.82153 17.8452C4.13409 18.1577 4.55801 18.3333 5.00004 18.3333H15C15.4421 18.3333 15.866 18.1577 16.1786 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V5.83333L12.5 1.66667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6666 1.66667V5C11.6666 5.44203 11.8422 5.86595 12.1548 6.17851C12.4673 6.49107 12.8913 6.66667 13.3333 6.66667H16.6666" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 12.5L9.16667 14.1667L12.5 10.8333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-gray-700">
      <path d="M10 4.16667C10.001 3.83336 9.93532 3.50322 9.80685 3.19567C9.67837 2.88811 9.4897 2.60936 9.25191 2.37579C9.01413 2.14222 8.73204 1.95856 8.42224 1.83561C8.11243 1.71266 7.78117 1.6529 7.44793 1.65984C7.1147 1.66679 6.78621 1.7403 6.4818 1.87606C6.17739 2.01181 5.9032 2.20707 5.67536 2.45034C5.44751 2.69361 5.27061 2.97999 5.15506 3.29263C5.03952 3.60527 4.98765 3.93786 5.00252 4.27083C4.51269 4.39678 4.05794 4.63254 3.67271 4.96026C3.28749 5.28798 2.98189 5.69906 2.77906 6.16237C2.57623 6.62569 2.48149 7.12908 2.50201 7.63443C2.52254 8.13978 2.65779 8.63383 2.89752 9.07917C2.476 9.42161 2.14454 9.86186 1.93197 10.3616C1.7194 10.8614 1.63215 11.4055 1.67782 11.9467C1.7235 12.4878 1.9007 13.0096 2.19403 13.4667C2.48735 13.9237 2.88791 14.3022 3.36085 14.5692C3.30245 15.021 3.3373 15.4801 3.46326 15.9179C3.58922 16.3558 3.8036 16.7632 4.09318 17.115C4.38275 17.4667 4.74136 17.7554 5.14687 17.9631C5.55238 18.1709 5.99617 18.2933 6.45083 18.3228C6.9055 18.3523 7.36139 18.2883 7.79034 18.1347C8.2193 17.9811 8.61221 17.7412 8.94482 17.4298C9.27743 17.1184 9.54267 16.7421 9.72416 16.3242C9.90565 15.9063 9.99953 15.4556 10 15V4.16667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 4.16667C9.99903 3.83336 10.0647 3.50322 10.1932 3.19567C10.3217 2.88811 10.5103 2.60936 10.7481 2.37579C10.9859 2.14222 11.268 1.95856 11.5778 1.83561C11.8876 1.71266 12.2189 1.6529 12.5521 1.65984C12.8853 1.66679 13.2138 1.7403 13.5182 1.87606C13.8226 2.01181 14.0968 2.20707 14.3247 2.45034C14.5525 2.69361 14.7294 2.97999 14.845 3.29263C14.9605 3.60527 15.0124 3.93786 14.9975 4.27083C15.4873 4.39678 15.9421 4.63254 16.3273 4.96026C16.7125 5.28798 17.0181 5.69906 17.221 6.16237C17.4238 6.62569 17.5185 7.12908 17.498 7.63443C17.4775 8.13978 17.3422 8.63383 17.1025 9.07917C17.524 9.42161 17.8555 9.86186 18.0681 10.3616C18.2806 10.8614 18.3679 11.4055 18.3222 11.9467C18.2765 12.4878 18.0993 13.0096 17.806 13.4667C17.5127 13.9237 17.1121 14.3022 16.6392 14.5692C16.6976 15.021 16.6627 15.4801 16.5368 15.9179C16.4108 16.3558 16.1964 16.7632 15.9069 17.115C15.6173 17.4667 15.2587 17.7554 14.8532 17.9631C14.4477 18.1709 14.0039 18.2933 13.5492 18.3228C13.0945 18.3523 12.6386 18.2883 12.2097 18.1347C11.7807 17.9811 11.3878 17.7412 11.0552 17.4298C10.7226 17.1184 10.4574 16.7421 10.2759 16.3242C10.0944 15.9063 10.0005 15.4556 10 15V4.16667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 10.8333C11.8004 10.5872 11.1894 10.1392 10.7444 9.54584C10.2994 8.95251 10.0404 8.24056 10 7.5C9.95962 8.24056 9.70056 8.95251 9.25556 9.54584C8.81057 10.1392 8.19963 10.5872 7.5 10.8333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CircleCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-gray-700">
      <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6023 1.66666 9.99996 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 9.99999C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 10L9.16667 11.6667L12.5 8.33334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CircleAlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-gray-700">
      <circle cx="10" cy="10" r="8.333" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 6.66666V9.99999" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 13.3333H10.0083" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clock-clip)">
        <path d="M6.99996 12.8333C10.2216 12.8333 12.8333 10.2217 12.8333 7C12.8333 3.77834 10.2216 1.16667 6.99996 1.16667C3.7783 1.16667 1.16663 3.77834 1.16663 7C1.16663 10.2217 3.7783 12.8333 6.99996 12.8333Z" stroke="#A6A6A6" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 3.5V7L9.33333 8.16667" stroke="#A6A6A6" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clock-clip">
          <rect width="14" height="14" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}

function getStatusIcon(status: Opinion["status"]) {
  switch (status) {
    case "considered":
      return <FileCheckIcon />;
    case "ai-analysis":
      return <BrainIcon />;
    case "received":
      return <CircleCheckIcon />;
    case "not-received":
      return <CircleAlertIcon />;
  }
}

function OpinionItem({ opinion }: { opinion: Opinion }) {
  const badge = statusConfig[opinion.status];
  return (
    <div className="bg-white rounded-xl shadow-sm border-b border-[#C8C7CC] last:border-b-0">
      <div className="px-4 py-3 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className="text-[#1E2939] text-[17px] leading-[1.2] font-normal truncate">
              {opinion.title}
            </span>
            <span className="text-[#999] text-[14px] leading-normal truncate">
              {opinion.description}
            </span>
          </div>
          <div className="flex-shrink-0 mt-0.5 text-gray-800">
            {getStatusIcon(opinion.status)}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold leading-4 ${badge.bg} ${badge.text}`}
          >
            {opinion.statusLabel}
          </span>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex items-center gap-1">
              <ClockIcon className="flex-shrink-0" />
              <span className="text-[#A6A6A6] text-[14px] leading-normal whitespace-nowrap">
                {opinion.date}
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#A6A6A6] text-[14px] leading-normal whitespace-nowrap">
              {opinion.category}
            </span>
          </div>
        </div>

        <span className="text-[#99A1AF] text-[12px] leading-4">
          ID: {opinion.id}
        </span>
      </div>
    </div>
  );
}

function LegendItem({
  icon,
  badgeBg,
  badgeText,
  badgeTextColor,
  label,
}: {
  icon: React.ReactNode;
  badgeBg: string;
  badgeText: string;
  badgeTextColor: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex-shrink-0">{icon}</div>
      <span
        className={`inline-flex items-center px-3 py-1 rounded-lg text-[13px] font-bold leading-none ${badgeBg} ${badgeTextColor}`}
      >
        {badgeText}
      </span>
      <span className="text-[#4A5565] text-[14px] leading-5">{label}</span>
    </div>
  );
}

function LegendRedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#FB2C36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 6V9" stroke="#FB2C36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12H9.0075" stroke="#FB2C36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LegendBlueCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#2B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#2B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LegendAIIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3.74998C9.00088 3.45 8.94177 3.15287 8.82615 2.87608C8.71052 2.59928 8.54071 2.3484 8.3267 2.13819C8.1127 1.92798 7.85882 1.76268 7.57999 1.65202C7.30117 1.54137 7.00303 1.48758 6.70312 1.49384C6.40321 1.50009 6.10757 1.56625 5.8336 1.68843C5.55963 1.8106 5.31286 1.98633 5.1078 2.20528C4.90274 2.42423 4.74353 2.68197 4.63954 2.96334C4.53555 3.24472 4.48887 3.54405 4.50225 3.84373C4.0614 3.95708 3.65213 4.16926 3.30542 4.46421C2.95872 4.75916 2.68368 5.12913 2.50113 5.54611C2.31859 5.96309 2.23332 6.41615 2.25179 6.87096C2.27026 7.32577 2.39199 7.77042 2.60775 8.17123C2.22839 8.47943 1.93007 8.87565 1.73875 9.32543C1.54744 9.77521 1.46892 10.2649 1.51002 10.752C1.55113 11.239 1.71061 11.7086 1.9746 12.12C2.2386 12.5313 2.5991 12.872 3.02475 13.1122C2.97219 13.5189 3.00356 13.932 3.11692 14.3261C3.23028 14.7202 3.42322 15.0869 3.68384 15.4034C3.94446 15.72 4.26721 15.9798 4.63217 16.1668C4.99712 16.3538 5.39653 16.4639 5.80573 16.4905C6.21493 16.517 6.62523 16.4594 7.01129 16.3212C7.39735 16.183 7.75097 15.967 8.05032 15.6868C8.34967 15.4065 8.58838 15.0679 8.75172 14.6918C8.91506 14.3157 8.99956 13.91 9 13.5V3.74998Z" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 3.74998C8.99912 3.45 9.05823 3.15287 9.17385 2.87608C9.28948 2.59928 9.45929 2.3484 9.6733 2.13819C9.8873 1.92798 10.1412 1.76268 10.42 1.65202C10.6988 1.54137 10.997 1.48758 11.2969 1.49384C11.5968 1.50009 11.8924 1.56625 12.1664 1.68843C12.4404 1.8106 12.6871 1.98633 12.8922 2.20528C13.0973 2.42423 13.2565 2.68197 13.3605 2.96334C13.4645 3.24472 13.5111 3.54405 13.4977 3.84373C13.9386 3.95708 14.3479 4.16926 14.6946 4.46421C15.0413 4.75916 15.3163 5.12913 15.4989 5.54611C15.6814 5.96309 15.7667 6.41615 15.7482 6.87096C15.7297 7.32577 15.608 7.77042 15.3923 8.17123C15.7716 8.47943 16.0699 8.87565 16.2612 9.32543C16.4526 9.77521 16.5311 10.2649 16.49 10.752C16.4489 11.239 16.2894 11.7086 16.0254 12.12C15.7614 12.5313 15.4009 12.872 14.9752 13.1122C15.0278 13.5189 14.9964 13.932 14.8831 14.3261C14.7697 14.7202 14.5768 15.0869 14.3162 15.4034C14.0555 15.72 13.7328 15.9798 13.3678 16.1668C13.0029 16.3538 12.6035 16.4639 12.1943 16.4905C11.7851 16.517 11.3748 16.4594 10.9887 16.3212C10.6027 16.183 10.249 15.967 9.94968 15.6868C9.65033 15.4065 9.41162 15.0679 9.24828 14.6918C9.08494 14.3157 9.00044 13.91 9 13.5V3.74998Z" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.25 9.75C10.6203 9.52849 10.0705 9.12525 9.66999 8.59125C9.2695 8.05726 9.03634 7.4165 9 6.75C8.96366 7.4165 8.7305 8.05726 8.33001 8.59125C7.92951 9.12525 7.37967 9.52849 6.75 9.75" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.1992 4.875C13.3808 4.56044 13.4834 4.20661 13.4985 3.84375" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.50225 3.84375C4.51708 4.20655 4.6195 4.56037 4.80075 4.875" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.60775 8.172C2.74495 8.06025 2.89178 7.96087 3.0465 7.875" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.9535 7.875C15.1082 7.96087 15.255 8.06025 15.3922 8.172" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 13.5C3.98312 13.5002 3.47495 13.3669 3.02475 13.113" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.9752 13.113C14.525 13.3669 14.0169 13.5002 13.5 13.5" stroke="#AD46FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LegendGreenFileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.25 1.5H4.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3V15C3 15.3978 3.15804 15.7794 3.43934 16.0607C3.72064 16.342 4.10218 16.5 4.5 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15V5.25L11.25 1.5Z" stroke="#00C950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 1.5V4.5C10.5 4.89782 10.658 5.27936 10.9393 5.56066C11.2206 5.84196 11.6022 6 12 6H15" stroke="#00C950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.75 11.25L8.25 12.75L11.25 9.75" stroke="#00C950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function OpinionsPage() {
  return (
    <>
      {/* Contenedor principal de la página */}
      <IonPage id="main-content" style={{ fontFamily: "Roboto, -apple-system, sans-serif" }}>
        
        {/* Header en Ionic: Reemplaza tu etiqueta <header> */}
        <IonHeader className="ion-no-border">
          <IonToolbar className="bg-[#0054E9] border-b border-black/20" style={{ '--background': '#0054E9', '--color': 'white' }}>
          {/* --- BOTÓN VOLVER --- */}
              <IonRouterLink 
                routerLink="/dashboard" 
                routerDirection="back" 
                className="flex items-center gap-1 text-white hover:text-gray-200 px-2 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium">Volver</span>
              </IonRouterLink>
              {/* --------------------------------- */}
            {/* Botón para abrir el IonMenu */}
            <IonButtons slot="start">
              <IonMenuButton color="light" />
            </IonButtons>
            <IonTitle className="font-bold text-center pl-0">
              Seguimiento de Opiniones
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent scrollY={false}>
          <div className="h-full bg-gradient-to-br from-[#667EEA] to-[#764BA2] px-4 py-6 flex flex-col gap-4">
            
            {/* Section heading */}
            <div className="text-center mb-1">
              <h2 className="text-white text-[24px] font-medium leading-tight">
                Mis Opiniones Enviadas
              </h2>
              <p className="text-white/90 text-[14px] leading-5 mt-1">
                Total: 5 opiniones
              </p>
            </div>
            
            <div className="flex-1 flex flex-col gap-4 min-h-0">
              
              {/* Opinions */}
              <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto divide-y divide-[#C8C7CC] min-h-0">
                  {opinions.map((opinion) => (
                    <OpinionItem key={opinion.id} opinion={opinion} />
                  ))}
                </div>
              </div>

              {/* Legend card */}
              <div className="flex-none bg-white/95 rounded-xl shadow-lg overflow-visible">
                <div className="px-5 py-5 flex flex-col gap-3">
                  <h3 className="text-[#1E2939] text-[14px] font-normal leading-[1.2]">
                    Leyenda de Estados
                  </h3>
                  <div className="flex flex-col gap-2">
                    <LegendItem
                      icon={<LegendRedIcon />}
                      badgeBg="bg-[#C5000F]"
                      badgeText="No recibida"
                      badgeTextColor="text-white"
                      label="Opinión pendiente de registro"
                    />
                    <LegendItem
                      icon={<LegendBlueCheckIcon />}
                      badgeBg="bg-[#0054E9]"
                      badgeText="Recibida"
                      badgeTextColor="text-white"
                      label="Opinión registrada exitosamente"
                    />
                    <LegendItem
                      icon={<LegendAIIcon />}
                      badgeBg="bg-[#0163AA]"
                      badgeText="En análisis por IA"
                      badgeTextColor="text-white"
                      label="Siendo procesada por inteligencia artificial"
                    />
                    <LegendItem
                      icon={<LegendGreenFileIcon />}
                      badgeBg="bg-[#2DD55B]"
                      badgeText="Considerada"
                      badgeTextColor="text-black"
                      label="Incluida en el informe final"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
