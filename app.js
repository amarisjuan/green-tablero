/* Tablero Comercial · Green Services. Consume la API del backend (mismo servidor). */
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const main = () => $('#contenido');
const COLORES = { 'Frecuente': '#48308A', 'Ocasional': '#2571B4', 'En riesgo': '#D69E2E', 'Frío': '#C2364A', 'Nuevo': '#00A0D2', 'Sin compras': '#A3ACB9' };
const COLOR_ALERTA = { 'Renovación vencida': '#C2364A', 'Cliente valioso en riesgo': '#D69E2E', 'Renovación próxima': '#2571B4', 'Reactivación': '#00A0D2', 'Alta probabilidad de compra': '#48308A' };
const NOMBRES_SECCION = { llamada: 'Llamada del día', resumen: 'Resumen comercial', clientes: 'Clientes y segmentos', ficha: 'Ficha del cliente', alertas: 'Alertas del mes', renovaciones: 'Renovaciones', envios: 'Envíos programados', lineas: 'Ventas por línea de negocio', subir: 'Subir datos' };
// Líneas de negocio de Green (greencss.com) y su color en las gráficas.
const COLOR_LINEA = { 'Cloud & Data Center': '#2571B4', 'Cybersecurity': '#3F2683', 'End User Solutions': '#00A0D2', 'Flex GPT': '#9B8BD6', 'Professional Services': '#5F799E', 'Sin línea asignada': '#A3ACB9' };
const ICONO_LINEA = { 'Cloud & Data Center': 'cloud', 'Cybersecurity': 'shield', 'End User Solutions': 'laptop', 'Flex GPT': 'spark', 'Professional Services': 'tool' };

// Íconos de línea (24×24), dibujados aquí para no depender de librerías externas.
const ICONOS = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  chart: '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6" rx="1"/><rect x="12" y="8" width="3" height="10" rx="1"/><rect x="17" y="5" width="3" height="13" rx="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M3 21v-5h5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  receipt: '<path d="M4 2v20l3-2 3 2 2-2 2 2 3-2 3 2V2l-3 2-3-2-2 2-2-2-3 2z"/><path d="M8 9h8M8 13h6"/>',
  pulse: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  snow: '<path d="M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  cloud: '<path d="M17.5 19H7a5 5 0 1 1 1.1-9.9A6 6 0 0 1 19.6 11 4 4 0 0 1 17.5 19z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  laptop: '<rect x="4" y="4" width="16" height="11" rx="2"/><path d="M2 20h20"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  dollar: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  wa: '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/>',
};
const ico = n => `<i data-ico="${n}"></i>`;
function pintarIconos(raiz = document) {
  raiz.querySelectorAll('i[data-ico]:not([data-listo])').forEach(i => {
    const d = ICONOS[i.dataset.ico]; if (!d) return;
    i.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    i.dataset.listo = '1';
  });
}
// Ícono y color de cada indicador, por su título.
const KPI_ESTILO = {
  'Ventas confirmadas': ['money', '#48308A'], 'Número de ventas': ['receipt', '#2571B4'], 'Clientes activos': ['users', '#48308A'],
  'Clientes en riesgo o fríos': ['snow', '#C2364A'], 'Alertas de prioridad alta': ['alert', '#D69E2E'],
  'Clientes con base instalada': ['box', '#48308A'], 'Renovaciones próximas': ['calendar', '#2571B4'], 'Coberturas vencidas': ['clock', '#C2364A'],
  'Segmento': ['target', '#48308A'], 'Ventas históricas': ['money', '#48308A'], 'Ventas 12 meses': ['chart', '#2571B4'],
  'Días sin comprar': ['clock', '#D69E2E'], 'Prob. de compra en 30 días': ['pulse', '#00A0D2'],
  'Vencidas': ['clock', '#C2364A'], 'Próximas': ['calendar', '#D69E2E'], 'Vigentes': ['check', '#48308A'],
  'Renovación vencida': ['clock', '#C2364A'], 'Cliente valioso en riesgo': ['star', '#D69E2E'], 'Renovación próxima': ['calendar', '#2571B4'],
  'Reactivación': ['refresh', '#00A0D2'], 'Próximo envío': ['send', '#48308A'], 'Modo': ['check', '#D69E2E'], 'Clientes con correo': ['mail', '#2571B4'], 'Correos enviados': ['send', '#48308A'], 'Renovaciones por cerrar': ['refresh', '#2571B4'], 'Clientes para hoy': ['phone', '#48308A'], 'Valor en juego': ['money', '#48308A'],
  'Total en pesos': ['money', '#48308A'], 'Filas con problemas': ['alert', '#C2364A'], 'Archivos subidos': ['file', '#2571B4'],
  'Clientes válidos': ['users', '#48308A'], 'Ventas válidas': ['receipt', '#48308A'], 'Productos válidos': ['box', '#2571B4'], 'Días de TRM': ['dollar', '#00A0D2'], 'Instalaciones válidas': ['box', '#5F799E'], 'Ventas en dólares': ['dollar', '#2571B4'], 'Ventas del periodo': ['receipt', '#48308A'], 'TRM promedio aplicada': ['pulse', '#00A0D2'],
  'Frecuente': ['star', COLORES['Frecuente']], 'Ocasional': ['user', COLORES['Ocasional']], 'En riesgo': ['alert', COLORES['En riesgo']],
  'Frío': ['snow', COLORES['Frío']], 'Nuevo': ['user', COLORES['Nuevo']], 'Sin compras': ['user', COLORES['Sin compras']],
};
function iniciales(nombre) {
  const n = String(nombre || '?'), num = /(\d+)\s*$/.exec(n);
  if (/^cliente de prueba/i.test(n) && num) return num[1];
  return n.split(/\s+/).filter(Boolean).map(p => p[0]).join('').slice(0, 2).toUpperCase();
}
const TIPOS_ALERTA = ['Renovación vencida', 'Cliente valioso en riesgo', 'Renovación próxima', 'Reactivación'];
let graficas = [];
let cache = {};

// ------------------------------------------------------------------ utilidades
// VERSIÓN DE DEMOSTRACIÓN (Netlify): lee respuestas ya calculadas en /datos. No guarda ni envía nada.
const AVISO_DEMO = 'Versión de demostración: aquí no se guarda ni se envía nada. Funciona completo en el tablero instalado en el computador.';
function rutaDemo(ruta) {
  const u = new URL(ruta, location.origin), p = u.pathname.replace(/^\/api\//, ''), q = u.searchParams;
  if (p === 'llamada-del-dia') return 'datos/llamada/' + (parseInt(q.get('desde'), 10) || 0) + '.json';
  if (p.startsWith('clientes/')) return 'datos/clientes/' + encodeURIComponent(decodeURIComponent(p.slice(9)).toUpperCase()) + '.json';
  return 'datos/' + p.replace(/\//g, '-') + '.json';
}
async function api(ruta, opciones = {}) {
  if (opciones.method && opciones.method !== 'GET') { const e = new Error(AVISO_DEMO); e.status = 0; throw e; }
  const r = await fetch(rutaDemo(ruta));
  if (r.status === 404 && /\/api\/clientes\//.test(ruta)) { const e = new Error('Cliente no encontrado'); e.status = 404; throw e; }
  if (/\/api\/llamada-del-dia/.test(ruta) && r.status === 404) return [];
  if (!r.ok) { const e = new Error('Error ' + r.status); e.status = r.status; throw e; }
  return r.json();
}
async function dato(clave, ruta) {
  if (!(clave in cache)) cache[clave] = await api(ruta);
  return cache[clave];
}
function limpiarCache() { cache = {}; }

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtNum = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });
const fmtCop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const pesos = x => x == null ? '—' : fmtCop.format(x);
function pesosCorto(x) {
  if (x == null) return '—';
  const a = Math.abs(x);
  if (a >= 1e9) return '$' + (x / 1e9).toLocaleString('es-CO', { maximumFractionDigits: 2 }) + ' mil M';
  if (a >= 1e6) return '$' + (x / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 1 }) + ' M';
  return pesos(x);
}
const pct = (x, d = 0) => x == null ? '—' : (x * 100).toLocaleString('es-CO', { maximumFractionDigits: d }) + ' %';
function fecha(s) { if (!s) return '—'; const [y, m, d] = String(s).slice(0, 10).split('-'); return `${d}/${m}/${y}`; }
const chip = (txt, clase) => `<span class="chip ${esc(String(clase ?? txt).replace(/\s/g, ''))}">${esc(txt)}</span>`;
const si = b => b ? 'Sí' : 'No';

function toast(msg, ms = 4000) {
  const t = $('#toast'); t.textContent = msg; t.style.display = 'block';
  clearTimeout(toast._t); toast._t = setTimeout(() => (t.style.display = 'none'), ms);
}
function hero(titulo, sub, etiqueta) {
  return `<div class="hero">${etiqueta ? `<span class="etiqueta">${esc(etiqueta)}</span>` : ''}<h1>${esc(titulo)}</h1><p>${esc(sub)}</p></div>`;
}
function kpi(t, v, n) {
  const [ic, tono] = KPI_ESTILO[t] || ['chart', '#48308A'];
  return `<div class="kpi" style="--tono:${tono}"><div class="cab"><div class="t">${esc(t)}</div><span class="ico">${ico(ic)}</span></div>
    <div class="v">${v}</div>${n ? `<div class="n">${n}</div>` : ''}</div>`;
}

function tabla(columnas, filas, alClic) {
  const cab = columnas.map(c => `<th class="${c.num ? 'num' : ''}">${esc(c.t)}</th>`).join('');
  const cuerpo = filas.length ? filas.map((f, i) => `<tr class="${alClic ? 'click' : ''}" data-i="${i}">` +
    columnas.map(c => `<td class="${c.num ? 'num' : ''}">${c.f ? c.f(f) : esc(f[c.k])}</td>`).join('') + '</tr>').join('')
    : `<tr><td colspan="${columnas.length}" style="text-align:center;color:#888;padding:20px">Sin registros con estos filtros</td></tr>`;
  const id = 't' + Math.random().toString(36).slice(2);
  setTimeout(() => {
    if (!alClic) return;
    const t = document.getElementById(id);
    if (t) t.addEventListener('click', e => { const tr = e.target.closest('tr[data-i]'); if (tr) alClic(filas[+tr.dataset.i]); });
  });
  return `<div class="tabla-env"><table id="${id}"><thead><tr>${cab}</tr></thead><tbody>${cuerpo}</tbody></table></div>`;
}

