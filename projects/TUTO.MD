# Buenas, esto es solo para ayudar en la instalación

La vara es que después de clonar el repo, simplemente se meten a projects/project-01/ y corren el comando `npm install`.

Con eso se supone que se les instala todo lo necesario incluido con todos los paquetes y config que yo agregué.

Esos paquetes adicionales que agregué son:

- `react-bootstrap`: <https://react-bootstrap.netlify.app/docs/components/accordion>

- `react-router-dom`: <https://reactrouter.com/en/main>. Que es para hacer el routing de las páginas. (**Hay que aprender a usarlo**). -> Aprender además concepto de `lazy loading`.

- `zustand`: <https://zustand-demo.pmnd.rs/>. Zustand es una biblioteca para el manejo del estado global en aplicaciones React. Es ideal para almacenar y manejar el estado global de la aplicación, como los datos de sesión del usuario, preferencias del usuario, y otros estados que deben ser accesibles desde diferentes partes de la aplicación. (**Hay que aprender a usarlo**).

- `React Query/TanStack`: <https://tanstack.com/query/latest>. Es una biblioteca para la obtención, caché y sincronización de datos de consultas (fetching) en aplicaciones React. Facilita la gestión del estado de datos que provienen de APIs y otras fuentes externas, y maneja la sincronización y actualización de estos datos de manera eficiente. Es ideal para manejar el estado de datos que se obtienen de servidores o APIs, como la lista de usuarios, productos, o cualquier otra información que deba ser consultada, cacheada y actualizada regularmente. -> Muy útil para hacer paginación, infinite scroll, saber cuando está cargando para hacérselo saber al usuario (dar la retroalimentación), etc.

Recomendación de Extensiones miedo de VSCode:

- `ESLint`: Para que les marque los errores de linter (obligatoria).

- `Console Ninja`: Para ver los logs sin tener que abrir la consola del navegador. (Aunque ahorita creo que no es compatible con la ultima versión de vite, dicen que estan trabajando en eso).

- `Error Lens`: Para que les marque los errores en el código directamente en el editor sobretodo los de linter.

- `ES7+ React/Redux/React-Native snippets` (O cualquier otro que les guste): Para que les haga snippets de código de React y Redux. -> Autocompletado de instrucciones de React y Redux básicamente.

- `Path Intellisense`: Para que les haga autocompletado de las rutas de los archivos. Y se les agreguen automáticamente las rutas de los archivos que importen.

Una muy útil que me gusta es `Backticks` que les cambia las comillas simples por backticks (`) y les agrega el signo de dolar ($) para que puedan hacer interpolación de strings.

Y eso sería todo Saludos. 🚀.

**Por cierto**, el linter llora si usan comillas dobles(deben ser simples `'`), si no usan espaciado 2 para la tabulación y además si usan `;` (No vamos a usar `;` )
