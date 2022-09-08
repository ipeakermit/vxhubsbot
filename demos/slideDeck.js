


const slideDeck = async page => {
  // Run code in hubs page
  const interval = await page.evaluate(() => {
    let slide1 = [];
    let slide2 = [];
    // Images
    const images = [
      'https://www.unistude.com/wp-content/uploads/2021/02/rmit-canvas-login-page.jpg',
      'https://www.thecampusbookstore.com/wp-content/uploads/2020/01/RMIT-logo.jpg'
    ]

    // Bot speak function
    const say = (message) => {
      window.APP.hubChannel.sendMessage(message)
    }

    // Function to load assets
    const loadAssetsFromURLs = URLs => URLs.map(src => {
      let object = document.createElement('a-entity')
      AFRAME.scenes[0].append(object)
      object.setAttribute('media-loader', { src, fitToBox: true, resolve: true })
      object.setAttribute('networked', { template: '#interactable-media' })
      return object
    })

    var slide_index = 0;
    let door_model_url = 'https://sketchfab.com/models/c9c8894a1c2e4e7daa5f89ca60b81a69'
    let helix_url = 'https://sketchfab.com/3d-models/a-dna-sticks-model-74e4602a8c544a12a64d1bac160ee1c6'

    // Load 2 doors and set positions
    const spawnDoors = () => {
      //say("spawning doors"); 
      console.log("removing slide2");
      //slide2[0].parentNode.removeChild(slide2[0]);
      slide2.forEach((obj)=>{
        obj.parentNode.removeChild(obj);
      })
      
      slide1 = loadAssetsFromURLs([door_model_url, door_model_url])
      slide1[0].setAttribute('scale', '3 3 3')
      slide1[1].setAttribute('scale', '3 3 3')
      slide1[0].setAttribute('position', '3 1 0')
      slide1[1].setAttribute('position', '4 1 0')
    }

    // Load 2 doors and set positions
      const removeDoors = () => {
        //say("removing doors"); 
        console.log("removing slide1");
        slide1.forEach((obj)=>{
          obj.parentNode.removeChild(obj);
        })


        slide2 = loadAssetsFromURLs([helix_url])
        slide2[0].setAttribute('scale', '3 3 3')
        slide2[0].setAttribute('position', '1 2 0')
        //let objs = document.querySelectorAll("[gltf-model-plus]")
        //console.log(objs?.length);

      }

    // Load initial image
    let image = loadAssetsFromURLs([images[0]])[0]
    image.setAttribute('scale', '1.5 1.5 1.5')
    image.setAttribute('position', '3 2 -5')
    image.setAttribute('rotation', '0 0 0')

    let index = 1

    // Play the sequence
    const chooseFrame = () => {
      var slide1 = [];
      var slide2 = [];
      if (slide_index == 1){
        slide_index = 0;
        removeDoors();
      } else {
        slide_index = 1;
        spawnDoors();
      }
    }

    // Change the slide every 5 seconds
    return window.setInterval(chooseFrame, 5000)
  })
}

export default slideDeck
