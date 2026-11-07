import type { GuidesDict } from './guides.types';

export const guidesEs: GuidesDict = {
  base: 'guias',
  sectionTitle: 'Guías y consejos',
  sectionSubtitle: 'Respuestas claras para los problemas más habituales con PDF.',
  read: 'Leer guía',
  breadcrumb: 'Guías',
  tryTool: 'Probar la herramienta',
  guides: {
    'merge-guide': {
      slug: 'como-unir-archivos-pdf',
      title: 'Cómo unir archivos PDF paso a paso',
      description: 'Aprende a combinar varios PDF en un solo documento, ordenar bien las páginas y evitar los problemas más comunes.',
      intro: 'Unir PDF es útil para enviar un expediente completo, entregar un trabajo o archivar facturas. Estos son los pasos y las comprobaciones que evitan sorpresas.',
      tool: 'merge',
      sections: [
        { h: 'Antes de empezar', p: ['Reúne los archivos y comprueba que ninguno esté protegido con contraseña: los documentos cifrados no se pueden combinar hasta que se les quita la protección.', 'Pon nombres que te ayuden a recordar el orden, por ejemplo «01-portada», «02-contrato». Aunque puedes reordenarlos después, ahorra tiempo.'] },
        { h: 'Ordenar los documentos', p: ['El orden de la lista es el orden del resultado: el primer archivo aporta las primeras páginas. Usa las flechas para subir o bajar cada documento hasta que la secuencia sea la correcta.'] },
        { h: 'Revisar el resultado', p: ['Abre el PDF final y recorre las páginas. Comprueba que no falta ninguna y que la orientación es la esperada. Si alguna página sale girada, puedes corregirla después con la herramienta de rotar.'] },
        { h: 'Cuando el archivo pesa demasiado', p: ['Si el documento unido es muy grande para enviarlo por correo, prueba a comprimirlo. Ten en cuenta que la compresión fuerte convierte las páginas en imágenes y el texto deja de ser seleccionable.'] },
      ],
    },
    'reduce-size-guide': {
      slug: 'como-reducir-el-peso-de-un-pdf',
      title: 'Cómo reducir el peso de un PDF sin sorpresas',
      description: 'Por qué pesan tanto algunos PDF, qué opciones hay para reducirlos y qué se pierde con cada una.',
      intro: 'Un PDF pesado es un problema al enviarlo por correo o subirlo a un portal. Entender de dónde viene el peso ayuda a elegir bien cómo reducirlo.',
      tool: 'compress',
      sections: [
        { h: 'De dónde viene el peso', p: ['En la mayoría de los casos, el peso lo ponen las imágenes: escaneos a alta resolución o fotografías incrustadas. Las fuentes incrustadas y los elementos duplicados también suman, pero suelen pesar menos.'] },
        { h: 'Optimizar sin perder calidad', p: ['Reorganizar la estructura interna del archivo no cambia imágenes ni textos, así que es seguro. El inconveniente es que el ahorro suele ser pequeño, y en algunos documentos nulo.'] },
        { h: 'Compresión fuerte', p: ['Convertir cada página en una imagen de menor resolución reduce mucho el peso en documentos con muchas imágenes. A cambio, el texto deja de ser seleccionable y no se puede buscar. Elige el nivel según el uso: pantalla, correo o impresión.'] },
        { h: 'Qué esperar', p: ['No existe un porcentaje garantizado: depende del contenido. Un buen método es comparar el tamaño antes y después, y conservar el original por si necesitas más calidad.'] },
      ],
    },
  },
};