let estiloGraficas = false;
function grafica(id, config) {
  if (!window.Chart) { const el = document.getElementById(id); if (el) el.parentElement.innerHTML = '<p class="sub">Las gráficas necesitan internet para cargar la librería.</p>'; return; }
  if (!estiloGraficas) {
    estiloGraficas = true;
    const d = Chart.defaults;
    d.font.family = 'Inter, Segoe UI, Arial, sans-serif'; d.font.size = 12; d.color = '#5B6675'; d.borderColor = '#EEF1F4';
    d.plugins.legend.labels.usePointStyle = true; d.plugins.legend.labels.pointStyle = 'circle'; d.plugins.legend.labels.boxWidth = 8; d.plugins.legend.labels.boxHeight = 8;
    d.plugins.legend.labels.padding = 16;
    Object.assign(d.plugins.tooltip, { backgroundColor: '#22134F', titleColor: '#fff', bodyColor: '#E6E2F3', padding: 12, cornerRadius: 10,
      titleFont: { weight: '700', family: 'Montserrat, Inter, sans-serif' }, displayColors: true, boxPadding: 4 });
    d.datasets.bar.maxBarThickness = 34; d.datasets.bar.borderRadius = 6; d.datasets.bar.borderSkipped = false;
    d.elements.arc.borderWidth = 3; d.elements.arc.borderColor = '#fff'; d.elements.point.radius = 5; d.elements.point.hoverRadius = 7;
    d.scale.grid.drawTicks = false; d.scale.border = { display: false }; d.scale.ticks.padding = 8;
  }
  graficas.push(new Chart(document.getElementById(id), config));
}
// Texto en el centro de las donas.
const textoCentro = (titulo, valor) => ({ id: 'centro', afterDraw(c) {
  const { ctx, chartArea: a } = c; const x = (a.left + a.right) / 2, y = (a.top + a.bottom) / 2;
  ctx.save(); ctx.textAlign = 'center'; ctx.fillStyle = '#22134F'; ctx.font = '800 30px Montserrat, Inter, sans-serif';
  const hueco = (c.getDatasetMeta(0).data[0]?.innerRadius || 80) * 1.6, ancho = ctx.measureText(valor).width;
  if (ancho > hueco) ctx.font = `800 ${Math.max(14, Math.floor(30 * hueco / ancho))}px Montserrat, Inter, sans-serif`; ctx.fillText(valor, x, y + 6);
  ctx.fillStyle = '#8A94A3'; ctx.font = '600 11px Inter, sans-serif'; ctx.fillText(titulo.toUpperCase(), x, y + 26); ctx.restore(); } });
function degradado(id, c1, c2) {
  const cv = document.getElementById(id); if (!cv) return c1;
  const g = cv.getContext('2d').createLinearGradient(0, 0, 0, cv.parentElement.clientHeight || 300); g.addColorStop(0, c1); g.addColorStop(1, c2); return g;
}

function descargarCsv(nombre, columnas, filas) {
  const linea = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const txt = '﻿' + [columnas.map(c => linea(c.t)).join(';'),
    ...filas.map(f => columnas.map(c => linea(c.csv ? c.csv(f) : f[c.k])).join(';'))].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([txt], { type: 'text/csv;charset=utf-8' }));
  a.download = nombre; a.click();
}

function opciones(valores, actual, todas = 'Todos') {
  return `<option value="">${todas}</option>` + valores.map(v => `<option ${v === actual ? 'selected' : ''}>${esc(v)}</option>`).join('');
}
const unicos = (lista, k) => [...new Set(lista.map(x => x[k]).filter(Boolean))].sort();

// ------------------------------------------------------------------ navegación
const secciones = { llamada, resumen, lineas, clientes, ficha, alertas, renovaciones, envios, subir };

async function navegar() {
  const [sec, arg] = (location.hash.slice(1) || 'llamada').split('/');
  const activa = secciones[sec] ? sec : 'llamada';
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('activo', a.dataset.sec === activa));
  $('#barraSeccion').textContent = NOMBRES_SECCION[activa];
  document.title = NOMBRES_SECCION[activa] + ' · Green Services';
  $('#menu').classList.remove('abierto'); $('#velo').classList.remove('visible');
  graficas.forEach(g => g.destroy()); graficas = [];
  main().innerHTML = '<div class="cargando"><span class="giro"></span>Cargando…</div>';
  try {
    await (secciones[sec] || llamada)(arg && decodeURIComponent(arg));
  } catch (e) {
    if (e.status === 503) return sinDatos(e.message);
    main().innerHTML = hero('Algo salió mal', 'No se pudo consultar el backend.') + `<div class="nota error">${esc(e.message)}</div>`;
  }
  window.scrollTo(0, 0);
}

async function pieMenu() {
  try {
    const p = await dato('parametros', '/api/parametros');
    $('#corteMenu').innerHTML = `Corte de datos: <b>${fecha(p.fechaCorte)}</b><br>Frío: ${p.frioDiasSinCompra} días · Frecuente: ${p.frecuenteMinTransacciones}+ compras<br>Renovación: ${p.renovacionDias} días`;
    $('#pildoraCorte').textContent = 'Corte ' + fecha(p.fechaCorte);
  } catch { $('#corteMenu').textContent = 'Sin datos cargados'; $('#pildoraCorte').textContent = 'Sin datos'; }
}

function sinDatos(msg) {
  main().innerHTML = hero('Bienvenido', 'Todavía no hay datos en la base. Cargue el paquete oficial del reto para empezar.', 'Primer uso') +
    `<div class="nota alerta">${esc(msg)}</div>
     <div class="tarjeta"><h2>Cargar el paquete oficial</h2>
     <p class="sub">Lee los clientes, productos, ventas y base instalada del reto y los guarda en la base de datos.</p>
     <button id="btnPrimera">Cargar datos ahora</button></div>`;
  $('#btnPrimera').onclick = () => cargarPaquete($('#btnPrimera'));
}

// ------------------------------------------------------------------ LLAMADA DEL DÍA
const CHIP_RAZON = { 'Renovación vencida': 'Alta', 'Cliente valioso en riesgo': 'Enriesgo', 'Renovación próxima': 'Ocasional',
  'Alta probabilidad de compra': 'Frecuente', 'Reactivación': 'Nuevo' };
async function llamada(arg) {
  const desde = Math.max(0, parseInt(arg, 10) || 0);
  const lista = await api(`/api/llamada-del-dia?cantidad=5&desde=${desde}`);
  const hoy = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
  const total = lista.reduce((a, x) => a + (x.valorEnJuegoCop || 0), 0);
  const renov = lista.filter(x => /Renovación/.test(x.razon)).length;
  main().innerHTML = hero('Llamada del día', `${hoy.charAt(0).toUpperCase() + hoy.slice(1)}. Estos son los clientes a llamar primero, por qué y qué ofrecerles. Cada uno trae el mensaje listo para WhatsApp, correo o llamada.`, 'Agenda comercial') +
    (lista.length ? `<div class="kpis">
        ${kpi('Clientes para hoy', lista.length, desde ? `Del ${desde + 1} al ${desde + lista.length} de la lista` : 'Los de mayor prioridad')}
        ${kpi('Valor en juego', pesosCorto(total), pesos(total))}
        ${kpi('Renovaciones por cerrar', renov, 'Vencidas o por vencer en esta lista')}
      </div>
      <div class="llamadas">${lista.map(x => `
      <div class="tarjeta llamada" style="--tono:${COLOR_ALERTA[x.razon] || '#48308A'}">
        <div class="llamada-cab"><span class="avatar">${esc(iniciales(x.nombre))}<small>${x.posicion}</small></span>
          <div><h2><a href="#ficha/${esc(x.clienteId)}">${esc(x.nombre)}</a></h2>
          <span class="sub">${esc(x.clienteId)} · ${esc(x.ciudad || '')} · ${esc(x.sector || '')} · prefiere ${esc((x.canalPreferido || '—').toLowerCase())}</span></div>
          ${chip(x.razon, CHIP_RAZON[x.razon] || x.prioridad)}</div>
        <div class="llamada-cuerpo">
          <div><div class="t">Por qué llamar</div><div>${esc(x.porQue)}</div></div>
          <div><div class="t">Qué ofrecerle</div><div><b>${esc(x.oferta)}</b></div><div class="sub">${esc(x.porQueOferta)}</div></div>
          <div><div class="t">Valor en juego</div><div class="grande">${pesos(x.valorEnJuegoCop)}</div>${x.probabilidadCompra != null ? `<div class="sub">Probabilidad de compra en 30 días: <b>${pct(x.probabilidadCompra)}</b></div><div class="barra-prob"><span style="width:${Math.round(x.probabilidadCompra * 100)}%"></span></div>` : ''}</div>
        </div>
        <div class="canales" data-pos="${x.posicion}">${CANALES.map(k => `<button class="canal${k === canalInicial(x) ? ' activo' : ''}" data-canal="${k}">${ico(CANAL_INFO[k].ico)}${CANAL_INFO[k].nombre}${k === canalInicial(x) ? '<em>preferido</em>' : ''}</button>`).join('')}</div>
        <div class="canal-cuerpo" id="canal-${x.posicion}">${cuerpoCanal(x, canalInicial(x))}</div>
      </div>`).join('')}</div>` : `<div class="nota">No quedan más clientes en la lista de hoy.</div>`) +
    `<div class="llamada-botones">
      ${desde > 0 ? `<a class="boton sec" href="#llamada/${Math.max(0, desde - 5)}">Anteriores 5</a>` : ''}
      ${lista.length === 5 ? `<a class="boton" href="#llamada/${desde + 5}">Siguientes 5 clientes${ico('arrow')}</a>` : ''}
      <a class="boton sec" href="#envios">${ico('send')}Enviar los correos del día</a></div>
    <div class="nota"><b>Cómo se eligen:</b> primero renovaciones vencidas, luego clientes valiosos que se están enfriando, renovaciones próximas, clientes con alta probabilidad de compra según el modelo y clientes fríos con buen historial. Se toma el mejor de cada grupo para que la lista mezcle razones. Es una sugerencia para revisar, no una venta asegurada. Cada cliente se abre en su canal preferido; puede cambiar a WhatsApp, correo o llamada, o copiar el texto para Teams, LinkedIn o cualquier otro medio.</div>`;
  main().onclick = async e => {
    const tab = e.target.closest('.canal');
    if (tab) {
      const caja = tab.parentElement, x = lista.find(y => String(y.posicion) === caja.dataset.pos);
      caja.querySelectorAll('.canal').forEach(b => b.classList.toggle('activo', b === tab));
      $('#canal-' + x.posicion).innerHTML = cuerpoCanal(x, tab.dataset.canal); pintarIconos(main());
      return;
    }
    const cp = e.target.closest('[data-copiar]');
    if (cp) {
      const [pos, canal] = cp.dataset.copiar.split('|'), x = lista.find(y => String(y.posicion) === pos);
      const texto = canal === 'correo' ? x.asuntoCorreo + '\n\n' + x.mensajeCorreo : canal === 'llamada' ? x.guionLlamada : x.mensajeWhatsapp;
      try { await navigator.clipboard.writeText(texto); toast('Copiado. Péguelo en Teams, LinkedIn, SMS o el canal que use.'); }
      catch { toast('No se pudo copiar. Seleccione el texto y cópielo a mano.'); }
    }
  };
}
const CANALES = ['whatsapp', 'correo', 'llamada'];
const CANAL_INFO = { whatsapp: { nombre: 'WhatsApp', ico: 'wa' }, correo: { nombre: 'Correo', ico: 'mail' }, llamada: { nombre: 'Llamada', ico: 'phone' } };
const canalInicial = x => /correo/i.test(x.canalPreferido || '') ? 'correo' : /llamada|tel/i.test(x.canalPreferido || '') ? 'llamada' : 'whatsapp';
function cuerpoCanal(x, canal) {
  const ficha = `<a class="boton sec" href="#ficha/${esc(x.clienteId)}">${ico('user')}Ver ficha</a>`;
  const copiar = t => `<button class="sec" data-copiar="${x.posicion}|${canal}">${ico('copy')}${t}</button>`;
  if (canal === 'correo') return `<div class="mensaje correo"><div class="asunto">Asunto: <b>${esc(x.asuntoCorreo)}</b></div>${esc(x.mensajeCorreo)}</div>
    <div class="llamada-botones"><a class="boton" href="${esc(x.enlaceCorreo)}">${ico('mail')}Abrir en el correo</a><a class="boton sec" href="#envios">${ico('send')}Ver correo con diseño y enviar</a>${copiar('Copiar texto')}</div>
    ${x.correo ? `<p class="sub nota-canal">Correo del cliente: <b>${esc(x.correo)}</b></p>` : '<p class="sub nota-canal">Este cliente aún no tiene correo registrado. Agréguelo en Envíos programados.</p>'}`;
  if (canal === 'llamada') return `<div class="mensaje guion">${esc(x.guionLlamada)}</div>
    <div class="llamada-botones">${x.telefono ? `<a class="boton" href="tel:${esc(x.telefono)}">${ico('phone')}Llamar ${esc(x.telefono)}</a>` : ''}${copiar('Copiar guion')}${ficha}</div>
    ${x.telefono ? '' : '<p class="sub nota-canal">Los datos no traen el teléfono del cliente: use el guion con el número de su agenda.</p>'}`;
  return `<div class="mensaje">${esc(x.mensajeWhatsapp)}</div>
    <div class="llamada-botones"><a class="boton wa" href="${esc(x.enlaceWhatsapp)}" target="_blank" rel="noopener">${ico('wa')}Enviar por WhatsApp</a>${copiar('Copiar para otro canal')}${ficha}</div>`;
}

