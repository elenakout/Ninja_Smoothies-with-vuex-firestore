
<!-- real time hooks  -->
db.collection('smoothies').onSnapshot(res => {
            const changes = res.docChanges();
  
            changes.forEach(change => {
                if (change.type === 'added'){
                let smoothie = {
                    ...change.doc.data(),
                    id: change.doc.id
                }
                commit('addSmoothie', smoothie)
              }
            })
        })

<!-- fetch data from firestore -->
db.collection('smoothies').get()
.then(snapshot => {
    snapshot.forEach(doc => {
        this.smoothies.push({
            ...doc.data(),
            id: doc.id
        }) 
    })
})
.catch(err => {
    console.log(err);
})

<!-- Add data to Firestore -->
db.collection('smoothies').add({
    title: this.title, 
    ingredients: this.ingredients,
    slug: this.slug
}).then(() => {
this.$router.push({ name: 'Index' })
}).catch(err => {
    console.log(err);
})

/   created () {
//     this.$store.dispatch('fetchSmoothiesFromDB')
//   }