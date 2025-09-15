document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Fetch and populate content from content.json
  fetch('content.json')
    .then(response => response.json())
    .then(data => {
      // Banner
      document.querySelector('.banner .name').textContent = data.banner.name;
      document.querySelector('.banner .designation').textContent = data.banner.designation;
      document.querySelector('.banner .tagline').textContent = data.banner.tagline;

      // Promo
      document.querySelector('.promo h2').innerHTML = data.promo.title;
      document.querySelector('.promo p').textContent = data.promo.description;

      // About
      document.querySelector('.about-text').textContent = data.about.text;
      document.querySelector('.about-title').textContent = data.about.title;
      const aboutList = document.querySelector('.about-list');
      data.about.list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        aboutList.appendChild(li);
      });
      document.querySelector('.about-text-2').textContent = data.about.text_2;
      document.querySelector('.about-subtitle').textContent = data.about.subtitle;
      document.querySelector('.about-text-3').textContent = data.about.text_3;

      // Skills
      document.querySelector('.skills-text').textContent = data.skills.text;
      const skillsList = document.querySelector('.skills-list');
      data.skills.list.forEach((skill, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.setAttribute('data-aos', index % 2 === 0 ? 'flip-left' : 'flip-right');
        div.setAttribute('data-aos-duration', 1000 + index * 500);
        div.innerHTML = `
          <img src="${skill.image}" alt="${skill.name}">
          <h3>${skill.name}</h3>
          <p>${skill.description}</p>
        `;
        skillsList.appendChild(div);
      });

      // Services
      const servicesContent = document.querySelector('.service--content');
      data.services.forEach(service => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
          <h3>${service.name}</h3>
          <img src="${service.image}" alt="${service.name}">
          <p>${service.description}</p>
          <a href="${service.link}">Hire Me</a>
        `;
        servicesContent.appendChild(div);
      });

      // Portfolio
      const portfolioContent = document.querySelector('.portfolio--content');
      data.portfolio.forEach(project => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
          <h3>${project.name}</h3>
          <img src="${project.image}" alt="${project.name}">
        `;
        portfolioContent.appendChild(div);
      });

      // Testimonials
      const testimonialContent = document.querySelector('.testimonial--content');
      data.testimonials.forEach(testimonial => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
          <figure>
            <blockquote>
              <p>${testimonial.quote}</p>
            </blockquote>
            <figcaption>—${testimonial.author}, <cite>${testimonial.company}</cite></figcaption>
          </figure>
        `;
        testimonialContent.appendChild(div);
      });

      // Pricing
      document.querySelector('.pricing-text').textContent = data.pricing.text;
      const pricingContent = document.querySelector('.pricing--content');
      data.pricing.list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
          <h3>${item.name}</h3>
          <p class="price">${item.price}</p>
          <img src="${item.image}" alt="${item.name}">
          <p class="description">${item.description}</p>
          <a href="#contact">Hire Me</a>
        `;
        pricingContent.appendChild(div);
      });

      // Contact
      document.querySelector('.contact-detail').textContent = data.contact.detail;
      document.querySelectorAll('.email').forEach(el => {
        el.href = `mailto:${data.contact.email}`;
        el.textContent = data.contact.email;
      });
      document.querySelectorAll('.phone').forEach(el => {
        el.href = `tel:${data.contact.phone}`;
        el.textContent = data.contact.phone;
      });
      document.querySelectorAll('.address').forEach(el => {
        el.innerHTML = data.contact.address.replace('\n', '<br>');
      });

      // Footer
      document.querySelector('.footer-text').textContent = data.footer.text;
      document.querySelector('.copyright-notice .name').textContent = data.footer.name;
    })
    .catch(error => console.error('Error loading content:', error));
});
