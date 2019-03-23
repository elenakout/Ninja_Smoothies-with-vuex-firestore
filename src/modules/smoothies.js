import db from '@/firebase/init'

const state = {
    smoothies: []
}

const getters = {
    getSmoothies (state) {
        return state.smoothies
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
    editSmoothie({ commit }, id){
        
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}