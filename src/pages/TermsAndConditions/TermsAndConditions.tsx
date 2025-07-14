import React from 'react';
import styles from './TermsAndConditions.module.css';

export const TermsAndConditions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Términos y Condiciones</h1>
        <p className={styles.lastUpdated}>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

        <section className={styles.section}>
          <h2>1. Introducción</h2>
          <p>
            Bienvenido a GameStore. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web y servicios.
            Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes usando GameStore si no aceptas todos los términos y condiciones establecidos en esta página.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Licencia de uso</h2>
          <p>
            A menos que se indique lo contrario, GameStore y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en GameStore.
            Todos los derechos de propiedad intelectual están reservados. Puedes ver y/o imprimir páginas de GameStore para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
          </p>
          <p>No debes:</p>
          <ul>
            <li>Republicar material de GameStore</li>
            <li>Vender, alquilar o sublicenciar material de GameStore</li>
            <li>Reproducir, duplicar o copiar material de GameStore</li>
            <li>Redistribuir contenido de GameStore (a menos que el contenido esté específicamente hecho para su redistribución)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Cuenta de usuario</h2>
          <p>
            Para acceder a ciertas funciones del sitio web, debes registrarte para obtener una cuenta. Aceptas proporcionar información precisa, actual y completa durante el proceso de registro.
            Eres responsable de proteger tu contraseña y de todas las actividades que ocurran bajo tu cuenta.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Compras y pagos</h2>
          <p>
            Todas las compras a través de nuestro sitio web están sujetas a estos términos y condiciones. Los precios de nuestros productos pueden cambiar sin previo aviso.
            Nos reservamos el derecho de modificar o discontinuar cualquier producto sin previo aviso en cualquier momento.
          </p>
          <p>Términos de pago:</p>
          <ul>
            <li>Todos los pagos deben realizarse en su totalidad al momento de la compra</li>
            <li>Aceptamos varios métodos de pago indicados durante el proceso de compra</li>
            <li>Los precios incluyen los impuestos aplicables</li>
            <li>Los productos digitales no son reembolsables salvo que la ley lo requiera</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Productos digitales</h2>
          <p>
            Cuando compras un producto digital en GameStore, adquieres una licencia para usar ese producto.
            La licencia no es transferible y puede estar sujeta a términos y condiciones adicionales del editor del juego.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Conducta del usuario</h2>
          <p>Aceptas no:</p>
          <ul>
            <li>Utilizar el sitio web para cualquier propósito ilegal</li>
            <li>Violar cualquier ley en tu jurisdicción</li>
            <li>Infringir los derechos de otros</li>
            <li>Interferir con el funcionamiento adecuado del sitio web</li>
            <li>Intentar obtener acceso no autorizado a cualquier parte del sitio web</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Política de privacidad</h2>
          <p>
            Tu uso de GameStore también está regido por nuestra Política de Privacidad. Por favor, revisa nuestra Política de Privacidad, que también regula el sitio web e informa a los usuarios sobre nuestras prácticas de recopilación de datos.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Limitación de responsabilidad</h2>
          <p>
            En ningún caso GameStore, ni ninguno de sus directores, empleados o representantes, será responsable ante ti por cualquier cosa derivada de o relacionada de cualquier manera con tu uso de este sitio web.
            GameStore, incluidos sus directores, empleados y representantes, no será responsable de ninguna responsabilidad indirecta, consecuente o especial derivada de o relacionada de cualquier manera con tu uso de este sitio web.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Cambios en los términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Notificaremos a los usuarios sobre cualquier cambio actualizando la fecha de "Última actualización" en la parte superior de esta página.
            Tu uso continuado del sitio web después de la publicación de los términos revisados significa que aceptas y estás de acuerdo con los cambios.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Información de contacto</h2>
          <p>
            Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos en:
          </p>
          <ul>
            <li>Correo electrónico: soporte@gamestore.com</li>
            <li>Teléfono: +1 (555) 123-4567</li>
            <li>Dirección: 123 Gaming Street, Digital City, 12345</li>
          </ul>
        </section>
      </div>
    </div>
  );
};