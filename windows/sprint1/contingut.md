> **Estat d'aquest sprint:** encara no s'ha fet la pràctica. El que ve a continuació és la
> **guia pas a pas** a seguir, adaptada de l'enunciat i de la guia pràctica de l'assignatura.
> Cada punt marcat amb 📸 necessita una captura de pantalla: quan la facis, desa-la a
> `windows/sprint1/captures/` amb el nom indicat (número de part i de pas, per exemple `1.1.png`)
> i substitueix aquest avís pel relat de com ho has fet, amb les imatges enllaçades.

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
S'hi instal·larà Windows a partir d'una imatge ISO, repartint el disc en particions
(unitats separades que el sistema veu de manera independent).

**Passos:**

1. Crear a VirtualBox una màquina anomenada **Windows-NomCognom** amb **4 GB de RAM** i un
   disc de **50 GB**. 📸 *(1.1)*
2. A **Configuració → Xarxa**, comprovar que l'**Adaptador 1** està habilitat i en mode **NAT**. 📸 *(1.2)*
3. Carregar la ISO de Windows 10 i començar la instal·lació (idioma, usuari amb el nom propi i contrasenya).
4. A la pantalla de particions, crear una partició de **30 GB** per a Windows i deixar els
   altres **20 GB sense assignar**. 📸 *(1.4)*
5. Un cop arrencat Windows, obrir `diskmgmt.msc` i, amb l'espai lliure, crear una partició
   **NTFS** amb la lletra **D:** i el nom **DADES**. 📸 *(1.5)*

> **Atenció a les particions:** no s'ha de fer servir tot el disc per a Windows: si no es
> deixen els 20 GB lliures, no es podrà fer el pas 5. Windows crearà també unes particions
> petites per al sistema; és normal.

## 2. Llicències

Windows no és gratuït: per fer-lo servir legalment cal una llicència activada. N'hi ha de
diferents tipus: **Retail** (es compra a part i es pot passar a un altre equip), **OEM**
(ve amb l'ordinador i hi queda lligada) i **de volum** (per a empreses i centres). Als
servidors, a més, hi ha les **CAL**.

**Passos:**

1. Anar a **Configuració → Sistema → Activació** i anotar l'edició de Windows i si està
   activat. 📸 *(2.1)*
2. Al `cmd`, executar `slmgr /xpr` (estat de l'activació) i `slmgr /dli` (tipus de
   llicència). 📸 *(2.2)*
3. Buscar el preu de Windows 11 Home i Pro a la botiga oficial de Microsoft i a una altra
   botiga. 📸 *(2.3)*
4. Buscar què és una **CAL** (Client Access License) a la web de Microsoft. 📸 *(2.4)*

## 3. Comandes bàsiques

La línia de comandes permet donar ordres a l'ordinador escrivint, sense finestres ni
ratolí. És més ràpida per a moltes tasques i és l'eina habitual per administrar sistemes.
Tots els passos es fan des del **Símbol del sistema (cmd)**, en ordre.

**Passos:**

1. Entrar a l'Escriptori amb `cd Desktop`, crear una carpeta amb `mkdir practica` i
   entrar-hi amb `cd practica`. 📸 *(3.1)*
2. Crear un fitxer amb `echo hola > nota.txt` i comprovar que hi és amb `dir`. 📸 *(3.2)*
3. Fer-ne una còpia amb `copy nota.txt copia.txt` i comprovar-ho amb `dir`. 📸 *(3.3)*
4. Crear la carpeta `mkdir arxiu` i moure-hi la còpia amb `move copia.txt arxiu`. 📸 *(3.4)*
5. Canviar el nom d'un fitxer amb `ren nota.txt notes.txt`, i d'una carpeta amb
   `ren arxiu backup`, i comprovar-ho amb `dir`. 📸 *(3.5)*
6. Entrar a la carpeta amb `cd backup`, mirar què hi ha amb `dir` i sortir amb `cd ..`. 📸 *(3.6)*
7. Mostrar l'estructura amb `tree /f`. 📸 *(3.7)*
8. Esborrar el fitxer amb `del notes.txt` i comprovar-ho amb `dir`. 📸 *(3.8)*
9. Netejar la pantalla amb `cls`.

## 4. Aplicacions i punts de restauració

Un punt de restauració és una còpia de l'estat del sistema (programes, configuració i
registre) en un moment concret. Si després d'instal·lar alguna cosa el sistema falla, es
pot tornar a aquell punt; els documents personals no s'esborren. Es provarà instal·lant
Google Chrome.

**Passos:**

1. Buscar **Crear un punt de restauració**, activar la protecció del sistema al disc
   **C:** i crear un punt anomenat **Abans de Chrome**. 📸 *(4.1)*
2. Descarregar Chrome de la web oficial de Google, instal·lar-lo i obrir-lo. 📸 *(4.2)*
3. Anar a **Restaurar sistema**, triar el punt creat i prémer **Cerca programes afectats**:
   hi ha d'aparèixer Chrome. 📸 *(4.3)*
4. Restaurar el sistema i comprovar que Chrome ja no hi és. 📸 *(4.4)*

## 5. Xarxa

Per tenir Internet, l'equip necessita una adreça IP, una connexió activa i un servidor
DNS, que tradueix noms com `google.com` a adreces IP. Fent `ping` a un nom i a una IP es
pot saber si hi ha connexió i on falla. Es canviarà l'adaptador de la màquina virtual per
veure què passa.

**Passos:**

1. Amb l'adaptador en **NAT**, executar `ipconfig`, `ping google.com` i `ping 8.8.8.8`. 📸 *(5.1)*
2. A VirtualBox, **Dispositius → Xarxa**, desmarcar **Connecta el cable** i repetir els dos
   `ping`. 📸 *(5.2)*
3. Tornar a connectar el cable i canviar l'adaptador a **Adaptador pont**. Repetir
   `ipconfig` i els dos `ping`. 📸 *(5.3)*
4. A Windows, posar el DNS manual **1.2.3.4** i repetir els dos `ping`. Després tornar a
   posar el DNS en automàtic. 📸 *(5.4)*

## Comprovació final

Abans de donar per acabat el sprint, revisa aquest resum:

- La màquina virtual arrenca Windows correctament, amb les particions `C:` i `D:` creades.
- La llicència i el seu tipus queden identificats i justificats.
- Totes les comandes bàsiques del punt 3 s'han provat i comprovat amb `dir`.
- El punt de restauració desfà la instal·lació de Chrome correctament.
- Els quatre escenaris de xarxa del punt 5 queden documentats amb el resultat del `ping`.
