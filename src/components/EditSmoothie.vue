<template>
  <div v-if="getSmoothie" class="edit-smoothie container">
      <h2 >Edit {{ getSmoothie.title }} Smoothie </h2>
      <form  @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="getSmoothie.title">
            </div>
            <div v-for="(ing, index) in getSmoothie.ingredients" :key='index' class="field">
                <label for="ingradient">Ingredients:</label>
                <input type="text" name="ingredient" v-model="getSmoothie.ingredients[index] "> 
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingradient"> Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import db from "@/firebase/init"
import slugify from 'slugify'
export default {
  name: "EditSmoothie",
  created() {
    this.$store.dispatch('getOneSmoothie', this.$route.params.smoothie_slug)
  },
  data() {
    return {
      another: null,
      feedback: null
    }
  },
  computed: {
    ...mapGetters(['getSmoothie'])
  },
  methods: {
    EditSmoothie() {
      if (this.getSmoothie.title){
              this.feedback = null
              // Create Slug
              this.getSmoothie.slug = slugify(this.getSmoothie.title, {
                  replacement: '-',
                  remove: /[$*_+~.()'"!\-:@]/g,
                  lower: true
              })
              this.$store.dispatch('editSmoothie', this.getSmoothie)
              this.$router.push({ name: 'Index' })
          } else {
              this.feedback = 'You must enter a smoothie title'
          }
    },
    addIng() {
      if (this.another) {
        this.getSmoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.getSmoothie.ingredients = this.getSmoothie.ingredients.filter(ingred => {
        return ingred != ing;
      });
    }
  },
    
}
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
