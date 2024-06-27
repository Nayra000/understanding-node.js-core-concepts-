class EventEmitter {
    constructor(){
        this.listeners = {};
    }

    addListener(eventName , fn){
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn) 
        return this ;
    }

    on(eventName , fn) {
        this.addListener(eventName , fn);
        return this ;
    }

    removeListener(eventName , fn){
        if(!this.listeners[eventName] || this.listeners[eventName].length === 0){
            return ;
        }
        const index = this.listeners[eventName].indexOf(fn);
        this.listeners[eventName].splice(index ,1);
    }

    off(eventName , fn) {
        this.removeListener(eventName, fn);
    }

    once(eventName , fn){
        this.listeners[eventName] = this.listeners[eventName] || [] ;
        const onceWrapper = (...args)=>{
            fn(...args) ;
            this.removeListener(eventName , onceWrapper) ;
        }
        this.listeners[eventName].push(onceWrapper);
        return this ;
    }

    

    emit(eventName ,...args){
        const callbacks = [...this.listeners["foo"]] ;
        /* const callbacks = this.listeners["foo"] ; */ //wrong : here I make refernce to array 
        callbacks.forEach(fn => {
            fn(...args);
        });
        return this ;
    }

    listenersCount(eventName) {
        const count = this.listeners[eventName].length || [] ;
        return count;
    }

    rawListeners(eventName) {
        return this.listeners[eventName];
    }
}





const obj = new EventEmitter() ;

const c1 = () =>{
    console.log("Callback 1");
}
const c2 = () =>{
    console.log("Callback 2");
}
const c3 = (x) =>{
    console.log(`Callback ${x}`);
}

const c4 = () =>{
    console.log("Callback 4");
}
const c5 = () =>{
    console.log("Callback 5");
}


obj.once("foo" , c1);
obj.once("foo" , c2);
obj.once("foo" , c3);
obj.once("foo" , c4);
obj.once("foo" , c5);



/* obj.on("foo" , c1);
obj.on("foo" , c2);
obj.on("foo" , c3);
obj.on("foo" , c4);
obj.on("foo" , c5); 

obj.emit("foo" ,3)

obj.off("foo" ,c2);
obj.off("foo" ,c5); */


obj.emit("foo" ,3)





