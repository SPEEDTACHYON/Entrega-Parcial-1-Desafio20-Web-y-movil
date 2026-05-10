import { useEffect, useRef, useState } from "react";
import {
  IonBadge,
  IonButton,
  IonCheckbox,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonRouterLink,
  IonPage,
} from "@ionic/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const PROJECT_TYPES = ["residencial", "comercial", "infraestructura", "público"] as const;
type ProjectType = (typeof PROJECT_TYPES)[number];

interface Project {
  id: number;
  name: string;
  type: ProjectType;
  description: string;
  status: "active" | "pending" | "completed";
  lat: number;
  lng: number;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Parque Empresarial Norte",
    type: "comercial",
    description: "Oficinas y espacios de coworking",
    status: "active",
    lat: 19.445,
    lng: -99.131,
  },
  {
    id: 2,
    name: "Residencial Las Palmas",
    type: "residencial",
    description: "Conjunto habitacional de 120 departamentos",
    status: "active",
    lat: 19.432,
    lng: -99.148,
  },
  {
    id: 3,
    name: "Puente Vial Sur",
    type: "infraestructura",
    description: "Ampliación y modernización del puente sur",
    status: "pending",
    lat: 19.418,
    lng: -99.125,
  },
  {
    id: 4,
    name: "Plaza Cívica Central",
    type: "público",
    description: "Renovación de espacios públicos y jardines",
    status: "active",
    lat: 19.438,
    lng: -99.142,
  },
  {
    id: 5,
    name: "Centro Comercial Oriente",
    type: "comercial",
    description: "Mall con 80 locales y zona de entretenimiento",
    status: "completed",
    lat: 19.428,
    lng: -99.118,
  },
];

const STATUS_LABELS: Record<string, string> = {
  active: "activo",
  pending: "pendiente",
  completed: "completado",
};

function createRedMarkerIcon() {
  return L.divIcon({
    className: "",
    html: `<svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.15)"/>
      </filter>
      <g filter="url(#shadow)">
        <path d="M26.6666 13.3333C26.6666 19.9907 19.2813 26.924 16.8013 29.0653C16.5703 29.2391 16.289 29.333 16 29.333C15.7109 29.333 15.4297 29.2391 15.1986 29.0653C12.7186 26.924 5.33331 19.9907 5.33331 13.3333C5.33331 10.5043 6.45712 7.79124 8.45751 5.79085C10.4579 3.79046 13.171 2.66666 16 2.66666C18.829 2.66666 21.5421 3.79046 23.5425 5.79085C25.5428 7.79124 26.6666 10.5043 26.6666 13.3333Z" fill="#E7000B" stroke="#E7000B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 17.3333C18.2091 17.3333 20 15.5425 20 13.3333C20 11.1242 18.2091 9.33334 16 9.33334C13.7909 9.33334 12 11.1242 12 13.3333C12 15.5425 13.7909 17.3333 16 17.3333Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>`,
    iconSize: [32, 36],
    iconAnchor: [16, 36],
    popupAnchor: [0, -36],
  });
}

