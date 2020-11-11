import express, { Router } from "express";
import { CompressionTypes } from 'kafkajs';


const routes = new express.Router();

routes.post("/certifications", async (req, res) => {
  //Chamar micro serviço

const message =  
    {
        id: Math.random().toString(36).substr(2, 9), 
        user: { 
                name: "novo testeeee!" ,
                codMatricula: 2133,
                funcao: 'trader'},
        area: "Tesouraria",
        polo: 'Mooca',
        uf: 'SP'
    }
    
  

  await req.producer.send({
    topic: "issue-certificate",
    compression: CompressionTypes.GZIP,
    messages: [
      {value: JSON.stringify(message)}
    ],
  });

  return res.json({ ok: true });
});

export default routes;
