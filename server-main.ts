'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver-routing';

const theDatabase = new Database('user','shop','activity'); 
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
