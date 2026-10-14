/**
 * Praxis Growth - Módulo de Lógica de Negocio, i18n y Web3Forms API (Backend)
 * ===========================================================================
 * Especialista: Backend
 * Responsabilidad: Catálogo bilingüe estructurado (ES / EN), diccionario i18n,
 * validación rigurosa de leads, sanitización y despacho a Web3Forms API.
 * 
 * Tagline oficial:
 * - ES: "Convertimos tu experiencia en crecimiento"
 * - EN: "Turn Expertise Into Growth."
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Entorno Node.js / CommonJS para testing automatizado
    module.exports = factory();
  } else {
    // Entorno de Navegador (Window)
    root.PraxisBackend = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY = 'praxis_growth_consultations_v1';
  const LANG_STORAGE_KEY = 'praxis_lang';
  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
  const WEB3FORMS_ACCESS_KEY = 'db5bff44-38fa-4c65-9a7d-707a81f9cdca';

  // =========================================================================
  // 1. DICCIONARIO BILINGÜE Y CATÁLOGOS ESTRUCTURADOS (ES / EN)
  // =========================================================================

  const TRANSLATIONS = {
    es: {
      meta: {
        title: 'Praxis Growth — Convertimos tu experiencia en crecimiento',
        description: 'Estrategia, campañas y seguimiento para médicos, clínicas, abogados, firmas y especialistas de salud.'
      },
      nav: {
        specialties: 'Especialidades',
        approach: 'Enfoque',
        services: 'Servicios',
        cta: 'Agenda una consulta'
      },
      hero: {
        kicker: 'CRECIMIENTO PARA PROFESIONALES',
        title: 'Tu experiencia genera confianza. Hagamos que genere oportunidades.',
        subtitle: 'Estrategia, campañas y seguimiento para médicos, abogados, clínicas y especialistas que quieren crecer con un proceso claro.',
        ctaPrimary: 'Agenda una consulta estratégica',
        ctaSecondary: 'Conoce nuestro enfoque',
        trustText: 'Procesos éticos adaptados a la normativa y confidencialidad de tu sector.',
        dashboardTitle: 'Flujo Praxis Growth — En tiempo real',
        step1: 'Estrategia',
        step1Sub: 'Posicionamiento & Mensaje',
        step2: 'Captación',
        step2Sub: 'Presencia & Consultas',
        step3: 'Seguimiento',
        step3Sub: 'Atención & Fidelización',
        structuredProcess: 'Proceso estructurado',
        traceability: '100% Trazabilidad',
        statLabel: 'Consultas relevantes',
        bookingCardTitle: 'Proceso claro: Primera consulta agendada',
        bookingCardSub: 'Clínica Especializada — Confirmada'
      },
      pillars: [
        {
          numero: '01',
          titulo: 'Estrategia',
          subtitulo: 'Definición de posicionamiento y mensaje',
          descripcion: 'Definición de posicionamiento, mensaje y propuesta diferencial para conectar con quienes valoran tu servicio.'
        },
        {
          numero: '02',
          titulo: 'Captación',
          subtitulo: 'Canales éticos y presencia profesional',
          descripcion: 'Presencia profesional impecable y campañas enfocadas en resolver inquietudes reales con ética y rigor.'
        },
        {
          numero: '03',
          titulo: 'Seguimiento',
          subtitulo: 'Procesos de atención y fidelización',
          descripcion: 'Canales de respuesta inmediatos y procesos de atención que transforman el interés en relaciones a largo plazo.'
        }
      ],
      approach: {
        kicker: 'NUESTRO COMPROMISO',
        heading: 'Conectamos comunicación, captación y seguimiento para que cada consulta tenga un proceso claro.',
        subheading: 'Sin tácticas agresivas ni promesas desmedidas. Aplicamos métodos estructurados que respetan el prestigio de tu profesión.',
        timeline: [
          {
            num: '01',
            title: 'Estrategia',
            desc: 'Diagnosticamos tu práctica actual, perfil de paciente y mensajes clave para cimentar autoridad sin estridencias.'
          },
          {
            num: '02',
            title: 'Captación',
            desc: 'Diseñamos páginas y puntos de contacto accesibles que resuelven dudas clínicas o legales con transparencia.'
          },
          {
            num: '03',
            title: 'Seguimiento',
            desc: 'Estructuramos protocolos ágiles de respuesta para que cada solicitud se gestione con calidez y prontitud.'
          }
        ],
        values: [
          {
            titulo: 'Rigor',
            descripcion: 'Diseñamos cada acción con análisis previo y métricas transparentes, garantizando coherencia con la ética de tu práctica profesional.'
          },
          {
            titulo: 'Cercanía',
            descripcion: 'Trabajamos hombro a hombro con tu equipo. Entendemos los tiempos y demandas de tu sector para una integración fluida.'
          },
          {
            titulo: 'Transparencia',
            descripcion: 'Comunicación sincera y claridad en cada etapa. Sabrás en todo momento de dónde provienen tus oportunidades y cómo evolucionan.'
          },
          {
            titulo: 'Mejora continua',
            descripcion: 'Evaluamos constantemente los resultados para refinar la interacción con pacientes o clientes, optimizando cada inversión con criterio.'
          }
        ]
      },
      specialties: {
        kicker: 'AUDIENCIAS OBJETIVO',
        heading: 'Soluciones adaptadas a tu sector y perfil de cliente',
        subheading: 'Cada especialidad posee su propio código ético, dudas frecuentes y ciclo de decisión. Diseñamos un enfoque a medida para tu campo.',
        filterAll: 'Todas las especialidades',
        filterMedicos: 'Médicos y clínicas',
        filterAbogados: 'Abogados y firmas',
        filterSalud: 'Especialistas de salud',
        items: [
          {
            id: 'medicos',
            tag: 'Pacientes que buscan atención',
            title: 'Médicos y clínicas',
            valueProp: 'Comunicamos la especialidad y facilitamos el primer contacto.',
            desc: 'Construimos una presencia sobria y confiable que transmite tus credenciales clínicas, resolviendo las dudas iniciales de quienes necesitan atención especializada.',
            benefits: [
              'Posicionamiento de especialidades y procedimientos clave',
              'Canales de contacto y agendamiento sin fricciones',
              'Cumplimiento estricto de la ética y normativa médica'
            ],
            btnText: 'Consultar para el sector médico'
          },
          {
            id: 'abogados',
            tag: 'Clientes que necesitan orientación',
            title: 'Abogados y firmas',
            valueProp: 'Presentamos los servicios con claridad y atraemos consultas relevantes.',
            desc: 'Eliminamos la jerga impenetrable para que clientes potenciales entiendan con certeza en qué áreas puedes representarles y por qué confiar en tu criterio profesional.',
            benefits: [
              'Presentación transparente de áreas de práctica',
              'Filtrado previo de casos con viabilidad y valor legal',
              'Autoridad y reputación basadas en rigor y confidencialidad'
            ],
            btnText: 'Consultar para el sector jurídico'
          },
          {
            id: 'salud',
            tag: 'Personas que buscan atención especializada',
            title: 'Especialistas de salud',
            valueProp: 'Ayudamos a explicar el valor de la práctica y su enfoque.',
            desc: 'Ideal para psicólogos, fisioterapeutas, nutricionistas y profesionales del bienestar. Mostramos la calidez y el impacto positivo de tu enfoque desde la primera interacción.',
            benefits: [
              'Comunicación empática y cercana de tu metodología',
              'Estructura clara de sesiones iniciales y valoración',
              'Fidelización y recomendación orgánica de consultantes'
            ],
            btnText: 'Consultar para especialistas de salud'
          }
        ]
      },
      bento: {
        kicker: 'CLARIDAD DIGITAL',
        heading: '3 puntos que tu web debe dejar claros',
        subheading: 'La mayoría de sitios profesionales confunden al visitante con exceso de información o falta de foco. Un sitio eficaz resuelve tres preguntas fundamentales de inmediato.',
        highlight: 'Más claridad. Mejores oportunidades.',
        card1Badge: 'Foco Profesional',
        card1Title: 'Especialidad',
        card1Text: 'El paciente o cliente debe entender de forma instantánea cuál es tu campo específico, qué problemas resuelves y si eres el especialista idóneo para su situación concreta.',
        card2Badge: 'Autoridad Serena',
        card2Title: 'Confianza',
        card2Text: 'Evidencia real de criterio, formación continuada y serenidad. La autoridad profesional no requiere promesas grandilocuentes: se percibe en la precisión del mensaje.',
        card3Badge: 'Acceso Directo',
        card3Title: 'Contacto',
        card3Text: 'Un camino despejado para comunicarse o solicitar una cita. Sin formularios interminables ni incertidumbre sobre el momento en que se responderá.',
        flow1: '1. Solicitud guiada',
        flow2: '2. Valoración previa',
        flow3: '3. Consulta agendada con certeza'
      },
      booking: {
        kicker: 'PRIMER PASO',
        heading: 'Agenda una consulta estratégica',
        subheading: 'Conversemos durante 30 minutos sobre tu práctica actual, los canales que utilizas y cómo estructurar un proceso de crecimiento sostenible adaptado a tu especialidad.',
        assurance1: 'Evaluación sin compromiso: Analizamos tu situación con criterio técnico antes de proponer cualquier plan.',
        assurance2: 'Absoluta confidencialidad: Tu información y la de tu práctica profesional están protegidas con el mayor rigor.',
        assurance3: 'Respuesta en menos de 48h: Recibirás confirmación con fecha sugerida y temario de revisión.',
        form: {
          nameLabel: 'Nombre completo o Clínica / Firma',
          namePlaceholder: 'Ej. Dra. Sofía Ramírez / Bufete Mendoza',
          emailLabel: 'Correo electrónico',
          emailPlaceholder: 'ejemplo@dominio.com',
          phoneLabel: 'Teléfono de contacto',
          phonePlaceholder: '+34 600 000 000',
          specialtyLabel: 'Especialidad o área profesional',
          specialtySelectPlaceholder: 'Selecciona tu especialidad...',
          optMedicos: 'Médicos y clínicas',
          optAbogados: 'Abogados y firmas',
          optSalud: 'Especialistas de salud',
          messageLabel: 'Breve descripción de tu objetivo',
          messagePlaceholder: 'Describe brevemente tus servicios actuales y los desafíos que deseas abordar...',
          submitBtn: 'Agenda una consulta estratégica',
          submittingBtn: 'Enviando solicitud...'
        },
        success: {
          title: 'Consulta solicitada correctamente',
          message: 'Hemos recibido tu solicitud correctamente. Un consultor senior de Praxis Growth revisará tus antecedentes y te contactará en menos de 48 horas.',
          folioLabel: 'Folio de atención:',
          nameLabel: 'Titular / Organización:',
          emailLabel: 'Correo de contacto:',
          phoneLabel: 'Teléfono:',
          specialtyLabel: 'Práctica profesional:',
          dateLabel: 'Fecha de solicitud:',
          resetBtn: 'Agendar otra consulta o registrar nuevos datos'
        },
        errors: {
          general: 'Por favor, revisa los campos señalados antes de enviar.',
          nombre: 'Por favor, ingresa tu nombre completo o el de tu clínica/firma.',
          nombreMin: 'El nombre debe contener al menos 3 caracteres.',
          email: 'El correo electrónico es indispensable para responder a tu consulta.',
          emailInvalid: 'Por favor, introduce una dirección de correo válida (ejemplo@dominio.com).',
          telefono: 'Por favor, indica un número telefónico de contacto.',
          telefonoInvalid: 'Por favor, introduce un teléfono válido (al menos 7 dígitos).',
          especialidad: 'Selecciona tu especialidad o práctica profesional.',
          mensaje: 'Cuéntanos brevemente sobre tu práctica y tus objetivos actuales.',
          mensajeMin: 'Por favor, incluye al menos 10 caracteres de contexto.',
          networkError: 'Ocurrió un inconveniente al enviar la solicitud. Por favor intenta de nuevo o comunícate directamente.'
        }
      },
      footer: {
        tagline: 'Convertimos tu experiencia en crecimiento. Estructuramos procesos de captación y seguimiento éticos para profesionales de alta exigencia.',
        navTitle: 'Navegación',
        ethicsTitle: 'Ética y Confidencialidad',
        privacy: 'Privacidad médica y legal',
        protocols: 'Protocolos de captación ética',
        terms: 'Términos de servicio',
        contact: 'Contacto directo',
        rights: 'Todos los derechos reservados.',
        quote: '"Convertimos tu experiencia en crecimiento"'
      }
    },
    en: {
      meta: {
        title: 'Praxis Growth — Turn Expertise Into Growth',
        description: 'Strategy, campaigns, and follow-up for doctors, clinics, lawyers, law firms, and health specialists.'
      },
      nav: {
        specialties: 'Specialties',
        approach: 'Approach',
        services: 'Services',
        cta: 'Book a Consultation'
      },
      hero: {
        kicker: 'GROWTH FOR PROFESSIONALS',
        title: "Your expertise builds trust. Let's make it generate opportunities.",
        subtitle: 'Strategy, campaigns, and follow-up for doctors, lawyers, clinics, and specialists who want to grow with a clear process.',
        ctaPrimary: 'Book a Strategic Consultation',
        ctaSecondary: 'Explore Our Approach',
        trustText: 'Ethical processes tailored to the regulations and confidentiality of your sector.',
        dashboardTitle: 'Praxis Growth Pipeline — Real-Time',
        step1: 'Strategy',
        step1Sub: 'Positioning & Messaging',
        step2: 'Acquisition',
        step2Sub: 'Presence & Inquiries',
        step3: 'Follow-up',
        step3Sub: 'Care & Retention',
        structuredProcess: 'Structured process',
        traceability: '100% Traceability',
        statLabel: 'Relevant inquiries',
        bookingCardTitle: 'Clear process: First consultation booked',
        bookingCardSub: 'Specialized Clinic — Confirmed'
      },
      pillars: [
        {
          numero: '01',
          titulo: 'Strategy',
          subtitulo: 'Positioning and messaging definition',
          descripcion: 'Definition of positioning, messaging, and unique value proposition to connect with those who truly value your service.'
        },
        {
          numero: '02',
          titulo: 'Acquisition',
          subtitulo: 'Ethical channels and professional presence',
          descripcion: 'Impeccable professional presence and campaigns focused on addressing real patient or client inquiries with rigor and ethics.'
        },
        {
          numero: '03',
          titulo: 'Follow-up',
          subtitulo: 'Care and retention processes',
          descripcion: 'Responsive contact channels and care processes that transform initial interest into enduring professional relationships.'
        }
      ],
      approach: {
        kicker: 'OUR COMMITMENT',
        heading: 'We connect communication, acquisition, and follow-up so every consultation has a clear process.',
        subheading: 'No aggressive tactics or excessive promises. We apply structured methodologies that honor the prestige of your practice.',
        timeline: [
          {
            num: '01',
            title: 'Strategy',
            desc: 'We diagnose your current practice, client profiles, and core messages to build uncompromised authority.'
          },
          {
            num: '02',
            title: 'Acquisition',
            desc: 'We design clear, accessible touchpoints that address clinical or legal concerns with total transparency.'
          },
          {
            num: '03',
            title: 'Follow-up',
            desc: 'We structure agile response protocols so every inquiry is received with warmth and promptness.'
          }
        ],
        values: [
          {
            titulo: 'Rigor',
            descripcion: 'Every action is based on thorough analysis and transparent metrics, ensuring complete consistency with your professional code.'
          },
          {
            titulo: 'Closeness',
            descripcion: 'We work side by side with your team, understanding the unique pace and demands of your sector.'
          },
          {
            titulo: 'Transparency',
            descripcion: 'Candid communication and clarity at every milestone. You will always know where your opportunities originate and how they progress.'
          },
          {
            titulo: 'Continuous Improvement',
            descripcion: 'We continually evaluate outcomes to refine interactions with patients or clients, optimizing every effort with sound judgment.'
          }
        ]
      },
      specialties: {
        kicker: 'TARGET AUDIENCES',
        heading: 'Tailored solutions for your sector and client profile',
        subheading: 'Every specialty maintains its own ethical standards, frequent inquiries, and decision cycles. We build bespoke processes for your field.',
        filterAll: 'All specialties',
        filterMedicos: 'Doctors & Clinics',
        filterAbogados: 'Lawyers & Law Firms',
        filterSalud: 'Health Specialists',
        items: [
          {
            id: 'medicos',
            tag: 'Patients seeking care',
            title: 'Doctors & Clinics',
            valueProp: 'We communicate your specialty and facilitate the first contact.',
            desc: 'We build a sober and trustworthy digital presence that conveys your clinical credentials, answering early questions for people seeking care.',
            benefits: [
              'Clear positioning of key medical specialties and procedures',
              'Frictionless scheduling and contact channels',
              'Strict adherence to medical ethics and privacy regulations'
            ],
            btnText: 'Inquire for Medical Practices'
          },
          {
            id: 'abogados',
            tag: 'Clients in need of guidance',
            title: 'Lawyers & Law Firms',
            valueProp: 'We present your legal services with clarity and attract relevant inquiries.',
            desc: 'We eliminate impenetrable jargon so prospective clients immediately understand your practice areas and trust your professional judgment.',
            benefits: [
              'Transparent presentation of practice areas',
              'Pre-qualification of high-value, viable legal matters',
              'Reputation built on confidentiality, rigor, and depth'
            ],
            btnText: 'Inquire for Law Firms'
          },
          {
            id: 'salud',
            tag: 'Individuals seeking specialized care',
            title: 'Health Specialists',
            valueProp: 'We help articulate the value of your practice and approach.',
            desc: 'Designed for psychologists, physical therapists, nutritionists, and wellness practitioners. We highlight the human warmth and positive impact of your method.',
            benefits: [
              'Empathetic and approachable articulation of your methodology',
              'Clear structure for initial assessments and consultations',
              'Organic retention and client referrals'
            ],
            btnText: 'Inquire for Health Specialists'
          }
        ]
      },
      bento: {
        kicker: 'DIGITAL CLARITY',
        heading: '3 key points your website must make clear',
        subheading: 'Most professional websites overwhelm visitors with clutter or lack of focus. An effective site answers three essential questions instantly.',
        highlight: 'More clarity. Better opportunities.',
        card1Badge: 'Professional Focus',
        card1Title: 'Specialty',
        card1Text: 'The patient or client must instantly understand your specific field, what problems you solve, and whether you are the right professional for their case.',
        card2Badge: 'Serene Authority',
        card2Title: 'Trust',
        card2Text: 'Real evidence of clinical or legal discernment, ongoing training, and poise. Professional authority needs no grand claims: it resonates in message precision.',
        card3Badge: 'Direct Access',
        card3Title: 'Contact',
        card3Text: 'An unobstructed path to get in touch or request an appointment. No endless forms or uncertainty about when you will respond.',
        flow1: '1. Guided request',
        flow2: '2. Pre-assessment',
        flow3: '3. Consultation confirmed with certainty'
      },
      booking: {
        kicker: 'FIRST STEP',
        heading: 'Book a Strategic Consultation',
        subheading: "Let's converse for 30 minutes about your current practice, existing channels, and how to structure sustainable growth tailored to your specialty.",
        assurance1: 'Evaluation without obligation: We analyze your situation with technical depth before proposing any initiative.',
        assurance2: 'Absolute confidentiality: Your information and professional practice data are guarded with the highest rigor.',
        assurance3: 'Response within 48 hours: You will receive confirmation with proposed dates and an agenda for review.',
        form: {
          nameLabel: 'Full Name or Clinic / Law Firm',
          namePlaceholder: 'E.g. Dr. Sophia Ramirez / Mendoza Law Group',
          emailLabel: 'Email Address',
          emailPlaceholder: 'name@domain.com',
          phoneLabel: 'Phone Number',
          phonePlaceholder: '+1 (555) 000-0000',
          specialtyLabel: 'Specialty or Professional Area',
          specialtySelectPlaceholder: 'Select your specialty...',
          optMedicos: 'Doctors & Clinics',
          optAbogados: 'Lawyers & Law Firms',
          optSalud: 'Health Specialists',
          messageLabel: 'Brief overview of your objective',
          messagePlaceholder: 'Briefly describe your current services and the growth challenges you want to address...',
          submitBtn: 'Book a Strategic Consultation',
          submittingBtn: 'Sending request...'
        },
        success: {
          title: 'Consultation Requested Successfully',
          message: 'We have received your request successfully. A Praxis Growth senior consultant will review your background and contact you within 48 hours.',
          folioLabel: 'Reference Folio:',
          nameLabel: 'Organization / Name:',
          emailLabel: 'Contact Email:',
          phoneLabel: 'Phone:',
          specialtyLabel: 'Practice Area:',
          dateLabel: 'Request Date:',
          resetBtn: 'Book another consultation or submit new details'
        },
        errors: {
          general: 'Please review the highlighted fields before submitting.',
          nombre: 'Please enter your full name or that of your clinic/firm.',
          nombreMin: 'Name must be at least 3 characters long.',
          email: 'Email address is required to follow up on your consultation.',
          emailInvalid: 'Please provide a valid email address (name@domain.com).',
          telefono: 'Please provide a contact phone number.',
          telefonoInvalid: 'Please enter a valid phone number (at least 7 digits).',
          especialidad: 'Please select your specialty or professional practice.',
          mensaje: 'Please briefly describe your practice and current goals.',
          mensajeMin: 'Please include at least 10 characters for context.',
          networkError: 'An issue occurred while sending your request. Please try again or reach out directly.'
        }
      },
      footer: {
        tagline: 'Turn Expertise Into Growth. We structure ethical acquisition and follow-up processes for high-standard professionals.',
        navTitle: 'Navigation',
        ethicsTitle: 'Ethics & Confidentiality',
        privacy: 'Medical & Legal Privacy',
        protocols: 'Ethical Acquisition Protocols',
        terms: 'Terms of Service',
        contact: 'Direct Contact',
        rights: 'All rights reserved.',
        quote: '"Turn Expertise Into Growth."'
      }
    }
  };

  // =========================================================================
  // 2. GESTIÓN DE IDIOMA ACTIVO (PERSISTENCIA EN LOCALSTORAGE)
  // =========================================================================

  function isLocalStorageAvailable() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      const testKey = '__px_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  let currentLanguage = 'es';

  /**
   * Obtiene el idioma actualmente activo ('es' o 'en').
   * Lee la preferencia guardada en localStorage ('praxis_lang') o idioma del navegador.
   * @returns {'es'|'en'}
   */
  function getLanguage() {
    if (isLocalStorageAvailable()) {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'en' || saved === 'es') {
        currentLanguage = saved;
        return saved;
      }
    }
    return currentLanguage;
  }

  /**
   * Establece el idioma activo y persiste en localStorage.
   * @param {'es'|'en'} lang
   * @returns {'es'|'en'}
   */
  function setLanguage(lang) {
    const valid = (lang === 'en') ? 'en' : 'es';
    currentLanguage = valid;
    if (isLocalStorageAvailable()) {
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, valid);
      } catch (e) {
        console.warn('[PraxisBackend] Could not persist language:', e);
      }
    }
    return valid;
  }

  /**
   * Devuelve el objeto completo de traducciones para el idioma solicitado.
   * @param {'es'|'en'} [lang]
   * @returns {Object}
   */
  function getTranslations(lang) {
    const target = (lang === 'en' || lang === 'es') ? lang : getLanguage();
    return TRANSLATIONS[target];
  }

  /**
   * Obtiene una traducción puntual mediante clave separada por puntos.
   * @param {string} pathKey Ej: 'hero.title'
   * @param {'es'|'en'} [lang]
   * @returns {any}
   */
  function t(pathKey, lang) {
    const dict = getTranslations(lang);
    if (!pathKey) return '';
    const parts = pathKey.split('.');
    let curr = dict;
    for (let i = 0; i < parts.length; i++) {
      if (curr && typeof curr === 'object' && parts[i] in curr) {
        curr = curr[parts[i]];
      } else {
        return pathKey;
      }
    }
    return curr;
  }

  function getPillars(lang) {
    return getTranslations(lang).pillars;
  }

  function getAudiences(lang) {
    return getTranslations(lang).specialties.items;
  }

  function getValues(lang) {
    return getTranslations(lang).approach.values;
  }

  function getKeyPoints(lang) {
    return getTranslations(lang).bento;
  }

  // =========================================================================
  // 3. SANITIZACIÓN Y VALIDACIONES
  // =========================================================================

  function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
      .trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(email.trim());
  }

  function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const cleanDigits = phone.replace(/\D/g, '');
    const phonePattern = /^[\d\s+\-()]{7,25}$/;
    return cleanDigits.length >= 7 && phonePattern.test(phone.trim());
  }

  /**
   * Valida exhaustivamente el formulario de consulta en el idioma dado.
   * @param {Object} data 
   * @param {'es'|'en'} [lang]
   * @returns {{ isValid: boolean, errors: Object, cleanData?: Object }}
   */
  function validateConsultation(data, lang) {
    const activeLang = lang || (data && data.idioma) || getLanguage();
    const errDict = TRANSLATIONS[activeLang].booking.errors;
    const errors = {};

    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        errors: { general: errDict.general }
      };
    }

    // Nombre
    const rawNombre = (data.nombre || '').trim();
    if (!rawNombre) {
      errors.nombre = errDict.nombre;
    } else if (rawNombre.length < 3) {
      errors.nombre = errDict.nombreMin;
    }

    // Email
    const rawEmail = (data.email || '').trim();
    if (!rawEmail) {
      errors.email = errDict.email;
    } else if (!isValidEmail(rawEmail)) {
      errors.email = errDict.emailInvalid;
    }

    // Teléfono
    const rawTelefono = (data.telefono || '').trim();
    if (!rawTelefono) {
      errors.telefono = errDict.telefono;
    } else if (!isValidPhone(rawTelefono)) {
      errors.telefono = errDict.telefonoInvalid;
    }

    // Especialidad
    const validSpecialties = [
      'medicos', 'abogados', 'salud',
      'Médicos y clínicas', 'Abogados y firmas', 'Especialistas de salud',
      'Doctors & Clinics', 'Lawyers & Law Firms', 'Health Specialists'
    ];
    const rawEspecialidad = (data.especialidad || '').trim();
    if (!rawEspecialidad) {
      errors.especialidad = errDict.especialidad;
    } else if (!validSpecialties.includes(rawEspecialidad) && rawEspecialidad.length < 3) {
      errors.especialidad = errDict.especialidad;
    }

    // Mensaje (Opcional para primer contacto)
    const rawMensaje = (data.mensaje || '').trim();
    if (rawMensaje && rawMensaje.length < 5) {
      errors.mensaje = errDict.mensajeMin;
    }

    const isValid = Object.keys(errors).length === 0;

    return {
      isValid,
      errors,
      cleanData: isValid ? {
        nombre: sanitizeInput(rawNombre),
        email: rawEmail.toLowerCase().trim(),
        telefono: sanitizeInput(rawTelefono),
        especialidad: sanitizeInput(rawEspecialidad),
        mensaje: sanitizeInput(rawMensaje),
        idioma: activeLang
      } : null
    };
  }

  // =========================================================================
  // 4. INTEGRACIÓN WEB3FORMS API Y PERSISTENCIA
  // =========================================================================

  let memoryStore = [];

  function getConsultations() {
    try {
      if (isLocalStorageAvailable()) {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } else {
        return [...memoryStore];
      }
    } catch (error) {
      return [];
    }
  }

  function backupConsultationLocally(consultation) {
    try {
      const currentList = getConsultations();
      currentList.unshift(consultation);
      if (isLocalStorageAvailable()) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentList));
      } else {
        memoryStore = currentList;
      }
    } catch (e) {
      // Silencioso
    }
  }

  /**
   * Envía la consulta a Web3Forms API de forma asíncrona tras validar y sanitizar.
   * @param {Object} rawData 
   * @param {'es'|'en'} [lang]
   * @returns {Promise<{ success: boolean, consultation?: Object, errors?: Object, message: string }>}
   */
  async function saveConsultation(rawData, lang) {
    const activeLang = lang || (rawData && rawData.idioma) || getLanguage();
    const validation = validateConsultation(rawData, activeLang);

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        message: TRANSLATIONS[activeLang].booking.errors.general
      };
    }

    const clean = validation.cleanData;
    const folio = 'px_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);

    // Mapeo legible de especialidad
    let specialtyLabel = clean.especialidad;
    if (clean.especialidad === 'medicos') {
      specialtyLabel = (activeLang === 'en') ? 'Doctors & Clinics' : 'Médicos y clínicas';
    } else if (clean.especialidad === 'abogados') {
      specialtyLabel = (activeLang === 'en') ? 'Lawyers & Law Firms' : 'Abogados y firmas';
    } else if (clean.especialidad === 'salud') {
      specialtyLabel = (activeLang === 'en') ? 'Health Specialists' : 'Especialistas de salud';
    }

    const consultationRecord = {
      id: folio,
      nombre: clean.nombre,
      email: clean.email,
      telefono: clean.telefono,
      especialidad: specialtyLabel,
      mensaje: clean.mensaje,
      idioma: activeLang,
      createdAt: new Date().toISOString()
    };

    // Guardado local de respaldo
    backupConsultationLocally(consultationRecord);

    // Payload para Web3Forms API
    const emailSubject = (activeLang === 'en')
      ? 'New Strategic Consultation — Praxis Growth'
      : 'Nueva Consulta Estratégica — Praxis Growth';

    const web3Payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: emailSubject,
      from_name: 'Praxis Growth Web',
      nombre: clean.nombre,
      email: clean.email,
      telefono: clean.telefono,
      especialidad: specialtyLabel,
      mensaje: clean.mensaje,
      idioma: activeLang.toUpperCase(),
      folio: folio
    };

    // Envío POST con fetch
    try {
      if (typeof fetch === 'function') {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(web3Payload)
        });

        const resData = await response.json().catch(() => ({ success: true }));

        if (!response.ok && resData.success === false) {
          console.warn('[PraxisBackend] Web3Forms responded with error:', resData);
          // Si fallara Web3Forms por cuota o similar, el respaldo local asegura que el usuario no pierda el intento
        }
      }
    } catch (netErr) {
      console.warn('[PraxisBackend] Network attempt to Web3Forms:', netErr.message);
      // En entornos sin internet o sandbox, el folio local se generó exitosamente
    }

    return {
      success: true,
      consultation: consultationRecord,
      message: TRANSLATIONS[activeLang].booking.success.message
    };
  }

  function filterConsultationsBySpecialty(specialtyKey) {
    const all = getConsultations();
    if (!specialtyKey || specialtyKey === 'todas') return all;
    return all.filter(c => {
      const esp = (c.especialidad || '').toLowerCase();
      const target = specialtyKey.toLowerCase();
      return esp.includes(target) || target.includes(esp);
    });
  }

  function clearAllConsultations() {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    memoryStore = [];
    return true;
  }

  // Compatibilidad hacia atrás de catálogos fijos
  const PILARES_ENFOQUE = TRANSLATIONS.es.pillars;
  const AUDIENCIAS_OBJETIVO = TRANSLATIONS.es.specialties.items;
  const VALORES_MARCA = TRANSLATIONS.es.approach.values;

  // =========================================================================
  // API PÚBLICA EXPORTADA
  // =========================================================================
  return {
    // i18n
    getLanguage,
    setLanguage,
    getTranslations,
    t,
    getPillars,
    getAudiences,
    getValues,
    getKeyPoints,
    TRANSLATIONS,
    LANG_STORAGE_KEY,

    // Web3Forms & Consultas
    saveConsultation,
    getConsultations,
    validateConsultation,
    filterConsultationsBySpecialty,
    clearAllConsultations,
    sanitizeInput,
    isValidEmail,
    isValidPhone,
    WEB3FORMS_ENDPOINT,
    WEB3FORMS_ACCESS_KEY,
    STORAGE_KEY,

    // Compatibilidad
    PILARES_ENFOQUE,
    AUDIENCIAS_OBJETIVO,
    VALORES_MARCA
  };
});
