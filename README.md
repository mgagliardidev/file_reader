# File reader

## Funzionamento applicativo

1. selezionare il tipo di input (url o file locale; l'url deve puntare ad un file di testo)

2. immetere il path o l'url all'interno dello spazio

3. premere submit

4. se il file viene trovato, appariranno al di sotto:
   
   1. numero di caratteri (esclusi spazi)
   
   2. numero di spazi
   
   3. numero di parole
   
   4. parole che si ripetono più di 10 volte, con il relativo numero di volte che queste si ripetono

5. se si volesse inserie un secondo file, è sufficiente cambiare l'input col path desiderato e premere di nuovo submit;

## Dev Notes

### Installazione e start-server

struttura dei file:

file_reader

src

|     api

|    |    readFile.ts

|     public

|    |    index.ts

|    types

|   |    fileReaderResponse.ts

|    view

|    |     index.html

|    app.ts

testfiles

|    example_urls.txt

|    test_unit.txt

|    test1.txt

tests

|    index.test.ts

|    tsconfig.json

.gitignore

jest.config.js

package-lock.json

package.json

README.md

tsconfig.json



### Install e start server

dalla root, lanciare il comando "npm i" per generare i node modules

per far partire il server

- in modalità user: npm start

- in modalità watch: npm run dev

il server viene lanciato su http://localhost:3000 , caricando la pagina index.html



### Note tecniche

sul server (app.ts) sono registrate due api: readFile/web e readFile/local, che vengono lanciate al click del pulsante submit in base alla scelta fatta nella picklist; 

Entrambe le api definite dentro api/readFIle.ts ritornano un oggetto di tipo FileReaderResponse che contiene le specifiche del file richieste (contiente anche tutte le parole e il loro numero di ripetizioni che poi verrano filtrare per n>=10 all'interno di index.ts).

### 

## Testing

per eseguire gli u-test, lanciare il comando npm run test: verrà testata l'api /local; ci sono dei file di testo e degli url di esempio testati
