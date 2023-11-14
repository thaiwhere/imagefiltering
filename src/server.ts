import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */  
  app.get( "/filteredimage/", async (req: express.Request, res: express.Response)=>{
    
    // Check image_url
    const image_url = req.query.image_url;    
    if(image_url?.length == 0) {
      return res.status(400).send("The image_url parameter is required.");
    }

    // Receive image_url parameter and process image by FilterImageFromURL
    await filterImageFromURL(<string>image_url)
      .then(filtered_path => {

        // Image is processed successfully and send the resulting file in the response
        return res.status(200).sendFile(filtered_path, () => {
          deleteLocalFiles([filtered_path]);
        });
      }).catch(() => {
        return res.status(444).send("Filtering the image get error.");
      });
  });
    
  // Root Endpoint
  app.get( "/", async ( _req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
   
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();