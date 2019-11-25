<template>
  <div>
    <q-btn color="primary" label="Get Picture" @click="captureImage" />

    <img :src="imageSrc">
  </div>
</template>

<script>
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core'

const { Camera, Filesystem } = Plugins

export default {
  data () {
    return {
      imageSrc: ''
    }
  },
  methods: {
    async captureImage () {
      const options = {
        allowEditing: true,
        resultType: CameraResultType.Uri
      }

      const originalPhoto = await Camera.getPhoto(options)
      const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path })
      let date = new Date()
      let time = date.getTime()
      let fileName = time + '.jpg'
      await Filesystem.writeFile({
        data: photoInTempStorage.data,
        path: fileName,
        directory: FilesystemDirectory.Data
      })
      const finalPhotoUri = await Filesystem.getUri({
        directory: FilesystemDirectory.Data,
        path: fileName
      })
      this.imageSrc = originalPhoto.webPath
      let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri)
      console.log(photoPath)
    }
  }
}
</script>
