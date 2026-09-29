## Tallafocs i control d'accés

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Un
**tallafocs** ben configurat només obre els ports que realment es fan
servir.

- Consultar les regles actives.
- Obrir només els ports necessaris.
- Bloquejar la resta de trànsit entrant.

## Còpies de seguretat

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Una
política de **còpies de seguretat** periòdiques evita perdre
informació important.

![Exemple de captura de pantalla d'una còpia de seguretat](../../img/exemple.svg)

## Monitorització del sistema

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Monitoritzar l'ús de **CPU,
memòria i disc** ajuda a detectar problemes abans que afectin el
servei.

- Revisar l'ús de recursos amb eines del sistema.
- Configurar alertes davant valors anormals.

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

1. Entra com a administrador a la carpeta `/boot` des del terminal i
   elimina la subcarpeta `grub/`. Aquest pas esborra el gestor
   d'arrencada expressament:
   ```
   cd /boot
   sudo rm -r grub/
   ```

   ![Substitueix per la teva captura: terminal a /boot després d'esborrar la carpeta grub/](../../img/exemple.svg)

2. Reinicia l'ordinador. Durant l'arrencada apareixerà el missatge
   `grub rescue`, indicant que el sistema no troba el gestor
   d'arrencada. Apaga la màquina virtual, obre la seva configuració i
   afegeix la imatge ISO de **Super Grub2 Disk** al lector virtual de
   discos.

   ![Substitueix per la teva captura: missatge "grub rescue" i configuració de la ISO](../../img/exemple.svg)

3. Arrenca la màquina amb la ISO muntada. Al menú de Super Grub2,
   selecciona **"Detect and show boot methods"** per veure les
   opcions d'arrencada disponibles.

   ![Substitueix per la teva captura: menú principal de Super Grub2 Disk](../../img/exemple.svg)

4. Tria l'opció d'arrencada que et mostra Super Grub2 (per exemple, el
   nucli de Linux que apareix a la llista) i prem **Enter** per
   iniciar el sistema operatiu de forma temporal.

   ![Substitueix per la teva captura: llista de sistemes detectats per Super Grub2](../../img/exemple.svg)

5. Ja dins del sistema operatiu, obre un terminal, converteix-te en
   superusuari i reinstal·la GRUB definitivament:
   ```
   sudo su
   grub-install /dev/sda
   update-grub2
   sudo apt-get install grub2
   ```

   ![Substitueix per la teva captura: terminal reinstal·lant GRUB amb grub-install i update-grub2](../../img/exemple.svg)

6. Reinicia sense la ISO muntada: l'ordinador hauria d'arrencar de
   manera normal, amb GRUB ja reparat.

### Mètode 2 · Boot-Repair

1. Repeteix el trencament: `cd /boot` i `sudo rm -r grub/`, reinicia i
   torna a veure el missatge `grub rescue`.
   ```
   cd /boot
   sudo rm -r grub/
   ```

2. Apaga la màquina virtual i, aquesta vegada, afegeix la imatge ISO
   de **Boot-Repair** a la configuració (en lloc de la de Super
   Grub2).

   ![Substitueix per la teva captura: configuració de la màquina amb la ISO de Boot-Repair](../../img/exemple.svg)

3. Arrenca amb la ISO de Boot-Repair. Selecciona **"Start
   Boot-Repair-Disk"** a la pantalla de benvinguda.

   ![Substitueix per la teva captura: pantalla d'inici "Boot-Repair-Disk"](../../img/exemple.svg)

4. Al programa Boot-Repair, tria **"Recommended repair"** (reparació
   recomanada), que sol ser suficient per resoldre els problemes més
   habituals de GRUB.

   ![Substitueix per la teva captura: finestra principal de Boot-Repair amb "Recommended repair"](../../img/exemple.svg)

5. Espera que acabi el procés. Apareixerà el missatge **"Boot
   successfully repaired"**, amb un enllaç per si encara tinguessis
   problemes. Apaga la màquina, treu la ISO de Boot-Repair de la
   configuració i torna a encendre-la: el sistema hauria d'arrencar
   normal amb GRUB restaurat.

   ![Substitueix per la teva captura: missatge "Boot successfully repaired"](../../img/exemple.svg)

**Diferència clau entre els dos mètodes**: amb Super Grub2 Disk
arrenques de manera temporal i després reinstal·les GRUB tu mateix
amb comandaments (`grub-install`, `update-grub2`); amb Boot-Repair
tot el procés de reparació és automàtic.
