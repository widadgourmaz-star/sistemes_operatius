## Enunciat i objectius d'aquest sprint

Cal crear una màquina virtual per allotjar un Windows i fer-ne la instal·lació completa,
triant les opcions adequades per a un ús general d'ofimàtica. Durant la instal·lació cal
identificar els elements funcionals del sistema (gestor d'arxius, gestor de processos,
sistema de permisos, registre de Windows) i tenir en compte els tipus de llicència
(OEM, Retail, Volum, Educacional), indicant quina s'fa servir en el projecte i per què.

Un cop instal·lat, cal configurar la xarxa (DHCP, IP estàtica, DNS, grup de treball) i
comprovar-ne el funcionament amb `ping` i `ipconfig`; instal·lar programari bàsic de
seguretat i utilitats (antivirus, tallafocs, eines d'actualització, compressió, navegador
alternatiu); i simular una incidència d'arrencada (boot) resolent-la amb les eines de
recuperació de Windows (WinRE, `bootrec`, `bcdedit`).

**Objectius:**

- Identificar els elements funcionals d'un sistema operatiu.
- Fer la instal·lació i configuració inicial d'un Windows.
- Configurar i verificar els serveis i protocols de xarxa.
- Utilitzar màquines virtuals per a tota la configuració.

## 1. Màquina virtual, instal·lació i particions

Una màquina virtual és un ordinador simulat que funciona dins del teu: tu decideixes
quanta memòria, quant disc i quina xarxa té, i el que hi facis no afecta l'equip real.
Hi vaig instal·lar Windows 11 a partir d'una imatge ISO, repartint el disc en particions
(unitats separades que el sistema veu de manera independent).

### Creació de la màquina virtual

Vaig crear a VirtualBox una màquina anomenada **Windows11widad**, amb **2 processadors**,
**4942 MB de RAM** (uns 4,8 GB) i un disc dur virtual de mida dinàmica de **50,67 GB**.
Com que és Windows 11, vaig activar l'opció **Enable EFI** ja durant l'assistent de
creació.

![Resum de la creació de la màquina virtual Windows11widad, amb 4942 MB de RAM, 2 processadors, EFI activat i disc de 50,67 GB](captures/01-resum-creacio-maquina-virtual.png)

