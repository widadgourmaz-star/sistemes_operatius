# Guia per fer la pràctica 0377 A1: Instal·lació i configuració de MySQL

> **Com fer servir aquesta guia:** executa les comandes a la teva màquina virtual, fes una captura de cada resultat i, sota cada captura, escriu amb les teves paraules **què has fet, per què i què es veu**. L'enunciat diu que una captura sense explicació compta com a NO feta.
>
> Entrega: **PDF** amb el nom `0377_A1_WidadGourmaz.pdf`.

---

## Estructura recomanada del document

1. Portada (nom, cognoms, mòdul 0377, A1, curs 2026-27)
2. Índex
3. Introducció (2-3 línies: què faràs a la pràctica)
4. Tasques prèvies (la màquina virtual)
5. Apartats 1 a 11 (un títol per apartat, amb el mateix número que l'enunciat)
6. Problemes trobats i solucions (puntua a favor)
7. Conclusió

---

## Tasques prèvies: la màquina virtual

- Ubuntu Desktop 24.04.
- VirtualBox → Configuració → Xarxa → Adaptador 2 (o 1): **Adaptador només amfitrió** (*Host-only Adapter*).
- Arrenca la màquina i mira la IP d'aquesta xarxa:

```bash
ip a
```

Normalment serà una IP de l'estil `192.168.56.101`. **Apunta-la**, perquè la faràs servir a l'apartat 10.

📸 Captura de la configuració de xarxa de VirtualBox i del resultat de `ip a` (marca la IP).

---

## Instal·lació i habilitació del servei

### 1. Instal·lar mysql-server (0,25 p)

```bash
sudo apt update
sudo apt install mysql-server -y
mysql --version
```

**Explica:** `apt update` actualitza la llista de paquets; `apt install mysql-server` instal·la el servidor i el client; `mysql --version` comprova la versió instal·lada (MySQL 8.0.x).

### 2. Comprovar l'estat del servei (0,25 p)

```bash
sudo systemctl status mysql
sudo systemctl is-enabled mysql
```

**Explica:** ha de sortir `active (running)` en verd, i `enabled`, que vol dir que s'engega sol en arrencar la màquina. Si no està habilitat: `sudo systemctl enable mysql`.

### 3. mysql_secure_installation (0,5 p)

```bash
sudo mysql_secure_installation
```

Respostes recomanades:

| Pregunta | Resposta | Per què |
|---|---|---|
| VALIDATE PASSWORD component? | `y` i nivell `1` (MEDIUM) | Obliga a fer servir contrasenyes segures |
| Remove anonymous users? | `y` | Elimina usuaris sense nom, que qualsevol pot fer servir |
| Disallow root login remotely? | `y` | root només pot entrar des de la mateixa màquina |
| Remove test database? | `y` | Esborra la base de dades `test`, oberta a tothom |
| Reload privilege tables now? | `y` | Aplica els canvis immediatament |

> ⚠️ A Ubuntu, l'usuari `root` de MySQL s'autentica amb `auth_socket` (entra amb `sudo mysql` sense contrasenya). Per això l'assistent pot dir que s'ha saltat la configuració de la contrasenya de root. **Comenta-ho al document**: és un bon exemple d'"inconvenient i solució".

Comprova que s'ha aplicat:

```bash
sudo mysql
```
```sql
SELECT user, host, plugin FROM mysql.user;
SHOW DATABASES;
EXIT;
```

**Explica:** ja no hi ha cap usuari amb el nom buit, `root` només té host `localhost` i la base de dades `test` ja no apareix.

### 4. Importar la base de dades de proves (0,5 p)

Descarrega `mysqlsampledatabase.zip` des de l'enllaç de l'enunciat (mysqltutorial.org) amb el navegador de la màquina virtual, o amb `wget` copiant l'enllaç del botó de descàrrega:

```bash
cd ~/Baixades        # o ~/Downloads
sudo apt install unzip -y
unzip mysqlsampledatabase.zip
ls
sudo mysql < mysqlsampledatabase.sql
```

**Explica:** l'arxiu `.sql` conté totes les ordres per crear la base de dades `classicmodels` (taules i dades). Amb `<` passem el fitxer a MySQL perquè l'executi.

### 5. Comprovar l'accés i la importació (0,5 p)

```bash
sudo mysql
```
```sql
SHOW DATABASES;
USE classicmodels;
SHOW TABLES;
SELECT * FROM customers;
SELECT COUNT(*) FROM customers;
```

**Explica:** apareix la base de dades `classicmodels` amb 8 taules, i la taula `customers` té 122 clients.

---

## Configuració de xarxa i ajust de memòria

Fitxer de configuració de MySQL a Ubuntu:

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

📸 Fes una captura del fitxer **abans** de modificar-lo.

### 6. bind-address de 127.0.0.1 a 0.0.0.0 (1 p)

Abans, comprova el valor actual:

```bash
sudo ss -tlnp | grep mysql
```
Ha de sortir `127.0.0.1:3306`, que vol dir que MySQL només accepta connexions des de la mateixa màquina.

Edita el fitxer, a la secció `[mysqld]`:

```ini
bind-address = 0.0.0.0
```

Desa (Ctrl+O, Enter, Ctrl+X) i reinicia el servei:

```bash
sudo systemctl restart mysql
sudo ss -tlnp | grep mysql
```

Ara ha de sortir `0.0.0.0:3306`. També ho pots comprovar des de MySQL:

```sql
SHOW VARIABLES LIKE 'bind_address';
```

**Explica:** `0.0.0.0` vol dir que escolta per totes les interfícies de xarxa, i per tant accepta connexions d'altres equips. Fes captures de l'abans i el després.

### 7. Consultar innodb_buffer_pool_size en format "humà" (1,5 p)

```sql
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SELECT @@innodb_buffer_pool_size / 1024 / 1024 AS 'Buffer pool (MB)';
```

Per defecte surt `134217728` (en **bytes**):

```
134217728 / 1024 = 131072 KB
131072 / 1024    = 128 MB
```

**Explica:** el *buffer pool* és la memòria cau on InnoDB guarda les dades i els índexs més utilitzats. Així no ha de llegir-los del disc cada vegada, cosa que és molt més lenta. Per defecte MySQL reserva 128 MB.

### 8. Canviar innodb_buffer_pool_size i comprovar-ho (1,5 p)

Primer mira quanta RAM té la màquina virtual:

```bash
free -h
```

- Màquina virtual amb 2 GB → posa `256M`
- Màquina virtual amb 4 GB o més → posa `512M`

Afegeix aquesta línia al fitxer `mysqld.cnf`, a la secció `[mysqld]`:

```ini
innodb_buffer_pool_size = 512M
```

Reinicia i torna a consultar:

```bash
sudo systemctl restart mysql
sudo mysql -e "SELECT @@innodb_buffer_pool_size / 1024 / 1024 AS 'Buffer pool (MB)';"
```

Ha de sortir `512.0000` (o `256.0000`).

**Explica:** per què has triat aquest valor en funció de la RAM. Si li donéssim massa memòria, el sistema operatiu es quedaria sense RAM i hauria de fer servir la memòria d'intercanvi (*swap*). Pots comentar que també es pot canviar en calent amb `SET GLOBAL innodb_buffer_pool_size = ...`, però aquest canvi es perd en reiniciar. Per això l'hem posat al fitxer de configuració.

### 9. Port d'escolta per defecte (1 p)

```bash
grep -n "port" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo ss -tulpn | grep 3306
```
```sql
SHOW VARIABLES LIKE 'port';
```

**Explica:** al fitxer, la línia `# port = 3306` està comentada (amb `#`), i per tant MySQL fa servir el port per defecte, el **3306/TCP**. `ss -tulpn` mostra els ports que estan escoltant (`t` TCP, `u` UDP, `l` en escolta, `p` procés, `n` en números). Ha de sortir el procés `mysqld` a `0.0.0.0:3306`. També veuràs el port **33060**, que és el del protocol X de MySQL.

---

## Creació d'un usuari per a connexions externes

### 10. Usuari remot i connexió des de l'amfitrió (2 p)

Fes servir **el teu nom** i la subxarxa de l'adaptador només amfitrió (normalment `192.168.56`):

```sql
CREATE USER 'widad'@'192.168.56.%' IDENTIFIED BY 'ContrasenyaSegura2026!';
GRANT ALL PRIVILEGES ON *.* TO 'widad'@'192.168.56.%';
FLUSH PRIVILEGES;
SELECT user, host FROM mysql.user;
```

**Explica:**
- `'widad'@'192.168.56.%'`: l'usuari només es pot connectar des d'IP de la xarxa 192.168.56.x (el `%` és un comodí).
- `GRANT ALL PRIVILEGES ON *.*`: li donem tots els permisos sobre totes les bases de dades i taules.
- `FLUSH PRIVILEGES`: recarrega les taules de permisos.

**Tallafocs** (si està actiu, cal obrir el port):

```bash
sudo ufw status
sudo ufw allow 3306/tcp     # només si està "active"
```

**Connexió des de l'equip amfitrió:**
- Si l'amfitrió és **Windows**: instal·la el client de MySQL (MySQL Installer → només "MySQL Server/Client" o "MySQL Shell"), o fes servir MySQL Workbench. Des de la terminal (cmd o PowerShell):
- Si l'amfitrió és **Linux**: `sudo apt install mysql-client`.

```bash
mysql -u widad -h 192.168.56.101 -p
```

Un cop dins:

```sql
SELECT USER(), CURRENT_USER();
SHOW DATABASES;
SELECT COUNT(*) FROM classicmodels.customers;
```

**Explica:** `USER()` mostra que et connectes des de la IP de l'amfitrió (per exemple `widad@192.168.56.1`), i això demostra que la connexió és remota.

**Errors típics (documenta'ls si et passen):**

| Error | Causa | Solució |
|---|---|---|
| `ERROR 2003 Can't connect` | bind-address encara a 127.0.0.1 o tallafocs | Revisar l'apartat 6 / `ufw allow 3306` |
| `ERROR 1130 Host ... is not allowed` | La IP de l'amfitrió no coincideix amb `192.168.56.%` | Mirar la IP real a l'error i recrear l'usuari |
| `ERROR 1045 Access denied` | Contrasenya incorrecta | Tornar-la a escriure o `ALTER USER` |
| `Your password does not satisfy...` | validate_password (apartat 3) | Fer servir una contrasenya amb majúscules, números i símbols |

---

## Activitats extra

### 11. Usuari per als companys de l'aula (1 p)

⚠️ **Inconvenient important:** la xarxa "només amfitrió" és privada entre el teu PC i la teva màquina virtual, i els companys **no hi arriben**. Per això cal afegir a la màquina virtual un adaptador en **mode pont** (*Bridged Adapter*), que la connecta a la xarxa de l'aula.

```bash
ip a        # mira la nova IP de la xarxa de l'aula, per exemple 192.168.1.57
```

Crea un usuari per als companys, millor **amb permisos limitats** (és més segur):

```sql
CREATE USER 'companys'@'192.168.1.%' IDENTIFIED BY 'AulaSegura2026!';
GRANT SELECT ON classicmodels.* TO 'companys'@'192.168.1.%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'companys'@'192.168.1.%';
```

(Canvia `192.168.1.%` per la xarxa real de l'aula.)

Un company es connecta amb:

```bash
mysql -u companys -h <IP_pont_de_la_teva_VM> -p
```

**Explica:** per què has canviat l'adaptador, per què només li dones `SELECT` (principi de mínim privilegi) i ensenya-ho al professor.

---

## Problemes trobats i solucions

Aquí escriu tot el que t'hagi fallat. Per exemple: root amb `auth_socket`, la contrasenya rebutjada per validate_password, el tallafocs, la xarxa només amfitrió a l'extra... Aquest apartat puntua a favor.

## Conclusió

3-4 línies: què has après (instal·lar i assegurar MySQL, configurar la xarxa i la memòria, crear usuaris remots).

---

## Checklist abans d'entregar

- [ ] Apartats de l'1 a l'11 fets, cap en blanc
- [ ] Cada captura té una explicació escrita
- [ ] Usuari amb el teu nom (no "alumne")
- [ ] Revisió d'ortografia (cada falta resta 0,2 punts): instal·lació, configuració, contrasenya, màquina, memòria, també, això...
- [ ] Exportat a PDF: `0377_A1_WidadGourmaz.pdf`
