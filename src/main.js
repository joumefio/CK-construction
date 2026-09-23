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

  // Ensure voices are loaded before running (sometimes async in browsers)
  if ('speechSynthesis' in window && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {};
  }

  const startExperience = async () => {
    // Helper to speak and wait
    const speakAndWait = (text, onStart) => {
      return new Promise((resolve) => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'fr-FR';
          utterance.rate = 0.9;
          utterance.pitch = 0.5; // Deeper male voice
          
          const voices = window.speechSynthesis.getVoices();
          // Try to find a male French voice
          const maleVoice = voices.find(v => v.lang.startsWith('fr') && 
            (v.name.toLowerCase().includes('paul') || 
             v.name.toLowerCase().includes('thomas') || 
             v.name.toLowerCase().includes('male') || 
             v.name.toLowerCase().includes('david') || 
             v.name.toLowerCase().includes('rémi') || 
             v.name.toLowerCase().includes('henri')));
             
          if (maleVoice) {
            utterance.voice = maleVoice;
          } else {
             const frVoice = voices.find(v => v.lang.startsWith('fr'));
             if (frVoice) utterance.voice = frVoice;
          }
          
          utterance.onend = () => resolve();
          utterance.onerror = () => setTimeout(resolve, text.length * 80);
          
          if (onStart) onStart();
          window.speechSynthesis.speak(utterance);
          
          // Safety fallback if speech API completely hangs
          setTimeout(resolve, text.length * 80 + 2000);
        } else {
          if (onStart) onStart();
          setTimeout(resolve, text.length * 80);
        }
      });
    };

    window.speechSynthesis.cancel();

    // Step 1: C - Créativité
    await speakAndWait("C", () => {
      gsap.to('.draw-c', { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" });
      gsap.to('#group-c', { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" });
    });
    await speakAndWait("comme Créativité.", () => {
      gsap.to('#group-c .intro-text-small', { opacity: 1, y: 0, duration: 0.8 });
    });
    
    await new Promise(r => setTimeout(r, 300));

    // Step 2: K - Know-how
    await speakAndWait("K", () => {
      gsap.to('.draw-k', { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" });
      gsap.to('#group-k', { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" });
    });
    await speakAndWait("comme Know-how,", () => {
      gsap.to('#group-k .intro-text-small', { opacity: 1, y: 0, duration: 0.8 });
    });
    await speakAndWait("qui signifie, signification française : le savoir-faire.", () => {
    });
    
    await new Promise(r => setTimeout(r, 400));

    // Step 3: Fusion CK
    await speakAndWait("C, Créativité. K, Know-how.", () => {
      gsap.to('#group-c', { left: '40%', opacity: 0, duration: 1.5, ease: "power3.inOut" });
      gsap.to('#group-k', { right: '40%', opacity: 0, duration: 1.5, ease: "power3.inOut" });
    });
    await speakAndWait("Ensemble, ils donnent naissance à une nouvelle vision de la construction.", () => {
      gsap.to('#group-final', { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.2)" });
    });

    await new Promise(r => setTimeout(r, 400));

    // Step 4: CONSTRUCTION
    await speakAndWait("CK Construction.", () => {
      gsap.to('#text-construction', { opacity: 1, duration: 1.5, ease: "power2.inOut" });
    });
    
    await speakAndWait("La référence de la construction moderne.", () => {
      gsap.to('#text-signature1', { opacity: 1, duration: 1 });
    });

    await speakAndWait("Imaginez. Nous construisons.", () => {
      gsap.to('#text-signature2', { opacity: 1, duration: 1 });
    });

    await new Promise(r => setTimeout(r, 800));
    
    gsap.to(introExperience, { opacity: 0, duration: 1.5, onComplete: hideIntro });
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
