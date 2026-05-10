import { IonPage, IonContent, IonRouterLink } from "@ionic/react";

export default function Index() {

  return (
    <IonPage>
      <IonContent fullscreen className="font-inter">
        <div className="min-h-screen overflow-y-auto overflow-x-hidden bg-[#F9FAFB]">

      
      {/* Está en el figma pero no tiene mucho sentido por ahora/}

      {/*
        <div className="flex justify-end px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 bg-white rounded-[10px] p-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]">
            <button
              onClick={() => setViewMode("usuario")}
              className={`flex items-center gap-2 pl-4 pr-4 py-2 rounded-lg text-base font-medium transition-colors ${
                viewMode === "usuario"
                  ? "bg-[#155DFC] text-white"
                  : "bg-[#F3F4F6] text-[#364153]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 14V12.6667C12.6667 11.9594 12.3858 11.2811 11.8857 10.781C11.3856 10.281 10.7073 10 10 10H6.00004C5.2928 10 4.61452 10.281 4.11442 10.781C3.61433 11.2811 3.33337 11.9594 3.33337 12.6667V14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.00004 7.33333C9.4728 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.4728 2 8.00004 2C6.52728 2 5.33337 3.19391 5.33337 4.66667C5.33337 6.13943 6.52728 7.33333 8.00004 7.33333Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Vista Usuario
            </button>
            <button
              onClick={() => setViewMode("admin")}
              className={`flex items-center gap-2 pl-4 pr-4 py-2 rounded-lg text-base font-medium transition-colors ${
                viewMode === "admin"
                  ? "bg-[#155DFC] text-white"
                  : "bg-[#F3F4F6] text-[#364153]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 8.66667C13.3333 12 11 13.6667 8.22663 14.6333C8.0814 14.6825 7.92365 14.6802 7.77996 14.6267C4.99996 13.6667 2.66663 12 2.66663 8.66667V4C2.66663 3.82319 2.73686 3.65362 2.86189 3.5286C2.98691 3.40357 3.15648 3.33333 3.33329 3.33333C4.66663 3.33333 6.33329 2.53333 7.49329 1.52C7.63453 1.39933 7.8142 1.33303 7.99996 1.33303C8.18572 1.33303 8.36539 1.39933 8.50663 1.52C9.67329 2.54 11.3333 3.33333 12.6666 3.33333C12.8434 3.33333 13.013 3.40357 13.138 3.5286C13.2631 3.65362 13.3333 3.82319 13.3333 4V8.66667Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Vista Admin
            </button>
          </div>
        </div>
      */}

      {/* Main Content */}
      <div className="max-w-[1152px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-12 flex flex-col gap-8">
        {/* --- BOTÓN VOLVER --- */}
        <div>
          <IonRouterLink
            routerLink="/dashboard" 
            routerDirection="back"
            className="inline-flex items-center gap-2 text-[#4A5565] hover:text-[#155DFC] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-medium">Volver</span>
          </IonRouterLink>
        </div>
        {/* -------------------- */}
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-[36px] font-bold leading-tight sm:leading-[40px] text-[#101828]">
            Renovación del Parque Central
          </h1>
          <p className="text-base text-[#4A5565] leading-6">
            Proyecto de mejoramiento integral del Parque Central de la ciudad, incluyendo nuevas áreas verdes, zonas recreativas y espacios públicos.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[10px] overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] h-[180px] sm:h-[204px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/719b03d86698b5a52bd8b138b2857cd1ef7550fb?width=725"
              alt="Imagen del proyecto 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-[10px] overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] h-[180px] sm:h-[204px] bg-[#D1D5DC]" />
          <div className="rounded-[10px] overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] h-[180px] sm:h-[204px]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/6566f4af2c21fb6db707265a873f131d0a3acf0f?width=725"
              alt="Imagen del proyecto 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Project Status Card */}
        <div className="bg-white rounded-[10px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] px-6 pt-6 pb-0 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-[#101828] leading-8">
            Estado del Proyecto
          </h2>

          <div className="flex flex-col gap-3">
            {/* Steps Row */}
            <div className="flex justify-between items-start">
              {/* Step 1: Diseño */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 36.6667C29.2048 36.6667 36.6667 29.2048 36.6667 20C36.6667 10.7953 29.2048 3.33334 20 3.33334C10.7953 3.33334 3.33334 10.7953 3.33334 20C3.33334 29.2048 10.7953 36.6667 20 36.6667Z" stroke="#00A63E" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 20L18.3333 23.3333L25 16.6667" stroke="#00A63E" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-[#00A63E]">Diseño</span>
              </div>

              {/* Step 2: Licitación */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 36.6667C29.2047 36.6667 36.6666 29.2048 36.6666 20C36.6666 10.7953 29.2047 3.33334 20 3.33334C10.7952 3.33334 3.33331 10.7953 3.33331 20C3.33331 29.2048 10.7952 36.6667 20 36.6667Z" stroke="#155DFC" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 20L18.3333 23.3333L25 16.6667" stroke="#155DFC" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-[#155DFC]">Licitación</span>
              </div>

              {/* Step 3: Ejecución */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 36.6667C29.2048 36.6667 36.6667 29.2048 36.6667 20C36.6667 10.7953 29.2048 3.33334 20 3.33334C10.7953 3.33334 3.33337 10.7953 3.33337 20C3.33337 29.2048 10.7953 36.6667 20 36.6667Z" stroke="#D1D5DC" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-[#99A1AF]">Ejecución</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: "66.67%", background: "linear-gradient(90deg, #2B7FFF 0%, #155DFC 100%)" }}
              />
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center pb-6">
            <div className="bg-[#DBEAFE] rounded-full px-6 py-[11px]">
              <span className="text-lg font-semibold text-[#193CB8] leading-7">
                Estado Actual: Licitación
              </span>
            </div>
          </div>
        </div>

        {/* Technical Description Card */}
        <div className="bg-white rounded-[10px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-[#101828] leading-8">
            Descripción Técnica
          </h2>

          <p className="text-base text-[#364153] leading-[26px]">
            El proyecto contempla la renovación de 15,000 m² de área verde, instalación de nuevo mobiliario urbano, sistema de iluminación LED, senderos peatonales accesibles, zona de juegos infantiles inclusiva, circuito de ejercicios al aire libre y área de eventos comunitarios. Se incluye también un sistema de riego automatizado y plantación de 200 árboles nativos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F9FAFB] rounded-[10px] p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#364153] leading-[27px]">Ubicación</h3>
              <p className="text-base text-[#4A5565] leading-6">Centro, Ciudad</p>
            </div>
            <div className="bg-[#F9FAFB] rounded-[10px] p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#364153] leading-[27px]">Presupuesto</h3>
              <p className="text-base text-[#4A5565] leading-6">$2,500,000</p>
            </div>
          </div>
        </div>

        {/* Opinion Button */}
        <div className="flex justify-center pb-4">
          <IonRouterLink
            routerLink="/form"
            routerDirection="forward"
            className="gap-3 bg-[#155DFC] text-white font-bold text-lg leading-7 px-8 py-[15px] rounded-[10px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] hover:bg-[#1249d6] active:bg-[#0e3bb5] transition-colors inline-flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Dar mi opinión
          </IonRouterLink>
        </div>
      </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
