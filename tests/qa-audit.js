/**
 * Praxis Growth - Suite Automatizada de Control de Calidad (QA)
 * =============================================================
 * Auditoría exhaustiva de la experiencia de producción:
 * 1. Estructura de archivos y recursos de marca.
 * 2. Unificación a logo negativo oficial (#0B1F33 permanente).
 * 3. Selector y sistema de internacionalización bilingüe (ES / EN).
 * 4. Integración de Web3Forms API y despacho asíncrono con loading state.
 * 5. Eliminación total de elementos de demostración local.
 * 6. Hero a 2 columnas con dashboard cristal y micro-animaciones.
 * 7. Encuadre fotográfico de especialidades e interactividad.
 * 8. Bento Grid asimétrico (3 puntos clave).
 * 9. Línea de tiempo interactiva y 4 valores de marca.
 * 10. Validaciones rigurosas, sanitización XSS y persistencia en Backend.
 * 11. Contraste, accesibilidad y diseño responsivo.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 ========================================================');
console.log('🧪 AUDITORÍA INTEGRAL DE ASEGURAMIENTO DE CALIDAD (QA)');
console.log('🧪 PROYECTO: Praxis Growth (landing-praxis-growth)');
console.log('🧪 VERSIÓN: Producción Bilingüe (ES/EN) + Web3Forms API');
console.log('🧪 ========================================================\n');

const projectRoot = path.resolve(__dirname, '..');
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'css', 'styles.css');
const backendPath = path.join(projectRoot, 'js', 'backend.js');
const frontendPath = path.join(projectRoot, 'js', 'frontend.js');
const faviconPngPath = path.join(projectRoot, 'assets', 'favicon-p.png');
const logoNegativoPath = path.join(projectRoot, 'assets', 'logo-negativo.png');

let passCount = 0;
let failCount = 0;
const issues = [];

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✅ [APROBADO] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ [FALLO] ${name}: ${err.message}`);
    failCount++;
    issues.push({ name, error: err.message });
  }
}

async function runAudit() {
  // -------------------------------------------------------------------------
  // 1. EXISTENCIA FÍSICA Y ARCHIVOS DE MARCA
  // -------------------------------------------------------------------------
  console.log('📁 1. Estructura y Archivos de Marca');

  await test('Todos los archivos estructurales existen en disco', () => {
    assert(fs.existsSync(htmlPath), 'Falta index.html');
    assert(fs.existsSync(cssPath), 'Falta css/styles.css');
    assert(fs.existsSync(backendPath), 'Falta js/backend.js');
    assert(fs.existsSync(frontendPath), 'Falta js/frontend.js');
    assert(fs.existsSync(faviconPngPath), 'Falta assets/favicon-p.png');
    assert(fs.existsSync(logoNegativoPath), 'Falta assets/logo-negativo.png');
  });

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const frontendContent = fs.readFileSync(frontendPath, 'utf8');
  const backendModule = require(backendPath);

  // -------------------------------------------------------------------------
  // 2. LOGO NEGATIVO Y MODO OSCURO PERMANENTE
  // -------------------------------------------------------------------------
  console.log('\n🏷️ 2. Logo Negativo Unificado y Modo Oscuro Fijo');

  await test('Navbar y Footer: Usan únicamente assets/logo-negativo.png sin textos duplicados', () => {
    assert(htmlContent.includes('src="assets/logo-negativo.png"'), 'Debe contener assets/logo-negativo.png');
    assert(!htmlContent.includes('src="assets/logo-praxis.png"'), 'No debe contener assets/logo-praxis.png');

    const navbarBrandMatch = htmlContent.match(/<a href="#" class="brand-logo"[^>]*>([\s\S]*?)<\/a>/);
    assert(navbarBrandMatch && navbarBrandMatch[1].replace(/<[^>]*>/g, '').trim() === '', 'Navbar sin texto duplicado');

    const footerBrandMatch = htmlContent.match(/<a href="#" class="brand-logo footer-logo"[^>]*>([\s\S]*?)<\/a>/);
    assert(footerBrandMatch && footerBrandMatch[1].replace(/<[^>]*>/g, '').trim() === '', 'Footer sin texto duplicado');
  });

  await test('Selector de tema eliminado y modo oscuro fijado en variables CSS', () => {
    assert(!htmlContent.includes('id="themeToggleBtn"'), 'themeToggleBtn no debe existir en HTML');
    assert(!frontendContent.includes('themeToggleBtn'), 'frontend.js no debe manipular themeToggleBtn');
    assert(cssContent.includes('--color-navy: #0B1F33'), 'Navy profundo debe ser el color base');
    assert(cssContent.includes('--color-verde: #5EE38D'), 'Verde crecimiento debe ser el acento');
  });

  // -------------------------------------------------------------------------
  // 3. INTERNACIONALIZACIÓN BILINGÜE COMPLETA (ES / EN)
  // -------------------------------------------------------------------------
  console.log('\n🌐 3. Sistema de Internacionalización Bilingüe (ES / EN)');

  await test('Diccionario bilingüe oficial completo con taglines exactos', () => {
    assert(backendModule.TRANSLATIONS.es, 'Debe existir diccionario en español');
    assert(backendModule.TRANSLATIONS.en, 'Debe existir diccionario en inglés');

    // Taglines oficiales
    assert.strictEqual(backendModule.TRANSLATIONS.es.meta.title, 'Praxis Growth — Convertimos tu experiencia en crecimiento');
    assert.strictEqual(backendModule.TRANSLATIONS.en.meta.title, 'Praxis Growth — Turn Expertise Into Growth');
    assert.strictEqual(backendModule.TRANSLATIONS.en.footer.quote, '"Turn Expertise Into Growth."');
    assert.strictEqual(backendModule.TRANSLATIONS.es.footer.quote, '"Convertimos tu experiencia en crecimiento"');
  });

  await test('3 pilares del enfoque traducidos con exactitud en ES y EN', () => {
    const pillarsEs = backendModule.getPillars('es');
    const pillarsEn = backendModule.getPillars('en');

    assert.strictEqual(pillarsEs.length, 3);
    assert.strictEqual(pillarsEn.length, 3);

    assert.strictEqual(pillarsEs[0].titulo, 'Estrategia');
    assert.strictEqual(pillarsEs[1].titulo, 'Captación');
    assert.strictEqual(pillarsEs[2].titulo, 'Seguimiento');

    assert.strictEqual(pillarsEn[0].titulo, 'Strategy');
    assert.strictEqual(pillarsEn[1].titulo, 'Acquisition');
    assert.strictEqual(pillarsEn[2].titulo, 'Follow-up');
  });

  await test('3 especialidades traducidas con exactitud en ES y EN', () => {
    const audEs = backendModule.getAudiences('es');
    const audEn = backendModule.getAudiences('en');

    assert.strictEqual(audEs.length, 3);
    assert.strictEqual(audEn.length, 3);

    assert.strictEqual(audEs[0].title, 'Médicos y clínicas');
    assert.strictEqual(audEs[1].title, 'Abogados y firmas');
    assert.strictEqual(audEs[2].title, 'Especialistas de salud');

    assert.strictEqual(audEn[0].title, 'Doctors & Clinics');
    assert.strictEqual(audEn[1].title, 'Lawyers & Law Firms');
    assert.strictEqual(audEn[2].title, 'Health Specialists');
  });

  await test('Navbar contiene selector minimalista de idioma (ES | EN)', () => {
    assert(htmlContent.includes('class="lang-selector"'), 'index.html debe contener .lang-selector');
    assert(htmlContent.includes('data-lang="es"'), 'Debe existir botón ES');
    assert(htmlContent.includes('data-lang="en"'), 'Debe existir botón EN');
    assert(cssContent.includes('.lang-selector'), 'styles.css debe estilizar .lang-selector');
    assert(cssContent.includes('.lang-btn.active'), 'styles.css debe resaltar el idioma activo');
    assert(frontendContent.includes('applyLanguage'), 'frontend.js debe implementar traducción dinámica');
  });

  await test('Gestión de idioma: getLanguage, setLanguage y persistencia', () => {
    assert.strictEqual(typeof backendModule.getLanguage, 'function');
    assert.strictEqual(typeof backendModule.setLanguage, 'function');
    assert.strictEqual(backendModule.setLanguage('en'), 'en');
    assert.strictEqual(backendModule.setLanguage('es'), 'es');
    assert.strictEqual(backendModule.LANG_STORAGE_KEY, 'praxis_lang');
  });

  // -------------------------------------------------------------------------
  // 4. INTEGRACIÓN WEB3FORMS API Y ELIMINACIÓN DE ELEMENTOS DEMO
  // -------------------------------------------------------------------------
  console.log('\n📬 4. Web3Forms API y Eliminación de Elementos Demo');

  await test('Configuración de Web3Forms API: Endpoint y Access Key oficial', () => {
    assert.strictEqual(backendModule.WEB3FORMS_ENDPOINT, 'https://api.web3forms.com/submit');
    assert.strictEqual(backendModule.WEB3FORMS_ACCESS_KEY, 'db5bff44-38fa-4c65-9a7d-707a81f9cdca');
  });

  await test('Despacho asíncrono de consultas: saveConsultation genera folio px_ y confirma', async () => {
    const validLead = {
      nombre: 'Clínica Oftalmológica Integral',
      email: 'contacto@oftalmointegral.com',
      telefono: '+34 91 700 8899',
      especialidad: 'medicos',
      mensaje: 'Queremos estructurar un proceso claro para captar pacientes de cirugía refractiva.'
    };

    const promise = backendModule.saveConsultation(validLead, 'es');
    assert(promise instanceof Promise, 'saveConsultation debe retornar una Promise asíncrona');

    const result = await promise;
    assert.strictEqual(result.success, true);
    assert(result.consultation.id.startsWith('px_'), 'El folio debe comenzar con px_');
    assert.strictEqual(result.consultation.nombre, 'Clínica Oftalmológica Integral');
    assert.strictEqual(result.consultation.especialidad, 'Médicos y clínicas');
    assert(result.message.includes('menos de 48 horas'), 'Mensaje de confirmación profesional en español');

    backendModule.clearAllConsultations();
  });

  await test('Despacho en inglés: retorna mensaje de confirmación profesional en EN', async () => {
    const validLeadEn = {
      nombre: 'Mendoza & Partners Law Firm',
      email: 'info@mendozalaw.com',
      telefono: '+1 305 555 0192',
      especialidad: 'abogados',
      mensaje: 'We are expanding our corporate arbitration practice and require structured client intake.'
    };

    const result = await backendModule.saveConsultation(validLeadEn, 'en');
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.consultation.especialidad, 'Lawyers & Law Firms');
    assert(result.message.includes('within 48 hours'), 'Mensaje de confirmación profesional en inglés');

    backendModule.clearAllConsultations();
  });

  await test('Validación y sanitización XSS previenen inyecciones en los campos', () => {
    const xssLead = {
      nombre: '<script>alert("xss")</script>Dr. Gómez',
      email: 'valido@gomez.com',
      telefono: '+34 600 112 233',
      especialidad: 'medicos',
      mensaje: '<img src=x onerror=alert(1)> Consulta de valoración general.'
    };

    const validation = backendModule.validateConsultation(xssLead);
    assert.strictEqual(validation.isValid, true);
    assert(!validation.cleanData.nombre.includes('<script>'), 'Etiqueta script debe ser neutralizada');
    assert(!validation.cleanData.mensaje.includes('<img'), 'Etiqueta img debe ser neutralizada');
  });

  await test('Estado de carga en botón durante envío: .btn.is-loading y spinner definidos', () => {
    assert(cssContent.includes('.btn.is-loading'), 'CSS debe definir clase .btn.is-loading');
    assert(cssContent.includes('btnSpinner'), 'CSS debe definir animación de spinner');
    assert(frontendContent.includes('is-loading'), 'frontend.js debe alternar .is-loading');
  });

  await test('Eliminación absoluta de elementos de demostración local en HTML, CSS y JS', () => {
    // HTML
    assert(!htmlContent.includes('demo-consultations-panel'), 'index.html no debe tener .demo-consultations-panel');
    assert(!htmlContent.includes('toggleDemoPanelBtn'), 'index.html no debe tener toggleDemoPanelBtn');
    assert(!htmlContent.includes('Ver registros guardados'), 'index.html no debe tener texto de demo');

    // CSS
    assert(!cssContent.includes('.demo-consultations-panel'), 'styles.css no debe contener .demo-consultations-panel');
    assert(!cssContent.includes('.demo-panel-toggle'), 'styles.css no debe contener .demo-panel-toggle');
    assert(!cssContent.includes('.consultation-item'), 'styles.css no debe contener .consultation-item');

    // JS
    assert(!frontendContent.includes('renderConsultationsList'), 'frontend.js no debe tener renderConsultationsList');
    assert(!frontendContent.includes('toggleDemoPanelBtn'), 'frontend.js no debe tener toggleDemoPanelBtn');
  });

  // -------------------------------------------------------------------------
  // 5. IDENTIDAD VISUAL BOUTIQUE PREMIUM
  // -------------------------------------------------------------------------
  console.log('\n✨ 5. Identidad Visual Boutique Premium');

  await test('Retícula arquitectónica (48px) y luces ambientales suaves', () => {
    assert(cssContent.includes('background-size: 48px 48px'), 'Retícula de fondo 48px');
    assert(cssContent.includes('radial-gradient'), 'Luces ambientales con degradado radial');
    assert(htmlContent.includes('ambient-glow'), 'Capas de resplandor ambiental');
  });

  await test('Hero section: 2 columnas, dashboard cristal, puntos pulsantes y tarjetas flotantes', () => {
    assert(htmlContent.includes('hero-grid-layout'), 'Hero a 2 columnas');
    assert(htmlContent.includes('hero-preview-glass'), 'Dashboard cristal');
    assert(htmlContent.includes('pulse-dot'), 'Puntos verdes pulsantes');
    assert(htmlContent.includes('hero-float-card'), 'Mini-tarjetas flotantes');
  });

  await test('Especialidades: Fotografía real de Unsplash, encuadre óptimo y píldoras SVG', () => {
    assert(htmlContent.includes('specialty-image-wrapper'), 'Contenedor de imagen presente');
    assert(htmlContent.includes('object-position: center 15%') || cssContent.includes('object-position: center 15%'), 'Encuadre de foto médica preservado');
    assert(htmlContent.includes('specialty-icon-pill'), 'Píldoras SVG en tarjetas');
  });

  await test('Bento Grid asimétrico con números gigantes decorativos (01, 02, 03)', () => {
    assert(htmlContent.includes('bento-grid'), 'Bento Grid presente');
    assert(htmlContent.includes('bento-span-7'), 'Tarjeta Span 7');
    assert(htmlContent.includes('bento-span-5'), 'Tarjeta Span 5');
    assert(htmlContent.includes('bento-span-12'), 'Tarjeta Span 12');
    assert(htmlContent.includes('bento-watermark'), 'Marcas de agua gigantes presentes');
  });

  await test('Línea de tiempo en Enfoque con nodos interactivos y 4 valores de marca', () => {
    assert(htmlContent.includes('timeline-interactive-wrapper'), 'Línea de tiempo presente');
    assert(htmlContent.includes('values-grid'), 'Grid de valores presente');
    assert.strictEqual(backendModule.getValues('es').length, 4, '4 valores de marca en español');
    assert.strictEqual(backendModule.getValues('en').length, 4, '4 valores de marca en inglés');
  });

  // -------------------------------------------------------------------------
  // 6. CONTRASTE Y RESPONSIVIDAD MÓVIL
  // -------------------------------------------------------------------------
  console.log('\n📐 6. Contraste y Adaptabilidad Responsiva');

  await test('Botón CTA mantiene Verde (#5EE38D) con texto Navy (#0B1F33)', () => {
    assert(cssContent.includes('--btn-cta-bg: var(--color-verde)'));
    assert(cssContent.includes('--btn-cta-text: var(--color-navy)'));
  });

  await test('CSS previene desbordamientos y adapta para tablets (992px) y móviles (768px)', () => {
    assert(cssContent.includes('overflow-x: hidden'));
    assert(cssContent.includes('@media (max-width: 992px)'));
    assert(cssContent.includes('@media (max-width: 768px)'));
  });

  // -------------------------------------------------------------------------
  // RESUMEN FINAL DE LA AUDITORÍA
  // -------------------------------------------------------------------------
  console.log('\n============================================================');
  console.log(`TOTAL PRUEBAS EJECUTADAS: ${passCount + failCount}`);
  console.log(`PRUEBAS APROBADAS: ${passCount} ✅`);
  console.log(`PRUEBAS FALLIDAS: ${failCount} ${failCount > 0 ? '❌' : ''}`);
  console.log('============================================================');

  if (failCount > 0) {
    console.error('\n⚠️ DETALLE DE INCIDENCIAS DETECTADAS:');
    issues.forEach((iss, idx) => {
      console.error(`  ${idx + 1}. ${iss.name} -> ${iss.error}`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 VEREDICTO DE QA: PROYECTO 100% CERTIFICADO Y APROBADO.');
    process.exit(0);
  }
}

runAudit().catch(err => {
  console.error('Error fatal durante la suite de pruebas:', err);
  process.exit(1);
});
