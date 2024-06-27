const fs = require("fs/promises");
const { Buffer} = require('buffer');

const createFile =async (path) =>{
    let exitFileHandler ;
    try{
        //check if the file exists
        exitFileHandler = await fs.open(path , 'r');
        console.log(`This file is already exists at ${path}`);
        await exitFileHandler.close();
    }catch(err){
        exitFileHandler = await fs.open(path ,'w');
        console.log(`This file is created at ${path}`);
        await exitFileHandler.close();

    }
};


const deleteFile =async (path) =>{
    let exitFileHandler ;
    try{
        //VIP Note 
        //When you open a file in read mode, you don’t have permission to modify or delete it
        //so you must close the fileHandler
        exitFileHandler = await fs.open(path , 'r');
        await exitFileHandler.close();
        await fs.unlink(path);
        console.log(`This file is deleted at ${path}`);
    }
    catch(err){
        console.log(`There is no file at the path ${path}`);
    }
}

const renameFile = async (oldPath , newPath) =>{
    let exitFileHandler ;
    try{
        //check if the file exists
        exitFileHandler = await fs.open(oldPath , 'r');
        await exitFileHandler.close();
        try{
            exitFileHandler = await fs.open(newPath , 'r');
            await exitFileHandler.close();
            console.log(`There is a file at ${newPath}`);

        }catch(err){
            await fs.rename(oldPath, newPath);
            console.log('File has been renamed');
        }
    }catch(err){
        console.log(`There is no file at the path ${oldPath}`);
    }
}

const addToFile = async (path , content) =>{
    try {
        /*   await fs.access(path , fs.constants.F_OK);*/
      /*   const exitFileHandler = await fs.open(path , 'a');
        await exitFileHandler.write(content);
        await exitFileHandler.close(); */
        await fs.appendFile(path, content);
        console.log('File has been appended');

    }catch(err){
        //console.log('Error during append operation');
        console.error(err);
    }
}

(
    async () =>{
        const CREATE_FILE = "create a file";
        const DELETE_FILE = "delete the file";
        const RENAME_FILE = "rename the file";
        const ADD_TO_FILE = "add to the file"; 

        const fileHandler = await fs.open('./command.txt');
        const watcher = fs.watch('./command.txt');

        fileHandler.on('change' ,async () =>{ //Add custome event , fileHandler inherited from eventEmitter
            const offset = 0; 
            const size =(await fileHandler.stat()).size;
            const position = 0;
            const buffer = Buffer.alloc(size);
            const length = buffer.byteLength;  
            await fileHandler.read(buffer , offset ,length ,position);
            const content = buffer.toString('utf-8');
            
            if(content.includes(CREATE_FILE)){
                const path = content.substring(CREATE_FILE.length + 1);
                createFile(path);
            }
            if(content.includes(DELETE_FILE)){
                const path = content.substring(DELETE_FILE.length + 1);
                deleteFile(path);

            }
            if(content.includes(RENAME_FILE)){ 
                const index = content.indexOf(' to ');
                const oldPath = content.substring(RENAME_FILE.length + 1 ,index );
                const newPath = content.substring(index + 4 );
                renameFile(oldPath,newPath);
                
            }
            if (content.includes(ADD_TO_FILE)) {
                const index = content.indexOf(" this content: ");
                const path = content.substring(ADD_TO_FILE.length + 1, index);
                const newContent = content.substring(index + 15);
                addToFile(path, newContent);
            }
        })

        for await (const event of watcher) {
            if(event.eventType === 'change'){
                fileHandler.emit('change');
            }
        }
    }
)()


//I can use fs.access() to check if the file exists instead of opening it