export default function Index() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0]);
  const [selectedTypes, setSelectedTypes] = useState<Set<ProjectType>>(
    new Set(PROJECT_TYPES)
  );
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [19.432, -99.133],
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    map.on("zoomend", () => {
      setZoom(map.getZoom());
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const icon = createRedMarkerIcon();

    PROJECTS.filter((p) => selectedTypes.has(p.type)).forEach((project) => {
      const marker = L.marker([project.lat, project.lng], { icon }).addTo(map);
      marker.on("click", () => setSelectedProject(project));
      markersRef.current.push(marker);
    });
  }, [selectedTypes]);

  const toggleType = (type: ProjectType) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const selectAll = () => setSelectedTypes(new Set(PROJECT_TYPES));
  const clearAll = () => setSelectedTypes(new Set());

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const focusProject = (project: Project) => {
    mapRef.current?.setView([project.lat, project.lng], 15);
    setSelectedProject(project);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="font-inter">
        <div className="flex h-screen w-screen overflow-hidden">
          <aside className="w-64 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white overflow-y-auto">
            <div className="px-4 pt-4">
              <IonRouterLink
                routerLink="/login"
                routerDirection="back"
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Volver
              </IonRouterLink>
            </div>

            <div className="flex items-center gap-2 px-4 pt-4 pb-4">
              <IonBadge color="primary" className="px-3 py-2 rounded-full text-xs font-semibold">
                Filtros
              </IonBadge>
            </div>

            <div className="px-4 flex-1">
              <div className="flex items-center gap-2 mb-5">
                <IonButton fill="clear" size="small" onClick={selectAll}>
                  Seleccionar todos
                </IonButton>
                <span className="text-gray-300 text-base leading-none">|</span>
                <IonButton fill="clear" size="small" onClick={clearAll}>
                  Limpiar
                </IonButton>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-3">Tipo de proyecto</p>
                <div className="flex flex-col gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <IonItem key={type} lines="none" className="ion-no-padding">
                      <IonCheckbox
                        slot="start"
                        checked={selectedTypes.has(type)}
                        onIonChange={() => toggleType(type)}
                      />
                      <IonLabel className="capitalize">{type}</IonLabel>
                    </IonItem>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  {selectedTypes.size} tipo{selectedTypes.size !== 1 ? "s" : ""} seleccionado{selectedTypes.size !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="px-4 py-4 mt-auto">
              <IonButton fill="clear" size="small" expand="block">
                Seguimiento de Opiniones
              </IonButton>
            </div>

            <div className="px-4 pb-4 border-t border-gray-200 pt-4 lg:hidden">
              <p className="text-sm font-medium text-gray-900 mb-3">Proyectos</p>
              <div className="flex flex-col gap-2">
                {PROJECTS.filter((p) => selectedTypes.has(p.type)).map((project) => (
                  <IonCard
                    key={project.id}
                    button
                    onClick={() => focusProject(project)}
                    className={`m-0 transition-colors ${
                      selectedProject?.id === project.id ? "ring-2 ring-blue-200" : ""
                    }`}
                  >
                    <IonCardContent className="p-2">
                      <p className="font-medium text-gray-900">{project.name}</p>
                      <p className="text-gray-500 capitalize text-xs">{project.type}</p>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 relative overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-100 shadow-md shadow-black/10 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M13.3334 6.66667C13.3334 9.99533 9.64069 13.462 8.40069 14.5327C8.28517 14.6195 8.14455 14.6665 8.00002 14.6665C7.85549 14.6665 7.71487 14.6195 7.59935 14.5327C6.35935 13.462 2.66669 9.99533 2.66669 6.66667C2.66669 5.25218 3.22859 3.89563 4.22878 2.89543C5.22898 1.89524 6.58553 1.33333 8.00002 1.33333C9.41451 1.33333 10.7711 1.89524 11.7713 2.89543C12.7715 3.89563 13.3334 5.25218 13.3334 6.66667Z" stroke="#F54900" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="#F54900" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-orange-900 font-normal whitespace-nowrap">
                Ubicación no disponible. Mostrando vista predeterminada.
              </span>
            </div>

            <div className="absolute top-4 left-4 z-[1000]">
              <IonBadge color="tertiary" className="rounded-xl px-4 py-2">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-white">Mapa Interactivo</span>
                  <span className="text-xs text-white/90">Zoom: {zoom}</span>
                </div>
              </IonBadge>
            </div>

            <div ref={mapContainerRef} className="w-full h-full" />

            {selectedProject && (
              <IonCard className="absolute top-20 left-4 z-[1000] w-64 m-0">
                <IonCardContent className="p-4 relative">
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-1 right-1"
                    aria-label="Cerrar"
                  >
                    ✕
                  </IonButton>
                  <h3 className="text-lg font-semibold text-gray-900 pr-4 leading-tight mb-1">
                    {selectedProject.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize mb-1">{selectedProject.type}</p>
                  <p className="text-sm text-gray-900 mb-3">{selectedProject.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <IonBadge color={selectedProject.status === "active" ? "success" : selectedProject.status === "pending" ? "warning" : "primary"}>
                      {STATUS_LABELS[selectedProject.status]}
                    </IonBadge>
                    <IonButton fill="clear" size="small" onClick={() => focusProject(selectedProject)}>
                      Detalles Proyecto
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            )}

            <div className="absolute bottom-8 right-6 z-[1000] flex flex-col gap-2">
              <IonButton shape="round" size="small" onClick={handleZoomIn} aria-label="Acercar">
                +
              </IonButton>
              <IonButton shape="round" size="small" onClick={handleZoomOut} aria-label="Alejar">
                -
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
