import type { Legal } from './legal.types';

/**
 * Textos informativos. Los datos del titular se leen de PUBLIC_OPERATOR_NAME y PUBLIC_CONTACT_EMAIL.
 * Requieren revisión por un profesional jurídico antes de publicarse.
 */
export const legalEs: Legal = {
  donate: { button: 'Apoyar PDFNexo', text: 'PDFNexo es gratis y sin registro. Si te ha sido útil, puedes ayudarnos a mantenerlo con una donación voluntaria.' },
  adLabel: 'Publicidad',
  updated: 'Última actualización: noviembre de 2026',
  label: { about: 'Acerca de nosotros', contact: 'Contacto', privacy: 'Política de privacidad', terms: 'Términos y condiciones', cookies: 'Cookies' },
  consent: {
    title: 'Publicidad y cookies',
    text: 'PDFNexo se financia con publicidad de Google AdSense, que puede usar cookies e identificadores. Solo los activaremos si aceptas. Las herramientas funcionan igual si rechazas.',
    accept: 'Aceptar', reject: 'Rechazar', more: 'Más información',
  },
  cookieSettings: { button: 'Cambiar mi elección', hint: 'Al pulsar el botón se borra tu elección actual y la página se recarga para volver a preguntarte.' },
  contactEmailLabel: 'Correo electrónico',
  contactMissing: 'El correo de contacto aún no está configurado (variable PUBLIC_CONTACT_EMAIL).',
  operatorMissing: '[Titular del sitio: define PUBLIC_OPERATOR_NAME]',
  pages: {
    about: {
      slug: 'acerca-de',
      title: 'Acerca de PDFNexo',
      description: 'Conoce PDFNexo: herramientas PDF gratuitas que se ejecutan en tu navegador, sin registro y pensadas para respetar tu privacidad.',
      sections: [
        { h: 'Qué es PDFNexo', p: ['PDFNexo reúne en un solo lugar las herramientas PDF que más se necesitan en el día a día: unir, dividir, comprimir, convertir, rotar, reorganizar, proteger y añadir marcas de agua.', 'Son gratuitas, no requieren registro y funcionan en móviles, tablets y ordenadores.'] },
        { h: 'Tus archivos se quedan contigo', p: ['Las herramientas procesan tus documentos en tu propio navegador. Los archivos no se suben a nuestros servidores para ser procesados.'] },
        { h: 'Cómo se financia', p: ['El sitio se sostiene con publicidad. Mostramos anuncios solo si das tu consentimiento y procuramos que no interfieran con el uso de las herramientas.'] },
      ],
    },
    contact: {
      slug: 'contacto',
      title: 'Contacto',
      description: 'Ponte en contacto con el equipo de PDFNexo para dudas, sugerencias o ejercer tus derechos de privacidad.',
      sections: [
        { h: 'Escríbenos', p: ['Puedes contactar con nosotros para resolver dudas, comunicar errores, proponer mejoras o ejercer tus derechos sobre tus datos personales.', 'Por favor, no adjuntes documentos privados en tus mensajes.'] },
      ],
    },
    privacy: {
      slug: 'privacidad',
      title: 'Política de privacidad',
      description: 'Cómo trata PDFNexo tus datos: tus archivos se procesan en tu navegador y la publicidad solo se activa con tu consentimiento.',
      sections: [
        { h: 'Responsable', p: ['El responsable de este sitio es {operator}. Contacto: {email}.'] },
        { h: 'Tus archivos', p: ['Las herramientas PDF procesan los documentos localmente en tu navegador. No subimos, almacenamos ni registramos el contenido de tus archivos ni las contraseñas que introduces. Si cierras la página, el contenido desaparece de la memoria del navegador.'] },
        { h: 'Datos que sí se tratan', p: ['El proveedor de alojamiento puede registrar datos técnicos de cada visita (dirección IP, navegador, fecha y página solicitada) por motivos de seguridad y funcionamiento del servicio.', 'Guardamos en tu dispositivo, mediante almacenamiento local, tu elección sobre la publicidad y cookies.'] },
        { h: 'Publicidad', p: ['Si aceptas, Google AdSense puede utilizar cookies e identificadores para mostrar anuncios y medir su rendimiento. La base legal es tu consentimiento, que puedes retirar en cualquier momento desde la página de Cookies. Más información sobre cómo usa Google los datos en las políticas de privacidad de Google.'] },
        { h: 'Tus derechos', p: ['Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos escribiendo al correo de contacto. También puedes presentar una reclamación ante la autoridad de protección de datos de tu país.'] },
        { h: 'Menores', p: ['El servicio no está dirigido a menores de 14 años.'] },
        { h: 'Cambios', p: ['Podemos actualizar esta política. La fecha de la última revisión figura al principio de la página.'] },
      ],
    },
    terms: {
      slug: 'terminos',
      title: 'Términos y condiciones',
      description: 'Condiciones de uso de PDFNexo: uso permitido, responsabilidad sobre los archivos y limitación de garantías.',
      sections: [
        { h: 'Aceptación', p: ['Al usar PDFNexo aceptas estos términos. Si no estás de acuerdo, no utilices el sitio.'] },
        { h: 'Uso permitido', p: ['Puedes usar las herramientas con documentos sobre los que tengas derecho a trabajar. No está permitido usar el sitio para actividades ilícitas ni para intentar dañar o sobrecargar el servicio.'] },
        { h: 'Tus documentos', p: ['Eres responsable del contenido que procesas. Te recomendamos conservar siempre una copia de los originales: los resultados se generan en tu dispositivo y pueden no ser adecuados para todos los casos.'] },
        { h: 'Sin garantías', p: ['El servicio se ofrece «tal cual», sin garantía de disponibilidad ni de que los resultados estén libres de errores. En la medida permitida por la ley, no respondemos de daños derivados del uso del sitio.'] },
        { h: 'Propiedad intelectual', p: ['El diseño, los textos y el código de PDFNexo pertenecen a su titular o se usan bajo licencia. Tus documentos siguen siendo tuyos.'] },
        { h: 'Cambios', p: ['Podemos modificar estos términos y el servicio. El uso continuado implica la aceptación de los cambios.'] },
      ],
    },
    cookies: {
      slug: 'cookies',
      title: 'Política de cookies',
      description: 'Qué cookies y almacenamiento local usa PDFNexo, para qué sirven y cómo cambiar tu elección.',
      sections: [
        { h: 'Almacenamiento técnico', p: ['PDFNexo guarda en tu navegador una única preferencia: si aceptas o rechazas la publicidad. No requiere consentimiento por ser necesaria para recordar tu elección.'] },
        { h: 'Publicidad (solo con consentimiento)', p: ['Si aceptas, Google AdSense puede establecer cookies o usar identificadores similares para mostrar anuncios y medir su eficacia. Si rechazas, no se carga el código de publicidad.'] },
        { h: 'Cómo cambiar tu elección', p: ['Puedes borrar tu elección con el botón de esta página. También puedes eliminar cookies y datos del sitio desde los ajustes de tu navegador.'] },
      ],
    },
  },
};
