/**
 * Hannah Akoore | Premium Virtual Assistant Portfolio
 * Vanilla JavaScript - All interactive features
 * Mobile-first, accessible, performant
 */

(function() {
  'use strict';

  // ============================================
  // DOM Ready
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initDarkMode();
    initScrollProgress();
    initScrollSpy();
    initAnimatedStats();
    initSkillBars();
    initProjectFilters();
    initProjectModals();
    initTestimonialCarousel();
    initFAQAccordion();
    initContactForm();
    initFloatingActions();
    initScrollToTop();
    initLucideIcons();
    initSmoothScroll();
    initRippleEffects();
    
    // Accessibility enhancements
    initKeyboardNavigation();
    
    console.log('%c[Hannah Akoore Portfolio] Premium site initialized successfully.', 'color:#1B5E20');
  });

  // ============================================
  // Professional Loading Screen
  // ============================================
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Simulate fast professional load
    setTimeout(() => {
      loader.style.transition = 'opacity 400ms ease, visibility 400ms ease';
      loader.style.opacity = '0';
      
      setTimeout(() => {
        loader.style.visibility = 'hidden';
        loader.style.display = 'none';
        
        // Trigger initial animations
        document.body.classList.add('loaded');
      }, 400);
    }, 650);
  }

  // ============================================
  // Mobile Navigation (Hamburger)
  // ============================================
  function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      
      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a nav link (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // Dark Mode Toggle with localStorage
  // ============================================
  function initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ============================================
  // Scroll Progress Bar
  // ============================================
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial
  }

  // ============================================
  // Active Navigation Highlight (ScrollSpy)
  // ============================================
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // ============================================
  // Animated Statistics Counters
  // ============================================
  function initAnimatedStats() {
    const statsSection = document.getElementById('about');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statsSection || !statNumbers.length) return;

    const animateValue = (element, start, end, duration, suffix = '') => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (suffix === '%') {
          element.textContent = value + suffix;
        } else if (suffix === '+') {
          element.textContent = value.toLocaleString() + suffix;
        } else {
          element.textContent = value.toLocaleString();
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Ensure final value
          if (suffix === '%') element.textContent = end + suffix;
          else if (suffix === '+') element.textContent = end.toLocaleString() + suffix;
          else element.textContent = end.toLocaleString();
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target, 10);
            const suffix = stat.dataset.suffix || '';
            animateValue(stat, 0, target, 1600, suffix);
          });
          observer.disconnect(); // Run once
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  // ============================================
  // Animated Skill Progress Bars
  // ============================================
  function initSkillBars() {
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (!skillsSection || !progressBars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const targetWidth = bar.dataset.progress || '85';
            // Trigger reflow then animate
            requestAnimationFrame(() => {
              bar.style.width = `${targetWidth}%`;
            });
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }

  // ============================================
  // Project Filtering
  // ============================================
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const category = card.dataset.category;
          
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            // Re-trigger animation
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = 'fadeInUp 0.4s ease forwards';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ============================================
  // Project Detail Modals
  // ============================================
  function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');

    if (!modal || !modalBody || !closeBtn) return;

    // Project data (expanded from PDF)
    const projectsData = {
      'workflow-system': {
        title: 'Custom Workflow & Support Ticket System',
        category: 'Workflow',
        image: 'images/workspace-organized.jpg',
        problem: 'A busy founder was overwhelmed by scattered client requests, missed follow-ups, and lack of visibility into team tasks. Response times were inconsistent and important details were falling through the cracks.',
        solution: 'Designed and implemented a structured workflow using Calendly for seamless scheduling combined with Freshdesk + custom ticket automation. Created clear escalation paths, tagging systems, and automated status updates. Integrated with existing email and Google Workspace.',
        outcome: 'Reduced average response time from 18 hours to under 3 hours. Client reported 40% improvement in team efficiency and complete peace of mind knowing nothing slips through. The system became the single source of truth for all operational requests.',
        tools: ['Calendly', 'Freshdesk', 'Google Workspace', 'Gmail Automation'],
        testimonial: '“Hannah completely transformed how we handle support. Everything is now organized and visible. I finally feel in control of my operations.” — Client Founder'
      },
      'operations-support': {
        title: 'Digital Operations & File Management Hub',
        category: 'Organization',
        image: 'images/minimalist-desk.jpg',
        problem: 'Client’s company files were disorganized across multiple drives and email threads. Onboarding new team members took days because information was hard to find. Important documents were frequently lost or duplicated.',
        solution: 'Built a clean, hierarchical Google Drive structure with standardized naming conventions, color-coded folders, and automated backup protocols. Integrated Zendesk for support tickets linked directly to client folders. Created simple SOPs and a “Company Wiki” style onboarding guide.',
        outcome: 'New team members now onboard in under 2 hours instead of 3 days. File retrieval time dropped by 85%. The client described it as “finally having a professional backend that matches the quality of our services.”',
        tools: ['Google Drive', 'Zendesk', 'Google Docs', 'Notion'],
        testimonial: '“Our operations finally feel premium and scalable. Hannah’s systems gave us the foundation we needed to grow confidently.” — Operations Lead'
      },
      'email-time': {
        title: 'Inbox Mastery & Time Tracking System',
        category: 'Communication',
        image: 'images/desk-laptop-plants.jpg',
        problem: 'Founder’s inbox was a constant source of stress — hundreds of unread emails, unclear priorities, and no visibility into how time was actually being spent on projects.',
        solution: 'Implemented Gmail organization using labels, filters, and saved searches. Created a daily “Inbox Zero” routine with priority flagging. Integrated Clockify for precise time tracking across all client work with weekly automated reports.',
        outcome: 'Inbox stays under 20 emails at all times. Founder gained full clarity on billable vs non-billable hours. Time tracking revealed opportunities to reallocate 12+ hours/week back to high-value strategy work.',
        tools: ['Gmail', 'Clockify', 'Google Calendar', 'Zapier (light)'],
        testimonial: '“I used to dread opening my email. Now it’s calm and under control. The time reports also helped me price my services more accurately.” — Client'
      },
      'project-management': {
        title: 'Project Management & Collaboration Hub',
        category: 'Workflow',
        image: 'images/workspace-organized.jpg',
        problem: 'Team projects were tracked in multiple places (WhatsApp, email, spreadsheets). Deadlines were missed, responsibilities unclear, and progress reporting was manual and stressful.',
        solution: 'Set up a beautiful Trello + Slack integrated system with clear boards, labels for priority, checklists, and due dates. Created recurring templates for common projects. Trained the team on async updates and weekly standup rituals.',
        outcome: 'Projects now complete on time 92% of the time (up from ~60%). Team communication moved from chaotic to calm and documented. Weekly reporting that used to take 3 hours now takes 15 minutes.',
        tools: ['Trello', 'Slack', 'Google Meet', 'Canva (for templates)'],
        testimonial: '“Our team finally works like a well-oiled machine. Hannah didn’t just set up tools — she changed how we collaborate.” — Startup Founder'
      }
    };

    // Open modal on card click
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const data = projectsData[projectId];
        
        if (!data) return;

        modalBody.innerHTML = `
          <div class="modal-image-wrapper">
            <img src="${data.image}" alt="${data.title}" class="modal-image">
          </div>
          
          <div class="modal-meta">
            <span><strong>Category:</strong> ${data.category}</span>
            <span><strong>Tools:</strong> ${data.tools.join(' • ')}</span>
          </div>

          <div class="modal-section">
            <h4>The Challenge</h4>
            <p>${data.problem}</p>
          </div>

          <div class="modal-section">
            <h4>My Approach & Solution</h4>
            <p>${data.solution}</p>
          </div>

          <div class="modal-section">
            <h4>Results & Impact</h4>
            <p>${data.outcome}</p>
          </div>

          ${data.testimonial ? `
            <div class="modal-section" style="background:var(--color-bg-alt);padding:1.25rem;border-radius:var(--radius-md);border-left:4px solid var(--color-primary);">
              <p style="font-style:italic;margin:0;">${data.testimonial}</p>
            </div>
          ` : ''}
        `;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus trap simple version
        closeBtn.focus();
      });
    });

    // Close modal
    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ============================================
  // Testimonial Carousel
  // ============================================
  function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlideInterval = null;

    // Create dots
    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlides();
      resetAutoSlide();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlides();
    }

    function resetAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 5500);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
      });
      carousel.addEventListener('mouseleave', resetAutoSlide);
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (document.activeElement.closest('.testimonial-carousel')) {
        if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoSlide();
        }
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoSlide();
        }
      }
    });

    // Start auto slide
    updateSlides();
    resetAutoSlide();
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Close all others (single open at a time - good UX)
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('open');
        });

        if (!isOpen) {
          item.classList.add('open');
        }
      });

      // Keyboard accessibility
      question.setAttribute('tabindex', '0');
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // ============================================
  // Contact Form with Validation & Toast
  // ============================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Basic validation
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      
      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Show loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          Sending...
        </span>
      `;

      // Simulate network request (real implementation would use fetch to Formspree / Supabase / etc.)
      await new Promise(resolve => setTimeout(resolve, 1250));

      // Success
      showToast('Thank you, Hannah has received your message and will reply within 24 hours.', 'success');
      
      // Reset form
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Optional: Scroll to top or show extra CTA
      setTimeout(() => {
        const cta = document.getElementById('final-cta');
        if (cta) cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1800);
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
          input.style.borderColor = '#DC2626';
        } else {
          input.style.borderColor = '';
        }
      });
      
      input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(220, 38, 38)') {
          input.style.borderColor = '';
        }
      });
    });
  }

  // ============================================
  // Toast Notification System
  // ============================================
  function showToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <span>${type === 'success' ? '✓' : '⚠'}</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5200);
  }

  // ============================================
  // Floating Action Button (Book a Call)
  // ============================================
  function initFloatingActions() {
    const fab = document.getElementById('fab-book-call');
    if (!fab) return;

    fab.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus first input after scroll
        setTimeout(() => {
          const nameInput = document.getElementById('name');
          if (nameInput) nameInput.focus();
        }, 850);
      }
    });
  }

  // ============================================
  // Scroll to Top Button
  // ============================================
  function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // Initialize Lucide Icons
  // ============================================
  function initLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    } else {
      // Fallback: load script dynamically if not present
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/lucide@latest';
      script.onload = () => {
        if (lucide && lucide.createIcons) lucide.createIcons();
      };
      document.head.appendChild(script);
    }
  }

  // ============================================
  // Smooth Scroll Enhancement (for nav)
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const navHeight = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================
  // Button Ripple Enhancement (CSS already handles, this adds JS polish)
  // ============================================
  function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position:absolute;
          left:${x}px;
          top:${y}px;
          width:0;
          height:0;
          background:rgba(255,255,255,0.4);
          border-radius:50%;
          transform:translate(-50%,-50%);
          pointer-events:none;
          animation:ripple-effect 0.6s ease-out forwards;
        `;
        
        // Add keyframes if not exists
        if (!document.getElementById('ripple-style')) {
          const style = document.createElement('style');
          style.id = 'ripple-style';
          style.textContent = `
            @keyframes ripple-effect {
              to {
                width: 300px;
                height: 300px;
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  // ============================================
  // Keyboard Navigation & Accessibility
  // ============================================
  function initKeyboardNavigation() {
    // Focus visible styles are in CSS
    // Add skip to content link functionality if needed
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.addEventListener('focus', () => {
      skipLink.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', () => {
      skipLink.classList.add('sr-only');
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Escape key closes any open modals (handled in modal init)
    // Additional global shortcuts can be added here
  }

  // Expose toast for potential external use
  window.showPortfolioToast = showToast;

})();