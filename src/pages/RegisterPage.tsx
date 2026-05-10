import { useState } from "react";
import { IonContent, IonPage, IonRouterLink } from '@ionic/react';

const REGIONES_CHILE = [
  "Región de Arica y Parinacota",
  "Región de Tarapacá",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región Metropolitana de Santiago",
  "Región del Libertador General Bernardo O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región del Biobío",
  "Región de La Araucanía",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén del General Carlos Ibáñez del Campo",
  "Región de Magallanes y de la Antártica Chilena",
];

const COMUNAS: Record<string, string[]> = {
  "Región Metropolitana de Santiago": [
    "Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "La Florida",
    "Puente Alto", "San Bernardo", "Quilicura", "Recoleta", "Independencia",
  ],
  "Región de Valparaíso": [
    "Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Con-Con",
  ],
  "Región del Biobío": [
    "Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz", "Hualpén",
  ],
  "Región de La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
  "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud"],
  "Región de Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
  "Región de Atacama": ["Copiapó", "Vallenar", "Chañaral", "Caldera"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
  "Región de Arica y Parinacota": ["Arica", "Putre", "Camarones"],
  "Región del Maule": ["Talca", "Curicó", "Linares", "Constitución"],
  "Región de Ñuble": ["Chillán", "San Carlos", "Bulnes", "Coihueco"],
  "Región de Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Lago Ranco"],
  "Región de Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Puerto Aysén", "Cochrane"],
  "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir"],
  "Región del Libertador General Bernardo O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Pichilemu"],
};

