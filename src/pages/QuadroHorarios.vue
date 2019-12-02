<style lang="sass">
.active-day
  color: white
  background: teal
</style>
<template>
  <div class="full-width q-pa-md" style="max-width: 800px">
    <q-pull-to-refresh @refresh="refresh">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Segunda-feira"
      >
        <q-card>
          <q-card-section>
            <q-list separator bordered padding class="rounded-borders">
              <template v-for="(el, key) in renderItems(0)">
                <q-item :key="key" :active="isDayAndHour(el)" active-class="active-day" v-ripple>
                  <q-item-section :key="key">
                   {{
                     (getDisciplinaByUrl(el.disciplina))? getDisciplinaByUrl(el.disciplina).nome : ''
                   }}
                   Sala: {{el.sala}}
                   <br>Início: {{el.hora_inicio}}
                   Fim: {{el.hora_fim}}
                 </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        label="Terça-feira"
      >
        <q-card>
          <q-card-section>
            <q-list separator bordered padding class="rounded-borders">
              <template v-for="(el, key) in renderItems(1)">
                <q-item :key="key" :active="isDayAndHour(el)" active-class="active-day" v-ripple>
                  <q-item-section :key="key">
                   {{getDisciplinaByUrl(el.disciplina).nome}}
                   Sala: {{el.sala}}
                   <br>Início: {{el.hora_inicio}}
                   Fim: {{el.hora_fim}}
                 </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        label="Quarta-feira"
      >
        <q-card>
          <q-card-section>
            <q-list separator bordered padding class="rounded-borders">
              <template v-for="(el, key) in renderItems(2)">
                <q-item :key="key" :active="isDayAndHour(el)" active-class="active-day" v-ripple>
                  <q-item-section :key="key">
                   {{getDisciplinaByUrl(el.disciplina).nome}}
                   Sala: {{el.sala}}
                   <br>Início: {{el.hora_inicio}}
                   Fim: {{el.hora_fim}}
                 </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        label="Quinta-feira"
      >
        <q-card>
          <q-card-section>
            <q-list separator bordered padding class="rounded-borders">
              <template v-for="(el, key) in renderItems(3)">
                <q-item :key="key" :active="isDayAndHour(el)" active-class="active-day" v-ripple>
                  <q-item-section :key="key">
                   {{getDisciplinaByUrl(el.disciplina).nome}}
                   Sala: {{el.sala}}
                   <br>Início: {{el.hora_inicio}}
                   Fim: {{el.hora_fim}}
                 </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        label="Sexta-feira"
      >
        <q-card>
          <q-card-section>
            <q-list separator bordered padding class="rounded-borders">
              <template v-for="(el, key) in renderItems(4)">
                <q-item :key="key">
                  <q-item-section :key="key" :active="isDayAndHour(el)" active-class="active-day" v-ripple>
                   {{getDisciplinaByUrl(el.disciplina).nome}}
                   Sala: {{el.sala}}
                   <br>Início: {{el.hora_inicio}}
                   Fim: {{el.hora_fim}}
                 </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        label="Sábado"
      >
        <q-card :hidden="renderItems(5).length === 0">
          <q-card-section>
            <q-list separator bordered padding class="rounded-borders">
              <template v-for="(el, key) in renderItems(5)">
                <q-item :key="key" :active="isDayAndHour(el)" active-class="active-day" v-ripple>
                  <q-item-section :key="key">
                   {{
                     i = getDisciplinaByUrl(el.disciplina)
                     (i)? i.nome : ''
                   }}
                   Sala: {{el.sala}}
                   <br>Início: {{el.hora_inicio}}
                   Fim: {{el.hora_fim}}
                 </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    </q-pull-to-refresh>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('principal', ['items', 'disciplinas'])
    // ...mapGetters('principal', ['getDisciplinaByUrl'])
  },
  methods: {
    refresh: async function (done) {
      await this.$store.dispatch('principal/loadData')
      done()
    },
    renderItems: function (day) {
      let newArray = this.items.filter(function (el) {
        return el.dia === day
      })
      return newArray
    },
    getDisciplinaByUrl: function (url) {
      let newArray = this.disciplinas.filter(function (el) {
        return el.url === url
      })
      return newArray[0]
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
}
</script>
