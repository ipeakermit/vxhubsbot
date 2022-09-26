import http from 'http';
const PORT = 3000;
import fs from 'fs'

const ping = async (page, formData) => {
  //console.log(`ping, formData2 = ${formData[2]}`);

  // 0: f-name=dan
  // 1: f-q1=0
  // 2: f-q2=2
  // 3: f-q3=3

  await page.evaluate((formData) => {

    //get name
    let printName = "a student"
    let name = formData[0].split("=");
    if (name.length > 1){
      printName = name[1]
      if (printName == ""){
        printName = "A student"
      }
    }

    //assess questions
    let q1_right = (formData[1] == "f-q1=0")
    let q2_right = (formData[2] == "f-q2=2")
    let q3_right = (formData[3] == "f-q3=1")

    
    if (q1_right && q3_right && q2_right){
      let message = `${printName} got all the questions correct!`
      console.log(`Bot says: ${message}`)
      window.APP.hubChannel.sendMessage(message);
    } else {
      console.log("result was not yes");
    }

  },(formData))
}

// function assessQuestion(formData) {
//   console.log(`assert: ${(formData[1] == "q1=0")}`)
//   return (formData[1] == "q1=0")
// }


export const quizBot = async page => {
  const server = http.createServer((request, response) => {
    if (request.method == 'POST') {
      console.log('POST')
      var body = ''
      request.on('data', function(data) {
        body += data
      })
      request.on('end', function() {
        let formData = body.split("&");
        //let result = assessQuestion(formData) ? "yes" : "no";
        //console.log(`result= ${result}`)s
        //formData.push(result);
        for(var i in formData){
          console.log(`${i}: ${formData[i]}`)
        }

        let html = fs.readFileSync('./demos/quiz1_done.html')
        //html = html.replace("ANSWER", result)
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html)

        ping(page, formData);
      })
  

      
    } else {
      //console.log(`GET on path: ${request.path}`)

      var html = "";
      html = fs.readFileSync('./demos/quiz1.html')

      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(html)
    }
  });
  
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })

  await page.evaluate(()=>{
    // Function to load assets
    const loadAssetsFromURLs = URLs => URLs.map(src => {
      console.log('loadAssetsFromURLs')
      let object = document.createElement('a-entity')
      AFRAME.scenes[0].append(object)
      object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
      object.setAttribute('networked', { template: '#interactable-media' })
      return object
    })

    // Load 2 doors and set positions
    console.log("loading quizes")
    let quizes = loadAssetsFromURLs(['http://codi15.dyndns.org:8080/'])//, 'http://codi15.dyndns.org:8080/'])
    quizes[0].setAttribute('scale', '3 3 3')
    // quizes[1].setAttribute('scale', '3 3 3')
    quizes[0].setAttribute('position', '1.80 1 -19.5')
    // quizes[1].setAttribute('position', '8.00 1 -19.5')
    quizes[0].setAttribute('rotation', '0 0 0')
    // quizes[1].setAttribute('rotation', '0 0 0')
  })

  //create quiz results bar
  // cubes = await page.evaluate(() => {S

  //   // Function to load assets
  //   const loadAssetsFromURLs = URLs => URLs.map(src => {
  //     let object = document.createElement('a-entity')
  //     AFRAME.scenes[0].append(object)
  //     object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
  //     object.setAttribute('networked', { template: '#interactable-media' })
  //     return object
  //   })

  //   objects = [];
  //   // Load 2 doors and set positions
  //   let cube_url = 'https://sketchfab.com/3d-models/tesseract-cube-43c205c3ea964d96b0e40319c2db5a14'
  //   let objects = loadAssetsFromURLs([cube_url])
  //   objects[0].setAttribute('scale', '3 3 3')
  //   doors[0].setAttribute('position', '0 2 0')
  //   console.log("spawning bars")
  //   return objects
  // })


  return server;
}