![Pas de maquinari de l'assistent, amb els lliscadors de memòria base i processadors, i la casella Enable EFI marcada](captures/02-maquinari-ram-cpu-efi.png)

![Pas de disc dur virtual de l'assistent, amb un disc nou de mida dinàmica de 50,67 GB](captures/03-disc-virtual-50gb.png)

Un cop creada, vaig anar a **Configuració → Sistema → Placa mare** i vaig confirmar que
hi havia **TPM v2.0**, **Activa EFI** i **Enable Secure Boot** marcats: Windows 11 (a
diferència de Windows 10) exigeix aquests tres requisits, i si no estan actius
l'instal·lador es queda aturat dient que l'equip no compleix els requisits mínims.

![Configuració de Sistema de la VM amb TPM v2.0 seleccionat, Activa EFI marcat i Enable Secure Boot marcat](captures/04-configuracio-tpm-secureboot-efi.png)

### Primeres passes de l'instal·lador

Vaig muntar la ISO de Windows 11 i vaig engegar la màquina. El primer pas de l'assistent
va ser triar l'idioma i el format d'hora i moneda (Español, España, internacional):

![Pantalla de l'instal·lador demanant l'idioma per instal·lar i el format d'hora i moneda, amb Español (España, internacional) seleccionat als dos camps](captures/05-instal-lador-seleccio-idioma.png)

### Incidència trobada: el disc no complia els requisits mínims

En arribar a la pantalla de particions, amb els 50,7 GB sense assignar seleccionats,
l'instal·lador em va mostrar l'avís **"Windows 11 no se puede instalar en esta
unidad"**, sense deixar continuar:

![Pantalla de selecció d'ubicació amb Disco 0 Espacio sin asignar (50,7 GB) seleccionat i l'avís Windows 11 no se puede instalar en esta unidad](captures/06-error-inicial-disc-no-valid.png)

Per investigar-ho, vaig obrir una línia d'ordres dins del mateix instal·lador (**Mayús +
F10**) i vaig comprovar amb `diskpart` la mida real del disc:
```
diskpart
list disk
```

![Finestra de DiskPart dins de l'instal·lador mostrant Disco 0, En línea, 50 GB](captures/07-diskpart-list-disk-50gb.png)

El disc era efectivament de 50 GB. Vaig tornar a l'assistent gràfic i vaig clicar
**"Mostrar detalles"** sota l'avís, i allà vaig trobar el motiu exacte:

![Diàleg d'error indicant: La unidad del sistema debe tener al menos 52 GB o más](captures/08-error-minim-52gb.png)

**"La unidad del sistema debe tener al menos 52 GB o más."** És a dir: tot i que la guia
de la pràctica demanava un disc de 50 GB, aquesta ISO en concret de Windows 11 necessita
com a mínim 52 GB per poder-hi instal·lar el sistema.

### Resolució de la incidència

Vaig apagar la màquina virtual completament i, des d'un terminal del meu Linux (fora de
la VM), vaig localitzar el fitxer de disc i l'vaig ampliar a 64 GB per tenir marge:
```
VBoxManage list hdds
VBoxManage modifymedium disk "/home/alumnat/VirtualBox VMs/Windows11widad/Windows11widad.vdi" --resize 65536
```

Vaig tornar a engegar la màquina, vaig entrar una altra vegada per `diskpart` i vaig
netejar el disc perquè l'instal·lador reconstruís la taula de particions amb la mida
nova:
```
diskpart
select disk 0
clean
convert gpt
exit
exit
```

Després de clicar **Actualizar**, l'espai sense assignar ja mostrava **64 GB** i l'avís
d'error havia desaparegut:

![Pantalla de selecció d'ubicació amb Disco 0 Espacio sin asignar de 64,0 GB i sense cap avís d'error](captures/09-disc-ampliat-64gb-sense-assignar.png)

### Creació de la partició de Windows

Amb l'espai sense assignar seleccionat, vaig clicar **Crear partición** i hi vaig
escriure **30000** (MB) per deixar-ne la resta lliure per a una futura unitat `D:`. Al
primer intent se'm va quedar massa petita (uns 2,9 GB, per un error en teclejar la
mida), així que vaig esborrar aquella partició i la vaig tornar a crear, aquesta vegada
comprovant bé el número abans de confirmar. El resultat final va ser:

![Llista final de particions: Sistema 200 MB, MSR 16 MB, Principal 29,3 GB i Espacio sin asignar 34,5 GB](captures/10-particions-finals-30gb-windows.png)

- **Partició 1 — Sistema**: 200 MB (creada automàticament per a l'arrencada EFI)
- **Partició 2 — MSR (reservado)**: 16 MB (reservada pel sistema)
- **Partició 3 — Principal**: 29,3 GB, on es va instal·lar Windows
- **Espai sense assignar**: 34,5 GB, reservats per crear-hi una unitat de dades més endavant

Vaig seleccionar la Partició 3 i vaig prémer **Siguiente** per començar la instal·lació
de debò. L'assistent va copiar els arxius i es va reiniciar sol unes quantes vegades
fins arribar a la configuració inicial (idioma, país, teclat i compte d'usuari local
**widad**).

### Instal·lació completada

Un cop acabada la configuració inicial, Windows 11 ja arrenca normal amb la pantalla
d'inici de sessió de l'usuari **widad**:

![Pantalla d'inici de sessió de Windows 11 amb l'usuari widad](captures/11-inici-sessio-widad.webp)

I, en entrar-hi, l'escriptori i el menú Inici ja funcionen amb normalitat (es veu a la
cantonada inferior dreta que és l'edició **Windows 11 Enterprise Evaluation**):

![Escriptori de Windows 11 amb el menú Inici obert, mostrant les aplicacions anclades](captures/12-escriptori-windows11-instal-lat.webp)

### Creació de la unitat de dades

Per acabar, vaig obrir `diskmgmt.msc` per convertir els 34,5 GB sense assignar en una
segona unitat. Com que les lletres **D:** i **E:** ja estaven ocupades per les dues
unitats òptiques virtuals (una buida i una altra amb la ISO de Windows muntada), vaig
deixar que l'assistent assignés la primera lletra lliure, que va ser la **F:**, amb
sistema de fitxers **NTFS** i el nom de volum **DADES**:

![Finestra d'Administración de discos amb totes les particions creades: C: de 28,57 GB, la partició de 200 MB, la de recuperació de 748 MB, i DADES (F:) de 34,49 GB](captures/13-particio-dades-f-creada.webp)

Amb això la part 1 del sprint (màquina virtual, instal·lació i particions) ja està
completa.

## 2. Llicències

Windows no és gratuït: per fer-lo servir legalment cal una llicència activada. N'hi ha de
diferents tipus: **Retail** (es compra a part i es pot passar a un altre equip), **OEM**
(ve amb l'ordinador i hi queda lligada) i **de volum** (per a empreses i centres). Als
servidors, a més, hi ha les **CAL**.

Vaig anar a **Configuración → Sistema → Activación** per veure l'edició instal·lada i
l'estat d'activació: **Windows 11 Enterprise Evaluation**, amb l'estat **Activo**.

![Pantalla de Configuración, Sistema, Activación amb Windows 11 Enterprise Evaluation i estado de activación Activo](captures/15-configuracio-activacion-grafica.png)

Des del `cmd`, vaig comprovar-ho també per comandes. Amb `slmgr /xpr` es veu quan caduca
l'activació temporal (16/01/2027):

![Finestra de Windows Script Host amb el resultat de slmgr /xpr, EnterpriseEval edition, activació amb límit de temps](captures/14-slmgr-xpr-activacio.png)

I amb `slmgr /dli` es veu el tipus de llicència concret: canal **TIMEBASED_EVAL**, amb
129408 minuts (90 dies) fins que caduca:

![Finestra de Windows Script Host amb el resultat de slmgr /dli: nom, descripció, clau de producte parcial i expiració](captures/16-slmgr-dli-tipus-llicencia.png)

Després vaig buscar els preus de Windows 11 a la botiga oficial de Microsoft:
**Windows 11 Home** val 145,00 €...

![Pàgina de Microsoft amb el preu de Windows 11 Home, 145,00 euros](captures/17-preu-windows11-home-microsoft.png)

...i **Windows 11 Pro** val 259,00 €:

![Pàgina de Microsoft amb el preu de Windows 11 Pro, 259,00 euros](captures/18-preu-windows11-pro-microsoft.png)

A una altra botiga (Softlite) vaig trobar Windows 11 Pro dins d'un paquet combinat amb
Office 2024 i Illustrator per 35,00 € en oferta (preu normal 54,00 €) — molt més barat
que a Microsoft, però perquè va inclòs amb altre programari, no és Windows 11 Pro sol:

![Pàgina de Softlite amb el paquet Windows 11 Pro + Office 2024 + Illustrator a 35 euros](captures/19-preu-windows11-pro-softlite.png)

## 3. Comandes bàsiques

La línia de comandes permet donar ordres a l'ordinador escrivint, sense finestres ni
ratolí. És més ràpida per a moltes tasques i és l'eina habitual per administrar sistemes.
Des del **Símbol del sistema (cmd)**, el pla és:

- Entrar a l'Escriptori amb `cd Desktop`, crear una carpeta amb `mkdir practica` i
  entrar-hi amb `cd practica`.
- Crear un fitxer amb `echo hola > nota.txt` i comprovar que hi és amb `dir`.
- Fer-ne una còpia amb `copy nota.txt copia.txt` i comprovar-ho amb `dir`.
- Crear la carpeta `mkdir arxiu` i moure-hi la còpia amb `move copia.txt arxiu`.
- Canviar el nom d'un fitxer amb `ren nota.txt notes.txt`, i d'una carpeta amb
  `ren arxiu backup`, i comprovar-ho amb `dir`.
- Entrar a la carpeta amb `cd backup`, mirar què hi ha amb `dir` i sortir amb `cd ..`.
- Mostrar l'estructura amb `tree /f`.
- Esborrar el fitxer amb `del notes.txt` i comprovar-ho amb `dir`.
- Netejar la pantalla amb `cls`.

## 4. Aplicacions i punts de restauració

Un punt de restauració és una còpia de l'estat del sistema (programes, configuració i
registre) en un moment concret. Si després d'instal·lar alguna cosa el sistema falla, es
pot tornar a aquell punt; els documents personals no s'esborren. Ho provaré instal·lant
Google Chrome:

- Crear un punt de restauració, activant la protecció del sistema al disc `C:`, amb el
  nom "Abans de Chrome".
- Descarregar Chrome de la web oficial de Google, instal·lar-lo i obrir-lo.
- Anar a Restaurar sistema, triar el punt creat i comprovar que detecta Chrome com a
  programa afectat.
- Restaurar el sistema i comprovar que Chrome ja no hi és.

## 5. Xarxa

Per tenir Internet, l'equip necessita una adreça IP, una connexió activa i un servidor
DNS, que tradueix noms com `google.com` a adreces IP. Fent `ping` a un nom i a una IP es
pot saber si hi ha connexió i on falla. El pla és canviar l'adaptador de la màquina
virtual per veure què passa en cada cas:

- Amb l'adaptador en NAT, executar `ipconfig`, `ping google.com` i `ping 8.8.8.8`.
- Desconnectar el cable virtual de xarxa i repetir els dos `ping`.
- Tornar a connectar el cable i canviar l'adaptador a mode pont, repetint `ipconfig` i
  els dos `ping`.
- Posar un DNS manual (1.2.3.4) i repetir els dos `ping`, i després tornar el DNS a
  automàtic.
