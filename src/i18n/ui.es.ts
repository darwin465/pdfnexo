import type { Ui } from './ui.types';

export const uiEs: Ui = {
  drop: {
    dragHere: 'Arrastra tus archivos aquí', dropNow: 'Suelta para añadir', or: 'o',
    chooseFiles: 'Seleccionar archivos', chooseFile: 'Seleccionar archivo',
    hintPdf: 'Archivos PDF · máx. {max} MB cada uno', hintImages: 'JPG o PNG · máx. {max} MB cada una',
  },
  actions: {
    remove: 'Quitar', moveUp: 'Subir', moveDown: 'Bajar', moveLeft: 'Mover a la izquierda', moveRight: 'Mover a la derecha',
    reset: 'Empezar de nuevo', download: 'Descargar', downloadAll: 'Descargar todo (ZIP)', rotate: 'Girar', deletePage: 'Eliminar página',
  },
  common: {
    pages: '{n} páginas', processing: 'Procesando… {p}%', ready: '¡Listo!', filesReady: '{n} archivos listos para descargar',
    local: 'Tu archivo se procesa en tu dispositivo y no se sube a ningún servidor.', fileList: 'Archivos seleccionados',
    errorTitle: 'No se pudo completar la operación', invalidFile: 'Archivo no válido',
  },
  errors: {
    type: 'El tipo de archivo no es compatible.', size: 'El archivo supera el tamaño máximo permitido.', empty: 'El archivo está vacío.',
    signature: 'El contenido no corresponde a un archivo válido de este tipo.',
    encrypted: 'El PDF está protegido con contraseña. Quita la protección antes de usarlo aquí.',
    corrupt: 'No se pudo leer el archivo. Puede estar dañado.',
    'range-empty': 'Escribe un valor para continuar.', 'range-invalid': 'El rango de páginas no es válido. Ejemplo: 1-3, 5, 8-',
    charset: 'El texto contiene caracteres no admitidos. Usa letras latinas, números y signos comunes.',
    memory: 'No hay memoria suficiente para procesar este archivo. Prueba con uno más pequeño.',
    tooMany: 'El resultado tendría demasiados archivos o páginas para procesarlo en el navegador.',
    noFiles: 'Selecciona al menos un archivo.', minFiles: 'Necesitas al menos dos archivos.',
    engine: 'No se pudo cargar el motor necesario. Recarga la página e inténtalo de nuevo.',
    unknown: 'Ha ocurrido un error inesperado. Inténtalo de nuevo.',
  },
  merge: { hint: 'Añade al menos 2 PDF y ordénalos con las flechas.', button: 'Unir PDF' },
  split: {
    mode: 'Cómo dividir', modeRanges: 'Por rangos', modeEach: 'Una página por archivo', modeEvery: 'Cada N páginas',
    rangesLabel: 'Rangos de páginas', rangesHelp: 'Cada rango separado por comas genera un archivo. Ejemplo: 1-3, 5, 8-',
    everyLabel: 'Páginas por archivo', button: 'Dividir PDF',
  },
  rotate: {
    angle: 'Giro', a90: '90° a la derecha', a180: '180°', a270: '90° a la izquierda', applyTo: 'Aplicar a',
    all: 'Todas las páginas', selected: 'Páginas concretas', pagesLabel: 'Páginas', pagesHelp: 'Ejemplo: 1-3, 5', button: 'Rotar PDF',
  },
  jpg: { pageSize: 'Tamaño de página', fit: 'Igual que la imagen', a4: 'A4 con margen', button: 'Crear PDF', hint: 'Añade imágenes JPG o PNG y ordénalas con las flechas.' },
  pdf2jpg: {
    quality: 'Calidad JPG', dpi: 'Resolución', low: '72 DPI (pantalla)', medium: '150 DPI (recomendada)', high: '200 DPI (alta)',
    pagesLabel: 'Páginas (opcional)', pagesHelp: 'Vacío = todas. Ejemplo: 1-3, 5', button: 'Convertir a JPG',
  },
  extract: { pagesLabel: 'Páginas a extraer', pagesHelp: 'Se guardarán en el orden indicado. Ejemplo: 1-3, 5, 8-', button: 'Extraer páginas' },
  watermark: {
    text: 'Texto de la marca de agua', placeholder: 'Ej.: CONFIDENCIAL', size: 'Tamaño', opacity: 'Opacidad', color: 'Color',
    gray: 'Gris', red: 'Rojo', blue: 'Azul', black: 'Negro', position: 'Orientación', diagonal: 'Diagonal', horizontal: 'Horizontal', button: 'Añadir marca de agua',
  },
  organize: {
    hint: 'Mueve, gira o elimina páginas. El resultado seguirá este orden.', kept: '{n} páginas en el resultado',
    button: 'Guardar PDF', noThumbs: 'Este PDF tiene muchas páginas: se muestran sin miniatura.', page: 'Página {n}',
  },
  compress: {
    mode: 'Método', light: 'Optimizar estructura', lightHelp: 'Sin pérdida de calidad. El ahorro suele ser pequeño o nulo.',
    strong: 'Compresión fuerte', strongHelp: 'Convierte las páginas en imágenes: reduce mucho el peso, pero el texto deja de ser seleccionable.',
    level: 'Nivel', low: 'Máxima reducción', medium: 'Equilibrado', high: 'Mejor calidad', button: 'Comprimir PDF',
    before: 'Original', after: 'Resultado', saved: 'Reducción: {p}%',
    noReduction: 'No se ha podido reducir el tamaño de este archivo con este método, así que no se ofrece descarga. Prueba con otro nivel o método.',
  },
  protect: {
    password: 'Contraseña', confirm: 'Repite la contraseña', show: 'Mostrar contraseña', mismatch: 'Las contraseñas no coinciden.',
    tooShort: 'Usa al menos 6 caracteres.', note: 'Cifrado AES-256. Si olvidas la contraseña no se puede recuperar el documento.', button: 'Proteger PDF',
  },
};
