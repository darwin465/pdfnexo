import type { Dict } from './types';

export const es: Dict = {
  siteName: 'PDFNexo',
  tagline: 'Todas tus herramientas PDF en un solo lugar',
  meta: {
    homeTitle: 'PDFNexo: herramientas PDF gratis online',
    homeDescription: 'Une, comprime, divide y convierte archivos PDF gratis, sin registro y desde tu navegador. Todas tus herramientas PDF en un solo lugar.',
  },
  nav: { home: 'Inicio', tools: 'Herramientas', faq: 'Preguntas frecuentes', menu: 'Abrir menú', skip: 'Saltar al contenido', language: 'Idioma' },
  hero: {
    title: 'Todas tus herramientas PDF en un solo lugar',
    subtitle: 'Une, comprime, divide y convierte archivos PDF fácilmente. Gratis, rápido y seguro.',
    cta: 'Ver todas las herramientas',
    popular: 'Herramientas populares',
  },
  search: { label: 'Buscar herramienta', placeholder: 'Busca una herramienta: unir, dividir, rotar…', none: 'No hay herramientas que coincidan con tu búsqueda.', count: '{n} herramientas encontradas' },
  catalog: { title: 'Todas las herramientas PDF', subtitle: 'Elige la herramienta que necesitas. Sin registro y sin instalar nada.' },
  status: { soon: 'Próximamente' },
  benefits: {
    title: 'Hecho para trabajar sin fricción',
    items: [
      { icon: 'gift', title: 'Gratis', text: 'Todas las herramientas son gratuitas, sin límites ocultos ni marcas de agua propias.' },
      { icon: 'pointer', title: 'Fácil de usar', text: 'Arrastra tu archivo, ajusta lo justo y descarga el resultado en segundos.' },
      { icon: 'user-x', title: 'Sin registro', text: 'No necesitas crear una cuenta ni dejar tu correo para usar PDFNexo.' },
      { icon: 'shield', title: 'Privacidad', text: 'Tus documentos se procesan en tu propio navegador siempre que es técnicamente posible.' },
      { icon: 'smartphone', title: 'Compatible con móviles', text: 'Diseñado primero para el móvil y optimizado también para tablet y escritorio.' },
    ],
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿PDFNexo es gratis?', a: 'Sí. Las herramientas son gratuitas y el sitio se financia con publicidad.' },
      { q: '¿Necesito registrarme?', a: 'No. Puedes usar las herramientas directamente, sin crear una cuenta.' },
      { q: '¿Se suben mis archivos a un servidor?', a: 'El objetivo de PDFNexo es procesar tus documentos localmente en tu navegador, sin subirlos a servicios externos. Cuando una herramienta lo requiera de forma excepcional, se indicará de forma explícita en su página.' },
      { q: '¿Funciona en el móvil?', a: 'Sí. La interfaz está diseñada para funcionar en móviles, tablets y ordenadores.' },
    ],
  },
  footer: { tools: 'Herramientas', language: 'Idioma', rights: 'Todos los derechos reservados.' },
  toolPage: {
    breadcrumbHome: 'Inicio',
    devTitle: 'Esta herramienta está en desarrollo',
    devText: 'Todavía no está disponible. Estamos construyéndola y la publicaremos cuando funcione de forma fiable. Mientras tanto, explora el resto de herramientas.',
    back: 'Volver a las herramientas',
    related: 'Otras herramientas',
  },
  tools: {
    merge: { name: 'Unir PDF', short: 'Combina varios PDF en un solo documento.', title: 'Unir PDF gratis online | PDFNexo', description: 'Une varios archivos PDF en uno solo, gratis y sin registro. Ordena los documentos a tu gusto y descarga el resultado.' },
    compress: { name: 'Comprimir PDF', short: 'Reduce el peso de tus documentos PDF.', title: 'Comprimir PDF online gratis | PDFNexo', description: 'Reduce el tamaño de tus archivos PDF para enviarlos o guardarlos más fácilmente, gratis y sin registro.' },
    split: { name: 'Dividir PDF', short: 'Separa un PDF en varios documentos.', title: 'Dividir PDF gratis online | PDFNexo', description: 'Divide un PDF por rangos de páginas o separa cada página en un archivo independiente, gratis y sin registro.' },
    'jpg-to-pdf': { name: 'JPG a PDF', short: 'Convierte imágenes JPG en un documento PDF.', title: 'Convertir JPG a PDF gratis | PDFNexo', description: 'Convierte una o varias imágenes JPG en un único PDF, gratis y desde tu navegador.' },
    'pdf-to-jpg': { name: 'PDF a JPG', short: 'Convierte las páginas de un PDF en imágenes.', title: 'Convertir PDF a JPG gratis | PDFNexo', description: 'Convierte cada página de un PDF en una imagen JPG, gratis y sin registro.' },
    rotate: { name: 'Rotar PDF', short: 'Gira páginas de un PDF a la orientación correcta.', title: 'Rotar PDF online gratis | PDFNexo', description: 'Rota una o todas las páginas de un PDF y descarga el documento corregido, gratis y sin registro.' },
    extract: { name: 'Extraer páginas PDF', short: 'Guarda solo las páginas que necesitas.', title: 'Extraer páginas de un PDF gratis | PDFNexo', description: 'Extrae las páginas que necesitas de un PDF y crea un documento nuevo, gratis y sin registro.' },
    watermark: { name: 'Marca de agua PDF', short: 'Añade texto o una marca a tus páginas.', title: 'Añadir marca de agua a PDF gratis | PDFNexo', description: 'Añade una marca de agua de texto a tus documentos PDF, gratis y desde tu navegador.' },
    organize: { name: 'Reorganizar PDF', short: 'Cambia el orden de las páginas de un PDF.', title: 'Reorganizar páginas de PDF gratis | PDFNexo', description: 'Cambia el orden, elimina o duplica páginas de un PDF de forma visual, gratis y sin registro.' },
    protect: { name: 'Proteger PDF', short: 'Cifra tu PDF con contraseña.', title: 'Proteger PDF con contraseña gratis | PDFNexo', description: 'Protege tu PDF con una contraseña mediante cifrado real, gratis y desde tu navegador.' },
  },
};
