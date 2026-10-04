# Praxis Growth — "Convertimos tu experiencia en crecimiento" / "Turn Expertise Into Growth."

Plataforma y Landing Page institucional de **Praxis Growth**, lista para producción con soporte **bilingüe completo (ES / EN)**, integración directa con **Web3Forms API** para recepción de consultas por correo electrónico, y la estética de una **agencia boutique premium** (estilo Linear / Stripe / Vercel adaptado con el rigor y la ética de los sectores médico, jurídico y de bienestar).

---

## 🌐 Soporte Bilingüe Completo (Español / Inglés)

1. **Selector Minimalista de Idioma en Navbar**:
   - Selector elegante `ES | EN` ubicado en la cabecera, con borde sutil `#8D98A5` y resaltado activo en Verde Crecimiento (`#5EE38D`).
   - Cambio dinámico en tiempo real sin recargar la página: traduce Navbar, Hero, Dashboard en vivo, Línea de tiempo de Enfoque, Valores de marca, Tarjetas de especialidades, Bento Grid, Formulario de agendamiento y Footer.
   - Actualización sincronizada de `<html lang="...">`, `<title>` y `<meta name="description">`.
   - Persistencia de la preferencia del usuario en `localStorage` bajo la clave `praxis_lang` (`'es'` por defecto).

2. **Taglines Oficiales de la Marca**:
   - **ES**: *"Convertimos tu experiencia en crecimiento"*
   - **EN**: *"Turn Expertise Into Growth."*

---

## 📬 Integración con Web3Forms API (Producción)

- **Despacho Asíncrono de Consultas**:
  - El formulario envía las solicitudes directamente a `https://api.web3forms.com/submit` vía `POST` JSON con `fetch`.
  - **Access Key**: `db5bff44-38fa-4c65-9a7d-707a81f9cdca`.
  - **Asunto de Correo**: *"Nueva Consulta Estratégica — Praxis Growth"* (o *"New Strategic Consultation — Praxis Growth"* en inglés).
  - **Remitente**: *"Praxis Growth Web"*.
  - **Datos del Payload**: `nombre`, `email`, `telefono`, `especialidad`, `mensaje`, `idioma` y `folio` único (`px_...`).
- **Estados de Interacción y Confirmación**:
  - Estado de carga interactivo en el botón CTA (`.btn.is-loading` con spinner animado y texto *"Enviando solicitud..."* / *"Sending request..."*).
  - Confirmación profesional tras el envío con folio de seguimiento generado y mensaje de atención en menos de 48 horas.
- **Eliminación Total de Elementos de Demostración Local**:
  - Se removió por completo el panel `.demo-consultations-panel` y cualquier botón de prueba local para un pase limpio a producción.

---

## 💎 Identidad Visual y Experiencia Boutique

1. **Textura Arquitectónica y Profundidad**:
   - Retícula geométrica ultra sutil de `48px x 48px` en `rgba(247, 248, 245, 0.03)` inspirada en la guía de marca.
   - Luces ambientales suaves (`radial-gradient` con Verde `#5EE38D` difuminado con `blur: 95px`) detrás del Hero y de la sección de agendamiento.

2. **Hero Section a 2 Columnas con Dashboard Flotante Interactivo**:
   - **Columna Izquierda**: Kicker de marca, titular H1, subtítulo institucional, credencial de confianza y botones CTA con micro-resplandor y flecha animada en hover.
   - **Columna Derecha**: Composición visual tipo UI / Dashboard en efecto cristal (`backdrop-filter: blur(14px)`), representando el flujo conectado en tiempo real (**01 Estrategia ➔ 02 Captación ➔ 03 Seguimiento**) con puntos verdes pulsantes y dos mini-tarjetas flotantes animadas con `@keyframes float` (*"Consultas relevantes +74%"* con mini gráfico SVG y *"Proceso claro: Primera consulta agendada"*).

3. **Línea de Tiempo Conectada en "Nuestro Enfoque"**:
   - Visualización continua con trazo verde y nodos circulares (`01`, `02`, `03`) que se iluminan interactivamente al pasar el cursor, transmitiendo cohesión integral.