// ------------------------------------------------------------------ ENVÍOS PROGRAMADOS
const NOMBRE_DIA = { LUN: 'Lun', MAR: 'Mar', MIE: 'Mié', JUE: 'Jue', VIE: 'Vie', SAB: 'Sáb', DOM: 'Dom' };
function fechaHora(s) { if (!s) return '—'; const d = new Date(s); return d.toLocaleString('es-CO', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }
function proximoTexto(s) { if (!s) return '—'; const [f, h] = String(s).split('T'); const d = new Date(f + 'T12:00:00');
  return d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/\./g, '') + ' · ' + (h || '').slice(0, 5); }
async function envios() {
  const [e, hist, dest] = await Promise.all([api('/api/envios/estado'), api('/api/envios/historial'), api('/api/envios/destinatarios')]);
  const c = e.config, f = envios.borrador = { ...c, diasSemana: [...c.diasSemana], fechas: [...c.fechas], hora: String(c.hora).slice(0, 5) };
  const enviados = hist.filter(h => h.estado === 'ENVIADO').length;
  main().innerHTML = hero('Envíos programados', 'Los mensajes de la Llamada del día salen solos por correo, con el diseño de Green Services, en los días y la hora que usted elija. Empiece en modo prueba: todo le llega a usted.', 'Automatización') +
    `<div class="nota alerta"><b>Versión de demostración.</b> Puede ver el calendario, los días y la vista previa del correo, pero desde esta página no se guardan cambios ni se envían correos. Eso funciona en el tablero instalado en el computador de Green Services.</div>` +
    `<div class="kpis">
      ${kpi('Próximo envío', c.activo ? (e.proximoEnvio ? proximoTexto(e.proximoEnvio) : 'Sin fechas') : 'Apagado', c.activo ? `${c.cantidad} clientes · hora de ${esc(e.zona.replace('America/', ''))}` : 'Active el calendario para programar')}
      ${kpi('Modo', c.modo === 'REAL' ? 'Real' : 'Prueba', c.modo === 'REAL' ? 'Llega a los clientes' : 'Todo llega a ' + esc(c.correoPrueba || 'su correo de prueba'))}
      ${kpi('Clientes con correo', e.clientesConCorreo, 'Sin correo no se les envía')}
      ${kpi('Correos enviados', enviados, `De los últimos ${hist.length} registros`)}
    </div>
    <div class="grid2b">
      <div class="tarjeta"><h2>Calendario</h2><p class="sub">Escoja los días de la semana, o fechas puntuales, en que quiere que salgan los correos.</p>
        <label class="interruptor"><input type="checkbox" id="eAct" ${c.activo ? 'checked' : ''}><span></span><b>Envío automático ${c.activo ? 'encendido' : 'apagado'}</b></label>
        <div class="campo"><div class="t">Días de la semana</div><div class="dias">${Object.keys(NOMBRE_DIA).map(d => `<button class="dia${f.diasSemana.includes(d) ? ' activo' : ''}" data-dia="${d}">${NOMBRE_DIA[d]}</button>`).join('')}</div></div>
        <div class="campo"><div class="t">Fechas puntuales</div><div class="fechas" id="eFechas"></div>
          <div class="filtros" style="margin:8px 0 0"><input type="date" id="eFecha"><button class="sec" id="eAgregar">Agregar fecha</button></div></div>
        <div class="filtros">
          <label>Hora<input type="time" id="eHora" value="${esc(f.hora)}"></label>
          <label>Clientes por envío<input type="number" min="1" max="50" id="eCant" value="${c.cantidad}"></label></div>
        <div class="campo"><div class="t">Modo</div>
          <label class="opcion"><input type="radio" name="eModo" value="PRUEBA" ${c.modo !== 'REAL' ? 'checked' : ''}> <b>Prueba</b>: todos los correos le llegan a usted, con un aviso de prueba.</label>
          <label class="opcion"><input type="radio" name="eModo" value="REAL" ${c.modo === 'REAL' ? 'checked' : ''}> <b>Real</b>: cada cliente recibe su correo (solo los que tienen correo registrado).</label>
          <label style="display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--suave);font-weight:600;margin-top:10px">Su correo para las pruebas<input type="email" id="eCorreo" placeholder="usted@empresa.com" value="${esc(c.correoPrueba || '')}"></label></div>
        <button id="eGuardar">${ico('check')}Guardar calendario</button>
      </div>
      <div>
        <div class="tarjeta"><h2>Enviar ahora</h2><p class="sub">Manda ya los correos de los ${c.cantidad} clientes de la Llamada del día, sin esperar al calendario.</p>
          <button id="eEnviar">${ico('send')}Enviar los correos del día (${c.modo === 'REAL' ? 'real' : 'prueba'})</button>
          <div id="eRes"></div></div>
        <div class="tarjeta"><h2>Vista previa del correo</h2><p class="sub">Así lo ve el cliente en Gmail, Outlook o el celular.</p>
          <div class="filtros"><label>Cliente<select id="ePrev">${dest.map(d => `<option value="${d.posicion}">${d.posicion}. ${esc(d.nombre)} · ${esc(d.razon)}</option>`).join('')}</select></label></div>
          <iframe class="vista-correo" id="eFrame" src="datos/correo/1.html" title="Vista previa del correo"></iframe></div>
      </div>
    </div>
    <div class="tarjeta"><h2>Correo de cada cliente</h2><p class="sub">Los datos del reto no traen correos. Escríbalos aquí para que el envío real les llegue; se guardan aunque se recarguen los datos.</p>
      ${tabla([{ t: 'Cliente', f: d => `<b>${d.posicion}. ${esc(d.clienteId)}</b><br><span class="sub">${esc(d.nombre)}</span>` },
        { t: 'Razón', f: d => chip(d.razon, CHIP_RAZON[d.razon]) },
        { t: 'Correo de contacto', f: d => `<div class="fila-correo"><input type="email" data-correo="${esc(d.clienteId)}" value="${esc(d.correo || '')}" placeholder="contacto@cliente.com"><button class="sec" data-guardar="${esc(d.clienteId)}">Guardar</button></div>` }], dest)}</div>
    <div class="tarjeta"><h2>Historial de envíos</h2><p class="sub">Cada correo intentado, con su resultado.</p>
      ${tabla([{ t: 'Fecha', f: h => fechaHora(h.fecha) }, { t: 'Origen', f: h => h.origen === 'PROGRAMADO' ? 'Calendario' : 'Manual' },
        { t: 'Modo', f: h => h.modo === 'REAL' ? chip('Real', 'Frecuente') : chip('Prueba', 'Sincompras') }, { t: 'Cliente', k: 'cliente_id' },
        { t: 'Para', f: h => esc(h.destinatario || '—') }, { t: 'Asunto', k: 'asunto' },
        { t: 'Estado', f: h => chip({ ENVIADO: 'Enviado', FALLIDO: 'Falló', OMITIDO: 'Omitido' }[h.estado], { ENVIADO: 'VIGENTE', FALLIDO: 'VENCIDA', OMITIDO: 'Sincompras' }[h.estado]) },
        { t: 'Detalle', f: h => esc(h.detalle || '') }], hist)}</div>`;
  const pintarFechas = () => { $('#eFechas').innerHTML = f.fechas.length ? f.fechas.map(x => `<span class="chip Ocasional">${fecha(x)} <a href="#" data-quitar="${x}" title="Quitar">×</a></span>`).join('') : '<span class="sub">Ninguna</span>'; };
  pintarFechas();
  const leer = () => ({ activo: $('#eAct').checked, modo: document.querySelector('[name=eModo]:checked').value, correoPrueba: $('#eCorreo').value.trim() || null,
    diasSemana: f.diasSemana, fechas: f.fechas, hora: $('#eHora').value || '08:00', cantidad: +$('#eCant').value || 5 });
  main().onclick = async ev => {
    const d = ev.target.closest('[data-dia]');
    if (d) { const k = d.dataset.dia; f.diasSemana = f.diasSemana.includes(k) ? f.diasSemana.filter(x => x !== k) : [...f.diasSemana, k]; d.classList.toggle('activo'); return; }
    const q = ev.target.closest('[data-quitar]');
    if (q) { ev.preventDefault(); f.fechas = f.fechas.filter(x => x !== q.dataset.quitar); pintarFechas(); return; }
    const g = ev.target.closest('[data-guardar]');
    if (g) {
      const id = g.dataset.guardar, correo = main().querySelector(`[data-correo="${id}"]`).value.trim();
      try { await api('/api/envios/contactos/' + encodeURIComponent(id), { method: 'PUT', body: JSON.stringify({ correo: correo || null }) }); toast(correo ? `Correo de ${id} guardado.` : `Correo de ${id} borrado.`); }
      catch (err) { toast(err.message, 7000); }
    }
  };
  $('#eAgregar').onclick = () => { const v = $('#eFecha').value; if (v && !f.fechas.includes(v)) { f.fechas = [...f.fechas, v].sort(); pintarFechas(); } };
  $('#eAct').onchange = ev => { ev.target.parentElement.querySelector('b').textContent = 'Envío automático ' + (ev.target.checked ? 'encendido' : 'apagado'); };
  $('#ePrev').onchange = ev => { $('#eFrame').src = 'datos/correo/' + ev.target.value + '.html'; };
  $('#eGuardar').onclick = async () => {
    const body = leer();
    if (false && !confirm('El modo REAL con envío automático manda correos a los clientes en las fechas programadas. ¿Continuar?')) return;
    try { await api('/api/envios/config', { method: 'PUT', body: JSON.stringify(body) }); toast('Calendario guardado.'); envios(); }
    catch (err) { toast(err.message, 7000); }
  };
  $('#eEnviar').onclick = async ev => {
    const real = c.modo === 'REAL';
    if (false && !confirm(`Se enviarán correos REALES a los clientes del día que tengan correo registrado. ¿Enviar ahora?`)) return;
    ev.target.disabled = true;
    try {
      const r = await api('/api/envios/enviar', { method: 'POST', body: JSON.stringify({ confirmarReal: real }) });
      $('#eRes').innerHTML = `<div class="nota" style="margin:14px 0 0"><b>${r.enviados} enviados</b> · ${r.omitidos} sin correo · ${r.fallidos} fallidos<br><span class="sub">${r.detalle.map(esc).join('<br>')}</span></div>`;
      toast('Envío terminado.');
    } catch (err) { toast(err.message, 7000); } finally { ev.target.disabled = false; }
  };
}

