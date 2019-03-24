
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

computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.$route.params.id)
    }

loadedMeetup(state) {
    return meetupId => {
      return state.loadedMeetups.find(meetup => {
        return meetup.id === meetupId;
      });
    };
  },

  db.collection('smoothies').doc(this.smoothie.id).update({
                  title: this.smoothie.title, 
                  ingredients: this.smoothie.ingredients,
                  slug: this.smoothie.slug
              }).then(() => {
                this.$router.push({ name: 'Index' })
              }).catch(err => {
                  console.log(err);
              })