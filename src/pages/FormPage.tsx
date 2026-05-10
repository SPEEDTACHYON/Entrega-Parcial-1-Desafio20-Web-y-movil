import React, { useState, useRef } from "react";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from "@ionic/react";

const emotions = [
  { emoji: "😠", label: "Enojo" },
  { emoji: "😊", label: "Alegría" },
  { emoji: "😟", label: "Preocupación" },
];

export default function Index() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setSelectedEmotion(null);
    setDescription("");
    setPhoto(null);
  }

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden flex items-center justify-center bg-gradient-to-br from-[#EFF6FF] to-[#E0E7FF] px-4 py-12">
      <div className="w-full max-w-[672px]">
        <div className="bg-white rounded-2xl shadow-lg shadow-black/10 overflow-hidden">
          <div className="px-8 pt-8 pb-8 flex flex-col gap-8">
            {/* Header */}
            <div>
              <h1 className="text-[30px] font-medium leading-9 text-[#0A0A0A]">
                Comparte tu Experiencia
              </h1>
              <p className="mt-1 text-base text-[#4A5565] leading-6">
                Tu opinión es importante para mejorar nuestra ciudad
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Emotion selector */}
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium text-[#0A0A0A] leading-7">
                  ¿Cómo te sientes?
                </span>
                <div className="grid grid-cols-3 gap-4">
                  {emotions.map(({ emoji, label }) => (
                    <IonButton
                      key={label}
                      fill="clear"
                      onClick={() =>
                        setSelectedEmotion(
                          selectedEmotion === label ? null : label
                        )
                      }
                      className={[
                        "flex flex-col items-center justify-center gap-2 py-6 rounded-[14px] border-2 transition-all cursor-pointer",
                        selectedEmotion === label
                          ? "border-[#2B7FFF] bg-[#EFF6FF]"
                          : "border-[#E5E7EB] hover:border-[#2B7FFF]/50",
                      ].join(" ")}
                    >
                      <span className="text-5xl leading-none">{emoji}</span>
                      <span className="text-sm font-medium text-[#0A0A0A] leading-5">
                        {label}
                      </span>
                    </IonButton>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-lg font-medium text-[#0A0A0A] leading-7">
                  Describe tu experiencia
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Cuéntanos qué pasó..."
                  rows={6}
                  className="w-full resize-none rounded-[14px] border-2 border-[#E5E7EB] px-4 py-3 text-base text-[#0A0A0A] placeholder-[#0A0A0A]/50 leading-6 outline-none focus:border-[#2B7FFF] transition-colors"
                />
                <span className="text-sm text-[#6A7282] leading-5">
                  {description.length} caracteres
                </span>
              </div>

              {/* Photo attachment */}
              <div className="flex flex-col gap-3">
                <span className="text-lg font-medium text-[#0A0A0A] leading-7">
                  Adjunta una fotografía (opcional)
                </span>

                {photo ? (
                  <div className="flex items-center gap-3 p-4 rounded-[14px] border-2 border-[#2B7FFF] bg-[#EFF6FF]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5 4H9.5L7 7H4C3.46957 7 2.96086 7.21071 2.58579 7.58579C2.21071 7.96086 2 8.46957 2 9V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H17L14.5 4Z"
                        stroke="#2B7FFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"
                        stroke="#2B7FFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="flex-1 text-sm text-[#4A5565] truncate">
                      {photo.name}
                    </span>
                    <IonButton
                      fill="clear"
                      size="small"
                      onClick={() => setPhoto(null)}
                      className="text-[#6A7282] hover:text-[#0A0A0A] text-lg leading-none"
                    >
                      ×
                    </IonButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {/* Take photo */}
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) =>
                        setPhoto(e.target.files?.[0] ?? null)
                      }
                    />
                    <IonButton type="button" onClick={() => cameraInputRef.current?.click()} className="flex items-center justify-center gap-3 h-[92px] rounded-[14px] border-2 border-dashed border-[#D1D5DC] hover:border-[#2B7FFF]/50 transition-colors cursor-pointer">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5 4H9.5L7 7H4C3.46957 7 2.96086 7.21071 2.58579 7.58579C2.21071 7.96086 2 8.46957 2 9V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H17L14.5 4Z"
                          stroke="#99A1AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"
                          stroke="#99A1AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-base font-medium text-[#4A5565] leading-6">
                        Tomar foto
                      </span>
                    </IonButton>

                    {/* Select from gallery */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setPhoto(e.target.files?.[0] ?? null)
                      }
                    />
                    <IonButton type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-3 h-[92px] rounded-[14px] border-2 border-dashed border-[#D1D5DC] hover:border-[#2B7FFF]/50 transition-colors cursor-pointer">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                          stroke="#99A1AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 8L12 3L7 8"
                          stroke="#99A1AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 3V15"
                          stroke="#99A1AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-base font-medium text-[#4A5565] leading-6">
                        Seleccionar desde galería
                      </span>
                    </IonButton>
                  </div>
                )}
              </div>

              {/* Submit */}
              <IonButton type="submit" expand="block" className="py-[15px] rounded-[14px] bg-[#2B7FFF] hover:bg-[#1a6ef0] active:bg-[#1560d4] transition-colors text-white text-lg font-medium leading-7">
                {submitted ? "¡Enviado!" : "Enviar Experiencia"}
              </IonButton>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