// ------------------------------------------------------------------ RESUMEN
async function resumen() {
  const [r, inf, al] = await Promise.all([dato('resumen', '/api/resumen'), dato('lineas', '/api/ventas/lineas'), dato('alertas', '/api/alertas')]);
  const nombresLinea = inf.lineas.map(l => l.linea);
  const t = r.totales, s = r.segmentos;
  const activos = (s['Frecuente'] || 0) + (s['Ocasional'] || 0) + (s['Nuevo'] || 0);
  main().innerHTML = hero('Resumen comercial',
      `Cómo van las ventas y los clientes al corte del ${fecha(t.fechaCorte)}. Solo ventas confirmadas, en pesos.`, 'Vista ejecutiva') +
    `<div class="kpis">
      ${kpi('Ventas confirmadas', pesosCorto(t.ingresoCop), pesos(t.ingresoCop))}
      ${kpi('Número de ventas', fmtNum.format(t.transaccionesConfirmadas), 'Anuladas excluidas')}
      ${kpi('Clientes activos', activos, `De ${t.clientes} clientes`)}
      ${kpi('Clientes en riesgo o fríos', (s['En riesgo'] || 0) + (s['Frío'] || 0), `${t.clientesFrios} fríos (≥ ${(cache.parametros || {}).frioDiasSinCompra || 90} días)`)}
      ${kpi('Alertas de prioridad alta', al.filter(a => a.prioridad === 'Alta').length, `${al.length} alertas en total`)}
    </div>
    <div class="grid2">
      <div class="tarjeta"><h2>Ventas por mes y línea de negocio</h2><p class="sub">Ventas confirmadas de cada mes, en pesos, separadas por línea. <a href="#lineas">Ver el detalle</a></p><div class="grafica"><canvas id="gMes"></canvas></div></div>
      <div class="tarjeta"><h2>Clientes por segmento</h2><p class="sub">Según días sin comprar, antigüedad y frecuencia.</p><div class="grafica"><canvas id="gSeg"></canvas></div></div>
    </div>
    ${tarjetaPronostico(inf.pronostico)}
    <div class="grid2b">
      <div class="tarjeta"><h2>Alertas del mes por tipo</h2><p class="sub">A quién llamar y por qué. <a href="#alertas">Ver la lista</a></p><div class="grafica"><canvas id="gAl"></canvas></div></div>
      <div class="tarjeta"><h2>Oportunidades de renovación</h2><p class="sub">Clientes con equipos o servicios instalados que hay que renovar. <a href="#renovaciones">Ver renovaciones</a></p>
        <div class="kpis" style="margin:0">
          ${kpi('Clientes con base instalada', r.clientesConBaseInstalada)}
          ${kpi('Renovaciones próximas', t.renovacionesProximas, `Vencen en ≤ ${(cache.parametros || {}).renovacionDias || 45} días`)}
          ${kpi('Coberturas vencidas', t.coberturasVencidas, 'Todas las instalaciones')}
        </div></div>
    </div>
    <div class="tarjeta"><h2>¿Cómo está la cartera de clientes?</h2><p class="sub">Segmentos del informe de la data: por días sin comprar, antigüedad y frecuencia. <a href="#clientes">Ver clientes</a></p>
      ${tabla([{ t: 'Segmento', f: x => chip(x.segmento) }, { t: 'Clientes', k: 'clientes', num: 1 },
        { t: 'Ventas 12 m', f: x => x.ventas12mCop > 0 ? pesosCorto(x.ventas12mCop) : '—', num: 1 },
        { t: 'Ventas históricas', f: x => x.ventasHistoricasCop > 0 ? pesosCorto(x.ventasHistoricasCop) : '—', num: 1 },
        { t: 'Días sin comprar (mediana)', f: x => x.medianaDiasSinComprar != null ? Math.round(x.medianaDiasSinComprar) : '—', num: 1 }], r.cartera)}</div>
    <p class="sub">${esc(r.aclaracion)}</p>`;
  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  grafica('gMes', { type: 'bar', data: { labels: inf.mensual.map(m => MESES[+m.mes.slice(5, 7) - 1] + ' ' + m.mes.slice(2, 4)),
      datasets: nombresLinea.map(l => ({ label: l, data: inf.mensual.map(m => m.copPorLinea[l] || 0), backgroundColor: COLOR_LINEA[l] || '#999', borderRadius: 0, maxBarThickness: 30 })) },
    options: { maintainAspectRatio: false, scales: { x: { stacked: true, grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, autoSkipPadding: 10 } },
      y: { stacked: true, ticks: { callback: v => pesosCorto(v), maxTicksLimit: 6 } } },
      plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', callbacks: { label: c => `${c.dataset.label}: ${pesos(c.raw)}`,
        footer: it => 'Total: ' + pesos(it.reduce((a, c) => a + c.raw, 0)) } } } } });
  activarPronostico(inf.pronostico);
  const segs = Object.keys(s);
  grafica('gSeg', { type: 'doughnut', data: { labels: segs, datasets: [{ data: segs.map(k => s[k]), backgroundColor: segs.map(k => COLORES[k] || '#999'), hoverOffset: 6 }] },
    options: { maintainAspectRatio: false, cutout: '72%', plugins: { legend: { position: 'bottom' } } }, plugins: [textoCentro('clientes', segs.reduce((a, k) => a + s[k], 0))] });
  const tipos = TIPOS_ALERTA.filter(k => r.alertasPorTipo[k]);
  grafica('gAl', { type: 'bar', data: { labels: tipos, datasets: [{ data: tipos.map(k => r.alertasPorTipo[k]), backgroundColor: tipos.map(k => COLOR_ALERTA[k]) }] },
    options: { indexAxis: 'y', maintainAspectRatio: false, scales: { y: { grid: { display: false } } }, plugins: { legend: { display: false } } } });
}

// ------------------------------------------------------------------ PRONÓSTICO POR LÍNEA (Resumen comercial)
const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const etiquetaMes = m => MESES_CORTOS[+m.slice(5, 7) - 1] + ' ' + m.slice(2, 4);
function tarjetaPronostico(pr) {
  if (!pr || !pr.series || !pr.series.length) return '';
  const cambio = s => s.ultimos12m > 0 ? (s.proximos12m / s.ultimos12m - 1) : null;
  return `<div class="tarjeta"><h2>Pronóstico de ventas por línea · próximos 12 meses</h2>
    <p class="sub">Línea continua: lo que se vendió. Línea punteada: lo que probablemente se venda. La franja muestra el rango probable (80 %).</p>
    <div class="selector-linea" id="selPron">${pr.series.map((s, i) => `<button class="${i === pr.series.length - 1 ? 'activo' : ''}" data-i="${i}" style="--tono:${COLOR_LINEA[s.linea] || '#22134F'}">${esc(s.linea)}</button>`).join('')}</div>
    <div class="grafica alta"><canvas id="gPron"></canvas></div>
    ${tabla([
      { t: 'Línea', f: s => s.linea === 'Total' ? '<b>Total</b>' : `<span class="linea" style="--tono:${COLOR_LINEA[s.linea]}">${esc(s.linea)}</span>` },
      { t: 'Últimos 12 meses', f: s => pesosCorto(s.ultimos12m), num: 1 },
      { t: 'Próximos 12 meses (pronóstico)', f: s => `<b>${pesosCorto(s.proximos12m)}</b>`, num: 1 },
      { t: 'Cambio', f: s => { const c = cambio(s); return c == null ? '—' : `<span class="${c >= 0 ? 'ok' : 'mal'}">${c >= 0 ? '▲' : '▼'} ${pct(Math.abs(c))}</span>`; }, num: 1 },
      { t: 'Método elegido', k: 'metodo' },
      { t: 'Error en la prueba', f: s => s.errorPrueba == null ? '—' : pct(s.errorPrueba), num: 1 },
    ], pr.series)}
    <div class="nota alerta" style="margin:16px 0 0"><b>Cómo leerlo:</b> ${esc(pr.metodo)} «Error en la prueba» es cuánto se equivocó, en promedio, al pronosticar los últimos 6 meses sin verlos. ${esc(pr.aclaracion)}</div></div>`;
}
function activarPronostico(pr) {
  if (!pr || !pr.series || !pr.series.length) return;
  let g = null;
  const dibujar = i => {
    const s = pr.series[i], color = COLOR_LINEA[s.linea] || '#22134F';
    const labels = s.puntos.map(p => etiquetaMes(p.mes));
    const ultimoReal = s.puntos.map(p => p.real != null).lastIndexOf(true);
    const real = s.puntos.map(p => p.real);
    const pron = s.puntos.map((p, k) => k === ultimoReal ? p.real : p.pronostico);
    const max = s.puntos.map((p, k) => k === ultimoReal ? p.real : p.maximo);
    const min = s.puntos.map((p, k) => k === ultimoReal ? p.real : p.minimo);
    const cfg = { type: 'line', data: { labels, datasets: [
        { label: 'Rango alto', data: max, borderWidth: 0, pointRadius: 0, backgroundColor: color + '26', fill: '+1' },
        { label: 'Rango bajo', data: min, borderWidth: 0, pointRadius: 0, backgroundColor: color + '26', fill: false },
        { label: 'Ventas reales', data: real, borderColor: color, backgroundColor: color, borderWidth: 2.5, pointRadius: 2.5, tension: .25 },
        { label: 'Pronóstico', data: pron, borderColor: color, backgroundColor: color, borderWidth: 2.5, borderDash: [7, 5], pointRadius: 2.5, pointStyle: 'rectRot', tension: .25 }] },
      options: { maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, spanGaps: false,
        scales: { x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, autoSkipPadding: 12 } }, y: { beginAtZero: true, ticks: { callback: v => pesosCorto(v), maxTicksLimit: 6 } } },
        plugins: { legend: { position: 'bottom', labels: { filter: it => !it.text.startsWith('Rango') } },
          tooltip: { filter: it => it.raw != null && !(it.datasetIndex < 2 && it.dataIndex === ultimoReal) && !(it.datasetIndex === 3 && it.dataIndex === ultimoReal),
            callbacks: { label: c => `${c.dataset.label}: ${pesos(c.raw)}` } } } } };
    if (g) { g.data = cfg.data; g.options = cfg.options; g.update(); }
    else { grafica('gPron', cfg); g = graficas[graficas.length - 1]; }
  };
  document.querySelectorAll('#selPron button').forEach(b => b.onclick = () => {
    document.querySelectorAll('#selPron button').forEach(x => x.classList.toggle('activo', x === b)); dibujar(+b.dataset.i); });
  dibujar(pr.series.length - 1);
}

