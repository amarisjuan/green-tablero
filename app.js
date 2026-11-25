/* Tablero Comercial · Green Services. Consume la API del backend (mismo servidor). */
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const main = () => $('#contenido');
const COLORES = { 'Frecuente': '#0F7B5F', 'Ocasional': '#2F6FB3', 'En riesgo': '#D69E2E', 'Frío': '#C2364A', 'Nuevo': '#6D5BD0', 'Sin compras': '#A3ACB9' };
const COLOR_ALERTA = { 'Renovación vencida': '#C2364A', 'Cliente valioso en riesgo': '#D69E2E', 'Renovación próxima': '#2F6FB3', 'Reactivación': '#6D5BD0', 'Alta probabilidad de compra': '#0F7B5F' };
const NOMBRES_SECCION = { llamada: 'Llamada del día', resumen: 'Resumen comercial', clientes: 'Clientes y segmentos', ficha: 'Ficha del cliente', alertas: 'Alertas del mes', renovaciones: 'Renovaciones', envios: 'Envíos programados' };

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
  'Ventas confirmadas': ['money', '#0F7B5F'], 'Número de ventas': ['receipt', '#2F6FB3'], 'Clientes activos': ['users', '#0F7B5F'],
  'Clientes en riesgo o fríos': ['snow', '#C2364A'], 'Alertas de prioridad alta': ['alert', '#D69E2E'],
  'Clientes con base instalada': ['box', '#0F7B5F'], 'Renovaciones próximas': ['calendar', '#2F6FB3'], 'Coberturas vencidas': ['clock', '#C2364A'],
  'Segmento': ['target', '#0F7B5F'], 'Ventas históricas': ['money', '#0F7B5F'], 'Ventas 12 meses': ['chart', '#2F6FB3'],
  'Días sin comprar': ['clock', '#D69E2E'], 'Prob. de compra en 30 días': ['pulse', '#6D5BD0'],
  'Vencidas': ['clock', '#C2364A'], 'Próximas': ['calendar', '#D69E2E'], 'Vigentes': ['check', '#0F7B5F'],
  'Renovación vencida': ['clock', '#C2364A'], 'Cliente valioso en riesgo': ['star', '#D69E2E'], 'Renovación próxima': ['calendar', '#2F6FB3'],
  'Reactivación': ['refresh', '#6D5BD0'], 'Próximo envío': ['send', '#0F7B5F'], 'Modo': ['check', '#D69E2E'], 'Clientes con correo': ['mail', '#2F6FB3'], 'Correos enviados': ['send', '#0F7B5F'], 'Renovaciones por cerrar': ['refresh', '#2F6FB3'], 'Clientes para hoy': ['phone', '#0F7B5F'], 'Valor en juego': ['money', '#0F7B5F'],
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
  const [ic, tono] = KPI_ESTILO[t] || ['chart', '#0F7B5F'];
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
    Object.assign(d.plugins.tooltip, { backgroundColor: '#0A2E25', titleColor: '#fff', bodyColor: '#E3EFEA', padding: 12, cornerRadius: 10,
      titleFont: { weight: '700', family: 'Plus Jakarta Sans, Inter, sans-serif' }, displayColors: true, boxPadding: 4 });
    d.datasets.bar.maxBarThickness = 34; d.datasets.bar.borderRadius = 6; d.datasets.bar.borderSkipped = false;
    d.elements.arc.borderWidth = 3; d.elements.arc.borderColor = '#fff'; d.elements.point.radius = 5; d.elements.point.hoverRadius = 7;
    d.scale.grid.drawTicks = false; d.scale.border = { display: false }; d.scale.ticks.padding = 8;
  }
  graficas.push(new Chart(document.getElementById(id), config));
}
// Texto en el centro de las donas.
const textoCentro = (titulo, valor) => ({ id: 'centro', afterDraw(c) {
  const { ctx, chartArea: a } = c; const x = (a.left + a.right) / 2, y = (a.top + a.bottom) / 2;
  ctx.save(); ctx.textAlign = 'center'; ctx.fillStyle = '#0A2E25'; ctx.font = '800 30px "Plus Jakarta Sans", Inter, sans-serif'; ctx.fillText(valor, x, y + 6);
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
const secciones = { llamada, resumen, clientes, ficha, alertas, renovaciones, envios };

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
      <div class="tarjeta llamada" style="--tono:${COLOR_ALERTA[x.razon] || '#0F7B5F'}">
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
  const [r, mensual, al] = await Promise.all([dato('resumen', '/api/resumen'), dato('mensual', '/api/ingresos/mensual'), dato('alertas', '/api/alertas')]);
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
      <div class="tarjeta"><h2>Ventas por mes</h2><p class="sub">Ventas confirmadas de cada mes, en pesos.</p><div class="grafica"><canvas id="gMes"></canvas></div></div>
      <div class="tarjeta"><h2>Clientes por segmento</h2><p class="sub">Según días sin comprar, antigüedad y frecuencia.</p><div class="grafica"><canvas id="gSeg"></canvas></div></div>
    </div>
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
  grafica('gMes', { type: 'bar', data: { labels: mensual.map(m => MESES[+m.mes.slice(5, 7) - 1] + ' ' + m.mes.slice(2, 4)), datasets: [
      { label: 'Ventas confirmadas', data: mensual.map(m => m.ingresoCop), backgroundColor: degradado('gMes', '#23A47F', '#0A5E48'), hoverBackgroundColor: '#0A5E48' }] },
    options: { maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, autoSkipPadding: 10 } }, y: { ticks: { callback: v => pesosCorto(v), maxTicksLimit: 6 } } }, plugins: { legend: { display: false },
      tooltip: { callbacks: { label: c => `${c.dataset.label}: ${pesos(c.raw)}` } } } } });
  const segs = Object.keys(s);
  grafica('gSeg', { type: 'doughnut', data: { labels: segs, datasets: [{ data: segs.map(k => s[k]), backgroundColor: segs.map(k => COLORES[k] || '#999'), hoverOffset: 6 }] },
    options: { maintainAspectRatio: false, cutout: '72%', plugins: { legend: { position: 'bottom' } } }, plugins: [textoCentro('clientes', segs.reduce((a, k) => a + s[k], 0))] });
  const tipos = TIPOS_ALERTA.filter(k => r.alertasPorTipo[k]);
  grafica('gAl', { type: 'bar', data: { labels: tipos, datasets: [{ data: tipos.map(k => r.alertasPorTipo[k]), backgroundColor: tipos.map(k => COLOR_ALERTA[k]) }] },
    options: { indexAxis: 'y', maintainAspectRatio: false, scales: { y: { grid: { display: false } } }, plugins: { legend: { display: false } } } });
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
  main().innerHTML = hero('Clientes y segmentos', 'Cuántos clientes hay en cada segmento, cuánto pesan y quién se está enfriando.', 'Cartera') +
    `<div class="kpis">${Object.keys(COLORES).filter(k => cuenta[k]).map(k => kpi(k, cuenta[k], pct(cuenta[k] / lista.length) + ' · ciclo de compra')).join('')}</div>
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
