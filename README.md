# Entrega-Parcial-1-Desafio20-Web-y-movil
En el siguiente repositorio de github se muestra el directorio readme.md con todas las especificaciones técnicas, los diagramas de flujo, los mockups,creación del proyecto en ionic y el diseño de pantallas tal como se requirió para la entrega parcial 1 

## EP1.1

**SE REQUIERE :** Definición de al menos 7 requerimientos funcionales y al
menos 3 no funcionales (rendimiento, seguridad, usabilidad). Estas
funcionalidades no pueden ser repetitivas. Estas funcionalidades
están fuera de inicio se sesión registrarse ya que deben estar
inmersas en la propuesta. Dentro de las funcionalidades deben
considerar dos tipos de roles (ejemplo: usuario y admin)

### **REQUERIMIENTOS FUNCIONALES (RF) :** 

**RF1 - Visualización georreferenciada de proyectos:**
El sistema debe presentar un mapa interactivo, utilizando el DOM y APIs de mapas, que muestre los proyectos municipales activos cercanos a la ubicación GPS del usuario.

**RF2 - Registro de experiencia multimodal:**
El usuario debe poder enviar una “Ficha de Experiencia” que incluya texto, una fotografía capturada desde la cámara del dispositivo móvil y etiquetas de sentimiento como Enojo, Alegría o Preocupación.

**RF3 - Seguimiento de la incidencia:**
El sistema debe permitir al ciudadano consultar el estado de su opinión, mostrando estados como “Recibida”, “En análisis por IA” o “Considerada en el informe final”.

**RF4 - Buzón de Sugerencias PWA (Offline):**
Mediante el uso de Service Workers, el usuario podrá redactar su opinión incluso sin conexión a internet (por ejemplo, en zonas rurales), enviándose automáticamente cuando se recupere la conectividad.
Rol: Administrador (Funcionario Municipal).

**RF5 - Dashboard de Análisis de Sentimiento (IA):**
El sistema debe procesar los textos ingresados mediante un modelo de lenguaje, generando visualizaciones del “clima ciudadano” para cada proyecto.

**RF6 - Generador de Reportes JSON para Transparencia:**
El administrador debe poder exportar un archivo en formato JSON que contenga un resumen de las 10 preocupaciones más frecuentes de los ciudadanos, para su publicación en el portal de transparencia.

**RF7 - Gestión de Estado de Proyectos:**
El administrador debe tener la capacidad de actualizar la etapa de cada proyecto (Diseño, Licitación, Ejecución), notificando automáticamente a los usuarios que han participado con opiniones.

### **REQUERIMIENTOS NO FUNCIONALES (RNF) :** 

**RNF1 - Usabilidad (Accesibilidad):**
La interfaz debe cumplir con los estándares W3C (WCAG2.1), asegurando un contraste de colores adecuado y tamaños mínimos de botones de 44x44 píxeles, facilitando su uso en dispositivos móviles, especialmente para adultos mayores.

**RNF2 - Seguridad (Protección de datos):**
Todas las comunicaciones entre cliente y servidor deben realizarse mediante el protocolo HTTPS, garantizando la protección de los datos sensibles conforme a la normativa de protección de la vida privada.

**RNF3 - Rendimiento (Tiempo de carga):**
Dado que el sistema es una SPA, el tiempo de carga inicial del archivo index.html y los recursos base no debe superar los 3 segundos en una conexión 4G estándar, con el fin de evitar la pérdida de usarios

## EP1.2

**SE REQUIERE :** Justificación del problema y análisis del usuario objetivo.

**JUSTIFICACIÓN DEL PROBLEMA :** El problema que se presenta en el desafío 20 "Las municipalidades no han consolidado mecanismos  de participación ciudadana que involucren a vecinos en la toma de decisiones" no es un problema a ignorar, es una incompletitud a una ley judicial y una falta grave en la participación de los ciudadanos para entregar un feedback sobre los proyectos públicos que se realizan en su localidad.

