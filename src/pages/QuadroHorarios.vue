<template>
  <div class="full-width q-pa-md" style="max-width: 800px">
    <q-card class="my-card">
      <q-card-section>
        <q-form>
          <div class="col-12">
            <q-input
              class="inline"
              style="width:85%"
              v-model="new_disciplina"
              label="Disciplina"
              hint="Diga o nome da disciplina"
            />
            <q-btn class="col-1" round color="primary" icon="add" @click="add"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-btn-group class="q-ma-sm" rounded>
      <q-btn label="S" glossy @click="toogle_week(0)" :class="test" rounded/>
      <q-btn label="T" glossy @click="toogle_week(1)" :class="week[1]" />
      <q-btn label="Q" glossy @click="toogle_week(2)" :class="week[2]" />
      <q-btn label="Q" glossy @click="toogle_week(3)" :class="week[3]" />
      <q-btn label="S" glossy @click="toogle_week(4)" :class="week[4]" />
      <q-btn label="S" glossy @click="toogle_week(5)" :class="week[5]" />
      <q-btn label="D" glossy @click="toogle_week(6)" :class="week[6]" rounded />
    </q-btn-group>
    <q-list>
      <template v-for="(item, key) in items">
        <q-item :key="key">
            <q-item-section>
                <q-item-label>{{item.name}}</q-item-label>
                <q-item-label
                    caption
                    lines="2"
                >{{item.local}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
                <q-btn round color="secondary" icon="av_timer" />
            </q-item-section>
            <q-item-section side top>
                <q-btn round color="secondary" icon="delete_outline" @click="del(key)" />
            </q-item-section>
        </q-item>
        <q-separator spaced inset :key="'x'+key" />
      </template>
    </q-list>
  </div>
</template>
<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      test: '',
      total: 0,
      new_disciplina: '',
      week: ['', '', '', '', '', '', ''],
      items: [
        { id: 1, name: 'Geometria', local: 'sala 302' },
        { id: 2, name: 'Calculo', local: 'sala 121' },
        { id: 3, name: 'Programação', local: 'sala 531' },
        { id: 4, name: 'Matematica', local: 'sala 109' }
      ]
    }
  },
  computed: {
    classObj () {
      return {
        [this.week]: true
      }
    }
  },
  beforeMount () {
    this.total = this.items.length
  },
  methods: {
    toogle_week: function (e) {
      this.test = 'bg-red'
      this.week[e] = 'bg-red'
      console.log(this.week)
    },
    add: function () {
      if (this.new_disciplina === '') return
      let obj = { id: this.total + 1, name: this.new_disciplina, local: '' }
      this.items.push(obj)
      this.new_disciplina = ''
    },
    del: function (index) {
      this.items.splice(index, 1)
    }
  }
}
</script>
