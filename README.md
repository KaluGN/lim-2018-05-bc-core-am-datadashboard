# Data Dashboard

## ¿Cuál fue el requerimiento?

Las Training Manager de Laboratoria necesitan **ordenar, filtrar y agrupar** a las alumnas de acuerdo al cohort al que pertenecen, turno y squad, tambien hacer un mejor control sobre nuestro avance en las lecturas no obligatorias, para ello es necesario implementar una plataforma donde ellas reciban la data ya procesada.

## a. Principales usuarios del producto

El principal usuario del producto en la Training Manager. Es ella quien necesita evaluar el desarrollo y avance de las estudiantes. Además de encontrar si existe una relación entre el desarrollo de actividades y el proceso de aprendizaje.

## b. Objetivos principales en relación con el producto

-  Obtener y procesar data del progreso de las estudiantes.

## c. Datos más relevantes que quieren ver en la interfaz

- Avance general de lecturas/quizzes/ejercicios resueltos de las estudiantes.

- Información de cada una de las estudiantes por lecturas/quizzes/ejercicios

## d. Entendiendo al usuario

Para poder comprender la necesidad del usuario se presentó un primer bosquejo con lo comprendido de los requerimientos indicados. Recibimos un feedback con algunas observaciones que indicaban que la pantalla mostrada generaba cierta confusión con la relevancia de algunos elementos y en base a ello se realizó algunas modificaciones en la parte visual.

Sobre la información que necesitaba procesar el usuario quedo detallado en el requerimiento.

## e. Revisión de datos por parte de los usuarios

Los datos se revisan cada semana para así ir monitoreando el avance de las estudiantes progresivamente.

## f. Resolución de problemas a través del uso del producto

La data organizada permite al usuario poder analizar el avance de las estudiantes de una manera más dinámica, ordenada y rápida.

## g. Cómo fue tu proceso de diseño

**g.1. Recepción del pedido:**

Al analizar el contenido del pedido, rescatamos que debemos realizar lo siguiente:

Extracción de la data Json.
Crear funciones para mostrar la data Json de manera ordenada según el record general del cohort.

**g.2. Procesamiento del pedido:**

- Desarrollo del primer boceto de baja fidelidad. (Anexo 1)

- Llevar el boceto de papel a la computadora a través de [Invision](https://projects.invisionapp.com/freehand/document/nAiap4sh7)

- Desarrollo del prototipo de alta calidad en [Figma](https://www.figma.com/file/YXvYSU7p3MNVIvjC3bMxIFPa/Dashboard-Lab-2K). (Anexo 2)

- Análisis de la lógica del pedido.

- Desarrollo de la estructura HTML5.

- Llamando data al JS.

- Implementación del CSS3

## h. Qué necesitamos para este proyecto

- Extraer data desde el archivo Json y mostrarla en la estructura HTML.

- Filtrar la data según requerimientos del usuario.

1. Permitir al usuario seleccionar un cohort de una lista de cohorts.
2. Al seleccionar un cohort:
* Listar las estudiantes de ese cohort
* Para cada estudiante:
  + Calcular porcentaje de completitud de todos los cursos.
  + Calcular grado de completitud de lecturas, ejercicios autocorregidos, y quizzes.
Ordenar estudiantes por completitud general (porcentaje consumido/completado de todos los cursos del cohort en cuestión), de lecturas, ejercicios autocorregidos y quizzes.
  + Filtrar/buscar estudiantes por nombre.
3. Visualizarse sin problemas desde distintos tamaños de pantallas: móviles, tablets y desktops.
4. Incluir pruebas unitarias.


**ANEXOS**

+ Anexo 1 - Boceto de papel
1. Login 

![login](https://image.prntscr.com/image/ionv83X1T024SLtUOFl6xA.png)

2. Resultados generales 

![general](https://image.prntscr.com/image/MM_alWMBQqylolZzVR83HA.png)

3. Detalle alumnas 

![alumnas](https://image.prntscr.com/image/PEweaOtMQYaBqPM8cDScSA.png)

+ Anexo 2 - Boceto baja fidelidad en computadora
4. Boceto del papel a computadora

![html](https://image.prntscr.com/image/qzFi5lEmReGTWL83zl5YNA.png)