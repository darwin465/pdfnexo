import type { ToolId } from '../data/tools';
import type { ToolContent } from './ui.types';

export const contentEs: Record<ToolId, ToolContent> = {
  merge: {
    steps: ['Selecciona o arrastra al menos dos archivos PDF.', 'Ordénalos con las flechas hasta que queden como quieres.', 'Pulsa «Unir PDF» y descarga el documento combinado.'],
    faq: [
      { q: '¿Cuántos PDF puedo unir a la vez?', a: 'Hasta 30 archivos de 100 MB cada uno. Si tu dispositivo se queda sin memoria, une los documentos por tandas.' },
      { q: '¿Se conservan los enlaces y marcadores?', a: 'Se conservan las páginas y su contenido. Algunos elementos globales, como los marcadores del documento original, pueden no trasladarse al PDF unido.' },
      { q: '¿Puedo unir PDF protegidos con contraseña?', a: 'No. Debes quitar antes la protección con la herramienta con la que la añadiste.' },
    ],
  },
  compress: {
    steps: ['Selecciona un PDF.', 'Elige el método: optimizar estructura (sin pérdida) o compresión fuerte (convierte páginas en imágenes).', 'Pulsa «Comprimir PDF». Solo se ofrece la descarga si el resultado pesa menos que el original.'],
    faq: [
      { q: '¿Cuánto se reducirá mi PDF?', a: 'Depende del contenido. No podemos garantizar un porcentaje: la herramienta te muestra el tamaño antes y después y solo ofrece el resultado si es menor.' },
      { q: '¿Qué pierdo con la compresión fuerte?', a: 'Las páginas se convierten en imágenes, por lo que el texto deja de poder seleccionarse o buscarse. Úsala cuando solo necesites un documento ligero para enviar o imprimir.' },
      { q: '¿Por qué «optimizar estructura» apenas reduce el peso?', a: 'Reorganiza el archivo sin tocar las imágenes ni las fuentes. Es seguro pero el ahorro suele ser pequeño.' },
    ],
  },
  split: {
    steps: ['Selecciona un PDF.', 'Elige cómo dividirlo: por rangos, una página por archivo o cada N páginas.', 'Pulsa «Dividir PDF» y descarga los archivos, uno a uno o en un ZIP.'],
    faq: [
      { q: '¿Cómo escribo los rangos?', a: 'Separa los rangos con comas. «1-3, 5, 8-» crea tres archivos: páginas 1 a 3, página 5 y de la 8 al final.' },
      { q: '¿Qué pasa si mi PDF tiene muchas páginas?', a: 'Puedes dividirlo en hasta 500 archivos. Para resultados muy grandes, usa la descarga en ZIP.' },
      { q: '¿Se pierde calidad al dividir?', a: 'No. Las páginas se copian tal cual, sin recomprimir.' },
    ],
  },
  'jpg-to-pdf': {
    steps: ['Selecciona o arrastra tus imágenes JPG o PNG.', 'Ordénalas y elige el tamaño de página.', 'Pulsa «Crear PDF» y descarga el documento.'],
    faq: [
      { q: '¿Qué formatos de imagen admite?', a: 'JPG, JPEG y PNG, hasta 25 MB por imagen.' },
      { q: '¿Las fotos del móvil salen giradas?', a: 'No. Leemos la orientación de la foto y la corregimos antes de crear el PDF.' },
      { q: '¿Se reduce la calidad de las imágenes?', a: 'Las imágenes se incrustan sin recomprimir. Solo se vuelven a codificar las fotos JPG que necesitan corregir su orientación.' },
    ],
  },
  'pdf-to-jpg': {
    steps: ['Selecciona un PDF.', 'Elige la resolución y, si quieres, las páginas a convertir.', 'Pulsa «Convertir a JPG» y descarga las imágenes, una a una o en un ZIP.'],
    faq: [
      { q: '¿Qué resolución elegir?', a: '72 DPI sirve para ver en pantalla; 150 DPI es un buen equilibrio; 200 DPI da más detalle pero genera archivos mayores.' },
      { q: '¿Hay límite de páginas?', a: 'Se pueden convertir hasta 150 páginas por operación para no agotar la memoria del navegador.' },
      { q: '¿Y si mi PDF tiene transparencias?', a: 'Las imágenes JPG no admiten transparencia, así que las páginas se dibujan sobre fondo blanco.' },
    ],
  },
  rotate: {
    steps: ['Selecciona un PDF.', 'Elige el giro y si se aplica a todas las páginas o solo a algunas.', 'Pulsa «Rotar PDF» y descarga el resultado.'],
    faq: [
      { q: '¿Puedo girar solo una página?', a: 'Sí. Elige «Páginas concretas» e indica los números, por ejemplo «3» o «2-4, 7».' },
      { q: '¿El giro es permanente?', a: 'Se guarda en el archivo, de modo que cualquier lector de PDF mostrará las páginas con la nueva orientación.' },
      { q: '¿Se recomprime el contenido?', a: 'No. Solo cambia la orientación de las páginas.' },
    ],
  },
  extract: {
    steps: ['Selecciona un PDF.', 'Escribe las páginas que quieres conservar.', 'Pulsa «Extraer páginas» y descarga el nuevo PDF.'],
    faq: [
      { q: '¿En qué orden quedan las páginas?', a: 'En el orden en que las escribes. «5, 1-2» crea un PDF que empieza por la página 5.' },
      { q: '¿Se modifica mi archivo original?', a: 'No. Se crea un documento nuevo y el original no se toca.' },
      { q: '¿Es lo mismo que dividir?', a: 'Dividir crea varios archivos; extraer reúne las páginas elegidas en un único PDF.' },
    ],
  },
  watermark: {
    steps: ['Selecciona un PDF.', 'Escribe el texto y ajusta tamaño, opacidad, color y orientación.', 'Pulsa «Añadir marca de agua» y descarga el PDF.'],
    faq: [
      { q: '¿Qué caracteres puedo usar?', a: 'Letras latinas con acentos, números y signos comunes. Emojis y alfabetos no latinos no están soportados todavía.' },
      { q: '¿Se puede quitar después?', a: 'La marca se dibuja sobre el contenido de las páginas. Guarda siempre una copia del original.' },
      { q: '¿Se aplica a todas las páginas?', a: 'Sí, a todas las páginas del documento.' },
    ],
  },
  organize: {
    steps: ['Selecciona un PDF y espera a que se muestren las páginas.', 'Mueve, gira o elimina páginas con los botones de cada miniatura.', 'Pulsa «Guardar PDF» y descarga el documento reorganizado.'],
    faq: [
      { q: '¿Puedo eliminar páginas?', a: 'Sí. Las páginas eliminadas no aparecerán en el PDF resultante.' },
      { q: '¿Por qué no veo miniaturas en documentos grandes?', a: 'Para cuidar la memoria, los PDF de más de 200 páginas se muestran sin miniatura, solo con su número.' },
      { q: '¿Funciona en el móvil?', a: 'Sí. Usa los botones de cada página en lugar de arrastrar.' },
    ],
  },
  protect: {
    steps: ['Selecciona un PDF.', 'Escribe una contraseña y repítela.', 'Pulsa «Proteger PDF» y descarga el documento cifrado.'],
    faq: [
      { q: '¿Qué tipo de cifrado se usa?', a: 'Cifrado AES de 256 bits real, no solo restricciones de edición. Sin la contraseña no se puede abrir el documento.' },
      { q: '¿Puedo recuperar la contraseña si la olvido?', a: 'No. Guárdala en un lugar seguro; nosotros no la almacenamos.' },
      { q: '¿Mi contraseña se envía a algún servidor?', a: 'No. El cifrado se realiza en tu navegador y ni la contraseña ni el archivo salen de tu dispositivo.' },
    ],
  },
};
