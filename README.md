---
## ⚙️ Funcionalidad del simulador

1. **Carga de datos (JSON):**
Los productos se obtienen de forma asíncrona desde `data/productos.json` mediante `fetch()` y `async/await`.

2. **Renderizado dinámico del HTML:**
El contenido de la tienda (productos, precios, imágenes, botones) se genera en el DOM usando JavaScript.

3. **Interacción del usuario:**
- Agregar productos al carrito.
- Eliminar productos o vaciar el carrito completo.
- Modificar cantidades directamente.
- Calcular el total en tiempo real.
- Visualizar confirmaciones o avisos sin usar `alert()`.

4. **Persistencia de datos:**
El carrito se guarda en **localStorage**, manteniendo su contenido tras recargar la página.

5. **Simulación completa:**
Se simula el flujo completo de una compra, desde la selección de productos hasta la confirmación final.
---

## 💻 Tecnologías utilizadas

- **HTML5** → estructura del sitio.
- **CSS3** → diseño visual y adaptabilidad.
- **JavaScript (ES6+)** → lógica, asincronía, DOM y eventos.
- **JSON** → fuente de datos simulada.
- **Bootstrap** → maquetado y estilos responsivos (opcional).

---

## 📊 Criterios de evaluación

| Criterio           | Descripción                                                                                    | Cumplimiento |
| ------------------ | ---------------------------------------------------------------------------------------------- | ------------ |
| **Funcionalidad**  | Se simula uno o más flujos de trabajo con entrada, procesamiento y salida sin errores.         | ✅           |
| **Interactividad** | Se emplean inputs y eventos adecuados. Las salidas se actualizan en el HTML de forma dinámica. | ✅           |
| **Escalabilidad**  | Se usan funciones con parámetros, arrays, objetos y métodos adecuados al contexto.             | ✅           |
| **Integridad**     | Código JavaScript en archivo separado, datos JSON cargados asíncronamente.                     | ✅           |
| **Legibilidad**    | Código ordenado, nombres claros y comentarios explicativos.                                    | ✅           |

---

## 🧠 Conceptos del curso aplicados

| Unidad    | Conceptos utilizados                                              |
| --------- | ----------------------------------------------------------------- |
| **1 y 2** | Variables, tipos de datos, condicionales y bucles.                |
| **3**     | Funciones con parámetros y valores de retorno.                    |
| **4**     | Objetos y arrays de objetos.                                      |
| **5**     | Métodos de arrays (`forEach`, `find`, `filter`, `map`, `reduce`). |
| **6**     | Manipulación del DOM y eventos (`click`, `input`, `submit`).      |
| **7**     | Persistencia con `localStorage`.                                  |
| **8**     | Asincronía y carga de datos con `fetch()` desde JSON.             |

---

## 🧾 Requisitos de entrega

- Proyecto en formato **.ZIP** (no .RAR).
- Nombre de archivo: **ProyectoFinal+Apellido**
- Incluir:
  - `index.html`
  - `css/styles.css`
  - `js/main.js`
  - `data/productos.json`
  - `README.md`
- Subir a **Google Drive** o **GitHub (preferido)**.

---

## 🚀 Ejecución del proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto.
3. Ejecutar `index.html` desde un entorno local (por ejemplo, Live Server).
4. Interactuar con la tienda:
   - Agregar productos.
   - Consultar el carrito.
   - Simular la compra.

---

## 🧑‍💻 Autoría

**Nombre y Apellido:** Laura [Tu Apellido]  
**Curso:** JavaScript  
**Comisión:** [Número de comisión]  
**Profesor/a:** [Nombre del docente]  
**Año:** 2025

**Repositorio GitHub:** [agregar enlace]  
**Carpeta Drive:** [agregar enlace]

---

## 🏁 Conclusión

El presente simulador cumple con todos los objetivos y criterios de evaluación propuestos en el **Proyecto Final del curso de JavaScript**.  
Integra de forma coherente los conceptos de programación estructurada, asincronía, manipulación del DOM, almacenamiento local y renderizado dinámico de contenido, logrando un resultado funcional, escalable y visualmente atractivo.
