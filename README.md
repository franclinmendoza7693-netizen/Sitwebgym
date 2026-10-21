# Titán Gym Trujillo – Landing Page

Página web de una sola página (landing page) para **Titán Gym**, un gimnasio ubicado en Trujillo, Perú. Presenta el gimnasio, calcula el IMC del visitante, muestra el horario de clases, ofrece tres planes de membresía y lleva al cliente a **WhatsApp** para inscribirse o reservar una clase de prueba.

Es un proyecto **académico en equipo**: tres integrantes lo desarrollan en ramas separadas con **GitKraken**, y el profesor revisa el avance de cada uno a través del historial de commits.

> **Estado:** versión 2 completa · versión 3 en preparación (rama `Developer-V3`).

---

## Tabla de contenido

1. [Descripción general](#1-descripción-general)
2. [Tecnologías](#2-tecnologías)
3. [Estructura de archivos](#3-estructura-de-archivos)
4. [Cómo ejecutar el proyecto](#4-cómo-ejecutar-el-proyecto)
5. [Secciones de la página](#5-secciones-de-la-página)
6. [Funcionalidades en detalle](#6-funcionalidades-en-detalle)
7. [Diseño y estilos](#7-diseño-y-estilos)
8. [Arquitectura del código](#8-arquitectura-del-código)
9. [Bloques del proyecto y responsables](#9-bloques-del-proyecto-y-responsables)
10. [Documentación por integrante](#10-documentación-por-integrante)
11. [Flujo de trabajo con Git y GitKraken](#11-flujo-de-trabajo-con-git-y-gitkraken)
12. [Resolución de conflictos](#12-resolución-de-conflictos)
13. [Qué personalizar](#13-qué-personalizar)
14. [Accesibilidad y rendimiento](#14-accesibilidad-y-rendimiento)
15. [Limitaciones conocidas](#15-limitaciones-conocidas)
16. [Historial de versiones](#16-historial-de-versiones)
17. [Ideas para la versión 3](#17-ideas-para-la-versión-3)
18. [Equipo](#18-equipo)

---

## 1. Descripción general

**Objetivo del negocio:** convertir visitas en contactos. Todo el recorrido de la página termina en un mensaje de WhatsApp ya escrito (inscripción a un plan o reserva de clase de prueba).

**Objetivo académico:** practicar el trabajo colaborativo con Git: ramas por persona, commits pequeños y frecuentes, integración en una rama común, etiquetas de versión y resolución de conflictos.

**Características principales**

- Diseño oscuro con acentos dorados y **tema claro opcional** (se recuerda la elección).
- 100 % **responsive**: se adapta a celular, tablet y escritorio.
- **Calculadora de IMC** con indicador visual y recomendación.
- **Horario de clases por día** con pestañas (abre automáticamente el día de hoy).
- Tres **planes** con el ahorro frente al plan mensual y una ventana de inscripción.
- **Preguntas frecuentes** en acordeón.
- **Reserva de clase de prueba** por WhatsApp.
- Indicador **"Abierto ahora / Cerrado"** calculado con la hora de Perú.
- Animaciones suaves que se desactivan si el usuario prefiere menos movimiento.
- Sin servidor, sin base de datos y sin frameworks: solo HTML, CSS y JavaScript.

---

## 2. Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica (`header`, `main`, `section`, `footer`, `dialog`, `details`) |
| **CSS3** | Variables, Grid, Flexbox, animaciones, `@media`, tema claro/oscuro |
| **JavaScript (ES5/ES6, sin librerías)** | Interactividad. Cada bloque va en una función autoejecutable (IIFE) |
| **Google Fonts** | *Barlow Condensed* (títulos) y *Barlow* (texto) |
| **Unsplash** | Fotos de portada y de la sección Nosotros |
| **Google Maps (iframe)** | Mapa de ubicación |
| **WhatsApp (`wa.me`)** | Canal de contacto, inscripción y reservas |
| **Git + GitKraken** | Control de versiones y trabajo en equipo |

No hay `npm`, ni compilación, ni dependencias que instalar.

---

## 3. Estructura de archivos

```
proyecto/
├── index.html              Estructura de toda la página
├── README.md               Este archivo
├── css/
│   ├── base.css            Persona 1 · variables, botones, header, portada, IMC, extras
│   ├── contenido.css       Persona 2 · nosotros, entrenadores, clases, planes
│   └── comunidad.css       Persona 3 · FAQ, reserva, ubicación, footer, WhatsApp
└── js/
    ├── config.js           Compartido · número de WhatsApp y función TITAN.wa()
    ├── p1-portada.js       Persona 1
    ├── p2-contenido.js     Persona 2
    └── p3-comunidad.js     Persona 3
```

**Orden de carga** (importa): en `index.html` los CSS se enlazan en el `<head>` en el orden `base → contenido → comunidad`; los scripts van al final del `<body>` en el orden `config → p1 → p2 → p3`. `config.js` debe ir primero porque los demás usan `TITAN.wa()`.

**¿Por qué tres CSS y tres JS?** Para que cada integrante trabaje en sus propios archivos y se reduzcan los conflictos al unir ramas.

---

## 4. Cómo ejecutar el proyecto

1. Descarga o clona el repositorio.
2. Abre `index.html` con doble clic, o usa **Live Server** en VS Code (clic derecho → *Open with Live Server*).
3. Se necesita internet para ver las fuentes, las fotos de Unsplash y el mapa. Sin internet la página funciona, pero con tipografía y fondos de reserva.

Para probar en celular: en Chrome, `F12` → icono de dispositivos (o `Ctrl + Shift + M`) y elige un modelo.

---

## 5. Secciones de la página

Orden en que aparecen, con el `id` al que apuntan los enlaces:

| Orden | Sección | `id` | En el menú | Bloque |
|---|---|---|---|---|
| 1 | Portada con estadísticas | `#inicio` | Logo | P1-2 |
| 2 | Calculadora de IMC | `#imc` | — (enlace desde Planes) | P1-3 |
| 3 | Nosotros | `#nosotros` | Sí | P2-1 |
| 4 | Entrenadores | `#entrenadores` | — | P2-2 |
| 5 | Clases grupales | `#clases` | Sí | P2-3 |
| 6 | Planes | `#planes` | Sí (y botón "Inscríbete") | P2-4 |
| 7 | Preguntas frecuentes | `#faq` | Sí | P3-1 |
| 8 | Reserva de clase de prueba | `#reserva` | — (botón de la portada) | P3-2 |
| 9 | Ubicación y horarios | `#ubicacion` | Sí | P3-3 |
| 10 | Footer + botón de WhatsApp | — | — | P3-4 |

---

## 6. Funcionalidades en detalle

### 6.1 Tema claro / oscuro
- Botón con icono de luna/sol en el header.
- Cambia el atributo `data-theme` del `<html>` entre `dark` y `light`. Las variables de color se redefinen y toda la página cambia sin recargar.
- La elección se guarda en `localStorage` con la clave `titan-tema`. Un pequeño script en el `<head>` la aplica antes de pintar la página para evitar el parpadeo.
- También actualiza el `<meta name="theme-color">` (color de la barra del navegador en celulares).
- Todo el acceso a `localStorage` está dentro de `try/catch`: si el navegador lo bloquea, la página sigue funcionando.

### 6.2 Menú de navegación
- Header fijo con fondo translúcido y desenfoque.
- En pantallas de **900 px o menos** los enlaces se agrupan en un menú desplegable con botón hamburguesa (`aria-expanded` se actualiza).
- Al tocar un enlace el menú se cierra.
- El enlace de la sección que se está viendo se resalta en dorado (`IntersectionObserver`).
- Navegación suave con `scroll-behavior: smooth` y `scroll-padding-top` para que el header no tape los títulos.

### 6.3 Portada con contadores
- Título grande, texto, dos botones ("¡Inscríbete Hoy!" y "Clase de prueba") y cuatro estadísticas.
- Los números (+1,200 socios, 12 entrenadores, +1,000 m²) **cuentan desde 0** durante 1.6 segundos con una curva que frena al final. La animación comienza cuando el número entra en pantalla.
- Si el usuario prefiere menos movimiento, se muestra el valor final sin animar.

### 6.4 Calculadora de IMC
- Datos: peso (30–300 kg) y estatura (100–250 cm).
- Fórmula: **IMC = peso (kg) ÷ estatura (m)²**.
- Clasificación (OMS, adultos):

| IMC | Categoría |
|---|---|
| menor a 18.5 | Bajo peso |
| 18.5 a 24.9 | Peso normal |
| 25 a 29.9 | Sobrepeso |
| 30 o más | Obesidad |

- Muestra el número, la categoría, un indicador que se desplaza sobre una barra de colores (escala de 15 a 40) y una recomendación vinculada a los planes del gimnasio.
- Valida los datos y muestra un mensaje de error si son irreales.
- Aclara que es una **referencia general, no un diagnóstico**.

### 6.5 Barra de progreso, "volver arriba" y animaciones
- **Barra de progreso:** línea dorada en la parte superior que crece según cuánto se ha leído de la página.
- **Volver arriba:** botón circular que aparece después de 600 px de scroll.
- **Aparición al hacer scroll:** los elementos con la clase `.rv` entran con un desvanecimiento y un pequeño desplazamiento. Luego se les quita la clase para no interferir con los efectos al pasar el mouse.
- El scroll está optimizado con `requestAnimationFrame` y escuchas `passive`.

### 6.6 Nosotros y entrenadores
- Foto con marco dorado desplazado, insignia "+1,000 m²" y cuatro características con íconos SVG (pesas libres, cardio, entrenadores expertos, clases grupales).
- Cuatro tarjetas de entrenadores con avatar de **iniciales** (sin fotos de personas). Los nombres actuales son de ejemplo.

### 6.7 Clases grupales
- Siete pestañas (Lun a Dom). Al elegir una se muestran las clases de ese día con hora, nombre, instructor y nivel.
- Abre automáticamente el **día de hoy**.
- Se puede navegar con las **flechas del teclado**.
- El horario vive en el objeto `HORARIO` de `js/p2-contenido.js` (la clave es el número de día: 0 = domingo … 6 = sábado, igual que `Date.getDay()`).
- Los elementos se crean con `createElement` y `textContent` (no con HTML en texto), lo que evita inyección de código.

### 6.8 Planes y ventana de inscripción

| Plan | Precio | Equivale a | Ahorro frente al mensual |
|---|---|---|---|
| Pase Mensual | S/ 89 | S/ 89 al mes | — |
| Pase Trimestral (*más elegido*) | S/ 219 | S/ 73 al mes | S/ 48 (89 × 3 = 267) |
| Pase Anual | S/ 749 | S/ 62 al mes | S/ 319 (89 × 12 = 1,068) |

- Todos sin costo de matrícula.
- Al pulsar **"Elegir plan"** se abre una ventana (`<dialog>`) que pide el nombre. Al enviar, se abre WhatsApp con un mensaje como: *"Hola, quiero información sobre el plan Pase Trimestral (S/ 219) del gimnasio. Mi nombre es Ana"*.
- Se cierra con el botón Cancelar, con la tecla `Esc` o haciendo clic fuera.
- Si el navegador no soporta `<dialog>`, el mensaje se envía directo a WhatsApp.

### 6.9 Preguntas frecuentes
- Seis preguntas con `<details>` y `<summary>` (funciona sin JavaScript).
- El JS deja **una sola abierta** a la vez. El "+" se transforma en "×" al abrir.

### 6.10 Reserva de clase de prueba
- Formulario con nombre (obligatorio), clase de interés, día preferido y objetivo.
- Al enviar arma un mensaje, por ejemplo: *"Hola, soy Luis. Quiero reservar una clase de prueba de Zumba para el sábado. Mi objetivo es ganar músculo."* y abre WhatsApp.
- **No se guarda ningún dato**: no hay servidor.

### 6.11 Ubicación y "abierto ahora"
- Dirección, tabla de horarios, teléfono y mapa de Google.
- La etiqueta verde/roja indica si el gimnasio está abierto **según la hora de Lima** (`America/Lima`), sin importar dónde esté el visitante. Se actualiza cada minuto.
- Textos posibles: *"Abierto ahora · cierra a las 10:00 p.m."*, *"Cerrado ahora · abre hoy a las 6:00 a.m."* o *"Cerrado ahora · abre mañana a las…"*.
- Resalta en dorado la fila del día de hoy.

| Día | Horario |
|---|---|
| Lunes a viernes | 6:00 a.m. – 10:00 p.m. |
| Sábados | 7:00 a.m. – 8:00 p.m. |
| Domingos y feriados | 8:00 a.m. – 1:00 p.m. |

### 6.12 Footer y botón flotante de WhatsApp
- Footer con descripción, enlaces rápidos y redes sociales (Facebook, Instagram, TikTok).
- Botón verde flotante con animación de pulso; su enlace se completa por JavaScript con un mensaje prediseñado.
- El año del copyright se actualiza solo.

---

## 7. Diseño y estilos

### 7.1 Paleta (variables en `:root`, `css/base.css`)

| Variable | Oscuro | Claro | Uso |
|---|---|---|---|
| `--bg` | `#0a0a0a` | `#fbfaf6` | Fondo principal |
| `--bg2` | `#121212` | `#f1eee4` | Secciones alternas |
| `--card` | `#181818` | `#ffffff` | Tarjetas |
| `--line` | `#2a2a2a` | `#ddd8c8` | Bordes |
| `--text` | `#f4f4f4` | `#17160f` | Texto |
| `--muted` | `#a6a6a6` | `#5c5a50` | Texto secundario |
| `--gold` | `#f5c518` | `#e0a800` | Color de marca / botones |
| `--gold-t` | `#f5c518` | `#8a5d00` | Dorado para **texto** (más oscuro en claro, para que se lea) |
| `--wa` | `#25d366` | — | WhatsApp |
| `--ok` / `--err` | `#3ecf8e` / `#ff6b6b` | `#12805a` / `#b42318` | Éxito / error |

### 7.2 Tipografía
- **Barlow Condensed** (600, 700, 800): títulos, botones, precios y números.
- **Barlow** (400, 500, 600): texto corrido.
- Los títulos usan `clamp()` para escalar con el ancho de la pantalla.

### 7.3 Puntos de quiebre (responsive)

| Ancho máximo | Cambios principales |
|---|---|
| 960 px | Planes, Nosotros, IMC, Reserva y Ubicación pasan a una columna; entrenadores a 2 columnas |
| 900 px | El menú se convierte en hamburguesa |
| 720 px | Menos espacio vertical, botones de la portada a todo el ancho, footer a una columna |
| 600 px | Las filas de clases se compactan |
| 480 px | Entrenadores a una columna; formularios con menos relleno |

### 7.4 Animaciones
`rise` (entrada de la portada), `.rv` (aparición al hacer scroll), `aparece` (clases), `pulse` (botón de WhatsApp), transiciones al pasar el mouse. Todas se anulan con `prefers-reduced-motion: reduce`.

---

## 8. Arquitectura del código

### 8.1 `config.js` (compartido)
Define un único objeto global:

```js
window.TITAN = {
  numero: "51926498836",
  wa: function (mensaje) { /* devuelve https://wa.me/<numero>?text=<mensaje codificado> */ }
};
```

Todos los bloques que abren WhatsApp usan `TITAN.wa("mensaje")`. Para cambiar el número solo se edita aquí.

### 8.2 Patrón de cada bloque de JS
Cada bloque es una **IIFE** (función que se ejecuta sola):

```js
(function () {
  var elemento = document.getElementById("algo");
  if (!elemento) return;   // si el HTML del bloque aún no existe, no falla
  // ...lógica del bloque...
})();
```

Ventajas: las variables no chocan entre bloques y, gracias al `if (!elemento) return;`, **el proyecto no se rompe si un integrante todavía no ha subido su parte**. Eso permite integrar poco a poco.

### 8.3 Marcadores de bloque
Cada archivo está dividido con marcadores:

```html
<!-- [P2-3] Clases grupales -->      HTML
<!-- [/P2-3] -->
```
```css
/* [P2-3] Clases grupales */         CSS
/* [/P2-3] */
```
```js
// [P2-3] Horario de clases          JS
// [/P2-3]
```

Cada persona edita **solo entre sus marcadores**. No se deben borrar ni renombrar.

### 8.4 Lo que no hace el proyecto (por diseño)
No tiene backend: no guarda formularios, no procesa pagos y no envía correos. Todo se resuelve abriendo WhatsApp con el mensaje armado.

---

## 9. Bloques del proyecto y responsables

| Bloque | Qué es | HTML | CSS | JS | Responsable |
|---|---|---|---|---|---|
| P1-0 | Base: variables, tema claro, reset, botones, formularios | — | `base.css` | — | Persona 1 |
| P1-1 | Header, navegación, menú móvil, cambio de tema | `index.html` | `base.css` | `p1-portada.js` | Persona 1 |
| P1-2 | Portada con contadores animados | `index.html` | `base.css` | `p1-portada.js` | Persona 1 |
| P1-3 | Calculadora de IMC | `index.html` | `base.css` | `p1-portada.js` | Persona 1 |
| P1-4 | Progreso, volver arriba, animaciones, menú activo | `index.html` | `base.css` | `p1-portada.js` | Persona 1 |
| P2-1 | Nosotros | `index.html` | `contenido.css` | — | Persona 2 |
| P2-2 | Entrenadores | `index.html` | `contenido.css` | — | Persona 2 |
| P2-3 | Clases grupales con pestañas | `index.html` | `contenido.css` | `p2-contenido.js` | Persona 2 |
| P2-4 | Planes y ventana de inscripción | `index.html` | `contenido.css` | `p2-contenido.js` | Persona 2 |
| P3-1 | Preguntas frecuentes | `index.html` | `comunidad.css` | `p3-comunidad.js` | Persona 3 |
| P3-2 | Reserva de clase de prueba | `index.html` | `comunidad.css` | `p3-comunidad.js` | Persona 3 |
| P3-3 | Ubicación, horarios y "abierto ahora" | `index.html` | `comunidad.css` | `p3-comunidad.js` | Persona 3 |
| P3-4 | Footer y botón flotante de WhatsApp | `index.html` | `comunidad.css` | `p3-comunidad.js` | Persona 3 |

**Orden recomendado:** la Persona 1 sube primero la estructura base y el bloque `P1-0` (las variables de color); después, las Personas 2 y 3 pueden trabajar en paralelo.

---

## 10. Documentación por integrante

Cada integrante escribe su zona con sus propias palabras al terminar sus bloques y la sube en su último commit (`P#-DOC`). No borrar los marcadores.

<!-- [P1-DOC] Documentación de la Persona 1 -->
### Persona 1 – Base, portada y experiencia

**Responsable:** _(escribe tu nombre)_ · **Rama:** _(tu rama)_ · **Archivos:** `css/base.css`, `js/p1-portada.js` y los bloques P1 de `index.html`.

| Bloque | Qué hace | Cómo funciona |
|---|---|---|
| **P1-0 Base** | Define colores, tema claro, reset, botones y formularios | `:root` declara las variables del tema oscuro; `[data-theme="light"]` las redefine. Cambiar el atributo cambia toda la paleta. `*{box-sizing:border-box}` hace que el tamaño de las cajas incluya el relleno |
| **P1-1 Header** | Barra fija con logo, menú, botón de tema y hamburguesa | `position:fixed` la deja arriba. En ≤900 px el menú se oculta con `max-height:0` y el botón le agrega la clase `open`. El tema se guarda en `localStorage` |
| **P1-2 Portada** | Primera pantalla con contadores | Fondo con varias capas (degradados + foto). Los números usan `data-count` y se animan con `requestAnimationFrame`; `IntersectionObserver` los inicia al verse |
| **P1-3 IMC** | Calcula el índice de masa corporal | Valida datos, aplica peso/estatura², busca la categoría OMS y mueve el indicador sobre la barra. `preventDefault()` evita recargar la página |
| **P1-4 Extras** | Progreso, volver arriba, animaciones y menú activo | Barra con `scaleX(scrollTop / altoTotal)`; botón visible tras 600 px; clase `.rv` → `.in` con `IntersectionObserver`; el menú observa qué sección está en el centro de la pantalla |

**Conceptos clave que debo saber explicar:** variables CSS, `localStorage`, `IntersectionObserver`, `requestAnimationFrame`, `preventDefault()`, IIFE.
<!-- [/P1-DOC] -->

<!-- [P2-DOC] Documentación de la Persona 2 -->
### Persona 2 – Contenido del gimnasio

**Responsable:** _(escribe tu nombre)_ · **Rama:** _(tu rama)_ · **Archivos:** `css/contenido.css`, `js/p2-contenido.js` y los bloques P2 de `index.html`.

| Bloque | Qué hace | Cómo funciona |
|---|---|---|
| **P2-1 Nosotros** | Presenta el gimnasio con foto, insignia y 4 características | `display:grid` de dos columnas (una en celular). El marco dorado es un pseudo-elemento `::after` desplazado, con `z-index:-1`; `isolation:isolate` evita que desaparezca detrás del fondo. Íconos SVG en línea |
| **P2-2 Entrenadores** | 4 tarjetas con el equipo | `grid` de 4 → 2 → 1 columnas. El avatar es un círculo con iniciales y degradado. Hover: `translateY` y borde dorado |
| **P2-3 Clases** | Pestañas por día con el horario | Objeto `HORARIO` con clave = número de día. `mostrar(dia)` marca la pestaña (`aria-selected`), vacía el panel y crea cada clase con `createElement`. Soporta flechas del teclado. Abre el día actual con `new Date().getDay()` |
| **P2-4 Planes** | 3 planes y ventana de inscripción | El ahorro sale de comparar con el mensual (89×3 = 267 → 48; 89×12 = 1,068 → 319). `<dialog>` con `showModal()`; al enviar arma el mensaje con `data-plan` + nombre y abre `TITAN.wa()` |

**Conceptos clave que debo saber explicar:** CSS Grid, pseudo-elementos, `z-index`, `createElement` vs. HTML en texto, atributos `aria-*`, `<dialog>`, atributos `data-*`.
<!-- [/P2-DOC] -->

<!-- [P3-DOC] Documentación de la Persona 3 -->
### Persona 3 – Comunidad y contacto

**Responsable:** _(escribe tu nombre)_ · **Rama:** _(tu rama)_ · **Archivos:** `css/comunidad.css`, `js/p3-comunidad.js` y los bloques P3 de `index.html`.

| Bloque | Qué hace | Cómo funciona |
|---|---|---|
| **P3-1 FAQ** | Acordeón de preguntas | Usa `<details>`/`<summary>`, que abren y cierran sin JS. El CSS rota el "+" con `[open]`. El JS cierra las demás al abrir una |
| **P3-2 Reserva** | Formulario que abre WhatsApp | Lee los campos, arma una frase y llama a `TITAN.wa()`. `required` impide enviar el nombre vacío. `encodeURIComponent` convierte espacios y tildes a formato de URL |
| **P3-3 Ubicación** | Horarios, mapa y "abierto ahora" | Horarios en minutos desde la medianoche (6:00 = 360, 22:00 = 1320). `Intl.DateTimeFormat` con `America/Lima` da el día y la hora reales de Perú. Se refresca cada 60 s con `setInterval` y resalta la fila de hoy. El mapa es un `<iframe>` |
| **P3-4 Footer y WhatsApp** | Pie de página y botón flotante | Botón con `position:fixed`; su `href` se completa por JS. La animación `pulse` usa `box-shadow`. El año se escribe con `new Date().getFullYear()` |

**Conceptos clave que debo saber explicar:** `<details>`, zonas horarias con `Intl`, `setInterval`, `encodeURIComponent`, `rel="noopener"`, `<iframe>`.
<!-- [/P3-DOC] -->

---

## 11. Flujo de trabajo con Git y GitKraken

### 11.1 Ramas

| Rama | Función |
|---|---|
| `master` | Solo versiones terminadas y estables (con etiqueta `v1.0`, `v2.0`, …) |
| `Developer` | Integración de la versión 2 |
| `Developer-V3` | Integración de la versión 3 (sale de `master` cuando la v2 ya está unida y etiquetada) |
| Ramas personales | Una por integrante (por ejemplo `DevelopR`, `DevelopF`, `Develop`); para la v3, por ejemplo `DevelopF-V3` |

### 11.2 Ciclo de trabajo de cada integrante

1. **Fetch** (flecha hacia abajo en la barra superior de GitKraken).
2. Traer lo de los demás: clic derecho en `Developer` (o `Developer-V3`) → **Merge … into [mi rama]**.
3. Copiar un bloque desde la versión completa, pegarlo entre sus marcadores y **probarlo en el navegador**.
4. En **WIP**: *Stage* de los archivos → escribir el mensaje → **Commit changes**.
5. **Push**.
6. Al terminar un bloque: pasar a `Developer`/`Developer-V3` → clic derecho en mi rama → **Merge [mi rama] into …** → **Push**.

### 11.3 Mensajes de commit
Empiezan con el código del bloque y describen una sola cosa, en minúsculas y sin tildes (como el resto del historial):

```
P2-3 se agrego el html de clases grupales
P2-3 se agrego css de pestañas y clases
P2-3 se agrego el horario de clases con js
```

**Regla:** un commit = una cosa. Orden por bloque: HTML → CSS → JS.

### 11.4 Cantidad de commits previstos

| Persona | Commits | Detalle |
|---|---|---|
| 1 | 15 | Estructura + P1-0 + (HTML, CSS, JS) × 4 bloques + documentación |
| 2 | 11 | (HTML, CSS) × 2 bloques sin JS + (HTML, CSS, JS) × 2 bloques + documentación |
| 3 | 13 | (HTML, CSS, JS) × 4 bloques + documentación |

### 11.5 Cierre de una versión (los tres juntos)

1. Revisar la página completa desde la rama de integración.
2. Mergear la rama de integración a `master` y hacer push.
3. Clic derecho sobre ese commit → **Create tag** → `v2.0` (o `v3.0`).
4. Si van a empezar otra versión: crear la nueva rama de integración **desde `master`**, después del tag.

### 11.6 Buenas prácticas
- Hacer **push después de cada commit** (o al terminar cada sesión): si no hay push, el profesor no ve el avance.
- Probar antes de commitear.
- No pegar todo de una vez, aunque ya se tenga la versión completa.
- No trabajar nunca directamente sobre `master`.
- Un arreglo urgente de una versión ya publicada se hace desde `master` en una rama aparte.

---

## 12. Resolución de conflictos

Un **conflicto** aparece cuando dos ramas cambiaron las mismas líneas y Git no sabe cuál conservar.

### 12.1 El aviso "Conflict detected with target branch"
GitKraken muestra este aviso **antes** de unir: compara tu rama con la rama destino (por ejemplo `origin/Developer-V3`) y te avisa que, si las unes, habrá conflicto. **No es un error ni algo roto**; es una advertencia. Ofrece dos caminos:

| Opción | Qué hace | Cuándo usarla |
|---|---|---|
| **Merge** `origin/Developer-V3` into tu rama | Une los cambios con un commit de unión y conserva el historial | **Recomendada** en este proyecto: se ve claramente en el grafo quién aportó qué |
| **Rebase** tu rama onto `origin/Developer-V3` | Reescribe tus commits encima de la rama destino | Evitarla mientras se trabaja en equipo; cambia el historial y complica los push |

### 12.2 Procedimiento paso a paso

> Los nombres exactos de los botones de GitKraken pueden variar un poco según la versión; la idea de cada paso es la misma.

1. **Guarda tu trabajo pendiente.** Si en WIP hay archivos modificados (por ejemplo `index.html`), haz *Stage* + *Commit* con tu mensaje habitual. (Si no estás listo para commitear, usa **Stash**.)
2. **Fetch** para traer lo último del remoto.
3. Clic derecho en `origin/Developer-V3` → **Merge origin/Developer-V3 into [tu rama]**.
4. GitKraken marca los archivos en conflicto. Ábrelos con **View conflicts**.
5. En el editor de conflictos verás dos lados: **tu rama** (izquierda) y **la rama destino** (derecha). Marca las casillas de las líneas que deben quedar. En este proyecto casi siempre se conservan **las dos** (cada persona agregó cosas distintas).
6. Revisa el resultado abajo. No deben quedar líneas con `<<<<<<<`, `=======` ni `>>>>>>>`.
7. Haz clic en **Save** y luego **Commit** (el mensaje de unión ya viene escrito).
8. **Abre `index.html` en el navegador** y confirma que todas las secciones se ven.
9. **Push**.

### 12.3 Causas típicas en este proyecto
- Dos personas editaron **el mismo bloque** o **la misma zona de `index.html`** (el HTML es el único archivo compartido por los tres).
- Alguien borró o movió un marcador `[P#-#]`.
- Alguien pegó el contenido **fuera** de sus marcadores.
- Se trabajó sobre una rama sin haber hecho antes *Fetch* y *Merge* de la rama de integración.

### 12.4 Cómo evitarlos
- Editar solo entre los propios marcadores.
- Hacer *Fetch* y traer la rama de integración **antes de empezar cada sesión**.
- Commits pequeños y push frecuente.
- Avisar al equipo cuando se vaya a tocar algo fuera del propio bloque (por ejemplo, el `<head>` de `index.html`).

### 12.5 Si algo sale mal
- **Cancelar la unión:** en GitKraken, *Abort merge* (o *Undo* en la barra superior).
- **Volver atrás un commit ya hecho:** *Undo* o clic derecho en el commit → *Revert*.
- Si no están seguros, **no hagan push** y consulten antes: un push equivocado se complica para todo el equipo.

---

## 13. Qué personalizar

| Qué | Dónde |
|---|---|
| Número de WhatsApp | `js/config.js`, variable `numero` (y el enlace del teléfono en `index.html`, sección Ubicación) |
| Mensaje del botón flotante | `js/p3-comunidad.js`, bloque P3-4 |
| Nombre, dirección, teléfono | `index.html` |
| Horario de atención (tabla) | `index.html`, bloque P3-3 |
| Horario para "abierto ahora" | `js/p3-comunidad.js`, objeto `H` (**debe coincidir con la tabla**) |
| Horario de clases | `js/p2-contenido.js`, objeto `HORARIO` |
| Entrenadores | `index.html`, bloque P2-2 (nombres de ejemplo) |
| Precios y beneficios | `index.html`, sección `#planes` (el atributo `data-plan` es el texto que se envía) |
| Preguntas frecuentes | `index.html`, bloque P3-1 |
| Colores y tema claro | `css/base.css`, `:root` y `[data-theme="light"]` |
| Fotos | `index.html` (Nosotros) y `css/base.css` (clase `.hero`) |
| Redes sociales | `index.html`, footer (hoy apuntan a las páginas principales) |
| Mapa | `index.html`, `src` del `<iframe>` en `#ubicacion` |

---

## 14. Accesibilidad y rendimiento

**Accesibilidad**
- HTML semántico y un solo `<h1>`.
- Anillo de foco visible (`:focus-visible`) en todos los elementos interactivos.
- `aria-label`, `aria-expanded`, `aria-selected`, `aria-live` y `role` en menú, pestañas, resultados y mensajes de error.
- Pestañas navegables con el teclado; ventana de inscripción con foco atrapado y cierre con `Esc`.
- Colores del tema claro ajustados (`--gold-t`) para mantener la legibilidad del texto dorado.
- Respeta `prefers-reduced-motion`.

**Rendimiento**
- Sin librerías ni frameworks.
- La foto de Nosotros usa `loading="lazy"` y dimensiones declaradas para evitar saltos de diseño; el mapa también carga de forma diferida.
- Fuentes con `preconnect`.
- Scroll optimizado (`requestAnimationFrame`, `passive`, `IntersectionObserver`).

---

## 15. Limitaciones conocidas

- **No hay backend:** las reservas y las inscripciones solo abren un mensaje de WhatsApp; no se guarda nada.
- **Feriados:** el estado "abierto ahora" usa solo el día de la semana; no detecta feriados.
- **Datos de ejemplo:** los nombres de los entrenadores y el horario de clases son inventados y deben reemplazarse por los reales.
- **Dependencia de internet** para fuentes, fotos y mapa.
- **IMC:** es una referencia general; no considera edad, sexo ni masa muscular, y no reemplaza una evaluación profesional.
- **Redes sociales:** los enlaces del footer apuntan a las páginas principales, no a los perfiles reales del gimnasio.
- **Navegadores muy antiguos:** sin `<dialog>` se omite la ventana de inscripción, y sin `IntersectionObserver` se omiten las animaciones de aparición (todo se muestra igual).
- Los datos de contacto y los precios son del proyecto académico.

---

## 16. Historial de versiones

| Versión | Contenido | Estado |
|---|---|---|
| **v1.0** | Primera versión: página con secciones de inicio, nosotros, planes, ubicación y footer, con botón de WhatsApp y menú para celular | Publicada (etiqueta `v1.0`) |
| **v2.0** | Rediseño y mejoras: tema claro/oscuro, contadores, calculadora de IMC, entrenadores, horario de clases, ventana de inscripción, FAQ, reserva de clase de prueba, "abierto ahora", código separado en `css/` y `js/` por responsable | Completa |
| **v3.0** | Por definir por el equipo | En preparación (`Developer-V3`) |

---

## 17. Ideas para la versión 3

Propuestas para discutir en equipo (ninguna está implementada):

- Galería de fotos reales del gimnasio con ventana ampliada.
- Reemplazar las iniciales por fotos reales de los entrenadores (con su permiso).
- Testimonios **reales** de socios (con autorización).
- Versión en inglés con botón de idioma.
- Detección de feriados en el indicador de "abierto ahora".
- Comparador de planes y calculadora de ahorro.
- Formulario conectado a una base de datos o a un servicio de correo.
- Calculadora de calorías diarias además del IMC.
- Meta tags para compartir en redes (Open Graph) y favicon propio.
- Optimización de imágenes y puntuación alta en Lighthouse.

---

## 18. Equipo

| Integrante | Rol en el proyecto | Rama(s) |
|---|---|---|
| _(nombre)_ | Persona 1 – Base, portada y experiencia | _(rama)_ |
| _(nombre)_ | Persona 2 – Contenido del gimnasio | _(rama)_ |
| _(nombre)_ | Persona 3 – Comunidad y contacto | _(rama)_ |

**Contexto:** proyecto de práctica de control de versiones con GitKraken.
**Profesor:** _(nombre)_ · **Institución / curso:** _(completar)_

---

*Última actualización: octubre de 2026.*
