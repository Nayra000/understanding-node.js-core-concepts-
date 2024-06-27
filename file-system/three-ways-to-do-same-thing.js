// promises

/* const fs = require('fs/promises');

(
    async() =>{
        try{
            await fs.copyFile('./source.txt' ,'./copy-promise.text');
        }
        catch(err){
            console.log(err);
        }
    }
)(); */

//callback 
/* const fs = require('fs');

fs.copyFile('./source.txt', './copy-callback.text' ,(error) =>{
    if(error){
        console.log(error);
    }

}); */

const fs = require('fs');
fs.copyFileSync('./source.txt', './copy-sync.txt');