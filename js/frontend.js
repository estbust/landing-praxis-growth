/**
 * Praxis Growth - Interfaz de Usuario, i18n Dinámico y Web3Forms (Frontend)
 * =========================================================================
 * Especialista: Frontend
 * Responsabilidad:
 * - Cambio dinámico bilingüe en tiempo real (ES / EN) sin recarga de página.
 * - Despacho asíncrono con estado de carga en botón ("Enviando solicitud...").
 * - Presentación de confirmación profesional con folio y datos de contacto.
 * - Filtro interactivo de especialidades y navegación móvil accesible.
 * - Animaciones de scroll fluidas con IntersectionObserver.
 * - Eliminación total de elementos de demostración local.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. GESTIÓN DE IDIOMA Y TRADUCCIÓN DINÁMICA (ES / EN)
  // =========================================================================
  const langButtons = document.querySelectorAll('.lang-btn');

  function applyLanguage(lang) {
    if (!window.PraxisBackend) return;
    
    // Persistir idioma en backend / localStorage
    const activeLang = window.PraxisBackend.setLanguage(lang);
    const dict = window.PraxisBackend.getTranslations(activeLang);

    // 1.1 Atributo del documento y metadatos
    document.documentElement.lang = activeLang;
    if (dict.meta) {
      document.title = dict.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', dict.meta.description);
    }

    // 1.2 Botones del selector de idioma
    langButtons.forEach(btn => {
      const isSelected = btn.dataset.lang === activeLang;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    // 1.3 Barra de navegación (Navbar)
    const navSpecialties = document.querySelector('.site-header a[href="#especialidades"]');
    const navApproach = document.querySelector('.site-header a[href="#enfoque"]');
    const navServices = document.querySelector('.site-header a[href="#servicios"]');
    const navCtaDesktop = document.querySelector('.site-header .nav-actions a.btn-primary');
    const navCtaMobile = document.querySelector('.mobile-cta-item a.btn-primary');

    if (navSpecialties) navSpecialties.textContent = dict.nav.specialties;
    if (navApproach) navApproach.textContent = dict.nav.approach;
    if (navServices) navServices.textContent = dict.nav.services;
    if (navCtaDesktop) navCtaDesktop.innerHTML = `${dict.nav.cta} <span class="btn-arrow" aria-hidden="true">→</span>`;
    if (navCtaMobile) navCtaMobile.textContent = dict.nav.cta;

    // 1.4 Hero Section
    const heroEyebrow = document.querySelector('.hero-content-col .eyebrow-tag');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCtaPrimary = document.querySelector('.hero-cta-group a.btn-primary');
    const heroCtaSecondary = document.querySelector('.hero-cta-group a.btn-secondary-hero');
    const heroTrust = document.querySelector('.hero-trust-bar .trust-text');

    if (heroEyebrow) heroEyebrow.textContent = dict.hero.kicker;
    if (heroTitle) heroTitle.textContent = dict.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = dict.hero.subtitle;
    if (heroCtaPrimary) heroCtaPrimary.innerHTML = `${dict.hero.ctaPrimary} <span class="btn-arrow" aria-hidden="true">→</span>`;
    if (heroCtaSecondary) heroCtaSecondary.textContent = dict.hero.ctaSecondary;
    if (heroTrust) heroTrust.textContent = dict.hero.trustText;

    // 1.5 Hero Dashboard UI Flotante
    const dashTitle = document.querySelector('.glass-title span:last-child');
    if (dashTitle) dashTitle.textContent = dict.hero.dashboardTitle;

    const pipelineNodes = document.querySelectorAll('.pipeline-track .pipeline-node');
    if (pipelineNodes.length >= 3) {
      // Nodo 01
      const n1Label = pipelineNodes[0].querySelector('.node-label');
      const n1Status = pipelineNodes[0].querySelector('.node-status');
      if (n1Label) n1Label.textContent = dict.hero.step1;
      if (n1Status) n1Status.textContent = dict.hero.step1Sub;

      // Nodo 02
      const n2Label = pipelineNodes[1].querySelector('.node-label');
      const n2Status = pipelineNodes[1].querySelector('.node-status');
      if (n2Label) n2Label.textContent = dict.hero.step2;
      if (n2Status) n2Status.textContent = dict.hero.step2Sub;

      // Nodo 03
      const n3Label = pipelineNodes[2].querySelector('.node-label');
      const n3Status = pipelineNodes[2].querySelector('.node-status');
      if (n3Label) n3Label.textContent = dict.hero.step3;
      if (n3Status) n3Status.textContent = dict.hero.step3Sub;
    }

    const metricTitle = document.querySelector('.glass-footer-metric .metric-title');
    const metricValue = document.querySelector('.glass-footer-metric .metric-value');
    if (metricTitle) metricTitle.textContent = dict.hero.structuredProcess;
    if (metricValue) metricValue.textContent = dict.hero.traceability;

    const floatCardStat = document.querySelector('.hero-float-card.card-metrics .float-card-label');
    if (floatCardStat) floatCardStat.textContent = dict.hero.statLabel;

    const floatBookingTitle = document.querySelector('.hero-float-card.card-booking .float-booking-title');
    const floatBookingSub = document.querySelector('.hero-float-card.card-booking .float-booking-sub');
    if (floatBookingTitle) floatBookingTitle.textContent = dict.hero.bookingCardTitle;
    if (floatBookingSub) floatBookingSub.textContent = dict.hero.bookingCardSub;

    // 1.6 Hero 3 Pilares Inferiores
    const heroPillars = document.querySelectorAll('.hero-pillar-card');
    if (heroPillars.length >= 3 && dict.pillars) {
      dict.pillars.forEach((p, idx) => {
        if (heroPillars[idx]) {
          const t = heroPillars[idx].querySelector('.hero-pillar-title');
          const d = heroPillars[idx].querySelector('.hero-pillar-desc');
          if (t) t.textContent = p.titulo;
          if (d) d.textContent = p.descripcion;
        }
      });
    }

    // 1.7 Sección Enfoque (Línea de Tiempo y Valores)
    const approachEyebrow = document.querySelector('.value-header .eyebrow-tag');
    const approachHeading = document.getElementById('value-heading');
    const approachSubheading = document.querySelector('.value-substatement');

    if (approachEyebrow) approachEyebrow.textContent = dict.approach.kicker;
    if (approachHeading) approachHeading.textContent = dict.approach.heading;
    if (approachSubheading) approachSubheading.textContent = dict.approach.subheading;

    const timelineSteps = document.querySelectorAll('.timeline-step-node');
    if (timelineSteps.length >= 3 && dict.approach.timeline) {
      dict.approach.timeline.forEach((step, idx) => {
        if (timelineSteps[idx]) {
          const t = timelineSteps[idx].querySelector('.node-step-title');
          const d = timelineSteps[idx].querySelector('.node-step-desc');
          if (t) t.textContent = step.title;
          if (d) d.textContent = step.desc;
        }
      });
    }

    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length >= 4 && dict.approach.values) {
      dict.approach.values.forEach((v, idx) => {
        if (valueCards[idx]) {
          const t = valueCards[idx].querySelector('.value-card-title');
          const d = valueCards[idx].querySelector('.value-card-text');
          if (t) t.textContent = v.titulo;
          if (d) d.textContent = v.descripcion;
        }
      });
    }

    // 1.8 Sección Especialidades
    const specEyebrow = document.querySelector('.specialties-section .eyebrow-tag');
    const specHeading = document.getElementById('specialties-heading');
    const specSubheading = document.querySelector('.specialties-section .section-head p');

    if (specEyebrow) specEyebrow.textContent = dict.specialties.kicker;
    if (specHeading) specHeading.textContent = dict.specialties.heading;
    if (specSubheading) specSubheading.textContent = dict.specialties.subheading;

    // Tabs de filtro
    const tabAll = document.querySelector('.filter-tab-btn[data-audience="todas"]');
    const tabMedicos = document.querySelector('.filter-tab-btn[data-audience="medicos"]');
    const tabAbogados = document.querySelector('.filter-tab-btn[data-audience="abogados"]');
    const tabSalud = document.querySelector('.filter-tab-btn[data-audience="salud"]');

    if (tabAll) tabAll.textContent = dict.specialties.filterAll;
    if (tabMedicos) tabMedicos.textContent = dict.specialties.filterMedicos;
    if (tabAbogados) tabAbogados.textContent = dict.specialties.filterAbogados;
    if (tabSalud) tabSalud.textContent = dict.specialties.filterSalud;

    // Tarjetas de especialidades
    dict.specialties.items.forEach(item => {
      const card = document.querySelector(`.specialty-card[data-audience="${item.id}"]`);
      if (card) {
        const tag = card.querySelector('.specialty-tag');
        const title = card.querySelector('.specialty-title');
        const vp = card.querySelector('.specialty-value-prop');
        const desc = card.querySelector('.specialty-desc');
        const benefits = card.querySelectorAll('.specialty-benefits-list li');
        const btn = card.querySelector('.btn-select-specialty');

        if (tag) tag.textContent = item.tag;
        if (title) title.textContent = item.title;
        if (vp) vp.textContent = `"${item.valueProp}"`;
        if (desc) desc.textContent = item.desc;
        if (benefits.length === 3 && item.benefits) {
          benefits[0].textContent = item.benefits[0];
          benefits[1].textContent = item.benefits[1];
          benefits[2].textContent = item.benefits[2];
        }
        if (btn) btn.textContent = item.btnText;
      }
    });

    // 1.9 Sección Bento Grid (3 Puntos Clave)
    const bentoEyebrow = document.querySelector('.keypoints-section .eyebrow-tag');
    const bentoHeading = document.getElementById('keypoints-heading');
    const bentoSubheading = document.querySelector('.keypoints-section .section-head p');
    const bentoHighlight = document.querySelector('.keypoints-highlight-box');

    if (bentoEyebrow) bentoEyebrow.textContent = dict.bento.kicker;
    if (bentoHeading) bentoHeading.textContent = dict.bento.heading;
    if (bentoSubheading) bentoSubheading.textContent = dict.bento.subheading;
    if (bentoHighlight) bentoHighlight.textContent = dict.bento.highlight;

    // Bento Card 1
    const bento1Badge = document.querySelector('.bento-span-7 .bento-badge');
    const bento1Title = document.querySelector('.bento-span-7 .bento-title');
    const bento1Text = document.querySelector('.bento-span-7 .bento-text');
    if (bento1Badge) bento1Badge.textContent = dict.bento.card1Badge;
    if (bento1Title) bento1Title.textContent = dict.bento.card1Title;
    if (bento1Text) bento1Text.textContent = dict.bento.card1Text;

    // Bento Card 2
    const bento2Badge = document.querySelector('.bento-span-5 .bento-badge');
    const bento2Title = document.querySelector('.bento-span-5 .bento-title');
    const bento2Text = document.querySelector('.bento-span-5 .bento-text');
    if (bento2Badge) bento2Badge.textContent = dict.bento.card2Badge;
    if (bento2Title) bento2Title.textContent = dict.bento.card2Title;
    if (bento2Text) bento2Text.textContent = dict.bento.card2Text;

    // Bento Card 3
    const bento3Badge = document.querySelector('.bento-span-12 .bento-badge');
    const bento3Title = document.querySelector('.bento-span-12 .bento-title');
    const bento3Text = document.querySelector('.bento-span-12 .bento-text');
    if (bento3Badge) bento3Badge.textContent = dict.bento.card3Badge;
    if (bento3Title) bento3Title.textContent = dict.bento.card3Title;
    if (bento3Text) bento3Text.textContent = dict.bento.card3Text;

    // Bento Flow Pills
    const flowPills = document.querySelectorAll('.bento-flow-row .bento-flow-pill');
    if (flowPills.length >= 3) {
      flowPills[0].innerHTML = `<span class="pill-dot"></span> ${dict.bento.flow1}`;
      flowPills[1].innerHTML = `<span class="pill-dot"></span> ${dict.bento.flow2}`;
      flowPills[2].innerHTML = `<span class="pill-dot green"></span> ${dict.bento.flow3}`;
    }

    // 1.10 Sección de Agendamiento (Booking)
    const bookingEyebrow = document.querySelector('.booking-info .eyebrow-tag');
    const bookingHeading = document.getElementById('booking-heading');
    const bookingSubheading = document.querySelector('.booking-info > p');

    if (bookingEyebrow) bookingEyebrow.textContent = dict.booking.kicker;
    if (bookingHeading) bookingHeading.textContent = dict.booking.heading;
    if (bookingSubheading) bookingSubheading.textContent = dict.booking.subheading;

    const assurances = document.querySelectorAll('.booking-assurances li');
    if (assurances.length >= 3) {
      assurances[0].innerHTML = `<span class="assurance-icon" aria-hidden="true">✓</span> <span>${dict.booking.assurance1}</span>`;
      assurances[1].innerHTML = `<span class="assurance-icon" aria-hidden="true">✓</span> <span>${dict.booking.assurance2}</span>`;
      assurances[2].innerHTML = `<span class="assurance-icon" aria-hidden="true">✓</span> <span>${dict.booking.assurance3}</span>`;
    }

    // Formulario: Labels y Placeholders
    const lblNombre = document.querySelector('label[for="nombre"]');
    const inputNombre = document.getElementById('nombre');
    if (lblNombre) lblNombre.innerHTML = `${dict.booking.form.nameLabel} <span class="req">*</span>`;
    if (inputNombre) inputNombre.placeholder = dict.booking.form.namePlaceholder;

    const lblEmail = document.querySelector('label[for="email"]');
    const inputEmail = document.getElementById('email');
    if (lblEmail) lblEmail.innerHTML = `${dict.booking.form.emailLabel} <span class="req">*</span>`;
    if (inputEmail) inputEmail.placeholder = dict.booking.form.emailPlaceholder;

    const lblTelefono = document.querySelector('label[for="telefono"]');
    const inputTelefono = document.getElementById('telefono');
    if (lblTelefono) lblTelefono.innerHTML = `${dict.booking.form.phoneLabel} <span class="req">*</span>`;
    if (inputTelefono) inputTelefono.placeholder = dict.booking.form.phonePlaceholder;

    const lblEspecialidad = document.querySelector('label[for="especialidad"]');
    const selectEspecialidad = document.getElementById('especialidad');
    if (lblEspecialidad) lblEspecialidad.innerHTML = `${dict.booking.form.specialtyLabel} <span class="req">*</span>`;
    if (selectEspecialidad) {
      const optPlaceholder = selectEspecialidad.querySelector('option[value=""]');
      const optMed = selectEspecialidad.querySelector('option[value="medicos"]');
      const optAbo = selectEspecialidad.querySelector('option[value="abogados"]');
      const optSal = selectEspecialidad.querySelector('option[value="salud"]');
      if (optPlaceholder) optPlaceholder.textContent = dict.booking.form.specialtySelectPlaceholder;
      if (optMed) optMed.textContent = dict.booking.form.optMedicos;
      if (optAbo) optAbo.textContent = dict.booking.form.optAbogados;
      if (optSal) optSal.textContent = dict.booking.form.optSalud;
    }

    const lblMensaje = document.querySelector('label[for="mensaje"]');
    const inputMensaje = document.getElementById('mensaje');
    if (lblMensaje) {
      const optText = activeLang === 'en' ? '(Optional)' : '(Opcional)';
      lblMensaje.innerHTML = `${dict.booking.form.messageLabel} <span class="opt-label" style="color: var(--text-muted); font-size: 0.85em;">${optText}</span>`;
    }
    if (inputMensaje) {
      inputMensaje.placeholder = dict.booking.form.messagePlaceholder;
      inputMensaje.removeAttribute('required');
    }

    const submitBtn = document.getElementById('submitBookingBtn');
    if (submitBtn && !submitBtn.classList.contains('is-loading')) {
      submitBtn.innerHTML = `${dict.booking.form.submitBtn} <span class="btn-arrow" aria-hidden="true">→</span>`;
    }

    // Tarjeta de Éxito
    const successTitle = document.getElementById('successTitle');
    const successIntro = document.getElementById('successIntro');
    const resetBtn = document.getElementById('newBookingBtn');

    if (successTitle) successTitle.textContent = dict.booking.success.title;
    if (successIntro) successIntro.textContent = dict.booking.success.message;
    if (resetBtn) resetBtn.textContent = dict.booking.success.resetBtn;

    // 1.11 Footer
    const footerTagline = document.querySelector('.footer-brand p');
    if (footerTagline) footerTagline.textContent = dict.footer.tagline;

    const footerNavCol = document.querySelector('.footer-top > div:nth-child(2)');
    if (footerNavCol) {
      const h4 = footerNavCol.querySelector('.footer-title');
      if (h4) h4.textContent = dict.footer.navTitle;
      const links = footerNavCol.querySelectorAll('a');
      if (links[0]) links[0].textContent = dict.nav.specialties;
      if (links[1]) links[1].textContent = dict.nav.approach;
      if (links[2]) links[2].textContent = dict.nav.services;
      if (links[3]) links[3].textContent = activeLang === 'en' ? 'Book a Consultation' : 'Agenda tu consulta';
    }

    const footerEthicsCol = document.querySelector('.footer-top > div:nth-child(3)');
    if (footerEthicsCol) {
      const h4 = footerEthicsCol.querySelector('.footer-title');
      if (h4) h4.textContent = dict.footer.ethicsTitle;
      const links = footerEthicsCol.querySelectorAll('a');
      if (links[0]) links[0].textContent = dict.footer.privacy;
      if (links[1]) links[1].textContent = dict.footer.protocols;
      if (links[2]) links[2].textContent = dict.footer.terms;
      if (links[3]) links[3].textContent = dict.footer.contact;
    }

    const footerBottomSpans = document.querySelectorAll('.footer-bottom span');
    if (footerBottomSpans.length >= 2) {
      footerBottomSpans[0].textContent = `© 2026 Praxis Growth. ${dict.footer.rights}`;
      footerBottomSpans[1].textContent = dict.footer.quote;
    }
  }

  // Listener en botones de idioma
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.dataset.lang;
      applyLanguage(targetLang);
    });
  });

  // Inicializar idioma al cargar página
  const initialLang = window.PraxisBackend ? window.PraxisBackend.getLanguage() : 'es';
  applyLanguage(initialLang);

  // =========================================================================
  // 2. NAVEGACIÓN MÓVIL
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNavMenu = document.getElementById('mainNavMenu');

  if (mobileToggle && mainNavMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNavMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mainNavMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNavMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 3. FILTRO INTERACTIVO DE AUDIENCIAS / ESPECIALIDADES
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const specialtyCards = document.querySelectorAll('.specialty-card');
  const especialidadSelect = document.getElementById('especialidad');

  function selectAudience(audienceId) {
    filterTabs.forEach(tab => {
      if (tab.dataset.audience === audienceId) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    specialtyCards.forEach(card => {
      if (audienceId === 'todas' || card.dataset.audience === audienceId) {
        card.style.display = 'flex';
        if (card.dataset.audience === audienceId && audienceId !== 'todas') {
          card.classList.add('featured');
        } else {
          card.classList.remove('featured');
        }
      } else {
        card.style.display = 'none';
        card.classList.remove('featured');
      }
    });

    if (especialidadSelect && audienceId !== 'todas') {
      especialidadSelect.value = audienceId;
    }
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const audienceId = tab.dataset.audience;
      selectAudience(audienceId);
    });
  });

  // Botones "Consultar para..." dentro de las tarjetas
  const selectSpecialtyButtons = document.querySelectorAll('.btn-select-specialty');
  selectSpecialtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const aud = btn.dataset.audience;
      if (especialidadSelect) {
        especialidadSelect.value = aud;
      }
      const bookingSection = document.getElementById('agendar');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nombreInput = document.getElementById('nombre');
          if (nombreInput) nombreInput.focus();
        }, 500);
      }
    });
  });

  // =========================================================================
  // 4. GESTIÓN DEL FORMULARIO Y DESPACHO ASÍNCRONO A WEB3FORMS
  // =========================================================================
  const consultationForm = document.getElementById('consultationForm');
  const bookingSuccessCard = document.getElementById('bookingSuccessCard');
  const newBookingBtn = document.getElementById('newBookingBtn');
  const successDetailsContainer = document.getElementById('successDetails');
  const submitBookingBtn = document.getElementById('submitBookingBtn');

  const fields = ['nombre', 'email', 'telefono', 'especialidad', 'mensaje'];

  function clearErrors() {
    fields.forEach(fieldId => {
      const el = document.getElementById(fieldId);
      const errEl = document.getElementById(`error-${fieldId}`);
      if (el) el.classList.remove('is-invalid');
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('visible');
      }
    });
  }

  function displayErrors(errors) {
    Object.keys(errors).forEach(fieldId => {
      const el = document.getElementById(fieldId);
      const errEl = document.getElementById(`error-${fieldId}`);
      if (el) el.classList.add('is-invalid');
      if (errEl) {
        errEl.textContent = errors[fieldId];
        errEl.classList.add('visible');
      }
    });
  }

  fields.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('is-invalid');
        const errEl = document.getElementById(`error-${fieldId}`);
        if (errEl) {
          errEl.textContent = '';
          errEl.classList.remove('visible');
        }
      });
    }
  });

  if (consultationForm) {
    consultationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const activeLang = window.PraxisBackend ? window.PraxisBackend.getLanguage() : 'es';
      const dict = window.PraxisBackend ? window.PraxisBackend.getTranslations(activeLang) : null;

      const formData = {
        nombre: document.getElementById('nombre')?.value || '',
        email: document.getElementById('email')?.value || '',
        telefono: document.getElementById('telefono')?.value || '',
        especialidad: document.getElementById('especialidad')?.value || '',
        mensaje: document.getElementById('mensaje')?.value || '',
        idioma: activeLang
      };

      if (!window.PraxisBackend) {
        console.error('El módulo PraxisBackend no se encuentra disponible.');
        return;
      }

      // Validación previa de campos
      const validation = window.PraxisBackend.validateConsultation(formData, activeLang);
      if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
      }

      // Activar estado de carga en el botón CTA
      if (submitBookingBtn) {
        submitBookingBtn.classList.add('is-loading');
        submitBookingBtn.disabled = true;
        submitBookingBtn.textContent = dict ? dict.booking.form.submittingBtn : 'Enviando solicitud...';
      }

      try {
        // Envío asíncrono a Web3Forms API
        const result = await window.PraxisBackend.saveConsultation(formData, activeLang);

        if (!result.success) {
          if (result.errors) {
            displayErrors(result.errors);
          }
          return;
        }

        // Renderizado de confirmación con datos limpios
        const c = result.consultation;
        const succDict = (dict && dict.booking && dict.booking.success) ? dict.booking.success : {
          folioLabel: 'Folio de atención:',
          nameLabel: 'Titular / Organización:',
          emailLabel: 'Correo de contacto:',
          phoneLabel: 'Teléfono:',
          specialtyLabel: 'Práctica profesional:',
          dateLabel: 'Fecha de solicitud:'
        };

        if (successDetailsContainer) {
          const dateLocale = activeLang === 'en' ? 'en-US' : 'es-ES';
          successDetailsContainer.innerHTML = `
            <p><strong>${succDict.folioLabel}</strong> #${c.id}</p>
            <p><strong>${succDict.nameLabel}</strong> ${c.nombre}</p>
            <p><strong>${succDict.emailLabel}</strong> ${c.email}</p>
            <p><strong>${succDict.phoneLabel}</strong> ${c.telefono}</p>
            <p><strong>${succDict.specialtyLabel}</strong> ${c.especialidad}</p>
            <p><strong>${succDict.dateLabel}</strong> ${new Date(c.createdAt).toLocaleDateString(dateLocale, { 
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
            })}</p>
          `;
        }

        consultationForm.style.display = 'none';
        if (bookingSuccessCard) {
          bookingSuccessCard.classList.add('active');
          bookingSuccessCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } catch (err) {
        console.error('Error durante el envío de la consulta:', err);
      } finally {
        if (submitBookingBtn) {
          submitBookingBtn.classList.remove('is-loading');
          submitBookingBtn.disabled = false;
          const defaultBtnText = dict ? dict.booking.form.submitBtn : 'Agenda una consulta estratégica';
          submitBookingBtn.innerHTML = `${defaultBtnText} <span class="btn-arrow" aria-hidden="true">→</span>`;
        }
      }
    });
  }

  if (newBookingBtn) {
    newBookingBtn.addEventListener('click', () => {
      if (consultationForm) {
        consultationForm.reset();
        consultationForm.style.display = 'flex';
      }
      if (bookingSuccessCard) {
        bookingSuccessCard.classList.remove('active');
      }
      clearErrors();
    });
  }

  // =========================================================================
  // 5. ANIMACIONES DE SCROLL FLUIDAS (INTERSECTION OBSERVER)
  // =========================================================================
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal-fade').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal-fade').forEach(el => {
      el.classList.add('is-visible');
    });
  }
});
