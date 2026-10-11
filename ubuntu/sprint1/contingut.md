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

**Exemple pràctic amb el paquet `sl`** (un petit programa que dibuixa
un tren al terminal):

1. Es descarrega l'arxiu `.deb` sense instal·lar-lo amb
   `apt download sl`, es comprova que és a la carpeta personal amb
   `ls *.deb` i s'instal·la amb `sudo dpkg -i sl_*.deb`:

   <video controls muted preload="metadata" src="videos/01-dpkg-instal-lar-sl.webm"></video>

2. Amb `dpkg -s sl` es comprova l'estat del paquet. Si el paquet ja
   s'ha desinstal·lat, `dpkg` avisa que **no està instal·lat** i, en
   intentar executar `sl`, el terminal respon que l'arxiu no existeix:

   <video controls muted preload="metadata" src="videos/02-dpkg-comprovar-sl.webm"></video>

3. Amb el paquet instal·lat, en escriure `sl` apareix el tren
   travessant el terminal, que confirma que la instal·lació funciona:

   <video controls muted preload="metadata" src="videos/03-sl-executant.webm"></video>

## Gestor d'arrencada (GRUB2)

El **gestor d'arrencada** és el programa que permet que l'ordinador
engegui el sistema operatiu. El més utilitzat a Ubuntu és **GRUB2**,
que deixa triar entre diferents sistemes si n'hi ha més d'un
instal·lat. Per organitzar l'espai del disc dur hi ha dues opcions:
**MBR** (antic, només funciona amb discos de fins a 2 TB) i **GPT**
(més modern, admet discos més grans i és més segur). Si en arrencar
apareix l'error **"Gestor d'arrencada pendent"** (o *grub rescue*),
vol dir que el sistema no sap com arrencar; es pot solucionar
reinstal·lant el gestor amb un USB o una imatge ISO.

> ⚠️ **Abans de començar**: aquest exercici trenca el gestor
> d'arrencada expressament per després reparar-lo. Fes-ho només en una
> **màquina virtual** i, si pots, crea abans una instantània (snapshot)
> per poder tornar enrere si alguna cosa surt malament.

