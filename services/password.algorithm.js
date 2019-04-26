class Base64Algorithm {
    constructor() {
           const secret = Buffer.from(".$e#%");
           const start = Buffer.from("securestart1$").toString('base64');
           const safeChar = Buffer.from("OneivwxOluzi0nz").toString('base64');
           const encodeOne = Buffer.from(`${safeChar}rs45t${secret}`).toString('base64')


           const formula = `${encodeOne}`
           const decodedPassword = Buffer.from(formula, 'base64').toString('ascii')
           console.log(`Decoded: ${decodedPassword}`);
           const getPassword = async function() {
               const findSafe = decodedPassword.indexOf(".$e#%");
               const find = decodedPassword.slice(20, findSafe)
               console.log(find)
      }
      getPassword();
    }
}
new Base64Algorithm();

