const app= require('./server');
require('./database');


app.listen(app.get('port'),'0.0.0.0',()=>
     console.log(`Server on port ${app.get('port')}`)
 );