4. **Especialidades con Fotografía Real e Iconografía Fina**:
   - Fotografías reales en alta definición (luz natural y entornos profesionales sobrios) integradas con degradados oscuros.
   - Encuadre fotográfico óptimo para médicos y clínicas (`height: 220px` y `object-position: center 15%`) garantizando que el rostro sea visible en su totalidad.
   - Píldoras con iconografía SVG fina en verde `#5EE38D` y elevación con borde iluminado al hacer hover.

5. **Bento Grid Asimétrico para "3 puntos que tu web debe dejar claros"**:
   - Layout contemporáneo asimétrico (tarjetas de 7, 5 y 12 columnas) para **Especialidad**, **Confianza** y **Contacto**.
   - Esquemas geométricos en SVG inspirados en la "P" de la marca y números decorativos gigantes semitransparentes en marca de agua (`01`, `02`, `03`).

6. **Animaciones de Scroll Fluidas (`IntersectionObserver`)**:
   - Transiciones suaves de entrada (`opacity` y `translateY`) al recorrer la página, con respeto automático para usuarios con preferencia de movimiento reducido (`prefers-reduced-motion`).

---

## 🎨 Paleta Cromática y Tokens

- **Navy profundo (`#0B1F33` / `#071524`):** Fondo de autoridad y base fija.
- **Blanco hueso (`#F7F8F5`):** Textos principales de lectura.
- **Verde crecimiento (`#5EE38D`):** Botones CTA con resplandor, indicadores de pulso y acentos de pilar.
- **Gris auxiliar (`#8D98A5` / `#CBD5E1`):** Subtítulos y bordes sutiles.
- **Regla Estricta de Contraste:** Botón CTA con fondo Verde `#5EE38D` y texto Navy `#0B1F33`.

---

## 🏗️ Arquitectura del Proyecto

```
landing-praxis-growth/
├── index.html             # Maquetación bilingüe semántica y accesible (Frontend)
├── css/
│   └── styles.css         # Sistema boutique, selector de idioma, loading state y animaciones (Frontend)
├── js/
│   ├── backend.js         # Diccionario i18n, validaciones éticas, sanitización y Web3Forms API (Backend)
│   └── frontend.js        # Traducción dinámica reactiva, despacho asíncrono y feedback visual (Frontend)
├── assets/
│   ├── favicon-p.png      # Favicon oficial de marca
│   └── logo-negativo.png  # Logotipo oficial negativo unificado
├── tests/
│   └── qa-audit.js        # Suite de pruebas automatizadas y control de calidad (QA)
└── README.md              # Documentación técnica y guía de producción
```

---

## 🧪 Control de Calidad (QA Suite)

Ejecuta la batería de pruebas automatizadas en cualquier momento:

```bash
node landing-praxis-growth/tests/qa-audit.js
```

### Resultados de la Auditoría:
- ✅ **21 / 21 Pruebas Aprobadas (100% de éxito)**.
- ✅ Diccionario bilingüe oficial completo (ES/EN) con taglines y pilares validados.
- ✅ Selector de idioma en Navbar con traducción dinámica en tiempo real.
- ✅ Web3Forms API configurado con Access Key oficial y despacho asíncrono.
- ✅ Validación rigurosa, sanitización contra inyecciones XSS y generación de folios `px_...`.
- ✅ Estado de carga `.btn.is-loading` con spinner CSS animado.
- ✅ Eliminación absoluta de elementos demo locales en HTML, CSS y JS.
- ✅ Retícula geométrica de 48px y luces ambientales suaves con Verde `#5EE38D`.
- ✅ Hero a 2 columnas con dashboard interactivo, puntos pulsantes y tarjetas flotantes.
- ✅ Encuadre fotográfico de especialidades e interactividad hover.
- ✅ Bento Grid asimétrico con marcas de agua 01, 02, 03.
- ✅ Línea de tiempo interactiva y 4 valores de marca.
- ✅ Contraste y adaptabilidad responsiva para escritorio, tablet y móvil.

---

## 🚀 Guía de Uso

Abre directamente [`landing-praxis-growth/index.html`](index.html) en tu navegador o inicia un servidor local:

```bash
cd landing-praxis-growth
python3 -m http.server 8000
```
Visita `http://localhost:8000`.
