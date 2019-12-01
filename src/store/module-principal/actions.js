export function loadData ({ commit }) {
  fetch(`http://127.0.0.1:8000/userdisciplinas/?user_id=1`).then(response => {
    response.json().then(data => {
      commit('SET_RESULTS', data.results)
      data.results.forEach(element => {
        console.log(element)
      })
    })
  })
}
export function loadDisciplinas ({ commit }) {
  fetch(`http://127.0.0.1:8000/disciplinas/?user_id=1`).then(response => {
    response.json().then(data => {
      commit('SET_DISCIPLINAS', data.results)
      data.results.forEach(element => {
        console.log(element)
      })
    })
  })
}
