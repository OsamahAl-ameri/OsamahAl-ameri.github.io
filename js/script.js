document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  } else {
    console.error('Hamburger or nav-links element not found');
  }

  // Fetch and populate content from content.json
  fetch('content.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Content loaded successfully:', data);

      // Fallback content in case data is missing
      const fallback = {
        banner: { name: 'Your Name', designation: 'Freelance Designer', tagline: 'Creative solutions for your brand.' },
        promo: { title: 'We bring your ideas to life.', description: 'Innovative and professional designs.' },
        about: { text: 'Lorem ipsum dolor sit amet.', title: 'About', list: [], text_2: '', subtitle: '', text_3: '' },
        skills: { text: 'My expertise includes various design tools.', list: [] },
        services: [],
        portfolio: [],
        testimonials: [],
        pricing: { text: 'Contact for pricing details.', list: [] },
        contact: { detail: 'Get in touch!', email: 'email@example.com', phone: '+1234567890', address: 'Unknown' },
        footer: { text: 'Lorem ipsum footer text.', name: 'Your Name' }
      };

      // Banner
      const banner = data.banner || fallback.banner;
      const bannerName = document.querySelector('.banner .name');
      const bannerDesignation = document.querySelector('.banner .designation');
      const bannerTagline = document.querySelector('.banner .tagline');
      if (bannerName) bannerName.textContent = banner.name;
      if (bannerDesignation) bannerDesignation.textContent = banner.designation;
      if (bannerTagline) bannerTagline.textContent = banner.tagline;

      // Promo
      const promo = data.promo || fallback.promo;
      const promoTitle = document.querySelector('.promo h2');
      const promoDescription = document.querySelector('.promo p');
      if (promoTitle) promoTitle.innerHTML = promo.title;
      if (promoDescription) promoDescription.textContent = promo.description;

      // About
      const about = data.about || fallback.about;
      const aboutText = document.querySelector('.about-text');
      const aboutTitle = document.querySelector('.about-title');
      const aboutList = document.querySelector('.about-list');
      const aboutText2 = document.querySelector('.about-text-2');
      const aboutSubtitle = document.querySelector('.about-subtitle');
      const aboutText3 = document.querySelector('.about-text-3');
      if (aboutText) aboutText.textContent = about.text;
      if (aboutTitle) aboutTitle.textContent = about.title;
      if (aboutList) {
        about.list.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          aboutList.appendChild(li);
        });
      }
      if (aboutText2) aboutText2.textContent = about.text_2;
      if (aboutSubtitle) aboutSubtitle.textContent = about.subtitle;
      if (aboutText3) aboutText3.textContent = about.text_3;

      // Skills
      const skills = data.skills || fallback.skills;
      const skillsText = document.querySelector('.skills-text');
      const skillsList = document.querySelector('.skills-list');
      if (skillsText) skillsText.textContent = skills.text;
      if (skillsList) {
        skills.list.forEach((skill, index) => {
          const div = document.createElement('div');
          div.className = 'item';
          div.setAttribute('data-aos', index % 2 === 0 ? 'flip-left' : 'flip-right');
          div.setAttribute('data-aos-duration', 1000 + index * 500);
          div.innerHTML = `
            <img src="${skill.image || 'assets/images/placeholder.png'}" alt="${skill.name || 'Skill'}">
            <h3>${skill.name || 'Unnamed Skill'}</h3>
            <p>${skill.description || 'No description available.'}</p>
          `;
          skillsList.appendChild(div);
        });
      }

      // Services
      const servicesContent = document.querySelector('.service--content');
      if (servicesContent) {
        (data.services || fallback.services).forEach(service => {
          const div = document.createElement('div');
          div.className = 'item';
          div.innerHTML = `
            <h3>${service.name || 'Unnamed Service'}</h3>
            <img src="${service.image || 'assets/images/placeholder.png'}" alt="${service.name || 'Service'}">
            <p>${service.description || 'No description available.'}</p>
            <a href="${service.link || '#contact'}">Hire Me</a>
          `;
          servicesContent.appendChild(div);
        });
      }

      // Portfolio
      const portfolioContent = document.querySelector('.portfolio--content');
      if (portfolioContent) {
        (data.portfolio || fallback.portfolio).forEach(project => {
          const div = document.createElement('div');
          div.className = 'item';
          div.innerHTML = `
            <h3>${project.name || 'Unnamed Project'}</h3>
            <img src="${project.image || 'assets/images/placeholder.png'}" alt="${project.name || 'Project'}">
          `;
          portfolioContent.appendChild(div);
        });
      }

      // Testimonials
      const testimonialContent = document.querySelector('.testimonial--content');
      if (testimonialContent) {
        (data.testimonials || fallback.testimonials).forEach(testimonial => {
          const div = document.createElement('div');
          div.className = 'item';
          div.innerHTML = `
            <figure>
              <blockquote>
                <p>${testimonial.quote || 'No testimonial available.'}</p>
              </blockquote>
              <figcaption>—${testimonial.author || 'Anonymous'}, <cite>${testimonial.company || 'Unknown Company'}</cite></figcaption>
            </figure>
          `;
          testimonialContent.appendChild(div);
        });
      }

      // Pricing
      const pricing = data.pricing || fallback.pricing;
      const pricingText = document.querySelector('.pricing-text');
      const pricingContent = document.querySelector('.pricing--content');
      if (pricingText) pricingText.textContent = pricing.text;
      if (pricingContent) {
        (pricing.list || []).forEach(item => {
          const div = document.createElement('div');
          div.className = 'item';
          div.innerHTML = `
            <h3>${item.name || 'Unnamed Pricing'}</h3>
            <p class="price">${item.price || 'N/A'}</p>
            <img src="${item.image || 'assets/images/placeholder.png'}" alt="${item.name || 'Pricing'}">
            <p class="description">${item.description || 'No description available.'}</p>
            <a href="#contact">Hire Me</a>
          `;
          pricingContent.appendChild(div);
        });
      }

      // Contact
      const contact = data.contact || fallback.contact;
      const contactDetail = document.querySelector('.contact-detail');
      const emails = document.querySelectorAll('.email');
      const phones = document.querySelectorAll('.phone');
      const addresses = document.querySelectorAll('.address');
      if (contactDetail) contactDetail.textContent = contact.detail;
      emails.forEach(el => {
        el.href = `mailto:${contact.email}`;
        el.textContent = contact.email;
      });
      phones.forEach(el => {
        el.href = `tel:${contact.phone}`;
        el.textContent = contact.phone;
      });
      addresses.forEach(el => {
        el.innerHTML = contact.address.replace('\n', '<br>');
      });

      // Footer
      const footer = data.footer || fallback.footer;
      const footerText = document.querySelector('.footer-text');
      const footerName = document.querySelector('.copyright-notice .name');
      if (footerText) footerText.textContent = footer.text;
      if (footerName) footerName.textContent = footer.name;
    })
    .catch(error => {
      console.error('Error loading content.json:', error);
      // Optionally, display a user-friendly message on the page
      const errorDiv = document.createElement('div');
      errorDiv.style.color = 'red';
      errorDiv.style.textAlign = 'center';
      errorDiv.textContent = 'Failed to load content. Please try refreshing the page or contact support.';
      document.body.insertBefore(errorDiv, document.body.firstChild);
    });
});