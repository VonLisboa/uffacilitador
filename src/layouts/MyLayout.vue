<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          UFFacilitador
        </q-toolbar-title>

        <div>v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-item class="absolute-top" style="height: 150px">
        <div class="q-pa-sm absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <q-item-label class="text-weight-bold" color="primary">Joao Pedro</q-item-label>
          <q-item-label color="primary">Engenharia Civil</q-item-label>
          <div class="absolute-bottom-right">
            <q-btn icon="photo_camera" round color="red" @click="captureImage" />
          </div>
        </div>
      </q-item>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item-label header>UFFacilitador</q-item-label>
          <q-item clickable v-ripple to="/disciplinas">
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.disciplinas') }}</q-item-label>
              <q-item-label caption></q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/quadro_horarios">
            <q-item-section avatar>
              <q-icon name="access_time" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.quadro_horarios') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/galeria">
            <q-item-section avatar>
              <q-icon name="photo_library" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.galeria') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/repositorios">
            <q-item-section avatar>
              <q-icon name="attach_file" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.repositorios') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/sistemas">
            <q-item-section avatar>
              <q-icon name="computer" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.sistemas') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/takephoto">
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.grade_curricular') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/chat">
            <q-item-section avatar>
              <q-icon name="message" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.chat') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Capacitor, Plugins, CameraSource, CameraResultType, FilesystemDirectory } from '@capacitor/core'

const { Camera, Filesystem } = Plugins

export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    async captureImage () {
      const options = {
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: false
      }
      Filesystem.mkdir({ path: `disciplina/${this.searchCurrentDisciplina()}`, directory: FilesystemDirectory.Documents, recursive: true })
      const originalPhoto = await Camera.getPhoto(options)
      this.path = originalPhoto.path
      const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path })
      let date = new Date()
      let time = date.getTime()
      let fileName = time + '.jpg'

      await Filesystem.writeFile({
        data: photoInTempStorage.data,
        path: `disciplina/${this.searchCurrentDisciplina()}/` + fileName,
        directory: FilesystemDirectory.Documents
      })
      const finalPhotoUri = await Filesystem.getUri({
        directory: FilesystemDirectory.Documents,
        path: `disciplina/${this.searchCurrentDisciplina()}/` + fileName
      })

      let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri)
      console.log('gsw1: ' + finalPhotoUri.uri)
      console.log('gsw2: ' + photoPath)
    }
  },
  searchCurrentDisciplina: function () {
    return 'unclassified'
  },
  isDayAndHour: function (el) {
    let hinis = el.hora_inicio.split(':')
    let hfims = el.hora_fim.split(':')
    let d = new Date()
    let timeNow = d.getTime()
    d.setHours(hinis[0], hinis[1])
    let hini = d.getTime()
    d.setHours(hfims[0], hfims[1])
    let hfim = d.getTime()
    if (d.getDay() - 1 === el.dia && hini < timeNow && timeNow < hfim) {
      return true
    }
    return false
  }
}
</script>
