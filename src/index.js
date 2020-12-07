import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import morgan from 'morgan'; // Stampa log HTTP
import fs from 'fs';

// Inizializzazione express.
const app = express();

// Abilitazione upload file.
// (specificare il nome della cartella temporanea da usare)
app.use(fileUpload({
	createParentPath: true,
    useTempFiles : true,
    tempFileDir : './tmp/'	
}));

// Abilitazione middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Serviamo il contenuto di public come risorse statiche.
app.use(express.static('public'));

// Avvio server.
const port = process.env.PORT || 3000;
app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

app.post('/upload', async (req, res) => {

	if(!req.files) {	
	  res.send({
		message: 'Errore: nessun file caricato'
	  });
	}
	else {
	  
	  // Path del file caricato nella cartella temporanea
	  let tempFilePath = req.files.nuovoFile.tempFilePath;
		  
	  // qui possiamo utilizzare il file, accedendo al
	  // path definito in tempFilePath	
	  console.log(`File caricato con successo: ${tempFilePath}`)
	  // ...
		  
	  // Risposta al browser
	  res.send({
		message: 'Caricamento effettuato con successo.'
	  })
				  
	}
	 
  });
