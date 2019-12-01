<template>
  <div>
    <q-btn color="primary" label="Take Picture" @click="takePicture" />
    <q-btn color="primary" label="Get Picture" @click="captureImage" />
    <img :src="imageSrc">
    {{this.imageSrc}}
    {{this.path}}
  </div>
</template>

<script>
import { Capacitor, Plugins, CameraSource, CameraResultType, FilesystemDirectory } from '@capacitor/core'

const { Camera, Filesystem } = Plugins

export default {
  data () {
    return {
      imageSrc: '',
      path: null
    }
  },
  methods: {
    async captureImage () {
      const options = {
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      }

      const originalPhoto = await Camera.getPhoto(options)
      this.imageSrc = originalPhoto.webPath
      this.path = originalPhoto.path
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

      let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri)
      console.log(photoPath)
    },
    async takePicture () {
      const image = await Plugins.Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      })
      this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    }
  }
}
</script>
