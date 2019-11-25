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
      <q-img class="absolute-top" src="" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Nome</div>
          <div>Nome nome</div>
        </div>
      </q-img>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item-label header>UFFacilitador</q-item-label>
          <q-item clickable v-ripple to="/disciplinas">
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.disciplinas') }}</q-item-label>
              <q-item-label caption>description ?</q-item-label>
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
          <q-item clickable v-ripple to="/grade_curricular">
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('menu.grade_curricular') }}</q-item-label>
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
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
