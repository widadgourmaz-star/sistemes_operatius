## Tasques programades amb cron

Lorem ipsum dolor sit amet, consectetur adipiscing elit. El servei
**cron** permet executar ordres o scripts de manera automàtica a
intervals regulars, sense intervenció manual.

- Consultar les tasques programades amb `crontab -l`.
- Afegir una tasca nova amb `crontab -e`.
- Entendre el format dels cinc camps de temps d'una entrada cron.

![Exemple de captura de pantalla d'una tasca cron](../../img/exemple.svg)

## Scripts d'automatització bàsics

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
ut aliquip ex ea commodo consequat. Un **script de shell** encadena
diverses ordres per automatitzar tasques repetitives.

- Crear un arxiu `.sh` i donar-li permisos d'execució amb `chmod +x`.
- Executar el script i revisar la seva sortida.

## Comprovació final

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Abans de donar per acabat el sprint,
revisa aquest resum:

- La tasca programada s'executa a l'hora esperada.
- L'script no dona errors en executar-se.
- **Els registres (logs) confirmen l'execució automàtica.**
