import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Intro Experience (Cinematic CAK)
  const introExperience = document.getElementById('intro-experience');
  
  // Lock scroll initially
  document.body.classList.add('menu-open');

  const hideIntro = () => {
    introExperience.classList.add('is-done');
    document.body.classList.remove('menu-open');
    // Reveal animations for rest of the site
    setTimeout(() => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); }, 500);
  };

  // Helper for SpeechSynthesis
  if ('speechSynthesis' in window && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {};
  }

  const speakAndWait = (text, onStart) => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.85;
        utterance.pitch = 0.8;
        
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(v => v.lang.startsWith('fr') && 
          (v.name.toLowerCase().includes('paul') || 
           v.name.toLowerCase().includes('thomas') || 
           v.name.toLowerCase().includes('male') || 
           v.name.toLowerCase().includes('rémi') || 
           v.name.toLowerCase().includes('henri')));
           
        if (maleVoice) utterance.voice = maleVoice;
        else {
           const frVoice = voices.find(v => v.lang.startsWith('fr'));
           if (frVoice) utterance.voice = frVoice;
        }
        
        utterance.onend = () => resolve();
        utterance.onerror = () => setTimeout(resolve, text.length * 80);
        
        if (onStart) onStart();
        window.speechSynthesis.speak(utterance);
        setTimeout(resolve, text.length * 80 + 3000); // fallback
      } else {
        if (onStart) onStart();
        setTimeout(resolve, text.length * 80);
      }
    });
  };

  const introVisuals = document.getElementById('intro-visuals');
  
  let isAnimatingTypo = false;

  const playCAKSequence = async () => {
    isAnimatingTypo = true;
    window.speechSynthesis.cancel();
    
    // Voix off script
    await speakAndWait("Avant chaque réalisation, il y a une idée.");
    await new Promise(r => setTimeout(r, 600));
    await speakAndWait("Une vision.");
    await new Promise(r => setTimeout(r, 800));
    await speakAndWait("Et derrière chaque vision, un savoir-faire.");
    await new Promise(r => setTimeout(r, 1000));

    // C
    await speakAndWait("C... comme Créativité.", () => {
      gsap.to('#typo-c', { opacity: 1, y: -20, duration: 1.5, ease: "power2.out" });
    });
    await new Promise(r => setTimeout(r, 800));
    gsap.to('#typo-c', { opacity: 0, y: -40, duration: 1 });

    // A
    await speakAndWait("A... comme Architecture.", () => {
      gsap.to('#typo-a', { opacity: 1, y: -20, duration: 1.5, ease: "power2.out" });
    });
    await new Promise(r => setTimeout(r, 800));
    gsap.to('#typo-a', { opacity: 0, y: -40, duration: 1 });

    // K
    await speakAndWait("K... comme Know-how, notre savoir-faire d'exception.", () => {
      gsap.to('#typo-k', { opacity: 1, y: -20, duration: 1.5, ease: "power2.out" });
    });
    await new Promise(r => setTimeout(r, 800));
    gsap.to('#typo-k', { opacity: 0, y: -40, duration: 1 });
    
    await speakAndWait("Trois dimensions. Une même vision.");
    await new Promise(r => setTimeout(r, 500));

    // Fusion CAK
    await speakAndWait("CAK Construction.", () => {
      gsap.to('#typo-fusion', { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.2)" });
    });
    
    await new Promise(r => setTimeout(r, 800));
    
    await speakAndWait("Imaginez. Nous construisons.");
    
    await new Promise(r => setTimeout(r, 1500));
    
    hideIntro();
  };

  const btnStartIntro = document.getElementById('btn-start-intro');
  const introStartPanel = document.getElementById('intro-start');

  if (btnStartIntro) {
    btnStartIntro.addEventListener('click', () => {
      if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
        const dummy = new SpeechSynthesisUtterance('');
        dummy.volume = 0;
        window.speechSynthesis.speak(dummy);
      }
      
      gsap.to(introStartPanel, { opacity: 0, duration: 0.5, onComplete: () => introStartPanel.style.display = 'none' });
      gsap.to(introVisuals, { opacity: 1, duration: 0.5 });
      
      // Start CAK Sequence immediately
      setTimeout(playCAKSequence, 800);
    });
  }

  // 2. Before / After Slider
  const slider = document.getElementById('before-after-slider');
  if (slider) {
    const beforeWrapper = slider.querySelector('.before-wrapper');
    const handle = slider.querySelector('.slider-handle');
    let isDown = false;

    // Auto-slide animation
    const autoSlideParams = { percent: 50 };
    const autoSlideAnim = gsap.fromTo(autoSlideParams, { percent: 30 }, {
      percent: 70,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      onUpdate: () => {
        if (!isDown) {
          beforeWrapper.style.clipPath = `inset(0 ${100 - autoSlideParams.percent}% 0 0)`;
          handle.style.left = `${autoSlideParams.percent}%`;
        }
      }
    });

    const moveSlider = (e) => {
      if (!isDown) return;
      autoSlideAnim.pause();
      const rect = slider.getBoundingClientRect();
      let x = (e.clientX || e.touches[0].clientX) - rect.left;
      let percent = Math.max(0, Math.min(x / rect.width * 100, 100));
      beforeWrapper.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = `${percent}%`;
    };

    slider.addEventListener('mousedown', () => { isDown = true; autoSlideAnim.pause(); });
    slider.addEventListener('touchstart', () => { isDown = true; autoSlideAnim.pause(); }, { passive: true });
    
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
