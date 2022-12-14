const proximityDoors = async page => {
  console.log('proximityDoors')
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
    let doors = loadAssetsFromURLs(['https://sketchfab.com/models/c9c8894a1c2e4e7daa5f89ca60b81a69', 'https://sketchfab.com/models/c9c8894a1c2e4e7daa5f89ca60b81a69'])
    doors[0].setAttribute('scale', '3 3 3')
    doors[1].setAttribute('scale', '3 3 3')
    doors[0].setAttribute('position', '3 1 0')
    doors[1].setAttribute('position', '4 1 0')

    let open = false
    console.log('open var init...')

    // Constantly check if any users are less than 2 meters away from either door
    const checkPosition = () => {
      console.log('checkPosition')
      const proximity = Array.from(document.querySelectorAll('[networked-avatar]')).some(avatar => avatar.getAttribute('position').distanceTo(doors[0].getAttribute('position')) < 2 || avatar.getAttribute('position').distanceTo(doors[1].getAttribute('position')) < 2)
      if (proximity && !open) {
        open = true
        // Open the doors
        const door0Anim = AFRAME.ANIME.default.timeline({ targets: doors[0].object3D.position, autoplay: false })
        const door1Anim = AFRAME.ANIME.default.timeline({ targets: doors[1].object3D.position, autoplay: false })
        door0Anim.add({ x: 2.5, y: 1, z: 0 })
        door1Anim.add({ x: 4.5, y: 1, z: 0 })
        door0Anim.restart()
        door1Anim.restart()
      }
      if (!proximity && open) {
        open = false
        // Close the doors
        const door0Anim = AFRAME.ANIME.default.timeline({ targets: doors[0].object3D.position, autoplay: false })
        const door1Anim = AFRAME.ANIME.default.timeline({ targets: doors[1].object3D.position, autoplay: false })
        door0Anim.add({ x: 3, y: 1, z: 0 })
        door1Anim.add({ x: 4, y: 1, z: 0 })
        door0Anim.restart()
        door1Anim.restart()
      }
    }

    // Check player positions every 200 milliseconds
    console.log('checkPosition loop launch...',window)
    return window.setInterval(checkPosition, 2000)
  })
}

export default proximityDoors
