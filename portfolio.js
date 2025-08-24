// portfolio.js — interactive behaviors for the portfolio page
(() => {
    const state = {
        filter: 'all',
        sort: 'featured',
        query: ''
    };

    const projectsContainer = document.getElementById('projectsContainer');
        // master data model
        let projectsData = [];
        const createProjectFromElement = (el) => {
            const rawCat = el.dataset.category || 'inne';
            const categories = rawCat.split(',').map(s=>s.trim()).filter(Boolean).map(s=>s.toLowerCase());
            return {
                id: el.dataset.id || `p-${Math.random().toString(36).slice(2,9)}`,
                title: el.dataset.title || '',
                // category is now an array of lowercase strings
                category: categories,
                date: el.dataset.date || '',
                images: el.dataset.images || '',
                video: el.dataset.video || '',
                live: el.dataset.live || '',
                repo: el.dataset.repo || '',
                desc: el.querySelector('.muted') ? el.querySelector('.muted').textContent : '',
                tags: el.dataset.tags ? el.dataset.tags.split(',').map(s=>s.trim()) : []
            };
        };
        const cards = () => Array.from(projectsContainer.querySelectorAll('.card'));
    const chips = Array.from(document.querySelectorAll('.chip'));
    const sortSelect = document.getElementById('sortSelect');
    const searchBar = document.getElementById('searchBar');
    // modal removed — portfolio simplified to direct links
    const dateFilter = document.getElementById('dateFilter');
        const themeToggle = document.getElementById('themeToggle');

        // theme init
        function applyTheme(t){
            if(t==='dark') document.documentElement.setAttribute('data-theme','dark');
            else document.documentElement.removeAttribute('data-theme');
        }
        const saved = localStorage.getItem('theme');
        if(saved) applyTheme(saved);
        else {
            // respect prefers-color-scheme
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
        // Render an animated switch inside themeToggle and wire accessibility
        if(themeToggle){
            // create knob if not present
            if(!themeToggle.querySelector('.toggle-knob')){
                themeToggle.innerHTML = '<span class="icon">☀️</span><span class="toggle-knob" aria-hidden="true"></span>';
            }
            const knob = themeToggle.querySelector('.toggle-knob');
            const icon = themeToggle.querySelector('.icon');

            function updateToggleUI(t){
                const isDark = t === 'dark';
                themeToggle.classList.toggle('is-dark', isDark);
                themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
                themeToggle.setAttribute('aria-label', isDark ? 'Dark mode' : 'Light mode');
                if(icon) icon.textContent = isDark ? '🌙' : '☀️';
            }

            // initialize
            updateToggleUI(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

            themeToggle.addEventListener('click', ()=>{
                const curr = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
                const next = curr === 'dark' ? 'light' : 'dark';
                applyTheme(next);
                localStorage.setItem('theme', next);
                updateToggleUI(next);
            });
        }

        // Sync theme changes from other tabs/pages (e.g., main page)
        window.addEventListener('storage', (e)=>{
            if(e.key === 'theme'){
                const val = e.newValue || 'light';
                applyTheme(val);
                if(themeToggle){
                    const icon = themeToggle.querySelector('.icon');
                    if(icon) icon.textContent = val === 'dark' ? '🌙' : '☀️';
                    themeToggle.classList.toggle('is-dark', val === 'dark');
                }
            }
        });

    // Utilities
    const debounce = (fn, time=200) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), time)} };

    // Render — apply filter/sort/search
        // create card DOM from data
        function createCard(d){
            const art = document.createElement('article');
            art.className = 'card';
            art.dataset.id = d.id;
            art.dataset.title = d.title;
            art.dataset.category = Array.isArray(d.category) ? d.category.join(',') : d.category;
            art.dataset.date = d.date;
            art.dataset.images = d.images || '';
            art.dataset.video = d.video || '';
            art.dataset.live = d.live || '';
            art.dataset.repo = d.repo || '';

            const thumbSrc = Array.isArray(d.images) ? (d.images[0]||'') : (d.images ? (''+d.images).split(',')[0].trim() : '');
            // categories may be an array
            const categories = Array.isArray(d.category) ? d.category : (d.category ? [d.category] : ['inne']);
            const cap = s => (s && s.length) ? (s.charAt(0).toUpperCase() + s.slice(1)) : s;
            const categoryChips = categories.map(c=>`<span class="chip small">${cap(c)}</span>`).join(' ');
            art.innerHTML = `
                <figure class="thumb"><img src="${thumbSrc || 'images/nozercode-graphics.png'}" alt="${d.title}" loading="lazy"></figure>
                <div class="card-body">
                    <h3>${d.title}</h3>
                    <p class="muted">${d.desc || ''}</p>
                    <div class="tags">${(d.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
                    <div class="meta-row">
                        ${categoryChips}
                        <a class="btn" href="${d.live || d.repo || '#'}" target="_blank" rel="noopener noreferrer">Zobacz</a>
                    </div>
                </div>`;
            return art;
        }

        function render(){
            // apply search/filter/sort to projectsData
            let list = projectsData.filter(d=>{
                const matchesQuery = d.title.toLowerCase().includes(state.query);
                const matchesFilter = (state.filter === 'all') || (Array.isArray(d.category) ? d.category.includes(state.filter) : d.category === state.filter);
                // date filter
                let matchesDate = true;
                if(dateFilter && dateFilter.value && dateFilter.value !== 'all' && d.date){
                    const days = parseInt(dateFilter.value,10);
                    if(!isNaN(days)){
                        const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days);
                        const pd = new Date(d.date);
                        matchesDate = pd >= cutoff;
                    }
                }
                return matchesQuery && matchesFilter && matchesDate;
            });

            // sort
            list.sort((a,b)=>{
                if(state.sort==='title-asc') return a.title.localeCompare(b.title);
                if(state.sort==='title-desc') return b.title.localeCompare(a.title);
                if(state.sort==='date-asc') return new Date(a.date) - new Date(b.date);
                if(state.sort==='date-desc') return new Date(b.date) - new Date(a.date);
                return 0; // featured leave original order
            });

            // render
            projectsContainer.style.opacity = '0.7';
            setTimeout(()=>{
                projectsContainer.innerHTML = '';
                list.forEach(d => projectsContainer.appendChild(createCard(d)));
                projectsContainer.style.opacity = '1';
            }, 160);
        }

    // Wire chips
    chips.forEach(chip => {
        chip.addEventListener('click', ()=>{
            chips.forEach(c=>{c.classList.remove('active');c.setAttribute('aria-pressed','false')});
            chip.classList.add('active');
            chip.setAttribute('aria-pressed','true');
            state.filter = chip.dataset.filter;
            render();
        });
    });

    // Sort
    sortSelect.addEventListener('change', ()=>{
        state.sort = sortSelect.value;
        render();
    });

    // Date filter
    if(typeof dateFilter !== 'undefined' && dateFilter) dateFilter.addEventListener('change', ()=>{ render(); });

    // Search
    searchBar.addEventListener('input', debounce((e)=>{
        state.query = e.target.value.trim().toLowerCase();
        render();
    }, 180));

    // CTA animation and smooth scroll for "Zobacz projekty"
    const cta = document.querySelector('.hero-cta .btn.primary');
    if(cta){
        cta.addEventListener('click', (ev)=>{
            // small press animation
            cta.classList.add('cta-click');
            setTimeout(()=>cta.classList.remove('cta-click'), 320);

            // smooth scroll to projects
            const target = document.getElementById('projects');
            if(target){
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    }

    // Modal and gallery removed — cards link directly to project URLs and native anchors handle navigation

        // Initialize projects from the static HTML cards only.
        // Edit `portfolio.html` to add/remove project cards (featured cards go first).
        (function initFromDOM(){
            const existing = Array.from(document.querySelectorAll('.card'));
            if(existing.length) projectsData = existing.map(createProjectFromElement);
            const featured = Array.from(document.querySelectorAll('.featured-card'));
            // put featured projects at the beginning in the same order they appear
            featured.reverse().forEach(f=>projectsData.unshift(createProjectFromElement(f)));
            render();
        })();
})();
