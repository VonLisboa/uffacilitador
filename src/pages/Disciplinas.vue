<template>
  <div class="full-width q-pa-md" style="max-width: 800px">
    <q-card class="my-card">
      <q-card-section>
        <q-form>
          <div class="col-12">
            <q-select
              class="inline"
              style="width:85%"
              option-value="url"
              option-label="nome"
              v-model="val_disciplina"
              use-input
              use-chips
              input-debounce="0"
              @new-value="create_disciplina"
              :options="filterDisciplina"
              @filter="filterFn"
              label="Disciplina"
              hint="Diga o nome da disciplina"
            />
            <q-btn class="col-1" round color="primary" icon="add" @click="add"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-list>
      <template v-for="(item, key) in items">
        <q-item :key="key">
            <q-item-section>
                <q-item-label>{{item.disciplina}}</q-item-label>
                <q-item-label
                    caption
                    lines="2"
                >Sala: {{item.sala}}</q-item-label>
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
      total: 0,
      val_disciplina: null,
      optionsDisciplina: [],
      filterDisciplina: [],
      items: []
    }
  },
  beforeMount () {
    fetch(`http://127.0.0.1:8000/disciplinas/?user_id=1`).then(response => {
      response.json().then(data => {
        this.optionsDisciplina = data.results
      })
    })
    fetch(`http://127.0.0.1:8000/userdisciplinas/?first=1&user_id=1`).then(response => {
      response.json().then(data => {
        data.results.forEach(element => {
          fetch(element.disciplina).then(response => {
            response.json().then(data => {
              this.items.push({ id: element.url, sala: element.sala, disciplina: data.nome })
            })
          })
        })
      })
    }).catch(e => {
      this.$q.notify({
        color: 'negative',
        message: 'Falha na conexão com a internet!'
      })
    })
    this.total = this.items.length
  },
  methods: {
    add: async function () {
      if (this.val_disciplina === null) return
      if (!this.val_disciplina.hasOwnProperty('url')) {
        await fetch(`http://127.0.0.1:8000/disciplinas/`, {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ nome: this.val_disciplina, autor: 'http://127.0.0.1:8000/users/1/', status: 0 })
        }).then(response => {
          return response.json()
        }).then(data => {
          this.optionsDisciplina.splice(this.val_disciplina, 1)
          this.optionsDisciplina.push(data)
          this.val_disciplina = data
        })
      }

      fetch(`http://127.0.0.1:8000/userdisciplinas/`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ disciplina: this.val_disciplina.url, user: 'http://127.0.0.1:8000/users/1/' })
      }).then(response => {
        return response.json()
      })

      let obj = { id: this.val_disciplina.url, sala: '', disciplina: this.val_disciplina.nome }
      this.items.push(obj)
      this.val_disciplina = null
    },
    del: function (index) {
      let element = this.items.splice(index, 1)
      console.log(element)
      fetch(element[0].id, {
        method: 'delete'
      }).then(response => {
        return response.json()
      })
    },
    create_disciplina (val, done) {
      if (val.length > 2) {
        if (!this.optionsDisciplina.includes(val)) {
          done(val, 'add-unique')
        }
      }
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterDisciplina = this.optionsDisciplina
        } else {
          const needle = val.toLowerCase()
          this.filterDisciplina = this.optionsDisciplina.filter(
            v => v.nome.toLowerCase().includes(needle)
          )
        }
      })
    }
  }
}
</script>
