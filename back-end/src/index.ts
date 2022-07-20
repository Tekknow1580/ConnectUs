import 'reflect-metadata';
import datasourceConfig from './configuration/DBConfig';
import {createConnection, useContainer} from 'typeorm';
import { createExpressServer } from 'routing-controllers';
import { Controllers } from './controller';
import { Container } from 'typeorm-typedi-extensions';

useContainer(Container);
createConnection(datasourceConfig).then(()=>{
    console.log("I am connected to the DB!!!");

    const app = createExpressServer({
        cors: true,
        controllers: [...Controllers]
    })

    app.listen(8080, ()=>{
        console.log("The App is listening on port 8080.");
    })
})