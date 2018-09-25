const per = require('./TCCPersistence')

let a = new per();

a.login('admin', '123').then((res) =>{
    console.log(res);
    let a = 10;

}).catch((err)=>{
    console.log(err);
})