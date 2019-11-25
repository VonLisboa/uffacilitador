<template>
  <div class="full-width q-pa-md" style="max-width: 800px">
    <div class="col-12">
      <div class="text-h5 text-center">
        {{disciplinaPage.disciplina}}
      </div>
      <q-item-label>Dias da semana: </q-item-label>
      <div class="q-gutter-sm">
        <q-checkbox class="q-ma-none" v-model="weekCheck[0]" label="S" color="teal" />
        <q-checkbox class="q-ma-none" v-model="weekCheck[1]" label="T" color="teal" />
        <q-checkbox class="q-ma-none" v-model="weekCheck[2]" label="Q" color="teal" />
        <q-checkbox class="q-ma-none" v-model="weekCheck[3]" label="Q" color="teal" />
        <q-checkbox class="q-ma-none" v-model="weekCheck[4]" label="S" color="teal" />
        <q-checkbox class="q-ma-none" v-model="weekCheck[5]" label="S" color="teal" />
      </div>
    </div>
    <q-form>
      <q-card class="my-card">
        <q-card-section>
          <div class="col-12">
            <q-list separator>
              <q-item v-for="(item, key) in items" :key="key" class="q-my-sm">
                <q-item-section avatar>
                  <div class="q-mb-sm">
                    <q-badge :color="dayNow === item.dia?'teal':'grey'">
                      {{ renderWeek(item.dia, 1) }}
                    </q-badge>
                  </div>
                  <q-avatar :color="dayNow === item.dia?'teal':'primary'" text-color="white">
                    {{ renderWeek(item.dia, 0) }}
                  </q-avatar>
                  <q-chip style="opacity: 0"/>
                </q-item-section>

                <q-item-section>
                  <div class="col-12">
                    <div class="float-left q-mr-md">
                      <div class="q-mb-sm">
                        <q-badge color="teal">
                          Início: {{ item.hora_inicio }}
                        </q-badge>
                      </div>
                      <q-btn icon="access_time" round color="teal">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="item.hora_inicio" format24h>
                          </q-time>
                        </q-popup-proxy>
                      </q-btn>
                    </div>
                    <div class="float-left">
                      <div class="q-mb-sm">
                        <q-badge color="red">
                          Fim: {{ item.hora_fim }}
                        </q-badge>
                      </div>
                      <q-btn icon="access_time" round color="red">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="item.hora_fim" format24h>
                          </q-time>
                        </q-popup-proxy>
                      </q-btn>
                    </div>
                    <q-chip class="float-right" icon="directions">Sala {{ item.sala }}
                      <q-popup-edit v-model="label1" :cover="false" :offset="[0, 10]">
                        <q-input color="primary" v-model="item.sala" dense autofocus counter maxlength="15">
                          <template v-slot:prepend>
                            <q-icon name="directions" color="primary" />
                          </template>
                        </q-input>
                      </q-popup-edit>
                    </q-chip>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="save" color="accent" @click="save"/>
    </q-page-sticky>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dayNow: -1,
      label1: 'Sala',
      disciplinaPage: {},
      weekCheck: [false, false, false, false, false, false],
      weekCheckMirror: [false, false, false, false, false, false],
      daysWeek: [
        { label: 'S', extended: 'Segunda-feira', value: 0 },
        { label: 'T', extended: 'Terça-feira', value: 1 },
        { label: 'Q', extended: 'Quarta-feira', value: 2 },
        { label: 'Q', extended: 'Quinta-feira', value: 3 },
        { label: 'S', extended: 'Sexta-feira', value: 4 },
        { label: 'S', extended: 'Sábado', value: 5 }
      ],
      items: []
    }
  },
  computed: {
  },
  beforeMount () {
    let d = new Date()
    this.dayNow = d.getDay() - 1
    this.disciplinaPage = this.$route.query
    fetch(`http://127.0.0.1:8000/userdisciplinas/?disciplina=${this.disciplinaPage.id}&user_id=1`).then(response => {
      response.json().then(data => {
        this.items = data.results
        data.results.forEach(element => {
          this.weekCheckMirror[element.dia] = true
          this.weekCheck[element.dia] = true
          console.log(element)
        })
      })
    }).catch(e => {
      this.$q.notify({
        color: 'negative',
        message: 'Falha na conexão com a internet!'
      })
    })
  },
  methods: {
    renderWeek: function (val, op) {
      if (op) return this.daysWeek[val].extended
      return this.daysWeek[val].label
    },
    save: function () {
      this.items.forEach(item => {
        if (item.hasOwnProperty('url')) {
          fetch(item.url, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item)
          })
        } else {
          fetch('http://127.0.0.1:8000/userdisciplinas/', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item)
          })
        }
      })
    }
  },
  watch: {
    weekCheck: function (array) {
      for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < this.items.length; k++) {
          if (this.items[k].dia === i && array[i] === false) {
            fetch(this.items[k].url, {
              method: 'delete'
            }).then(response => {
              this.items.splice(k, 1)
            }).catch(e => {
              this.$q.notify({
                color: 'negative',
                message: 'Falha na conexão com a internet!'
              })
            })
          }
        }
        console.log(array[i])
        if (array[i] === true && this.weekCheckMirror[i] === false) {
          this.weekCheckMirror[i] = true
          this.items.push({
            'dia': i,
            'disciplina': `http://127.0.0.1:8000/disciplinas/${this.disciplinaPage.id}/`,
            'hora_fim': null,
            'hora_inicio': null,
            'sala': null,
            'user': 'http://127.0.0.1:8000/users/1/'
          })
        } else if (array[i] === false) {
          this.weekCheckMirror[i] = false
        }
      }
      // this.weekCheckMirror = array
    }
  }
}
</script>
