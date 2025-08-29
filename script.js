class PortfolioApp {
  constructor() {
    this.isSkillsAnimated = false;
    this.scrollbars = new Map();
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupPortfolioFilter();
    this.setupScrollbars();
    this.setupSkillsAnimation();
    this.setupTimelineAdjustment();
    this.setupContactForm();
  }


  setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        this.showPage(link.getAttribute('data-page'));
      });
    });
  }

  showPage(pageId) {
    
    document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

  
    const targetPage = document.getElementById(pageId);
    const targetNav = document.querySelector(`[data-page="${pageId}"]`);
    
    if (targetPage) targetPage.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    
    if (pageId === 'resume') {
      setTimeout(() => {
        this.animateSkillBars();
        this.adjustTimelineForMobile();
      }, 300);
    }
  }

  
  setupPortfolioFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        
        const filter = btn.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
          item.style.display = (filter === 'all' || item.dataset.category === filter) ? "block" : "none";
        });
      });
    });
  }

  setupContactForm() {
    window.sendMessage = (event) => {
      event.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        window.location.href = "thank.html";
      } else {
        alert("Please fill all required fields.");
      }
      return false;
    };
  }


  setupSkillsAnimation() {
    if ('IntersectionObserver' in window) {
      const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id === 'resume' && !this.isSkillsAnimated) {
            setTimeout(() => this.animateSkillBars(), 300);
            this.isSkillsAnimated = true;
          }
        });
      }, { threshold: 0.3 });

      const resumeSection = document.getElementById('resume');
      if (resumeSection) skillsObserver.observe(resumeSection);
    }


    window.addEventListener('load', () => {
      const resumeSection = document.getElementById('resume');
      if (resumeSection?.classList.contains('active')) {
        setTimeout(() => this.animateSkillBars(), 500);
      }
    });
  }

  animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillPercentages = document.querySelectorAll('.skill-percentage');

    skillFills.forEach(fill => {
      fill.style.width = '0%';
      fill.classList.remove('animate');
    });
    
    skillPercentages.forEach(percentage => {
      percentage.classList.remove('show');
      percentage.style.right = '0px';
    });

    skillFills.forEach((fill, index) => {
      const width = fill.dataset.width;
      const percentage = skillPercentages[index];

      setTimeout(() => {
        fill.style.width = width;
        fill.classList.add('animate');
      
        setTimeout(() => {
          if (percentage) {
            percentage.classList.add('show');
            const percentageValue = parseInt(width);
            const barContainer = fill.parentElement;
            const barWidth = barContainer.offsetWidth;
            const rightPosition = Math.max(0, barWidth - (barWidth * percentageValue / 100) - 8);
            percentage.style.right = rightPosition + 'px';
          }
        }, 1500);
      }, index * 300);
    });
  }
  setupScrollbars() {
    this.setupCustomScrollbar("servicesGrid", "servicesScrollIndicator", "servicesScrollThumb");
    this.setupCustomScrollbar("testimonialsContainer", "testimonialsScrollIndicator", "testimonialsScrollThumb");
  }

  setupCustomScrollbar(containerId, barId, thumbId) {
    const container = document.getElementById(containerId);
    const bar = document.getElementById(barId);
    const thumb = document.getElementById(thumbId);

    if (!container || !bar || !thumb) return;

    const scrollbarData = { container, bar, thumb, isDragging: false };
    this.scrollbars.set(containerId, scrollbarData);

    const updateThumb = () => {
      const containerWidth = container.scrollWidth;
      const visibleWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;

      if (containerWidth <= visibleWidth) {
        bar.style.display = "none";
        return;
      }
      bar.style.display = "block";

      const maxScroll = containerWidth - visibleWidth;
      const scrollRatio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      const barWidth = bar.clientWidth;
      const thumbWidth = thumb.clientWidth;
      const maxThumbMove = barWidth - thumbWidth;
      
      if (maxThumbMove > 0) {
        thumb.style.left = (scrollRatio * maxThumbMove) + "px";
      }
    };

    
    container.addEventListener("scroll", updateThumb);
    
    bar.addEventListener("click", (e) => {
      if (e.target === thumb) return;
      
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const barWidth = bar.clientWidth;
      const thumbWidth = thumb.clientWidth;
      const maxThumbMove = barWidth - thumbWidth;
      const clickRatio = Math.max(0, Math.min(1, (clickX - thumbWidth / 2) / maxThumbMove));
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (maxScroll > 0) {
        container.scrollLeft = clickRatio * maxScroll;
      }
    });

  
    thumb.addEventListener("mousedown", (e) => {
      scrollbarData.isDragging = true;
      scrollbarData.startX = e.clientX;
      scrollbarData.startLeft = parseInt(window.getComputedStyle(thumb).left, 10) || 0;
      document.body.style.userSelect = "none";
      e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
      if (!scrollbarData.isDragging) return;

      const dx = e.clientX - scrollbarData.startX;
      const barWidth = bar.clientWidth;
      const thumbWidth = thumb.clientWidth;
      const maxThumbMove = barWidth - thumbWidth;
      const newLeft = Math.max(0, Math.min(scrollbarData.startLeft + dx, maxThumbMove));
      
      thumb.style.left = newLeft + "px";

      if (maxThumbMove > 0) {
        const scrollRatio = newLeft / maxThumbMove;
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollLeft = scrollRatio * maxScroll;
      }
    });

    window.addEventListener("mouseup", () => {
      if (scrollbarData.isDragging) {
        scrollbarData.isDragging = false;
        document.body.style.userSelect = "auto";
      }
    });

  
    window.addEventListener("resize", updateThumb);
    setTimeout(updateThumb, 100);
  }


  setupTimelineAdjustment() {
    this.adjustTimelineForMobile();
    window.addEventListener('resize', () => {
      setTimeout(() => this.adjustTimelineForMobile(), 100);
    });
  }

  adjustTimelineForMobile() {
    if (window.innerWidth > 768) return;

    const timelines = [
      { selector: '.education-timeline', items: '.timeline-item' },
      { selector: '.experience-timeline', items: '.timeline-item' }
    ];

    timelines.forEach(({ selector }) => {
      const timeline = document.querySelector(selector);
      if (!timeline) return;

      const items = timeline.querySelectorAll('.timeline-item');
      const line = timeline.querySelector('.timeline-line');
      
      if (items.length === 0 || !line) return;

      const firstDot = items[0].querySelector('.timeline-dot');
      const lastDot = items[items.length - 1].querySelector('.timeline-dot');
      
      if (!firstDot || !lastDot) return;

      const containerRect = timeline.getBoundingClientRect();
      const firstDotRect = firstDot.getBoundingClientRect();
      const lastDotRect = lastDot.getBoundingClientRect();
      
      const startY = firstDotRect.top - containerRect.top + (firstDot.offsetHeight / 2);
      const endY = lastDotRect.top - containerRect.top + (lastDot.offsetHeight / 2);
      const height = endY - startY;
      
      line.style.top = startY + 'px';
      line.style.height = height + 'px';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});