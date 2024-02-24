import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

router.route("/").get((req, res) => {
    res.status(200).json({message: "Hello from Routes"})
})

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        /* const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
          });
      
          const image = response.data.data[0].b64_json;
      
          res.status(200).json({ photo: image }); */

          async function main() {
            const image = await openai.images.generate({
                model: "dall-e-3", 
                prompt: prompt,
                n: 1,
                size: '1024x1024' 
            });
      
        //   res.status(200).json({ photo: image });
          
            console.log(image.data);
          }
          main();
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Something went wrong"})
    }
})

export default router;

