import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Intro Experience (GSAP Timeline + Web Speech API)
  const introExperience = document.getElementById('intro-experience');
  
  // Lock scroll initially
  document.body.classList.add('menu-open');

  const hideIntro = () => {
    introExperience.classList.add('is-hidden');
    document.body.classList.remove('menu-open');
  };

  // Web Speech API helper
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85; // Slightly slower for dramatic effect
      utterance.pitch = 0.8; // Deeper voice
      
      // Try to find a premium/natural French voice if available
      const voices = window.speechSynthesis.getVoices();
      const premiumVoice = voices.find(v => v.lang.startsWith('fr') && (v.name.includes('Google') || v.name.includes('Premium')));
      if (premiumVoice) {
        utterance.voice = premiumVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Ensure voices are loaded before running (sometimes async in browsers)
  if ('speechSynthesis' in window && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {};
  }

  const startExperience = () => {
    // GSAP Timeline
    const tl = gsap.timeline({
      onComplete: hideIntro
    });

    // Step 1: C - Créativité
    tl.call(() => speakText("C… comme Créativité."))
      .to('.draw-c', { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" })
      .to('#group-c', { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=1.5")
      .to('#group-c .intro-text-small', { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      .to({}, { duration: 1.5 }); // Pause

    // Step 2: K - Know-how
    tl.call(() => speakText("K… comme Know-how. Ce qui signifie… le savoir-faire."))
      .to('.draw-k', { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" })
      .to('#group-k', { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=1.5")
      .to('#group-k .intro-text-small', { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      .to({}, { duration: 3.5 }); // Longer pause for the longer sentence

    // Step 3: Fusion CK
    tl.call(() => speakText("C… Créativité. K… Know-how. Ensemble… ils donnent naissance à une nouvelle vision de la construction."))
      .to('#group-c', { left: '40%', opacity: 0, duration: 1.5, ease: "power3.inOut" }, "fusion")
      .to('#group-k', { right: '40%', opacity: 0, duration: 1.5, ease: "power3.inOut" }, "fusion")
      .to('#group-final', { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.2)" }, "fusion+=1")
      .to({}, { duration: 4.5 }); // Pause for sentence

    // Step 4: CONSTRUCTION
    tl.call(() => speakText("CK Construction. La référence de la construction moderne. Imaginez… nous construisons."))
      .to('#text-construction', { opacity: 1, duration: 1.5, ease: "power2.inOut" })
      .to('.intro-signature', { opacity: 1, stagger: 1.5, duration: 1.5 })
      .to({}, { duration: 4 }) // Final Pause
      .to(introExperience, { opacity: 0, duration: 1.5 });
  };

  // Start automatically, use setTimeout to ensure everything is rendered
  setTimeout(startExperience, 500);

  // 2. Before / After Slider
  const slider = document.getElementById('before-after-slider');
  if (slider) {
    const beforeWrapper = slider.querySelector('.before-wrapper');
    const handle = slider.querySelector('.slider-handle');
    let isDown = false;

    const moveSlider = (e) => {
      if (!isDown) return;
      const rect = slider.getBoundingClientRect();
      let x = (e.clientX || e.touches[0].clientX) - rect.left;
      let percent = Math.max(0, Math.min(x / rect.width * 100, 100));
      beforeWrapper.style.width = `${percent}%`;
      handle.style.left = `${percent}%`;
    };

    slider.addEventListener('mousedown', () => isDown = true);
    slider.addEventListener('touchstart', () => isDown = true, { passive: true });
    
    window.addEventListener('mouseup', () => isDown = false);
    window.addEventListener('touchend', () => isDown = false);
    
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('touchmove', moveSlider, { passive: true });
  }

  // 3. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.landing-section');
  sections.forEach(section => {
    if (section.id !== 'accueil') {
      sectionObserver.observe(section);
    }
  });

  // 4. Navbar Shrink on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      document.body.classList.add('header-scrolled');
    } else {
      document.body.classList.remove('header-scrolled');
    }
  });

  // 5. Mobile Menu Toggle
  const burgerMenu = document.getElementById('burgerMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  burgerMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open'); // blocks scroll underneath
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      if (introExperience.classList.contains('is-hidden')) {
        document.body.classList.remove('menu-open');
      }
    });
  });

  // 6. Cursor Glow Effect (follows mouse)
  const cursorGlow = document.querySelector('.motion-cursor-glow');
  document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      requestAnimationFrame(() => {
        cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    }
  });

  // 7. Contact Form WhatsApp Redirect
  const devisForm = document.getElementById('devis-form');
  if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nom = document.getElementById('devis-nom').value;
      const tel = document.getElementById('devis-tel').value;
      const localisation = document.getElementById('devis-localisation').value;
      const message = document.getElementById('devis-message').value;
      
      const whatsappMessage = `*NOUVELLE DEMANDE DE DEVIS*\n\n*Nom :* ${nom}\n*Téléphone :* ${tel}\n*Localisation :* ${localisation}\n\n*Description du projet :*\n${message}`;
      
      const whatsappUrl = `https://wa.me/237694235957?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

});

// Global function to prefill form when clicking a product
window.prefillDevis = function(productName) {
  const contactSection = document.getElementById('contact');
  const messageInput = document.getElementById('devis-message');
  
  if (contactSection && messageInput) {
    messageInput.value = `Bonjour, je souhaite obtenir un devis ou le prix pour : ${productName}`;
    contactSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      messageInput.focus();
    }, 800);
  }
};
