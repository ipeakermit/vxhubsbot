const proximityDoors = async page => {
  console.log('Running proximity door demo...')

  // Run code in hubs page
  const interval = await page.evaluate(() => {
    
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
    console.log("loading door models")
    let door_model_url = 'https://sketchfab.com/models/c9c8894a1c2e4e7daa5f89ca60b81a69'
    let doors = loadAssetsFromURLs([door_model_url, door_model_url])
    doors[0].setAttribute('scale', '3 3 3')
    doors[1].setAttribute('scale', '3 3 3')
    doors[0].setAttribute('position', '3 1 0')
    doors[1].setAttribute('position', '4 1 0')

    let open = false

    // Constantly check if any users are less than 2 meters away from either door
    const checkPosition = () => {
      console.log('checking avatar door proximity:')
      const avatars = Array.from(document.querySelectorAll('[networked-avatar]'))
      //console.log(`there are ${avatars.length} avatar(s) loaded in the scene.`)

      avatars.forEach((a, i)=>{
        let posObj = a.getAttribute('position')
        let pos = `(${posObj.x.toFixed(2)}, ${posObj.y.toFixed(2)}, ${posObj.z.toFixed(2)})`

        let rotObj = a.getAttribute('rotation')
        let rot = `(${rotObj.x.toFixed(2)}, ${rotObj.y.toFixed(2)}, ${rotObj.z.toFixed(2)})`


        let dist = posObj.distanceTo(doors[0].getAttribute('position'))

        console.log(` [User ${i+1}] distance: ${dist.toFixed(4)}`);
      });


      //  TODO: 
      //    AFRAME.ANIME is deprecated as of: https://github.com/MozillaReality/aframe/commit/ced136f8f76e96ecb08ec31f966a55c78d83b7b1
      //    find a work around to reimplement animations in a way that hopefuly also won't become deprecated

      // const proximity = avatars.some(a => a.getAttribute('position').distanceTo(doors[0].getAttribute('position')) < 2 || a.getAttribute('position').distanceTo(doors[1].getAttribute('position')) < 2.0)
      // if (proximity && !open) {
      //   console.log("opening doors.")
      //   open = true

      //   const door0Anim = AFRAME.ANIME.default.timeline({ targets: doors[0].object3D.position, autoplay: false })
      //   const door1Anim = AFRAME.ANIME.default.timeline({ targets: doors[1].object3D.position, autoplay: false })
      //   door0Anim.add({ x: 2.5, y: 1, z: 0 })
      //   door1Anim.add({ x: 4.5, y: 1, z: 0 })
      //   door0Anim.restart()
      //   door1Anim.restart()
      // }
      // if (!proximity && open) {
      //   console.log("closing doors.")
      //   open = false
      //   // Close the doors
      //   const door0Anim = AFRAME.ANIME.default.timeline({ targets: doors[0].object3D.position, autoplay: false })
      //   const door1Anim = AFRAME.ANIME.default.timeline({ targets: doors[1].object3D.position, autoplay: false })
      //   door0Anim.add({ x: 3, y: 1, z: 0 })
      //   door1Anim.add({ x: 4, y: 1, z: 0 })
      //   door0Anim.restart()
      //   door1Anim.restart()
      // }
    }

    // Check player positions every 200 milliseconds
    console.log('checkPosition loop launch...',window)
    return window.setInterval(checkPosition, 2000)
  })
}

export default proximityDoors