export default function Index() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    rut: "",
    correo: "",
    region: "",
    comuna: "",
    contrasena: "",
    confirmarContrasena: "",
    aceptaTerminos: false,
  });

  const comunasDisponibles = formData.region ? (COMUNAS[formData.region] ?? []) : [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => {
        const updated: typeof prev = { ...prev, [name]: value };
        if (name === "region") updated.comuna = "";
        return updated;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Handle registration logic here
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#667EEA] to-[#764BA2] py-10 px-4">
          <div className="w-full max-w-[500px] bg-white rounded-xl shadow-2xl p-8 flex flex-col gap-6 relative">
            <IonRouterLink routerLink="/login" routerDirection="back" className="absolute left-4 top-4 text-[#667EEA] hover:text-[#5a6fd6] flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 6L9 12L15 18" stroke="#667EEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-medium">Volver</span>
            </IonRouterLink>
            {/* Title */}
            <h1
              className="text-center text-[34px] font-semibold leading-tight tracking-[0.25px] text-[#667EEA]"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Registro de Usuario
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Nombre completo */}
              <div className="relative">
                <label className="block text-[13px] text-[rgba(0,0,0,0.6)] mb-1 font-normal tracking-[0.15px]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                  className="w-full h-14 px-[14px] rounded border border-[rgba(0,0,0,0.23)] bg-[#F8F9FF] text-[rgba(0,0,0,0.87)] text-base tracking-[0.15px] outline-none focus:border-[#667EEA] focus:ring-1 focus:ring-[#667EEA] transition-colors"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>

              {/* RUT */}
              <div className="relative">
                <label className="block text-[13px] text-[rgba(0,0,0,0.6)] mb-1 font-normal tracking-[0.15px]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                  RUT *
                </label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  placeholder="12.345.678-9"
                  required
                  className="w-full h-14 px-[14px] rounded border border-[rgba(0,0,0,0.23)] bg-[#F8F9FF] text-[rgba(0,0,0,0.87)] text-base tracking-[0.15px] outline-none focus:border-[#667EEA] focus:ring-1 focus:ring-[#667EEA] transition-colors placeholder:text-[rgba(0,0,0,0.4)]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>

              {/* Correo electrónico */}
              <div className="relative">
                <label className="block text-[13px] text-[rgba(0,0,0,0.6)] mb-1 font-normal tracking-[0.15px]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="w-full h-14 px-[14px] rounded border border-[rgba(0,0,0,0.23)] bg-[#F8F9FF] text-[rgba(0,0,0,0.87)] text-base tracking-[0.15px] outline-none focus:border-[#667EEA] focus:ring-1 focus:ring-[#667EEA] transition-colors"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>

              {/* Región */}
              <div className="relative">
                <label className="block text-[13px] text-[rgba(0,0,0,0.6)] mb-1 font-normal tracking-[0.15px]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Región *
                </label>
                <div className="relative">
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-[14px] pr-10 rounded border border-[rgba(0,0,0,0.23)] bg-[#FFF4F4] text-[rgba(0,0,0,0.87)] text-base tracking-[0.15px] outline-none focus:border-[#667EEA] focus:ring-1 focus:ring-[#667EEA] transition-colors appearance-none cursor-pointer"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    <option value="" disabled hidden></option>
                    {REGIONES_CHILE.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M7 10L12 15L17 10H7Z" fill="black" fillOpacity="0.54" />
                  </svg>
                </div>
              </div>

              {/* Comuna */}
              <div className="relative">
                <label className={`block text-[13px] mb-1 font-normal tracking-[0.15px] ${formData.region ? "text-[rgba(0,0,0,0.6)]" : "text-[rgba(0,0,0,0.38)]"}`}
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Comuna *
                </label>
                <div className="relative">
                  <select
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    required
                    disabled={!formData.region || comunasDisponibles.length === 0}
                    className={`w-full h-14 px-[14px] pr-10 rounded border bg-[#FFF4F4] text-base tracking-[0.15px] outline-none transition-colors appearance-none
                      ${formData.region && comunasDisponibles.length > 0
                        ? "border-[rgba(0,0,0,0.23)] text-[rgba(0,0,0,0.87)] focus:border-[#667EEA] focus:ring-1 focus:ring-[#667EEA] cursor-pointer"
                        : "border-[rgba(0,0,0,0.26)] text-[rgba(0,0,0,0.38)] cursor-not-allowed"
                      }`}
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    <option value="" disabled hidden></option>
                    {comunasDisponibles.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M7 10L12 15L17 10H7Z" fill="black" fillOpacity="0.26" />
                  </svg>
                </div>
              </div>

              {/* Contraseña */}
              <div className="relative">
                <label className="block text-[13px] text-[rgba(0,0,0,0.6)] mb-1 font-normal tracking-[0.15px]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Contraseña *
                </label>
                <input
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                  className="w-full h-14 px-[14px] rounded border border-[rgba(0,0,0,0.23)] bg-[#FFFBF0] text-[rgba(0,0,0,0.87)] text-base tracking-[0.15px] outline-none focus:border-[#667EEA] focus:ring-1 focus:ring-[#667EEA] transition-colors"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>

              {/* Confirmar contraseña */}
              <div className="relative">
                <label className="block text-[13px] text-[rgba(0,0,0,0.6)] mb-1 font-normal tracking-[0.15px]"
                  style={{ fontFamily: "'Roboto', sans-serif" }}>
                  Confirmar contraseña *
                </label>
                <input
                  type="password"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  required
                  className="w-full h-14 px-[14px] rounded border border-[rgba(0,0,0,0.23)] bg-[#FFFBF0] text-[rgba(0,0,0,0.87)] text-base tracking-[0.15px] outline-none focus:border-[#667EEA] focus:ring-1 focus:ring-[#667EEA] transition-colors"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                />
              </div>

              {/* Terms checkbox */}
              <div className="flex items-center gap-1 -ml-[9px]">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, aceptaTerminos: !prev.aceptaTerminos }))}
                  className="w-[42px] h-[42px] flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.04)] transition-colors flex-shrink-0"
                  aria-label="Toggle términos y condiciones"
                >
                  {formData.aceptaTerminos ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                        fill="#667EEA"
                      />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                        fill="black"
                        fillOpacity="0.6"
                      />
                    </svg>
                  )}
                </button>
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  required
                  className="sr-only"
                  id="aceptaTerminos"
                />
                <label
                  htmlFor="aceptaTerminos"
                  className="text-[rgba(0,0,0,0.87)] text-base leading-6 tracking-[0.15px] cursor-pointer select-none"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  Acepto los términos y condiciones <span className="font-medium">*</span>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full h-[55px] rounded bg-[#667EEA] text-white text-[17.6px] font-semibold tracking-[0.503px] uppercase shadow-md hover:bg-[#5a6fd6] active:bg-[#4f62cc] transition-colors mt-2"
                style={{ fontFamily: "'Roboto', sans-serif", lineHeight: "30.8px" }}
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
    
  );
}
