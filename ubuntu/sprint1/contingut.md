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

![Pas de l'assistent on es defineix el maquinari virtual, amb 6064 MB de memòria base i 4 CPU assignades](captures/03-maquinari-virtual-ram-cpu.png)

VirtualBox detecta automàticament, a partir de la imatge ISO seleccionada,
que es tracta d'Ubuntu i proposa el tipus de sistema operatiu
corresponent.

![Pas de l'assistent on es defineix el nom i el sistema operatiu, amb el nom ubuntu26original, la ISO d'Ubuntu seleccionada i el tipus Linux/Ubuntu detectat](captures/04-configuracio-nom-i-iso.png)

### 3. Primeres passes de l'instal·lador d'Ubuntu

Un cop arrencada la màquina virtual amb la ISO, s'inicia l'assistent
gràfic d'instal·lació d'Ubuntu. El primer pas és triar l'idioma:

![Pantalla inicial de l'instal·lador d'Ubuntu demanant l'idioma, amb l'anglès seleccionat per defecte](captures/05-installador-idioma.png)

![La mateixa pantalla d'idioma, ara amb el castellà seleccionat](captures/06-installador-idioma-espanyol.png)

A continuació es tria la disposició del teclat:

![Pantalla de disposició del teclat, amb el castellà seleccionat i un camp per provar-la](captures/07-installador-teclat.png)

I es configura la connexió a Internet, en aquest cas per cable:

![Pantalla de connexió a Internet, amb l'opció de connexió per cable seleccionada](captures/08-installador-connexio-xarxa.png)

### 4. Tipus d'instal·lació i selecció d'aplicacions

L'instal·lador pregunta si es vol **instal·lar Ubuntu** o només
**provar-lo** sense fer canvis; en aquest cas es tria instal·lar-lo:

![Pantalla que pregunta què vols fer amb Ubuntu, amb l'opció d'instal·lar-lo seleccionada](captures/09-installador-instal-o-provar.png)

Es tria la instal·lació **interactiva** (pas a pas), en lloc d'una
instal·lació automatitzada amb un arxiu de configuració:

![Pantalla de tipus d'instal·lació, amb la instal·lació interactiva seleccionada](captures/10-installador-tipus-instal-lacio.png)

I es deixa la **selecció predeterminada** d'aplicacions (només el
navegador i les utilitats bàsiques):

![Pantalla de selecció d'aplicacions, amb la selecció predeterminada marcada](captures/11-installador-aplicacions.png)

### 5. Configuració del disc i particionament manual

En comptes de deixar que l'instal·lador esborri el disc automàticament,
es tria la **instal·lació manual** per poder definir les particions a
mida:

![Pantalla de configuració del disc, amb la instal·lació manual seleccionada](captures/12-installador-configuracio-disc.png)

Es crea manualment cada partició indicant la mida, el sistema de fitxers
i el punt de muntatge; en aquest exemple, una partició de 30 GB en
format Ext4 muntada a `/home`:

![Diàleg de creació de partició, definint una partició de 30000 MB en Ext4 muntada a /home](captures/13-particionament-crear-particio.png)

El resultat final és un disc amb tres particions: `/home` (30 GB), `/boot`
(500 MB) i `/` (23,18 GB), totes en Ext4:

![Taula de particionament manual amb sda1 (/home, 30 GB), sda3 (/boot, 500 MB) i sda2 (/, 23,18 GB)](captures/14-particionament-taula-final.png)

### 6. Creació del compte d'usuari i resum final

Es crea el compte de l'usuari que administrarà el sistema, amb el seu
nom, el nom de l'equip i una contrasenya:

![Pantalla de creació del compte d'usuari, amb el nom widad, l'equip widad-VirtualBox i la contrasenya introduïda](captures/15-crear-compte-usuari.png)

Finalment, l'instal·lador mostra un resum de totes les opcions triades
(instal·lació manual, disc VBOX HARDDISK, sense xifratge, i les tres
particions creades) abans de prémer el botó d'**instal·lar**:

![Pantalla de resum final, amb totes les opcions de la instal·lació i les particions creades](captures/16-resum-llest-per-instal-lar.png)

Un cop confirmat, l'instal·lador copia els arxius del sistema al disc
virtual i, en reiniciar la màquina, ja arrenca Ubuntu instal·lat.

## Configuració de xarxa bàsica

La configuració de xarxa és **imprescindible** per poder actualitzar
el sistema i instal·lar programari nou.

- Comprovar l'adreça IP assignada amb `ip a`.
  <img width="742" height="256" alt="image" src="https://github.com/user-attachments/assets/31985562-77f8-4a07-8c9b-eef308bb4a16" />

- Configurar una IP estàtica si el servei ho requereix.
- Verificar la connectivitat amb `ping`.

*(Apartat pendent d'ampliar amb la pràctica real i captures.)*

## Creació d'usuaris i grups

Cada usuari nou s'hauria d'assignar al **grup mínim necessari** segons
les tasques que ha de fer.

- Crear l'usuari amb `useradd`.
- Assignar contrasenya amb `passwd`.
- Afegir l'usuari als grups necessaris amb `usermod -aG`.

![Captura del resultat de la gestió d'usuaris](https://github.com/user-attachments/assets/a39eb1f6-9ae2-4e02-8b4f-655ccb43798f)

## Gestió de paquets

Un cop instal·lat el sistema, cal saber instal·lar, actualitzar i
eliminar programari. A Ubuntu hi ha diverses eines per fer-ho, de més
a menys automàtiques.

### apt / apt-get

`apt` és el *frontend* modern del gestor de paquets `dpkg` (amb
millores respecte `apt-get`, l'eina més antiga).

**`apt update`** — Actualitza la llista de paquets disponibles,
mirant les adreces dels repositoris definides a
`/etc/apt/sources.list`. No instal·la ni actualitza res per si sol;
cal executar-lo sempre abans d'instal·lar o actualitzar, perquè el
sistema sàpiga quines versions existeixen.

<img width="648" height="414" alt="image" src="https://github.com/user-attachments/assets/f1ed753a-51bc-4b55-a8af-11e8a9ed8d9e" />

**`apt upgrade`** — Actualitza els paquets que ja tens instal·lats a
la seva darrera versió disponible, però **no instal·la paquets
nous**. És la manera segura de mantenir el sistema al dia sense
sorpreses.

<img width="661" height="438" alt="image" src="https://github.com/user-attachments/assets/a6a2d967-c8e5-44d0-baef-ae2a7695142f" />

**`apt install paquet`** — Instal·la un paquet nou (per exemple,
`apt install synaptic`), descarregant-lo i instal·lant automàticament
totes les seves dependències.
<img width="653" height="437" alt="image" src="https://github.com/user-attachments/assets/3fddb466-b46f-44ad-a334-4708be26e45b" />

<img width="608" height="190" alt="image" src="https://github.com/user-attachments/assets/d99d0599-0e0e-47aa-9e6d-d13948506f24" />


**`apt remove paquet`** — Desinstal·la un paquet, però deixa els seus
arxius de configuració al sistema per si el tornes a instal·lar més
endavant.

**`apt autoremove`** — Esborra els paquets que es van instal·lar
automàticament com a dependència d'un altre paquet i que ara ja no fa
servir ningú; és bo executar-lo de tant en tant per netejar el
sistema.

<img width="658" height="303" alt="image" src="https://github.com/user-attachments/assets/e583a1a6-3279-482d-81cc-4e903fd04ea1" />


### aptitude

Alternativa a `apt` (també té interfície gràfica a més de comandes).
La seva diferència principal és que **recorda les dependències** que
va instal·lar per a cada paquet: si després el desinstal·les, esborra
també aquestes dependències, sempre que cap altre paquet les faci
servir.

**`aptitude install paquet`** — Instal·la un paquet nou, igual que
`apt install`, però recordant quines dependències s'han instal·lat
només per culpa d'aquest paquet.

**`aptitude remove paquet`** — Desinstal·la el paquet i, si cap altre
en depèn, també les dependències que va instal·lar automàticament.

**`aptitude purge paquet`** — Fa el mateix que `remove`, però esborra
també tots els arxius de configuració del paquet.

**`aptitude show paquet`** — Mostra la informació d'un paquet
(versió, descripció, dependències...); si el paquet no està
instal·lat, t'ho indica igualment.

![Substitueix per la teva captura: terminal executant aptitude install i aptitude show](../../img/exemple.svg)

### dpkg

Eina de més baix nivell que `apt`: treballa directament amb arxius
`.deb` ja descarregats i **no resol dependències** per tu (si en
falta alguna, dóna error i cal instal·lar-la a mà amb `apt`).

**`dpkg -i arxiu.deb`** — Instal·la un paquet a partir d'un arxiu
`.deb` que ja tens al disc (per exemple, descarregat manualment des
d'una pàgina web).

**`dpkg -r paquet`** — Desinstal·la el paquet, deixant-ne la
configuració al sistema.

**`dpkg -P paquet`** — Purga el paquet: el desinstal·la i esborra
també tota la seva configuració.

**`dpkg -s paquet`** — Mostra l'estat i la prioritat del paquet
(`required`, `important`, `standard`, `optional` o `extra`), útil per
comprovar si un paquet concret està instal·lat.

**`dpkg --get-selections | grep paquet`** — Filtra la llista de tots
els paquets coneguts pel sistema per buscar-ne un en concret; si no
apareix cap resultat, és que no està instal·lat.

![Substitueix per la teva captura: terminal amb dpkg -i o dpkg -s](../../img/exemple.svg)

## Comprovació final

Abans de donar per acabat el sprint, revisa aquest resum:

- El sistema arrenca sense errors.
- La xarxa respon correctament als _pings_.
- **Els usuaris i grups creats coincideixen amb l'enunciat.**
