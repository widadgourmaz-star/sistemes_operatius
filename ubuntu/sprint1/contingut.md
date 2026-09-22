## Instal·lació del sistema operatiu

Aquesta instal·lació s'ha fet dins d'una **màquina virtual amb VirtualBox**,
no directament sobre l'ordinador físic: així es pot provar Ubuntu sense
arriscar les dades ni la resta de sistemes operatius ja instal·lats a
l'equip amfitrió. **Aquest procés reformata el disc virtual triat**, així
que en una instal·lació real cal revisar bé quin disc s'escull abans de
continuar.

### 1. Creació de la màquina virtual i el disc dur

Primer es crea una màquina virtual nova (`ubuntu26original`) i se li
assigna un disc dur virtual de 50 GB en format VDI, al costat de la
carpeta amb el contingut de la ISO d'Ubuntu ja descarregada.

![Explorador d'arxius amb el contingut de la ISO d'Ubuntu, i l'assistent de VirtualBox creant el disc dur virtual de 50 GB](captures/01-nova-maquina-virtual-disc.png)

El gestor de màquines virtuals de VirtualBox mostra totes les màquines ja
creades a l'ordinador (Windows, Kali, altres proves d'Ubuntu) mentre es
defineix on es desarà el nou disc virtual.

![Finestra principal de VirtualBox amb la llista de màquines virtuals existents, i l'assistent demanant la ubicació del disc dur virtual](captures/02-gestor-maquines-virtuals.png)

### 2. Maquinari assignat i identificació de la ISO

Es reserven **6064 MB de RAM** i **4 CPU** per a la màquina virtual: prou
recursos perquè Ubuntu funcioni amb fluïdesa sense deixar l'ordinador
amfitrió sense memòria.

![Pas "Specify virtual hardware" de l'assistent, amb 6064 MB de memòria base i 4 CPU assignades](captures/03-maquinari-virtual-ram-cpu.png)

VirtualBox detecta automàticament, a partir de la imatge ISO seleccionada,
que es tracta d'Ubuntu i proposa el tipus de sistema operatiu
corresponent.

![Pas "Virtual machine name and operating system", amb el nom ubuntu26original, la ISO d'Ubuntu seleccionada i el tipus Linux/Ubuntu detectat](captures/04-configuracio-nom-i-iso.png)

### 3. Primeres passes de l'instal·lador d'Ubuntu

Un cop arrencada la màquina virtual amb la ISO, s'inicia l'assistent
gràfic d'instal·lació d'Ubuntu. El primer pas és triar l'idioma:

![Pantalla inicial de l'instal·lador d'Ubuntu demanant l'idioma, amb "English" seleccionat per defecte](captures/05-installador-idioma.png)

![La mateixa pantalla d'idioma, ara amb "Español" seleccionat](captures/06-installador-idioma-espanyol.png)

A continuació es tria la disposició del teclat:

![Pantalla de disposició del teclat amb "Español" seleccionat i un camp per provar-la](captures/07-installador-teclat.png)

I es configura la connexió a Internet, en aquest cas per cable:

![Pantalla "Conéctese a Internet" amb l'opció "Utilizar conexión por cable" seleccionada](captures/08-installador-connexio-xarxa.png)

### 4. Tipus d'instal·lació i selecció d'aplicacions

L'instal·lador pregunta si es vol **instal·lar Ubuntu** o només
**provar-lo** sense fer canvis; en aquest cas es tria instal·lar-lo:

![Pantalla "¿Qué quiere hacer con Ubuntu?" amb l'opció "Instalar Ubuntu" seleccionada](captures/09-installador-instal-o-provar.png)

Es tria la instal·lació **interactiva** (pas a pas), en lloc d'una
instal·lació automatitzada amb un arxiu de configuració:

![Pantalla "Tipo de instalación" amb "Instalación interactiva" seleccionada](captures/10-installador-tipus-instal-lacio.png)

I es deixa la **selecció predeterminada** d'aplicacions (només el
navegador i les utilitats bàsiques):

![Pantalla "Aplicaciones" amb "Selección predeterminada" seleccionada](captures/11-installador-aplicacions.png)

### 5. Configuració del disc i particionament manual

En comptes de deixar que l'instal·lador esborri el disc automàticament,
es tria la **instal·lació manual** per poder definir les particions a
mida:

![Pantalla "Configuración del disco" amb "Instalación manual" seleccionada](captures/12-installador-configuracio-disc.png)

Es crea manualment cada partició indicant la mida, el sistema de fitxers
i el punt de muntatge; en aquest exemple, una partició de 30 GB en
format Ext4 muntada a `/home`:

![Diàleg "Crear partición" definint una partició de 30000 MB en Ext4 muntada a /home](captures/13-particionament-crear-particio.png)

El resultat final és un disc amb tres particions: `/home` (30 GB), `/boot`
(500 MB) i `/` (23,18 GB), totes en Ext4:

![Taula de particionament manual amb sda1 (/home, 30 GB), sda3 (/boot, 500 MB) i sda2 (/, 23,18 GB)](captures/14-particionament-taula-final.png)

### 6. Creació del compte d'usuari i resum final

Es crea el compte de l'usuari que administrarà el sistema, amb el seu
nom, el nom de l'equip i una contrasenya:

![Pantalla "Cree su cuenta" amb el nom widad, l'equip widad-VirtualBox i la contrasenya introduïda](captures/15-crear-compte-usuari.png)

Finalment, l'instal·lador mostra un resum de totes les opcions triades
(instal·lació manual, disc VBOX HARDDISK, sense xifratge, i les tres
particions creades) abans de prémer **Instalar**:

![Pantalla "Listo para instalar" amb el resum de la instal·lació i les particions creades](captures/16-resum-llest-per-instal-lar.png)

Un cop confirmat, l'instal·lador copia els arxius del sistema al disc
virtual i, en reiniciar la màquina, ja arrenca Ubuntu instal·lat.

## Configuració de xarxa bàsica

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
ut aliquip ex ea commodo consequat. La configuració de xarxa és
**imprescindible** per poder actualitzar el sistema i instal·lar
programari nou.

- Comprovar l'adreça IP assignada amb `ip a`.
- Configurar una IP estàtica si el servei ho requereix.
- Verificar la connectivitat amb `ping`.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Creació d'usuaris i grups

At vero eos et accusamus et iusto odio dignissimos ducimus qui
blanditiis praesentium voluptatum deleniti atque corrupti. Cada usuari
nou s'hauria d'assignar al **grup mínim necessari** segons les tasques
que ha de fer.

![Exemple de captura de pantalla de la gestió d'usuaris](../../img/exemple.svg)

- Crear l'usuari amb `useradd`.
- Assignar contrasenya amb `passwd`.
- Afegir l'usuari als grups necessaris amb `usermod -aG`.

## Comprovació final

Et harum quidem rerum facilis est et expedita distinctio. Nam libero
tempore, cum soluta nobis est eligendi optio cumque nihil impedit.
Abans de donar per acabat el sprint, revisa aquest resum:

- El sistema arrenca sense errors.
- La xarxa respon correctament als _pings_.
- **Els usuaris i grups creats coincideixen amb l'enunciat.**
<img width="522" height="391" alt="image" src="https://github.com/user-attachments/assets/a39eb1f6-9ae2-4e02-8b4f-655ccb43798f" />

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
sequi nesciunt.