Esa falta de participación lleva a múltiples conflictos como la falta de comunicación entre el ciudadano y el municipio, la desinformación sobre el uso de los fondos municipales en los proyectos de la municipalidad y la desconfianza pública a la hora de participar en estos proyectos.

**PÚBLICO OBJETIVO :** Este problema es muy importante porque aborda un público objetivo que es universal y heterogéneo : cualquier ciudadano que quiera retroalimentar los proyectos municipales de su localidad.

Debemos tener en cuenta que este público heterogéneo será muy variado; hombres y mujeres de distintas edades, y con opiniones diferentes. Por eso, el filtrado de los ciudadanos deberá ser fundamental, para no obtener únicamente un feedback general de los ciudadanos, sino también filtros más específicos por género, rango etario y otras características relevantes y apropiadas para saber qué grupo de personas está más conforme o disconforme con diversos proyectos municipales.

## EP1.3

**SE REQUIERE :** Bocetos de UI/UX y prototipado en Figma de al menos
 7 mockups o pantallas distintas, cada una correspondiente
a una funcionalidad previamente definida en los requerimientos
del proyecto. Cada pantalla deberá presentar un diseño diferenciado, coherente con el flujo de navegación y la jerarquía de información. Las interfaces deberán ser prototipadas considerando
Explícitamente: versión móvil y web. El diseño deberá evidenciar
distribución de contenido, componentes de navegación (por ejemplo: menú lateral en web, barra inferior en m´ovil), jerarquía visual
y densidad de la información. Se deber´a Incluir en los mockups
dos formularios relacionados al inicio de sesión de usuarios y registro, considerando los campos: Nombre de usuario, RUT, Correo Electrónico, Region, Comuna, Contraseña, Confirmación de
Contraseña y aceptación de términos y condiciones. Considerando validaciones visuales y diseño centrado en el usuario.

Definir las pantallas a presentar

Antes de programar cada mockup, debemos modelar qué vamos a hacer en cada pantalla;

A continuación se presenta la definición de las 7 pantallas (Mockups)
basándonos en los 7 requerimientos funcionales:

**Pantalla 1: Registro del usuario**

Campos: Nombre, RUT, correo electrónico, región y comuna (mediante listas desplegables), contraseña, confirmación de contraseña y aceptación de términos y condiciones.

UX: Validación visual en tiempo real, por ejemplo, borde verde cuando el RUT es válido y borde rojo cuando las contraseñas no coinciden.

**Pantalla 1 en Figma :**

https://www.figma.com/make/LW8dK6owJ8XT9LZLT51Niz/User-Registration-Screen?t=2LPp4ppkcWkFh9Kj-1




**Pantalla 2: Inicio de sesión**

Campos: Correo electrónico o RUT, y contraseña.

UX: Incluye opción de “Olvidé mi contraseña” y acceso directo al formulario de registro.

**Pantalla 2 en Figma :**

https://www.figma.com/make/4HRuC9hR0ukHdUxpiYLNnL/Login-form-with-recovery-option?t=2LPp4ppkcWkFh9Kj-1

**Pantalla 3: Dashboard principal y mapa de proyectos (RF1)**

Contenido: Mapa interactivo que ocupa aproximadamente el 70% de la pantalla, donde se renderizan los proyectos mediante el DOM.

Web: Filtros laterales que permiten clasificar los proyectos por tipo.

Móvil: Botón flotante para centrar la vista en la ubicación actual del usuario.

**Pantalla 3 en figma :**

https://www.figma.com/make/1MpwK8OKBUSpeFVQDzzVc3/Dashboard-with-Interactive-Map?t=2LPp4ppkcWkFh9Kj-1

**Pantalla 4: Detalles del proyecto (RF7)**

Contenido: Imágenes del proyecto, descripción técnica y una barra de progreso que indica la etapa (Diseño, Licitación o Ejecución).

Jerarquía visual: Título destacado, estado actual claramente visible y botón principal “Dar mi opinión”.

**Pantalla 4 en figma :**