Hi ha dues eines habituals per reparar GRUB2 quan es trenca: **Super
Grub2 Disk** (deixa arrencar el sistema de forma temporal encara que
GRUB estigui trencat, per després reinstal·lar-lo tu mateix) i
**Boot-Repair** (repara el gestor de manera automàtica, sense haver
d'escriure comandaments).

### Mètode 1 · Súper Grub2 Disk

1. Entra com a administrador a la carpeta `/boot` des del terminal. Amb
   `ls` es veu que hi ha la carpeta `grub` (en blau), al costat dels
   nuclis de Linux (`vmlinuz-7.0.0-...`) i de les imatges `initrd`:
   ```
   sudo su
   cd /boot
   ls
   ```

   ![Terminal com a root a /boot: ls mostra la carpeta grub juntament amb els fitxers vmlinuz, initrd, config i System.map](captures/grub-01-boot-abans-esborrar-grub.png)

2. Esborra la subcarpeta `grub/`. Aquest pas trenca el gestor
   d'arrencada expressament:
   ```
   rm -r grub/
   ```

   ![Terminal executant rm -r grub/ dins de /boot](captures/grub-02-esborrar-carpeta-grub.png)

   Si tornes a fer `ls`, veuràs que la carpeta `grub` ja no hi és. Els
   nuclis i les imatges `initrd` continuen al seu lloc; només falta el
   programa que els carrega:

   ![Terminal amb ls a /boot després d'esborrar grub: ja no apareix la carpeta grub](captures/grub-03-boot-sense-grub.png)

3. Reinicia la màquina. Com que GRUB no troba els seus arxius, surt
   l'error `file '/boot/grub/i386-pc/normal.mod' not found` i el
   sistema entra en **mode rescat** (`grub rescue>`), sense poder
   arrencar Ubuntu:

   ![Pantalla negra amb l'error normal.mod not found, Entering rescue mode i el prompt grub rescue](captures/grub-04-grub-rescue.png)

4. Apaga la màquina virtual, obre **Configuració → Emmagatzematge** i
   afegeix la imatge ISO de **Super Grub2 Disk**
   (`super_grub2_disk_hybrid_2.02s3.iso`) al lector òptic del
   controlador **IDE**.

   ![Configuració d'emmagatzematge de VirtualBox amb la ISO de Super Grub2 Disk carregada al controlador IDE](captures/grub-05-iso-super-grub2-configuracio.png)

   > 💡 La BIOS de VirtualBox només arrenca del CD que hi ha al
   > controlador **IDE**. Si hi tens la ISO de les *Guest Additions*,
   > canvia-la per la de Super Grub2 o la màquina tornarà a arrencar
   > del disc dur i al `grub rescue`.

5. Arrenca la màquina amb la ISO muntada. Al menú de Super Grub2,
   selecciona **"Detect and show boot methods"**. Després tria el
   nucli de Linux que apareix a la llista (per exemple
   `/vmlinuz-7.0.0-...-generic`) i prem **Enter** per iniciar Ubuntu de
   forma temporal.

6. Ja dins d'Ubuntu, obre un terminal, converteix-te en superusuari i
   reinstal·la GRUB definitivament:
   ```
   sudo su
   grub-install /dev/sda
   update-grub2
   apt-get install grub2
   ```
   - `grub-install /dev/sda` torna a escriure el gestor d'arrencada al
     disc principal i recrea la carpeta `/boot/grub`.
   - `update-grub2` busca els nuclis instal·lats i genera el menú
     d'arrencada (`grub.cfg`).
   - `apt-get install grub2` assegura que el paquet de GRUB està
     instal·lat correctament.

7. Apaga la màquina, treu la ISO del lector i torna-la a engegar:
   l'ordinador hauria d'arrencar de manera normal, amb GRUB ja reparat.

### Mètode 2 · Boot-Repair

1. Repeteix el trencament: `cd /boot` i `sudo rm -r grub/`. En reiniciar
   torna a sortir el missatge `grub rescue`:
   ```
   cd /boot
   sudo rm -r grub/
   ```

   ![Pantalla de grub rescue amb l'error normal.mod not found](captures/grub-06-grub-rescue-boot-repair.png)

2. Apaga la màquina virtual i, aquesta vegada, posa la imatge ISO de
   **Boot-Repair** (`boot-repair-disk-64bit.iso`) al lector òptic del
   controlador IDE, en lloc de la de Super Grub2.

3. Arrenca amb la ISO. Boot-Repair-Disk carrega un escriptori en mode
   *live* i obre automàticament el programa **Boot Repair**, que
   analitza el disc. A la finestra principal, tria **"Recommended
   repair"** (reparació recomanada), que sol ser suficient per
   resoldre els problemes més habituals de GRUB:

   ![Escriptori de Boot-Repair-Disk amb la finestra Boot Repair i els botons Recommended repair i Create a BootInfo summary](captures/grub-07-boot-repair-recommended-repair.png)

4. Durant el procés, Boot-Repair pregunta si vols pujar l'informe a
   internet (*"Upload the report to a pastebin?"*). No és necessari:
   es pot respondre **No** i l'informe es desa igualment dins de la
   màquina, a `/var/log/boot-repair/`.

   ![Diàleg Boot-Info preguntant Upload the report to a pastebin? amb els botons No i Yes](captures/grub-08-boot-repair-pastebin.png)

5. En acabar apareix el missatge **"Boot successfully repaired"**, que
   confirma que GRUB s'ha reinstal·lat:

   ![Missatge de Boot Repair: Boot successfully repaired, You can now reboot your computer](captures/grub-09-boot-repair-reparat.png)

6. Apaga la màquina, treu la ISO de Boot-Repair de la configuració i
   torna-la a engegar. El sistema ja no s'atura a `grub rescue`:
   arrenca Ubuntu amb normalitat i arriba a la pantalla d'inici de
   sessió.

   ![Pantalla d'inici de sessió d'Ubuntu amb l'usuari widad després de reparar GRUB](captures/grub-10-ubuntu-arrenca-normal.png)

**Diferència clau entre els dos mètodes**: amb Super Grub2 Disk
arrenques de manera temporal i després reinstal·les GRUB tu mateix
amb comandaments (`grub-install`, `update-grub2`); amb Boot-Repair
tot el procés de reparació és automàtic i només cal prémer un botó.

## Comprovació final

Abans de donar per acabat el sprint, revisa aquest resum:

- El sistema arrenca sense errors i GRUB mostra el menú d'arrencada.
- La xarxa respon correctament als _pings_.
- **Els usuaris i grups creats coincideixen amb l'enunciat.**