// ------------------------------------------------------------------ MAPA DE CLIENTES (Clientes y segmentos)
// Contorno de Colombia simplificado (Natural Earth, dominio público). Se dibuja sin internet.
const CONTORNO_COLOMBIA = [[-75.37,-0.15],[-75.8,0.08],[-76.29,0.42],[-76.58,0.26],[-77.42,0.4],[-77.67,0.83],[-77.86,0.81],[-78.86,1.38],[-78.99,1.69],[-78.62,1.77],[-78.66,2.27],[-78.43,2.63],[-77.93,2.7],[-77.51,3.33],[-77.13,3.85],[-77.5,4.09],[-77.31,4.67],[-77.53,5.58],[-77.32,5.85],[-77.48,6.69],[-77.88,7.22],[-77.75,7.71],[-77.43,7.64],[-77.24,7.94],[-77.47,8.52],[-77.35,8.67],[-76.84,8.64],[-76.09,9.34],[-75.67,9.44],[-75.66,9.77],[-75.48,10.62],[-74.91,11.08],[-74.28,11.1],[-74.2,11.31],[-73.41,11.23],[-72.63,11.73],[-72.24,11.96],[-71.75,12.44],[-71.4,12.38],[-71.14,12.11],[-71.33,11.78],[-71.97,11.61],[-72.23,11.11],[-72.61,10.82],[-72.91,10.45],[-73.03,9.74],[-73.3,9.15],[-72.79,9.09],[-72.66,8.63],[-72.44,8.41],[-72.36,8.0],[-72.48,7.63],[-72.44,7.42],[-72.2,7.34],[-71.96,6.99],[-70.67,7.09],[-70.09,6.96],[-69.39,6.1],[-68.99,6.21],[-68.27,6.15],[-67.7,6.27],[-67.34,6.1],[-67.52,5.56],[-67.74,5.22],[-67.82,4.5],[-67.62,3.84],[-67.34,3.54],[-67.3,3.32],[-67.81,2.82],[-67.45,2.6],[-67.18,2.25],[-66.88,1.25],[-67.07,1.13],[-67.26,1.72],[-67.54,2.04],[-67.87,1.69],[-69.82,1.71],[-69.8,1.09],[-69.22,0.99],[-69.25,0.6],[-69.45,0.71],[-70.02,0.54],[-70.02,-0.19],[-69.58,-0.55],[-69.42,-1.12],[-69.44,-1.56],[-69.89,-4.3],[-70.39,-3.77],[-70.69,-3.74],[-70.05,-2.73],[-70.81,-2.26],[-71.41,-2.34],[-71.77,-2.17],[-72.33,-2.43],[-73.07,-2.31],[-73.66,-1.26],[-74.12,-1.0],[-74.44,-0.53],[-75.11,-0.06],[-75.37,-0.15]];
const CIUDADES = { 'Barranquilla': [10.97, -74.78], 'Bogotá': [4.71, -74.07], 'Medellín': [6.24, -75.58], 'Cali': [3.45, -76.53],
  'Cartagena': [10.39, -75.51], 'Santa Marta': [11.24, -74.2], 'Bucaramanga': [7.12, -73.12], 'Cúcuta': [7.89, -72.5], 'Pereira': [4.81, -75.69],
  'Manizales': [5.07, -75.52], 'Armenia': [4.53, -75.68], 'Ibagué': [4.44, -75.23], 'Villavicencio': [4.14, -73.63], 'Neiva': [2.93, -75.28],
  'Pasto': [1.21, -77.28], 'Montería': [8.75, -75.88], 'Valledupar': [10.46, -73.25], 'Tunja': [5.54, -73.36], 'Popayán': [2.44, -76.61] };
