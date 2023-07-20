# Sistema de Venta en Línea de Seguros para Automóviles

El proyecto consiste en desarrollar un sistema web para la venta en línea de seguros para automóviles. El FrontEnd se implementará como una aplicación de tipo SPA (Single Page Application) utilizando renderizado del lado del cliente (CSR: Client Side Rendering) mediante JavaScript y tecnologías relacionadas. El BackEnd se desarrollará utilizando servicios RESTful en Java y los datos se almacenarán en una base de datos H2. La comunicación entre el FrontEnd y el BackEnd se realizará mediante peticiones asíncronas utilizando un API como Fetch u otro similar.

El sistema permitirá a los clientes cotizar y comprar pólizas de seguro para sus automóviles, así como revisar en cualquier momento el estado de sus pólizas. Los clientes deberán identificarse o registrarse antes de poder utilizar el sistema. Por otro lado, el administrador del sistema podrá registrar los datos de marcas y modelos de autos, así como las coberturas disponibles.

## Requisitos

- El FrontEnd se desarrollará como una SPA utilizando JavaScript y tecnologías relacionadas para el renderizado del lado del cliente.
- El BackEnd se implementará como servicios RESTful en Java.
- Los datos se almacenarán en una base de datos H2.
- La comunicación entre el FrontEnd y el BackEnd se realizará mediante peticiones asíncronas utilizando un API como Fetch u otro similar.
- Se implementará el control de acceso habilitando solo las funcionalidades correspondientes al rol del usuario.
- Esta aplicacion se realizo en grupo con las personas que colaboraron en el github.
- Se utilizara el framework de Sprint Boot con React para esta aplicacion.
- Se aplico seguridad con jwt de React
- Se aplico Bootstrap

## Funcionalidades

El sistema contará con las siguientes funcionalidades:

1. **Cliente-Registro**: Los clientes podrán registrarse en el sistema proporcionando su identificación, clave, nombre, teléfono, correo y medio de pago (datos de tarjeta).

2. **Cliente-Identificación (login)**: Los clientes podrán identificarse utilizando su identificación y clave. Se proporcionará un enlace para el registro de cliente en caso de que aún no se hayan registrado. Una vez identificados, se mostrarán sus pólizas.

3. **Cliente-Actualización**: Los clientes podrán modificar sus datos de teléfono, correo, etc. en cualquier momento.

4. **Cliente-Gestión de Pólizas**: Los clientes podrán listar sus pólizas y filtrarlas por número de placa. También podrán ver los detalles de una póliza específica.

5. **Cliente-Comprar (agregar) póliza**: Los clientes podrán contratar una póliza para un vehículo ingresando los siguientes datos: número de placa, marca-modelo, año, valor asegurado, plazos de pago (Trimestral, Semestral o Anual), fecha de inicio de vigencia (fecha en que se registra la póliza, las pólizas son anuales) y coberturas seleccionadas. El sistema les mostrará el costo de la póliza y les permitirá comprarla (registrarla) si así lo desean.

6. **Administrador-Identificación (login)**: Los administradores podrán identificarse utilizando su identificación y clave. Se mostrará un menú con sus opciones.

7. **Administrador-Listado clientes y pólizas**: Los administradores podrán listar los clientes y ver las pólizas asociadas a cada cliente.

8. **Administrador-Gestión de Marcas y Modelos**: Los administradores podrán listar las marcas y modelos de autos, así como agregar nuevos registros. Al registrar un modelo de auto, se deberá incluir también su imagen.

9. **Administrador-Gestión de Categorías y Coberturas**: Los administradores podrán listar las categorías (por ejemplo, "Responsabilidad Civil", "Daño Directo", etc.) y sus coberturas específicas (por ejemplo, dentro de "Responsabilidad Civil": "Daño a Personas", "Daño a Bienes", "Gastos Legales", etc.; dentro de "Daño Directo": "Daño al auto", "Robo", etc.). También podrán agregar nuevos registros de categorías y coberturas. Cada categoría tendrá una identificación autogenerada y una descripción. Cada cobertura pertenecerá a una categoría y tendrá una identificación autogenerada, una descripción y un costo (costo mínimo y costo porcentual del valor asegurado, aplicando el mayor).

