const request = require('request-promise-native');

class Post {
    constructor(url) {
        this.url = url;
        const postMethod = async function() {
            const form = {
                firstName: 'javis',
                lastName: 'perez',
                username: "testuser",
                password: "onwave123!",
                document: 'i have no idea',
                email: 'jdcoding01@gmail.com',
                role: 'admin'
            }
   
            const data = await request.post({
                url: url,
                form,
                json: true 
            })
            console.log(data);
        
      }
      postMethod();
    }
}

new Post('http://localhost:1337/users');
