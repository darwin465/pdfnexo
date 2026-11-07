# PDFNexo

Herramientas PDF gratuitas, bilingües (ES/EN), con procesamiento local en el navegador.
Astro 5 · React 19 · TypeScript · Tailwind CSS 4 · pdf-lib · PDF.js · qpdf (WASM) · JSZip · Lucide.

## ⚠️ Estado real: escrito pero SIN probar en navegador

Este código se escribió en un entorno sin red: **no se ha ejecutado `npm install`, `astro build` ni ninguna herramienta en un navegador**.
Lo único verificado automáticamente son los tests de la lógica pura (`npm test`: rangos de páginas, validación de archivos, lectura EXIF) y la ausencia de errores de sintaxis TypeScript.
**Antes de desplegar**, sigue la lista de comprobación de abajo.

## Instalación

```bash
cp .env.example .env        # rellena SITE_URL y los datos del titular
npm install
npm test                    # tests de lógica
npm run dev                 # http://localhost:4321
npm run build               # astro check + astro build → dist/
npm run preview
```

`predev`/`prebuild` copian `qpdf.wasm` a `public/` (lo necesita «Proteger PDF»).

## Lista de comprobación antes de publicar

1. `npm run build` sin errores (si `astro check` falla, corrige tipos o avisa).
2. Probar **cada herramienta** con PDFs reales, en escritorio y móvil:
   - Unir: 2–3 PDF, comprobar orden y páginas.
   - Dividir: rangos `1-3, 5, 8-`, una por página, cada N; descarga ZIP.
   - Rotar / Extraer / Reorganizar / Marca de agua: abrir el resultado en otro lector.
   - JPG a PDF: foto de móvil (comprobar orientación) y un PNG.
   - PDF a JPG: PDF de varias páginas; ZIP.
   - Comprimir: probar ambos métodos; verificar que solo se ofrece descarga si pesa menos.
   - Proteger: abrir el resultado y confirmar que pide contraseña; **este es el punto más incierto**: depende del paquete `@neslinesli93/qpdf-wasm` (nombre/API/ubicación de `qpdf.wasm`). Si falla, la herramienta muestra un error de motor, no un resultado falso.
3. Archivos inválidos: un `.txt` renombrado a `.pdf`, un PDF con contraseña, un archivo vacío.
4. Lighthouse en la home y en una herramienta (LCP, CLS, JS inicial).
5. `view-source` de una página: title, canonical, hreflang, JSON-LD.

## Despliegue (Cloudflare)

Conexión con GitHub; build `npm run build`, deploy `npx wrangler deploy` (usa `wrangler.jsonc`, publica `dist/`). Variables de build: las de `.env.example` (`SITE_URL`, `PUBLIC_*`). `.node-version` fija Node 22. `npm run build:check` ejecuta además `astro check` (tipos). `public/_headers` aplica cabeceras básicas.
Tras desplegar: enviar `/sitemap-index.xml` en Google Search Console.

## Donaciones

Pon un enlace `https://` en `PUBLIC_DONATE_URL` y aparece un botón en el pie y en la home. Sin enlace, no se muestra nada.

## AdSense y consentimiento

- Sin `PUBLIC_ADSENSE_CLIENT` y su slot no se renderiza ningún anuncio ni banner.
- Huecos: tras el header (`header`), entre secciones (`content`), tras las instrucciones de cada herramienta (`tool`) y dentro de artículos (`article`). Ninguno está junto a botones de descarga.
- Los anuncios solo cargan con consentimiento (`ConsentBanner`). **Es un aviso propio y mínimo, no una CMP certificada por Google.** Para tráfico del EEE/Reino Unido necesitas integrar una CMP certificada (TCF) antes de activar AdSense.
- AdSense exige contenido propio y páginas legales completas: define `PUBLIC_OPERATOR_NAME` y `PUBLIC_CONTACT_EMAIL`.

## Páginas legales

Los textos de `src/i18n/legal.*.ts` son una base honesta con lo que hace el sitio, **no asesoramiento jurídico**. Haz que un profesional los revise y complete (jurisdicción, datos fiscales, etc.).

## Estructura

- `src/lib/pdf/` operaciones (pdf-lib, PDF.js, qpdf) · `src/lib/validation/` validación · `tests/` tests.
- `src/components/tools/` UI de herramientas (`workspaces/` una por herramienta, `shared/` común).
- `src/i18n/` textos ES/EN (UI, contenido SEO por herramienta, legales, guías) · `src/data/tools.ts` catálogo.
- Las bibliotecas PDF se cargan con `import()` solo al usar una herramienta.

## Limitaciones conocidas

- Marca de agua: solo caracteres latinos (fuente estándar).
- Compresión fuerte: rasteriza páginas (el texto deja de ser seleccionable); máx. 150 páginas.
- PDF protegidos con contraseña de entrada no se admiten (se avisa).
- Sin CSP estricta todavía (AdSense requiere una política amplia); revisar al activar anuncios.
