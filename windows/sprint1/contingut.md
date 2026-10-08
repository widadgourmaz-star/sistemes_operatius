## Instal·lació del sistema operatiu

Un cop arrencat el suport d'instal·lació, cal seguir l'assistent i
triar les opcions de particionat abans de continuar. **Aquest pas és
irreversible**, així que revisa bé el disc de destinació.

- Arrencar des del USB o la imatge ISO.
- Triar l'idioma, la zona horària i la distribució de teclat.
- Configurar el particionat del disc.
- Esperar que finalitzi la còpia d'arxius i reiniciar.

![Exemple de captura de pantalla de l'assistent d'instal·lació](../../img/exemple.svg)

Un cop reiniciat el sistema, comprova que arrenca correctament i que
reconeix tot el maquinari abans de continuar amb el següent apartat.

## Configuració de xarxa bàsica

La configuració de xarxa és **imprescindible** per poder actualitzar
el sistema i instal·lar programari nou.

- Comprovar l'adreça IP assignada amb `ipconfig`.
- Configurar una IP estàtica des de "Configuració de xarxa" si cal.
- Verificar la connectivitat amb `ping`.

*(Apartat pendent d'ampliar amb la pràctica real i captures.)*

## Creació d'usuaris i comptes

Cada compte nou s'hauria d'assignar al **tipus de compte mínim
necessari** segons les tasques que ha de fer.

![Exemple de captura de pantalla de la gestió d'usuaris](../../img/exemple.svg)

- Crear el compte des de "Comptes" a la Configuració.
- Assignar una contrasenya segura.
- Triar entre compte estàndard o administrador segons calgui.

## Comprovació final

Abans de donar per acabat el sprint, revisa aquest resum:

- El sistema arrenca sense errors.
- La xarxa respon correctament als _pings_.
- **Els comptes creats coincideixen amb l'enunciat.**
