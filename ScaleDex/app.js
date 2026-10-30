(() => {
  'use strict';
  const site = window.SCALEDEX_SITE;
  const data = window.SCALEDEX_DATA;
  if (!site || !data) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = { language: 'en', policy: 'student', scaleIndex: 4, objectIndex: 0 };
  const methodColors = ['#aeb8c9', '#bea46d', '#159e99', '#aa86b8', '#315be8'];
  const objectNames = ['Radio', 'Animal model', 'Rectangular object', 'Watch'];
  const previewScales = [0.6, 1.0, 1.5];
  const translate = (en, zh) => state.language === 'zh' ? zh : en;
  let toastTimeout;

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  function safeLink(value) {
    if (!value || typeof value !== 'string') return '';
    try {
      const parsed = new URL(value, location.href);
      return ['https:', 'http:', 'file:'].includes(parsed.protocol) ? value : '';
    } catch { return ''; }
  }

  function initializeResources() {
    const resources = site.resources || {};
    $$('[data-resource]').forEach(anchor => {
      const key = anchor.dataset.resource;
      const source = key === 'paper' ? (resources.arxiv || resources.paper) : key === 'github' ? (resources.code || resources.github) : resources[key];
      const url = safeLink(source);
      anchor.hidden = !url;
      if (url) anchor.href = url;
      else anchor.removeAttribute('href');
    });
    if (Array.isArray(site.authors) && site.authors.length) {
      const parent = $('#authors');
      site.authors.forEach(author => {
        const entry = typeof author === 'string' ? { name: author } : author;
        const url = safeLink(entry.url);
        const element = document.createElement(url ? 'a' : 'span');
        element.textContent = entry.name || '';
        if (url) { element.href = url; element.target = '_blank'; element.rel = 'noopener noreferrer'; }
        if (entry.affiliation) {
          const sup = document.createElement('sup');
          sup.textContent = String(entry.affiliation);
          element.append(sup);
        }
        parent.append(element);
      });
      parent.hidden = false;
    }
    if (Array.isArray(site.affiliations) && site.affiliations.length) {
      $('#affiliations').textContent = site.affiliations.join(' · ');
      $('#affiliations').hidden = false;
    }
    if (safeLink(resources.dataset)) {
      $('#dataset-resource').href = resources.dataset;
      $('#dataset-resource').hidden = false;
    }
    if (site.citation && site.citation.trim()) {
      $('#citation-pending').hidden = true;
      $('#citation-code').textContent = site.citation;
      $('#citation-code').hidden = false;
      $('#copy-citation').hidden = false;
    }
    if (safeLink(site.video)) {
      $('#project-video').src = site.video;
      $('#video-section').hidden = false;
    }
  }

  function selectObject(index) {
    state.objectIndex = index;
    $$('[data-object]').forEach(button => {
      const selected = Number(button.dataset.object) === index;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    previewScales.forEach((scale, position) => {
      const image = $(`#grasp-${position}`);
      image.src = `assets/images/grasp-${index}-${position}.webp`;
      image.alt = translate(`ScaleDex visual student grasping ${objectNames[index].toLowerCase()} at scale ${scale.toFixed(1)}. Static manuscript snapshot.`, `ScaleDex 视觉学生在尺度 ${scale.toFixed(1)} 下的${['收音机', '动物模型', '长方体物体', '手表'][index]}抓取。论文静态快照。`);
    });
  }

  function svgElement(tag, attributes = {}, text) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, String(value)));
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderChart() {
    const chart = $('#benchmark-chart');
    chart.replaceChildren();
    chart.append(svgElement('title', { id: 'chart-title' }, translate(`${state.policy === 'student' ? 'Visual student' : 'Privileged teacher'}: success rate by object scale`, `${state.policy === 'student' ? '视觉学生' : '特权教师'}：各物体尺度成功率`)));
    chart.append(svgElement('desc', { id: 'chart-desc' }, translate('Five methods are compared at scales 0.6, 0.8, 1.0, 1.2, and 1.5. Values are manuscript-reported means; error bars are sample standard deviations. Exact values appear in the following table.', '对比五种方法在 0.6、0.8、1.0、1.2 和 1.5 尺度的成功率。曲线为论文报告均值，误差线为样本标准差。准确数值列于下方表格。')));
    const x = scale => 56 + (scale - 0.6) / 0.9 * 624;
    const y = value => 296 - value / 100 * 260;
    const selectedX = x(data.scales[state.scaleIndex]);
    chart.append(svgElement('rect', { x: selectedX - 18, y: 25, width: 36, height: 271, rx: 7, fill: '#eef3ff' }));
    [0, 20, 40, 60, 80, 100].forEach(value => {
      chart.append(svgElement('line', { x1: 56, y1: y(value), x2: 680, y2: y(value), stroke: '#e5eaf2', 'stroke-width': 1, 'stroke-dasharray': value === 0 ? 'none' : '3 5' }));
      chart.append(svgElement('text', { x: 42, y: y(value) + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#94a0b3' }, value));
    });
    chart.append(svgElement('text', { x: 56, y: 15, 'font-size': 10, fill: '#94a0b3' }, translate('SUCCESS (%)', '成功率（%）')));
    data.scales.forEach((scale, index) => {
      chart.append(svgElement('text', { x: x(scale), y: 319, 'text-anchor': 'middle', 'font-size': 12, fill: index === state.scaleIndex ? '#315be8' : '#8b99ae', 'font-weight': index === state.scaleIndex ? 650 : 400 }, scale.toFixed(1)));
    });
    chart.append(svgElement('text', { x: 680, y: 340, 'text-anchor': 'end', 'font-size': 10, fill: '#96a1b2' }, translate('OBJECT SCALE', '物体尺度')));
    const rows = data.benchmark[state.policy];
    rows.forEach((row, methodIndex) => {
      const ours = methodIndex === rows.length - 1;
      const color = methodColors[methodIndex];
      const points = data.scales.map((scale, index) => `${x(scale)},${y(row.mean[index])}`).join(' ');
      chart.append(svgElement('polyline', { points, fill: 'none', stroke: color, 'stroke-width': ours ? 3.5 : 1.8, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'stroke-dasharray': methodIndex === 3 ? '5 4' : 'none', opacity: ours || methodIndex === 2 ? 1 : 0.8 }));
      data.scales.forEach((scale, index) => {
        const px = x(scale), py = y(row.mean[index]);
        const upper = y(Math.min(100, row.mean[index] + row.sd[index]));
        const lower = y(Math.max(0, row.mean[index] - row.sd[index]));
        chart.append(svgElement('path', { d: `M${px} ${upper}V${lower}M${px - 3} ${upper}H${px + 3}M${px - 3} ${lower}H${px + 3}`, fill: 'none', stroke: color, 'stroke-width': 1.2 }));
        const point = svgElement('circle', { cx: px, cy: py, r: ours ? 4.7 : 3.3, fill: ours ? color : '#fff', stroke: color, 'stroke-width': ours ? 2 : 1.6 });
        point.append(svgElement('title', {}, `${row.method}, scale ${scale}: ${row.mean[index].toFixed(1)} ± ${row.sd[index].toFixed(1)}%`));
        chart.append(point);
      });
    });
    const ours = rows[4], baseline = rows[2], index = state.scaleIndex;
    const labelY = Math.max(24, y(ours.mean[index]) - 15);
    chart.append(svgElement('text', { x: selectedX, y: labelY, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 650, fill: '#315be8' }, `${ours.mean[index].toFixed(1)}%`));
    $('#selected-scale-value').textContent = data.scales[index].toFixed(1);
    $('#insight-ours').replaceChildren(document.createTextNode(ours.mean[index].toFixed(1)), Object.assign(document.createElement('span'), { textContent: '%' }));
    $('#insight-baseline').replaceChildren(document.createTextNode(baseline.mean[index].toFixed(1)), Object.assign(document.createElement('span'), { textContent: '%' }));
    const gain = data.reported_gains[state.policy][index];
    $('#insight-gain').replaceChildren(document.createTextNode(`+${gain.toFixed(1)} `), Object.assign(document.createElement('small'), { textContent: 'pp' }));
    $$('[data-scale]').forEach(button => {
      const active = Number(button.dataset.scale) === index;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function renderTable() {
    const tbody = $('#benchmark-body');
    tbody.replaceChildren();
    data.benchmark[state.policy].forEach((row, index) => {
      const tr = document.createElement('tr');
      if (index === 4) tr.className = 'ours-row';
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = row.method;
      tr.append(th);
      row.mean.forEach((mean, column) => {
        const td = document.createElement('td');
        td.append(document.createTextNode(mean.toFixed(1)));
        const sd = document.createElement('span');
        sd.className = 'sd';
        sd.textContent = `± ${row.sd[column].toFixed(1)}`;
        td.append(sd);
        tr.append(td);
      });
      tbody.append(tr);
    });
    $('#benchmark-caption').textContent = translate(`${state.policy === 'student' ? 'Visual student' : 'Privileged teacher'} success rate (%) on DexGraspNet-S unseen-category objects; mean and sample standard deviation across three seeds.`, `DexGraspNet-S 未见类别上的${state.policy === 'student' ? '视觉学生' : '特权教师'}成功率（%），显示三个种子的均值与样本标准差。`);
  }

  function setPolicy(policy) {
    state.policy = policy;
    $$('[data-policy]').forEach(button => {
      const selected = button.dataset.policy === policy;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    renderChart();
    renderTable();
  }

  function setLanguage(language) {
    state.language = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    $$('[data-en][data-zh]').forEach(element => { element.textContent = element.dataset[language]; });
    const toggle = $('#language-toggle');
    toggle.replaceChildren(document.createTextNode(language === 'zh' ? 'EN ' : '中文 '), Object.assign(document.createElement('span'), { textContent: '↗' }));
    toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    $('#menu-toggle').setAttribute('aria-label', translate('Toggle navigation', '展开或收起导航'));
    $('#close-dialog').setAttribute('aria-label', translate('Close figure viewer', '关闭图片查看器'));
    if (site.resources.code) {
      $('#github-resource-title').textContent = translate('Project code', '项目代码');
      $('#github-resource-description').textContent = translate('Source code and project documentation', '源代码与项目文档');
      $('.nav-github').setAttribute('aria-label', translate('Project code on GitHub', 'GitHub 项目代码'));
    }
    try { localStorage.setItem('scaledex-language', language); } catch { /* File previews can restrict storage. */ }
    selectObject(state.objectIndex);
    renderChart();
    renderTable();
  }

  initializeResources();
  const legend = $('#chart-legend');
  data.benchmark.student.forEach((row, index) => {
    const item = document.createElement('span');
    const dot = document.createElement('i');
    dot.className = 'legend-dot';
    dot.style.background = methodColors[index];
    item.append(dot, document.createTextNode(row.method));
    if (index === 4) { item.style.fontWeight = '650'; item.style.color = '#315be8'; }
    legend.append(item);
  });
  $$('[data-object]').forEach(button => button.addEventListener('click', () => selectObject(Number(button.dataset.object))));
  $$('[data-policy]').forEach(button => button.addEventListener('click', () => setPolicy(button.dataset.policy)));
  $$('[data-scale]').forEach(button => button.addEventListener('click', () => { state.scaleIndex = Number(button.dataset.scale); renderChart(); }));
  $('#language-toggle').addEventListener('click', () => setLanguage(state.language === 'en' ? 'zh' : 'en'));

  const navigation = $('#site-nav');
  const menu = $('#menu-toggle');
  const closeMenu = () => { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  $$('#site-nav a').forEach(anchor => anchor.addEventListener('click', closeMenu));
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const dialog = $('#figure-dialog');
  $$('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
    const image = $('#dialog-image');
    image.src = button.dataset.lightbox;
    image.alt = button.dataset.caption;
    $('#dialog-caption').textContent = button.dataset.caption;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });

  $('#copy-citation').addEventListener('click', async () => {
    if (!site.citation) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(site.citation);
      } else {
        const area = document.createElement('textarea');
        area.value = site.citation;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.append(area);
        area.select();
        const copied = document.execCommand('copy');
        area.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      showToast(translate('BibTeX copied', 'BibTeX 已复制'));
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('#citation-code'));
      selection.removeAllRanges();
      selection.addRange(range);
      showToast(translate('Citation selected — press Ctrl/Cmd + C', '引用已选中，请按 Ctrl/Cmd + C'));
    }
  });

  let scrollPending = false;
  const sections = $$('.section-anchor');
  function updateScrollState() {
    const total = document.documentElement.scrollHeight - innerHeight;
    $('#reading-progress').style.width = `${total > 0 ? Math.min(100, Math.max(0, scrollY / total * 100)) : 0}%`;
    let active = sections[0].id;
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 150) active = section.id; });
    $$('#site-nav a').forEach(anchor => {
      const current = anchor.getAttribute('href') === `#${active}`;
      anchor.classList.toggle('active', current);
      if (current) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScrollState); } }, { passive: true });
  addEventListener('resize', updateScrollState, { passive: true });
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('scaledex-language'); } catch { /* Keep the English default. */ }
  setLanguage(savedLanguage === 'zh' ? 'zh' : 'en');
  updateScrollState();
})();
