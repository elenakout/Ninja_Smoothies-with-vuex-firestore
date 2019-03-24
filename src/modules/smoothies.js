import db from '@/firebase/init'

const state = {
    smoothies: [],
    smoothie: null
}

const getters = {
    getSmoothies (state) {
        return state.smoothies
    },
    getSmoothie(state) {
        return state.smoothie
    }
}

const mutations = {
    addSmoothie (state, smoothie) {
        state.smoothies.push(smoothie)
    },
    deleteSmoothie (state, id) {
        state.smoothies = state.smoothies.filter(smoothie => {
            return smoothie.id != id
        })
    },
    setSmoothie (state, fsmoothie) {
        state.smoothie = fsmoothie
    },
    editLocSmoothie (state, dbSmoothie){
        // emotions.forEach( emotion => console.log(emotion) );
        state.smoothies.forEach(smoothie => {
            if(smoothie.id === dbSmoothie.id) {
                smoothie.title = dbSmoothie.title
                smoothie.ingredients = dbSmoothie.ingredients
                smoothie.slug = dbSmoothie.slug
                
            }
        })

    }
}

const actions = {
    fetchSmoothiesFromDB({ commit }) {
        db.collection('smoothies').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let smoothie = {
                    ...doc.data(),
                    id: doc.id
                }
                commit('addSmoothie', smoothie) 
            })
        })
        .catch(err => {
            console.log(err);
        })
    },
    addNewSmoothie({ commit }, newSmoothie) {
        let newSm = {
            title: newSmoothie.title, 
            ingredients: newSmoothie.ingredients,
            slug: newSmoothie.slug
        }
        db.collection('smoothies').add(newSm).then((smoothie) => {
            let locSm = {
                title: newSmoothie.title, 
                ingredients: newSmoothie.ingredients,
                slug: newSmoothie.slug,
                id: smoothie.id
            }
          commit('addSmoothie', locSm )  
          
        }).catch(err => {
            console.log(err);
        })

    },
    deleteSmoothie({ commit }, id) {
        db.collection('smoothies').doc(id).delete()
        .then(() => {
            commit('deleteSmoothie', id)
        })
    },
    getOneSmoothie({commit}, slug){
        let ref = db
      .collection("smoothies")
      .where("slug", "==", slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
      let  findSmoothie = {
          ...doc.data(),
          id: doc.id
        }
        commit('setSmoothie', findSmoothie)
      })
    })
  
    },
    editSmoothie({ commit }, editSmoothie){
        db.collection('smoothies').doc(editSmoothie.id).update({
            title: editSmoothie.title, 
            ingredients: editSmoothie.ingredients,
            slug: editSmoothie.slug
        }).then(() => {
           commit('editLocSmoothie', editSmoothie)
        }).catch(err => {
            console.log(err);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}