https://www.figma.com/make/noHrlTFykEPsEgR8rSE0rW/Project-Details-Screen?t=shKLnrYb6jk4YCNZ-1

**Pantalla 5: Formulario de experiencia ciudadana (RF2)**

Componentes: Selector de sentimiento mediante emojis, campo de texto para describir la experiencia y opción para adjuntar una fotografía.

UX: Indicador de carga durante la subida de la imagen.

**Pantalla 5 en figma :**

https://www.figma.com/make/ZS4MkMDVGzOTao3FM2lnYe/Formulario-de-experiencia-ciudadana?t=shKLnrYb6jk4YCNZ-1

**Pantalla 6: Seguimiento de las opiniones enviadas (RF3)**

Contenido: Listado de opiniones enviadas por el usuario.

Cada elemento incluye una etiqueta visual  con código de color que indica el estado, por ejemplo: rojo para “No recibida”, azul para “Recibida” y verde para “Considerada”.

**Pantalla 6 en figma :**

https://www.figma.com/make/21hvoNznzCHCVZByX96e8t/Opinion-Tracking-Screen?t=shKLnrYb6jk4YCNZ-1

**Pantalla 7: Panel de Administración + Análisis con IA integrada (RF5)**

Contenido: Vista exclusiva para administradores. Incluye gráficos (de barras o torta) que muestran el sentimiento general y nubes de palabras clave generadas por IA.
Web: Tabla detallada con opción de exportar datos en formato JSON (RF6).

**Pantalla 7 en figma :**

https://www.figma.com/make/5Ne4bX9aY9ntkOzP8B2Cv8/Admin-Panel-with-AI-Analysis?t=shKLnrYb6jk4YCNZ-1

## EP1.4

**SE REQUIERE :** Definición de Arquitectura de Navegación y Experiencia
del Usuario. El equipo deberá definir la arquitectura de navegación de la aplicación, describiendo la estructura de rutas, jerarquía de vistas, y flujo de interacción entre pantallas. La entrega
deberá incluir: (a) Rutas principales y secundarias; (b) Relaciones
jerárquicas entrevistas; (c) Flujo de navegación entre funcionalidades; (d) diferenciación de acceso según roles (por ejemplo: usuario /administrador); (e) flujo de principales tareas (task flow), (f)
puntos críticos de interacción; (g) coherencia de experiencia entre dispositivos; (h) breve justificación técnica de las decisiones adoptadas, considerando usabilidad, eficiencia de interacción, claridad
estructural y escalabilidad de la arquitectura frontend:


## EP1.5

**SE REQUIERE :** Creación del proyecto en Ionic con React, considerando:
(a) Uso de react router; (b) Rutas públicas y rutas protegidas; (c)
Redirecciones (ejemplo: login obligatorio); (d) Estructura modular
de vistas:


## EP1.6

**SE REQUIERE :** Diseño de pantallas principales e incorporando una estructura de navegación funcional y coherente con la arquitectura
previamente definida en ionic-react (al menos 4). Uso de componentes propios de Ionic (IonPage, IonHeader, IonContent, Ion-
Tabs, IonMenu, etc). Separación estructural del código en carpetas
(pages, components, routes, services):

**Para ello, vamos a rescatar las mejores 4 pantallas/mockup hechas en figma, vamos a mejorarlas y vamos a programarlas y formatearlas adecuadamente en Ionic-React**

**Pantalla 1 mejorada en Ionic-React :**

Mejora de pantalla 1 de Figma

https://www.figma.com/make/M7Hk2VcjIA1xjuolGGWcD5/User-Registration-Form?t=F2JORuMz6ErQLyxY-1

**Pantalla 2 mejorada en Ionic-React :**

Mejora de pantalla 2 de figma

https://www.figma.com/make/39XjHSHB4gaiOrYpM81hSr/Login-form-redesign?t=shKLnrYb6jk4YCNZ-1

**Pantalla 3 mejorada en Ionic-React :**

Mejora de pantalla 5 de Figma

**Pantalla 4 mejorada en Ionic-React :**

Mejora de pantalla 6 de Figma