const PALETA_SECTOR = ['#2571B4', '#3F2683', '#00A0D2', '#9B8BD6', '#5F799E', '#D69E2E', '#C2364A'];
function mapaClientes(lista) {
  const sectores = unicos(lista, 'sector'), colorSector = s => PALETA_SECTOR[sectores.indexOf(s) % PALETA_SECTOR.length];
  const f = mapaClientes.filtro || (mapaClientes.filtro = { sector: '', medida: 'ventas' });
  const W = 520, H = 640, lons = CONTORNO_COLOMBIA.map(p => p[0]), lats = CONTORNO_COLOMBIA.map(p => p[1]);
  const minLon = Math.min(...lons) - .4, maxLon = Math.max(...lons) + .4, minLat = Math.min(...lats) - .4, maxLat = Math.max(...lats) + .4;
  const k = Math.min(W / (maxLon - minLon), H / (maxLat - minLat));
  const xy = (lat, lon) => [(lon - minLon) * k, (maxLat - lat) * k];
  const contorno = CONTORNO_COLOMBIA.map(([lon, lat]) => xy(lat, lon).map(v => v.toFixed(1)).join(',')).join(' ');
  const html = `<div class="tarjeta"><h2>Mapa de clientes por ciudad y sector</h2>
    <p class="sub">Cada burbuja es un sector en una ciudad. El tamaño muestra las ventas o el número de clientes y el color, el sector. Toque una burbuja para filtrar la cartera.</p>
    <div class="filtros">
      <label>Sector<select id="mSec">${opciones(sectores, f.sector)}</select></label>
      <label>Tamaño de la burbuja<select id="mMed"><option value="ventas" ${f.medida === 'ventas' ? 'selected' : ''}>Ventas históricas</option><option value="clientes" ${f.medida === 'clientes' ? 'selected' : ''}>Número de clientes</option></select></label>
      <div class="leyenda-sector">${sectores.map(s => `<span><i style="background:${colorSector(s)}"></i>${esc(s)}</span>`).join('')}</div>
    </div>
    <div class="mapa-env">
      <div class="mapa"><svg viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" id="mapaSvg" role="img" aria-label="Mapa de Colombia con clientes por ciudad">
        <polygon points="${contorno}" class="tierra"/><g id="mapaBurbujas"></g></svg><div class="mapa-tip" id="mapaTip"></div></div>
      <div id="mapaTabla"></div>
    </div>
    <p class="sub" style="margin:10px 0 0">Mapa simplificado. Ciudades ubicadas por coordenadas aproximadas. Datos de prueba.</p></div>`;
  const pintar = () => {
    const datos = lista.filter(c => !f.sector || c.sector === f.sector);
    const grupos = {};
    datos.forEach(c => { const g = grupos[c.ciudad] || (grupos[c.ciudad] = {}); const x = g[c.sector] || (g[c.sector] = { clientes: 0, ventas: 0 }); x.clientes++; x.ventas += c.ventasHistoricasCop || 0; });
    const valor = x => f.medida === 'ventas' ? x.ventas : x.clientes;
    const maxV = Math.max(1, ...Object.values(grupos).flatMap(g => Object.values(g).map(valor)));
    let burbujas = '';
    const ciudades = Object.keys(grupos).sort((a, b) => Object.values(grupos[b]).reduce((s, x) => s + x.ventas, 0) - Object.values(grupos[a]).reduce((s, x) => s + x.ventas, 0));
    ciudades.forEach(ciudad => {
      const pos = CIUDADES[ciudad]; if (!pos) return;
      const [cx, cy] = xy(pos[0], pos[1]), secs = Object.keys(grupos[ciudad]).sort((a, b) => valor(grupos[ciudad][b]) - valor(grupos[ciudad][a]));
      secs.forEach((s, i) => {
        const x = grupos[ciudad][s], r = 4 + 15 * Math.sqrt(valor(x) / maxV);
        const ang = (sectores.indexOf(s) / sectores.length) * 2 * Math.PI - Math.PI / 2, d = secs.length > 1 ? 17 : 0;
        burbujas += `<circle class="burbuja" cx="${(cx + d * Math.cos(ang)).toFixed(1)}" cy="${(cy + d * Math.sin(ang)).toFixed(1)}" r="${r.toFixed(1)}" fill="${colorSector(s)}"
          data-ciudad="${esc(ciudad)}" data-sector="${esc(s)}" data-tip="${esc(`${ciudad} · ${s}|${x.clientes} clientes · ${pesosCorto(x.ventas)} en ventas`)}"/>`;
      });
      const izq = pos[1] < -75.2; burbujas += `<text class="ciudad" text-anchor="${izq ? 'end' : 'start'}" x="${(cx + (izq ? -38 : 38)).toFixed(1)}" y="${(cy + 4).toFixed(1)}">${esc(ciudad)}</text>`;
    });
    $('#mapaBurbujas').innerHTML = burbujas;
    const sinUbicar = Object.keys(grupos).filter(c => !CIUDADES[c]);
    $('#mapaTabla').innerHTML = tabla([
      { t: 'Ciudad', f: c => `<b>${esc(c)}</b>` },
      { t: 'Clientes', f: c => Object.values(grupos[c]).reduce((s, x) => s + x.clientes, 0), num: 1 },
      { t: 'Ventas', f: c => pesosCorto(Object.values(grupos[c]).reduce((s, x) => s + x.ventas, 0)), num: 1 },
      { t: 'Por sector', f: c => Object.entries(grupos[c]).sort((a, b) => b[1].clientes - a[1].clientes).map(([s, x]) => `<span class="mini-sector"><i style="background:${colorSector(s)}"></i>${esc(s)} ${x.clientes}</span>`).join(' ') },
    ], ciudades) + (sinUbicar.length ? `<p class="sub" style="margin-top:8px">Sin ubicación en el mapa: ${sinUbicar.map(esc).join(', ')}.</p>` : '');
    const tip = $('#mapaTip');
    document.querySelectorAll('#mapaBurbujas .burbuja').forEach(b => {
      b.onmouseenter = () => { const [a, c] = b.dataset.tip.split('|'); tip.innerHTML = `<b>${a}</b>${c}`; tip.style.display = 'block'; };
      b.onmousemove = e => { const r = $('#mapaSvg').parentElement.getBoundingClientRect(); tip.style.left = (e.clientX - r.left + 14) + 'px'; tip.style.top = (e.clientY - r.top + 14) + 'px'; };
      b.onmouseleave = () => { tip.style.display = 'none'; };
      b.onclick = () => { const fc = clientes.filtro; if (!fc) return; fc.ciudad = b.dataset.ciudad; fc.sector = b.dataset.sector;
        $('#fciu').value = fc.ciudad; $('#fsec').value = fc.sector; $('#fciu').dispatchEvent(new Event('change')); $('#tablaCli').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    });
  };
  const activar = () => {
    $('#mSec').onchange = e => { f.sector = e.target.value; pintar(); };
    $('#mMed').onchange = e => { f.medida = e.target.value; pintar(); };
    pintar();
  };
  return { html, activar };
}

// ------------------------------------------------------------------ VENTAS POR LÍNEA DE NEGOCIO
const fmtUsd = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', currencyDisplay: 'code', maximumFractionDigits: 2 });
const dolares = x => x == null ? '—' : fmtUsd.format(x).replace('USD', 'US$').replace(/\s+/, ' ');
const fmtTrm = x => x == null ? '—' : '$ ' + x.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function colVentasLinea() {
  return [
    { t: 'Fecha', f: v => fecha(v.fecha), csv: v => v.fecha },
    { t: 'Línea de negocio', f: v => `<span class="linea" style="--tono:${COLOR_LINEA[v.linea] || '#999'}">${esc(v.linea)}</span>`, csv: v => v.linea },
    { t: 'Producto', f: v => `${esc(v.producto)}<br><span class="sub">${esc(v.ventaId)} · ${v.cantidad} und.</span>`, csv: v => v.producto },
    { t: 'Cliente', f: v => `<a href="#ficha/${esc(v.clienteId)}">${esc(v.clienteId)}</a><br><span class="sub">${esc(v.cliente)}</span>`, csv: v => v.clienteId + ' ' + (v.cliente || '') },
    { t: 'Moneda', f: v => v.moneda === 'USD' ? '<span class="chip moneda usd">Dólares</span>' : '<span class="chip moneda cop">Pesos</span>', csv: v => v.moneda },
    { t: 'Monto en dólares', f: v => v.montoUsd == null ? '<span class="sub">No aplica</span>' : `<b>${dolares(v.montoUsd)}</b>`, csv: v => v.montoUsd ?? '', num: 1 },
    { t: 'TRM aplicada', f: v => v.trm == null ? '<span class="sub">No aplica</span>' : fmtTrm(v.trm), csv: v => v.trm ?? '', num: 1 },
    { t: 'Valor en pesos', f: v => `<b>${pesos(v.montoCop)}</b>`, csv: v => Math.round(v.montoCop), num: 1 },
  ];
}
async function lineas() {
  const inf = await dato('lineas', '/api/ventas/lineas');
  const todas = inf.ventas, nombres = inf.lineas.map(l => l.linea);
  const f = lineas.filtro || (lineas.filtro = { linea: '', moneda: '', desde: '', hasta: '', q: '' });
  let filas = [];
  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  main().innerHTML = hero('Ventas por línea de negocio', 'Qué producto se vendió en cada línea de Green, en qué fecha, por cuánto en dólares, con qué TRM y cuánto fue en pesos colombianos. Solo ventas confirmadas hasta el corte.', 'Análisis') +
    `<div class="lineas-tarjetas">${inf.lineas.map(l => `
      <button class="linea-tarjeta ${f.linea === l.linea ? 'activa' : ''}" data-linea="${esc(l.linea)}" style="--tono:${COLOR_LINEA[l.linea] || '#999'}">
        <span class="ico">${ico(ICONO_LINEA[l.linea] || 'box')}</span>
        <span class="nombre">${esc(l.linea)}</span>
        <span class="valor">${pesosCorto(l.totalCop)}</span>
        <span class="detalle">${fmtNum.format(l.ventas)} ventas · ${l.ventasUsd ? dolares(l.totalUsd) + ' en dólares' : 'todo en pesos'}</span>
        <span class="productos">${l.productos.map(esc).join(' · ') || 'Sin productos asignados'}</span>
      </button>`).join('')}</div>
    <div class="grid2">
      <div class="tarjeta"><h2>Ventas por mes y línea</h2><p class="sub">Valor en pesos de cada mes, separado por línea de negocio.</p><div class="grafica"><canvas id="gLinMes"></canvas></div></div>
      <div class="tarjeta"><h2>Participación por línea</h2><p class="sub">Del total vendido en pesos.</p><div class="grafica"><canvas id="gLinPart"></canvas></div></div>
    </div>
    <div class="kpis" id="kpisLin"></div>
    <div class="tarjeta"><h2>Detalle de ventas</h2><p class="sub">Cada fila es una venta. Las ventas en dólares se pasan a pesos con la TRM del mismo día; las ventas en pesos no llevan TRM.</p>
      <div class="filtros">
        <label>Línea de negocio<select id="lLinea">${opciones(nombres, f.linea, 'Todas')}</select></label>
        <label>Moneda<select id="lMon"><option value="">Todas</option><option value="USD" ${f.moneda === 'USD' ? 'selected' : ''}>Dólares</option><option value="COP" ${f.moneda === 'COP' ? 'selected' : ''}>Pesos</option></select></label>
        <label>Desde<input type="date" id="lDesde" value="${esc(f.desde)}"></label>
        <label>Hasta<input type="date" id="lHasta" value="${esc(f.hasta)}"></label>
        <label>Buscar<input id="lq" value="${esc(f.q)}" placeholder="Producto o cliente"></label>
        <button class="sec" id="lCsv">${ico('download')}Descargar para Excel</button></div>
      <div id="tablaLin"></div></div>
    <div class="nota alerta"><b>Línea de cada producto (propuesta para revisar):</b> los datos de prueba no dicen a qué línea pertenece cada producto, así que se asignó así:
      ${inf.lineas.map(l => `<b>${esc(l.linea)}</b>: ${l.productos.map(esc).join(', ') || '—'}`).join(' · ')}.
      Se puede cambiar en la tabla <span class="mono">lineas_producto</span> de la base, sin tocar el código.</div>
    <p class="sub">${esc(inf.aclaracion)}</p>`;
  const pintar = () => {
    const q = f.q.toLowerCase();
    filas = todas.filter(v => (!f.linea || v.linea === f.linea) && (!f.moneda || v.moneda === f.moneda) &&
      (!f.desde || v.fecha >= f.desde) && (!f.hasta || v.fecha <= f.hasta) &&
      (!q || (v.producto + ' ' + v.clienteId + ' ' + (v.cliente || '') + ' ' + v.ventaId).toLowerCase().includes(q)));
    const usd = filas.filter(v => v.moneda === 'USD');
    const totUsd = usd.reduce((s, v) => s + v.montoUsd, 0), totUsdCop = usd.reduce((s, v) => s + v.montoCop, 0);
    const totCop = filas.reduce((s, v) => s + v.montoCop, 0);
    $('#kpisLin').innerHTML = kpi('Ventas del periodo', fmtNum.format(filas.length), `${usd.length} en dólares · ${filas.length - usd.length} en pesos`) +
      kpi('Ventas en dólares', dolares(totUsd), `Equivalen a ${pesos(totUsdCop)}`) +
      kpi('TRM promedio aplicada', usd.length ? fmtTrm(totUsdCop / totUsd) : '—', 'Ponderada por el monto en dólares') +
      kpi('Total en pesos', pesosCorto(totCop), pesos(totCop));
    $('#tablaLin').innerHTML = `<p class="sub">${fmtNum.format(filas.length)} ventas${filas.length > 400 ? ' · se muestran las 400 más recientes; use los filtros o descargue el Excel para ver todas' : ''}.</p>` +
      tabla(colVentasLinea(), filas.slice(0, 400));
    document.querySelectorAll('.linea-tarjeta').forEach(b => b.classList.toggle('activa', b.dataset.linea === f.linea));
  };
  const ponerLinea = l => { f.linea = l; $('#lLinea').value = l; pintar(); };
  document.querySelectorAll('.linea-tarjeta').forEach(b => b.onclick = () => ponerLinea(f.linea === b.dataset.linea ? '' : b.dataset.linea));
  $('#lLinea').onchange = e => ponerLinea(e.target.value);
  $('#lMon').onchange = e => { f.moneda = e.target.value; pintar(); };
  $('#lDesde').onchange = e => { f.desde = e.target.value; pintar(); };
  $('#lHasta').onchange = e => { f.hasta = e.target.value; pintar(); };
  $('#lq').oninput = e => { f.q = e.target.value; pintar(); };
  $('#lCsv').onclick = () => descargarCsv('ventas_por_linea_green.csv', colVentasLinea(), filas);
  pintar();
  grafica('gLinMes', { type: 'bar', data: { labels: inf.mensual.map(m => MESES[+m.mes.slice(5, 7) - 1] + ' ' + m.mes.slice(2, 4)),
      datasets: nombres.map(l => ({ label: l, data: inf.mensual.map(m => m.copPorLinea[l] || 0), backgroundColor: COLOR_LINEA[l] || '#999', borderRadius: 0, maxBarThickness: 30 })) },
    options: { maintainAspectRatio: false, scales: { x: { stacked: true, grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, autoSkipPadding: 10 } },
      y: { stacked: true, ticks: { callback: v => pesosCorto(v), maxTicksLimit: 6 } } },
      plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', callbacks: { label: c => `${c.dataset.label}: ${pesos(c.raw)}` } } } } });
  const tot = inf.lineas.reduce((s, l) => s + l.totalCop, 0);
  grafica('gLinPart', { type: 'doughnut', data: { labels: nombres, datasets: [{ data: inf.lineas.map(l => l.totalCop), backgroundColor: nombres.map(l => COLOR_LINEA[l] || '#999'), hoverOffset: 6 }] },
    options: { maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' },
      tooltip: { callbacks: { label: c => `${c.label}: ${pesosCorto(c.raw)} (${pct(c.raw / tot, 1)})` } } } }, plugins: [textoCentro('total en pesos', pesosCorto(tot))] });
}

// ------------------------------------------------------------------ CLIENTES
async function clientes() {
  const lista = await dato('clientes', '/api/clientes');
  const f = clientes.filtro || (clientes.filtro = { seg: '', ciudad: '', sector: '', base: '', q: '' });
  const pintar = () => {
    const q = f.q.toLowerCase();
    const filas = lista.filter(c => (!f.seg || c.segmento === f.seg) && (!f.ciudad || c.ciudad === f.ciudad) &&
      (!f.sector || c.sector === f.sector) && (!f.base || String(c.baseInstalada) === f.base) &&
      (!q || (c.clienteId + ' ' + c.nombre).toLowerCase().includes(q)));
    $('#tablaCli').innerHTML = `<p class="sub">${filas.length} clientes. Haga clic en una fila para ver su ficha.</p>` + tabla([
      { t: 'Cliente', f: c => `<b>${esc(c.clienteId)}</b><br><span class="sub">${esc(c.nombre)}</span>` },
      { t: 'Segmento', f: c => chip(c.segmento) },
      { t: 'Ciudad', k: 'ciudad' }, { t: 'Sector', k: 'sector' },
      { t: 'Compras', k: 'transacciones', num: 1 },
      { t: 'Ventas históricas', f: c => pesos(c.ventasHistoricasCop), num: 1 },
      { t: 'Ventas 12 meses', f: c => pesos(c.ventas12mCop), num: 1 },
      { t: 'Días sin comprar', f: c => c.recenciaDias ?? '—', num: 1 },
      { t: 'Prob. compra 30 d', f: c => pct(c.probabilidadCompra), num: 1 },
      { t: 'Base instalada', f: c => si(c.baseInstalada) },
    ], filas, c => (location.hash = 'ficha/' + c.clienteId));
  };
  const cuenta = {}; lista.forEach(c => (cuenta[c.segmento] = (cuenta[c.segmento] || 0) + 1));
  const mapa = mapaClientes(lista);
  main().innerHTML = hero('Clientes y segmentos', 'Cuántos clientes hay en cada segmento, cuánto pesan y quién se está enfriando.', 'Cartera') +
    `<div class="kpis">${Object.keys(COLORES).filter(k => cuenta[k]).map(k => kpi(k, cuenta[k], pct(cuenta[k] / lista.length) + ' · ciclo de compra')).join('')}</div>
    ${mapa.html}
    <div class="tarjeta"><h2>Días sin comprar frente a ventas de 12 meses</h2><p class="sub">Arriba a la derecha: clientes valiosos que llevan tiempo sin comprar.</p><div class="grafica"><canvas id="gMapa"></canvas></div></div>
    <div class="tarjeta"><h2>Cartera</h2>
      <div class="filtros">
        <label>Buscar<input id="fq" placeholder="CLI001 o nombre" value="${esc(f.q)}"></label>
        <label>Segmento<select id="fseg">${opciones(Object.keys(COLORES).filter(k => cuenta[k]), f.seg)}</select></label>
        <label>Ciudad<select id="fciu">${opciones(unicos(lista, 'ciudad'), f.ciudad, 'Todas')}</select></label>
        <label>Sector<select id="fsec">${opciones(unicos(lista, 'sector'), f.sector)}</select></label>
        <label>Base instalada<select id="fbase"><option value="">Todos</option><option value="true" ${f.base === 'true' ? 'selected' : ''}>Sí</option><option value="false" ${f.base === 'false' ? 'selected' : ''}>No</option></select></label>
      </div><div id="tablaCli"></div></div>`;
  [['#fq', 'q', 'input'], ['#fseg', 'seg'], ['#fciu', 'ciudad'], ['#fsec', 'sector'], ['#fbase', 'base']]
    .forEach(([sel, k, ev]) => $(sel).addEventListener(ev || 'change', e => { f[k] = e.target.value; pintar(); }));
  pintar();
  mapa.activar();
  const segs = Object.keys(COLORES).filter(k => cuenta[k] && k !== 'Sin compras');
  grafica('gMapa', { type: 'scatter', data: { datasets: segs.map(k => ({ label: k, backgroundColor: COLORES[k] + 'B3', borderColor: '#fff', borderWidth: 1.5,
      data: lista.filter(c => c.segmento === k).map(c => ({ x: c.recenciaDias, y: c.ventas12mCop, id: c.clienteId })) })) },
    options: { maintainAspectRatio: false, onClick: (e, el) => { if (el[0]) location.hash = 'ficha/' + graficas[0].data.datasets[el[0].datasetIndex].data[el[0].index].id; },
      scales: { x: { title: { display: true, text: 'Días sin comprar' } }, y: { title: { display: true, text: 'Ventas 12 meses' }, ticks: { callback: v => pesosCorto(v) } } },
      plugins: { tooltip: { callbacks: { label: c => `${c.raw.id}: ${c.raw.x} días · ${pesos(c.raw.y)}` } } } } });
}

// ------------------------------------------------------------------ FICHA
async function ficha(id) {
  const lista = await dato('clientes', '/api/clientes');
  id = id || ficha.ultimo || (lista[0] && lista[0].clienteId);
  ficha.ultimo = id;
  const selector = `<div class="filtros"><label>Cliente<select id="selCli">${lista.map(c => `<option value="${esc(c.clienteId)}" ${c.clienteId === id ? 'selected' : ''}>${esc(c.clienteId)} · ${esc(c.nombre)}</option>`).join('')}</select></label>
    <label>O escriba el código<input id="codCli" placeholder="CLI001"></label><button class="sec" id="btnCod">Buscar</button></div>`;
  let d;
  try { d = await api('/api/clientes/' + encodeURIComponent(id)); }
  catch (e) {
    if (e.status !== 404) throw e;
    main().innerHTML = hero('Ficha del cliente', 'Todo lo que se le ha vendido a un cliente y cómo va la relación.', 'Cliente') +
      `<div class="tarjeta">${selector}</div><div class="nota error">${esc(e.message)}</div>`;
    return enlazarSelector();
  }
  const c = d.ficha, o = d.resumenOficial || {};
  main().innerHTML = hero(`${c.nombre} (${c.clienteId})`, `${c.sector || ''} · ${c.ciudad || ''} · cliente desde ${fecha(c.fechaAlta)} · canal preferido: ${c.canalPreferido || '—'}`, 'Ficha del cliente') +
    `<div class="tarjeta">${selector}</div>
    <div class="kpis">
      ${kpi('Segmento', chip(c.segmento), o.prioridadRegla ? 'Prioridad por regla: ' + esc(o.prioridadRegla) : '')}
      ${kpi('Ventas históricas', pesosCorto(c.ventasHistoricasCop), `${c.transacciones} compras confirmadas`)}
      ${kpi('Ventas 12 meses', pesosCorto(c.ventas12mCop), `${c.mesesConCompra12m} meses con compra`)}
      ${kpi('Días sin comprar', c.recenciaDias ?? '—', c.ultimaCompra ? 'Última: ' + fecha(c.ultimaCompra) : 'Sin compras')}
      ${kpi('Prob. de compra en 30 días', pct(c.probabilidadCompra), 'Modelo de prueba; revisar con el equipo')}
    </div>
    <div class="tarjeta"><h2>Reglas oficiales al corte</h2><div class="ficha-cab">
      <span>Frecuente: <b>${si(o.frecuente)}</b></span><span>Frío: <b>${si(o.frio)}</b></span>
      <span>Renovaciones próximas: <b>${o.renovacionesProximas ?? 0}</b></span><span>Coberturas vencidas: <b>${o.coberturasVencidas ?? 0}</b></span>
      <span>Ticket promedio: <b>${pesos(c.ticketPromedioCop)}</b></span><span>Ciclo de recompra: <b>${c.cicloRecompraDias != null ? Math.round(c.cicloRecompraDias) + ' días' : '—'}</b></span>
      <span>Próxima compra estimada: <b>${fecha(c.proximaCompraEstimada)}</b></span><span>Familias: <b>${esc((c.familias || []).join(', '))}</b></span>
    </div></div>
    ${d.alertas.length ? `<div class="tarjeta"><h2>Alertas de este cliente</h2>${tabla(colAlertas(false), d.alertas)}</div>` : ''}
    <div class="grid2b">
      <div class="tarjeta"><h2>Qué se le ha vendido</h2>${tabla([
        { t: 'Producto', f: p => `${esc(p.producto)} <span class="sub">${esc(p.productoId)}</span>` },
        { t: 'Compras', k: 'transacciones', num: 1 }, { t: 'Valor', f: p => pesos(p.valorCop), num: 1 },
        { t: 'Última', f: p => fecha(p.ultimaCompra) }], c.productos)}</div>
      <div class="tarjeta"><h2>Base instalada y coberturas</h2>${tabla([
        { t: 'Producto', k: 'producto' }, { t: 'Instalación', k: 'instalacionId' }, { t: 'Unid.', k: 'unidades', num: 1 },
        { t: 'Vence', f: r => fecha(r.fechaFin) }, { t: 'Estado', f: r => chip(r.estado) }], d.coberturas)}</div>
    </div>
    <div class="tarjeta"><h2>Ventas del cliente</h2><p class="sub">Las anuladas se muestran pero no suman.</p>${tabla([
      { t: 'Venta', k: 'venta_id' }, { t: 'Fecha', f: v => fecha(v.fecha) }, { t: 'Producto', k: 'producto' },
      { t: 'Cant.', k: 'cantidad', num: 1 }, { t: 'Moneda', k: 'moneda' }, { t: 'Precio unit.', f: v => Number(v.precio_unitario).toLocaleString('es-CO', { maximumFractionDigits: 2 }), num: 1 },
      { t: 'Importe COP', f: v => pesos(v.importe_cop), num: 1 },
      { t: 'Estado', f: v => v.estado === 'Anulada' ? chip('Anulada', 'Alta') : 'Confirmada' }], d.ventas)}</div>
    <p class="sub">${esc(d.aclaracion)}</p>`;
  enlazarSelector();
  function enlazarSelector() {
    $('#selCli').onchange = e => (location.hash = 'ficha/' + e.target.value);
    const ir = () => { const v = $('#codCli').value.trim().toUpperCase(); if (v) location.hash = 'ficha/' + v; };
    $('#btnCod').onclick = ir; $('#codCli').onkeydown = e => { if (e.key === 'Enter') ir(); };
  }
}

// ------------------------------------------------------------------ ALERTAS
function colAlertas(conCliente = true) {
  return [
    ...(conCliente ? [{ t: 'Alerta', k: 'alertaId' }] : []),
    { t: 'Prioridad', f: a => chip(a.prioridad), csv: a => a.prioridad },
    { t: 'Tipo', k: 'tipo' },
    ...(conCliente ? [{ t: 'Cliente', f: a => `<a href="#ficha/${esc(a.clienteId)}">${esc(a.clienteId)}</a><br><span class="sub">${esc(a.nombre)}</span>`, csv: a => a.clienteId + ' ' + a.nombre }] : []),
    { t: 'Detalle', k: 'detalle' },
    { t: 'Valor en juego', f: a => pesos(a.valorEnJuegoCop), csv: a => Math.round(a.valorEnJuegoCop), num: 1 },
    { t: 'Acción sugerida', k: 'accion' },
    { t: 'Fecha límite', f: a => fecha(a.fechaLimite), csv: a => a.fechaLimite },
    { t: 'Evidencia', k: 'evidencia' },
    ...(conCliente ? [{ t: 'Canal', k: 'canalPreferido' }] : []),
  ];
}
async function alertas() {
  const lista = await dato('alertas', '/api/alertas');
  const f = alertas.filtro || (alertas.filtro = { tipo: '', prio: '', q: '' });
  let filas = [];
  const pintar = () => {
    const q = f.q.toLowerCase();
    filas = lista.filter(a => (!f.tipo || a.tipo === f.tipo) && (!f.prio || a.prioridad === f.prio) && (!q || (a.clienteId + ' ' + a.nombre + ' ' + a.detalle).toLowerCase().includes(q)));
    $('#tablaAl').innerHTML = `<p class="sub">${filas.length} alertas · valor en juego ${pesos(filas.reduce((s, a) => s + a.valorEnJuegoCop, 0))}</p>` + tabla(colAlertas(), filas);
  };
  const porTipo = t => lista.filter(a => a.tipo === t).length;
  main().innerHTML = hero('Alertas del mes', 'A quién llamar, por qué, con qué acción y qué dato lo sustenta. Es una recomendación para revisar con el equipo comercial, no una venta asegurada.', 'Oportunidades') +
    `<div class="kpis">${TIPOS_ALERTA.map(t => kpi(t, porTipo(t))).join('')}</div>
    <div class="tarjeta"><div class="filtros">
      <label>Buscar<input id="aq" value="${esc(f.q)}" placeholder="Cliente o producto"></label>
      <label>Tipo<select id="atipo">${opciones(TIPOS_ALERTA, f.tipo)}</select></label>
      <label>Prioridad<select id="aprio">${opciones(['Alta', 'Media', 'Baja'], f.prio, 'Todas')}</select></label>
      <button class="sec" id="btnCsv">Descargar para Excel</button></div><div id="tablaAl"></div></div>
    <div class="nota"><b>Cómo se priorizan:</b> renovación vencida (hasta 90 días) y cliente valioso en riesgo son prioridad alta; renovación próxima (≤ ${(cache.parametros || {}).renovacionDias || 45} días) es media; reactivación de clientes fríos con buen historial es baja. «Cliente valioso» = quintil 4 o 5 de ventas de 12 meses; «en riesgo» = el modelo predice que no comprará en 30 días o el cliente está en el segmento En riesgo.</div>`;
  $('#aq').oninput = e => { f.q = e.target.value; pintar(); };
  $('#atipo').onchange = e => { f.tipo = e.target.value; pintar(); };
  $('#aprio').onchange = e => { f.prio = e.target.value; pintar(); };
  $('#btnCsv').onclick = () => descargarCsv('alertas_green_services.csv', colAlertas(), filas);
  pintar();
}

// ------------------------------------------------------------------ RENOVACIONES
async function renovaciones() {
  const lista = await dato('renovaciones', '/api/renovaciones');
  const f = renovaciones.filtro || (renovaciones.filtro = { estado: 'PROXIMA', q: '' });
  const n = e => lista.filter(r => r.estado === e).length;
  const pintar = () => {
    const q = f.q.toLowerCase();
    const filas = lista.filter(r => (!f.estado || r.estado === f.estado) && (!q || (r.clienteId + ' ' + r.producto).toLowerCase().includes(q)));
    $('#tablaRen').innerHTML = tabla([
      { t: 'Cliente', f: r => `<a href="#ficha/${esc(r.clienteId)}">${esc(r.clienteId)}</a>` },
      { t: 'Producto', k: 'producto' }, { t: 'Familia', k: 'familia' }, { t: 'Instalación', k: 'instalacionId' },
      { t: 'Unidades', k: 'unidades', num: 1 }, { t: 'Inicio', f: r => fecha(r.fechaInicio) }, { t: 'Fin', f: r => fecha(r.fechaFin) },
      { t: 'Días para vencer', k: 'diasParaVencer', num: 1 }, { t: 'Estado', f: r => chip(r.estado) },
      { t: 'Último valor pagado', f: r => pesos(r.valorUltimoCop), num: 1 }], filas);
  };
  main().innerHTML = hero('Renovaciones', 'Clientes a los que se les puede vender la renovación. Por cliente y producto se toma la cobertura más reciente: si ya se renovó, no se vuelve a mostrar. La fecha de fin es la prevista, no una venta confirmada.', 'Oportunidades') +
    `<div class="kpis">${kpi('Vencidas', n('VENCIDA'))}${kpi('Próximas', n('PROXIMA'), `En ≤ ${(cache.parametros || {}).renovacionDias || 45} días`)}${kpi('Vigentes', n('VIGENTE'))}</div>
    <div class="tarjeta"><div class="filtros">
      <label>Estado<select id="rest"><option value="">Todos</option>${['VENCIDA', 'PROXIMA', 'VIGENTE'].map(e => `<option ${f.estado === e ? 'selected' : ''} value="${e}">${{ VENCIDA: 'Vencida', PROXIMA: 'Próxima', VIGENTE: 'Vigente' }[e]}</option>`).join('')}</select></label>
      <label>Buscar<input id="rq" value="${esc(f.q)}" placeholder="Cliente o producto"></label></div><div id="tablaRen"></div></div>`;
  $('#rest').onchange = e => { f.estado = e.target.value; pintar(); };
  $('#rq').oninput = e => { f.q = e.target.value; pintar(); };
  pintar();
}

// ------------------------------------------------------------------ SUBIR DATOS (los colaboradores actualizan los CSV desde el portal)
const ES_DEMO = typeof rutaDemo === 'function';
const deLa = b => b.startsWith('el ') ? 'del ' + b.slice(3) : 'de ' + b;
async function enviarArchivos(ruta, archivos, extra = {}) {
  const fd = new FormData();
  archivos.forEach(a => fd.append('archivos', a, a.name));
  Object.entries(extra).forEach(([k, v]) => v != null && fd.append(k, v));
  const r = await fetch(ruta, { method: 'POST', body: fd });
  const texto = await r.text(); const cuerpo = texto ? JSON.parse(texto) : null;
  if (!r.ok) { const e = new Error((cuerpo && (cuerpo.detail || cuerpo.title)) || ('Error ' + r.status)); e.status = r.status; throw e; }
  return cuerpo;
}
async function subir() {
  const info = ES_DEMO ? { archivos: { 'clientes.csv': 'Clientes', 'productos.csv': 'Productos', 'trm_prueba.csv': 'TRM (pesos por dólar de cada día)', 'ventas.csv': 'Ventas', 'base_instalada.csv': 'Base instalada' }, pideClave: false, base: 'el paquete original de datos' }
    : await api('/api/cargas/archivos');
  let elegidos = [], revision = null;
  main().innerHTML = hero('Subir datos', 'Actualice la información del tablero subiendo los archivos CSV. Primero se revisan con las mismas reglas de calidad; nada se guarda hasta que usted lo confirme.', 'Datos') +
    (ES_DEMO ? `<div class="nota alerta"><b>En esta demostración no se pueden subir archivos.</b> Esta página no tiene servidor ni base de datos. La subida funciona en el tablero instalado en el computador (http://localhost:8080).</div>` : '') +
    `<div class="grid2">
      <div class="tarjeta"><h2>1. Elija los archivos</h2><p class="sub">Puede subir uno o varios. Los que no suba se toman ${esc(deLa(info.base))}.</p>
        <label class="zona-subida" id="zona"><input type="file" id="archivosIn" accept=".csv,text/csv" multiple ${ES_DEMO ? 'disabled' : ''}>
          <span class="ico">${ico('upload')}</span><b>Arrastre aquí los archivos o haga clic para elegirlos</b><span class="sub">Solo CSV, separados por comas, con el mismo formato y nombre del paquete.</span></label>
        <div id="elegidos"></div>
        <div class="llamada-botones" style="margin:16px 0 0"><button id="btnRevisar" disabled>${ico('check')}Revisar archivos</button><button class="sec" id="btnLimpiar">Quitar archivos</button></div>
      </div>
      <div class="tarjeta"><h2>Archivos que acepta el tablero</h2><p class="sub">El nombre del archivo debe ser exactamente uno de estos.</p>
        ${tabla([{ t: 'Archivo', f: x => `<span class="mono">${esc(x[0])}</span>` }, { t: 'Contenido', f: x => esc(x[1]) }], Object.entries(info.archivos))}
      </div>
    </div>
    <div id="resultadoSubida"></div>`;
  const pintarElegidos = () => {
    $('#elegidos').innerHTML = elegidos.length ? `<ul class="lista-archivos">${elegidos.map((a, i) => {
      const ok = info.archivos[a.name.toLowerCase()];
      return `<li class="${ok ? '' : 'mal'}">${ico('file')}<span><b>${esc(a.name)}</b><small>${ok ? esc(ok) : 'Nombre no reconocido: no se puede subir'} · ${(a.size / 1024).toLocaleString('es-CO', { maximumFractionDigits: 1 })} KB</small></span><a href="#" data-quitar="${i}">Quitar</a></li>`; }).join('')}</ul>` : '';
    $('#btnRevisar').disabled = ES_DEMO || !elegidos.length || elegidos.some(a => !info.archivos[a.name.toLowerCase()]);
    document.querySelectorAll('[data-quitar]').forEach(a => a.onclick = e => { e.preventDefault(); elegidos.splice(+a.dataset.quitar, 1); revision = null; $('#resultadoSubida').innerHTML = ''; pintarElegidos(); });
  };
  const agregar = lista => {
    [...lista].forEach(a => { elegidos = elegidos.filter(x => x.name.toLowerCase() !== a.name.toLowerCase()); elegidos.push(a); });
    revision = null; $('#resultadoSubida').innerHTML = ''; pintarElegidos();
  };
  $('#archivosIn').onchange = e => { agregar(e.target.files); e.target.value = ''; };
  const zona = $('#zona');
  ['dragenter', 'dragover'].forEach(ev => zona.addEventListener(ev, e => { e.preventDefault(); if (!ES_DEMO) zona.classList.add('encima'); }));
  ['dragleave', 'drop'].forEach(ev => zona.addEventListener(ev, e => { e.preventDefault(); zona.classList.remove('encima'); }));
  zona.addEventListener('drop', e => { if (!ES_DEMO) agregar(e.dataTransfer.files); });
  $('#btnLimpiar').onclick = () => { elegidos = []; revision = null; $('#resultadoSubida').innerHTML = ''; pintarElegidos(); };
  $('#btnRevisar').onclick = async () => {
    const b = $('#btnRevisar'); b.disabled = true; b.textContent = 'Revisando…';
    try { revision = await enviarArchivos('/api/cargas/archivos/revisar', elegidos); pintarRevision(); }
    catch (e) { $('#resultadoSubida').innerHTML = `<div class="nota error"><b>No se pudo revisar:</b> ${esc(e.message)}</div>`; }
    finally { b.innerHTML = ico('check') + 'Revisar archivos'; pintarIconos(b); pintarElegidos(); }
  };
  const colRechazos = [{ t: 'Archivo', k: 'archivo' }, { t: 'Fila', k: 'fila', num: 1 }, { t: 'Código', k: 'registroId' }, { t: 'Problema', f: x => `<b class="mal">${esc(x.motivo)}</b>`, csv: x => x.motivo }, { t: 'Contenido de la fila', f: x => `<span class="mono">${esc(x.contenido)}</span>`, csv: x => x.contenido }];
  const pintarRevision = () => {
    const r = revision, fv = r.filasValidas;
    $('#resultadoSubida').innerHTML = `<div class="tarjeta"><h2>2. Resultado de la revisión</h2>
        <div class="nota ${r.puedeCargar ? '' : 'error'}" style="margin:6px 0 18px"><b>${r.puedeCargar ? 'Listo para guardar.' : 'Hay que corregir.'}</b> ${esc(r.mensaje)}</div>
        <div class="kpis">${kpi('Archivos subidos', r.subidos.length, r.subidos.map(x => x.archivo).join(', '))}${kpi('Filas con problemas', fmtNum.format(r.rechazos), r.rechazos ? 'Vea el detalle abajo' : 'Ninguna')}
          ${kpi('Clientes válidos', fmtNum.format(fv.clientes))}${kpi('Ventas válidas', fmtNum.format(fv.ventas))}${kpi('Días de TRM', fmtNum.format(fv.trm))}</div>
        ${r.tomadosDelPaquete.length ? `<p class="sub">Se tomaron sin cambios ${esc(deLa(r.base))}: ${r.tomadosDelPaquete.map(esc).join(', ')}.</p>` : ''}
        ${r.rechazos ? `<h2 style="margin-top:18px">Filas con problemas</h2><p class="sub">${r.rechazos > r.detalleRechazos.length ? `Se muestran las primeras ${r.detalleRechazos.length} de ${fmtNum.format(r.rechazos)}. ` : ''}La fila cuenta desde el encabezado (la fila 2 es la primera con datos). <a href="#" id="csvRech">Descargar para Excel</a></p>${tabla(colRechazos, r.detalleRechazos)}` : ''}
      </div>
      <div class="tarjeta"><h2>Vista previa</h2><p class="sub">Primeras 5 filas de cada archivo subido.</p>
        ${r.subidos.map(m => `<h3 class="titulo-archivo">${ico('file')}${esc(m.archivo)} <small>${fmtNum.format(m.filas)} filas · ${m.columnas.length} columnas</small></h3>
          ${tabla(m.columnas.map(c => ({ t: c, f: x => esc(x[c]) })), m.primeras)}`).join('')}
      </div>
      ${r.puedeCargar ? `<div class="tarjeta confirmar"><h2>3. Confirmar</h2>
        <p class="sub">Al confirmar, los datos actuales del tablero se reemplazan por estos${r.hayDatos ? ' (la base ya tiene datos)' : ''}. Queda registro de la carga con fecha y archivos.</p>
        ${r.pideClave ? `<div class="filtros"><label>Clave para subir datos<input type="password" id="claveSubida" autocomplete="off"></label></div>` : ''}
        <label class="opcion"><input type="checkbox" id="chkConfirma"> Revisé la vista previa y quiero reemplazar los datos del tablero.</label>
        <div class="llamada-botones" style="margin:14px 0 0"><button id="btnCargar" disabled>${ico('upload')}Confirmar y reemplazar datos</button></div></div>` : ''}`;
    pintarIconos($('#resultadoSubida'));
    const csv = $('#csvRech'); if (csv) csv.onclick = e => { e.preventDefault(); descargarCsv('filas_con_problemas.csv', colRechazos, r.detalleRechazos); };
    const chk = $('#chkConfirma'); if (!chk) return;
    chk.onchange = () => { $('#btnCargar').disabled = !chk.checked; };
    $('#btnCargar').onclick = async () => {
      const b = $('#btnCargar'); b.disabled = true; b.textContent = 'Guardando…';
      try {
        const res = await enviarArchivos('/api/cargas/archivos', elegidos, { clave: r.pideClave ? $('#claveSubida').value : null });
        limpiarCache(); pieMenu();
        $('#resultadoSubida').innerHTML = `<div class="nota"><b>${esc(res.mensaje)}</b> Carga ${esc(res.loteId)}: ${fmtNum.format(res.filasCargadas.ventas)} ventas, ${fmtNum.format(res.filasCargadas.clientes)} clientes. <a href="#resumen">Ver el resumen</a></div>`;
        elegidos = []; pintarElegidos(); toast('Datos actualizados.');
      } catch (e) {
        toast(e.message, 8000); b.disabled = false; b.innerHTML = ico('upload') + 'Confirmar y reemplazar datos'; pintarIconos(b);
      }
    };
  };
  pintarElegidos();
}

// ------------------------------------------------------------------ CARGA INICIAL
async function cargarPaquete(boton, reemplazar = false) {
  boton.disabled = true; boton.textContent = 'Cargando…';
  try {
    const r = await api('/api/cargas', { method: 'POST', body: JSON.stringify({ reemplazar }) });
    limpiarCache(); toast(`Carga lista (${r.loteId}): ${r.filasCargadas.ventas} ventas, ${r.filasCargadas.clientes} clientes.`);
    location.hash = 'resumen'; navegar(); pieMenu();
  } catch (e) {
    if (e.status === 409 && !reemplazar && /reemplazar/.test(e.message) &&
        confirm('La base ya tiene datos. ¿Borrar los datos actuales y volver a cargar el paquete? (El historial de cargas se conserva.)'))
      return cargarPaquete(boton, true);
    toast(e.message, 8000);
  } finally { boton.disabled = false; boton.textContent = 'Cargar datos ahora'; }
}

// ------------------------------------------------------------------ arranque
$('#hamburguesa').onclick = () => { $('#menu').classList.toggle('abierto'); $('#velo').classList.toggle('visible'); };
$('#velo').onclick = () => { $('#menu').classList.remove('abierto'); $('#velo').classList.remove('visible'); };
$('#buscarCliente').addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  let v = e.target.value.trim().toUpperCase(); if (!v) return;
  if (/^\d+$/.test(v)) v = 'CLI' + v.padStart(3, '0');
  location.hash = 'ficha/' + v; e.target.value = ''; e.target.blur();
});
new MutationObserver(() => pintarIconos(main())).observe(main(), { childList: true, subtree: true });
pintarIconos();
window.addEventListener('hashchange', navegar);
window.addEventListener('DOMContentLoaded', () => { pieMenu(); navegar(); });
