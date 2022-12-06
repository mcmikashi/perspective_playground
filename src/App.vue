<template>
  <header>
    <h2>CS3 perspective playground</h2>
  </header>
  <main>
    <form>
      <div class="form_class">
        <label for="#perspective">perspective : {{ perspective }} px</label>
        <input
          type="range"
          name="perspective"
          id="perspective"
          min="150"
          max="999"
          v-model.number="perspective"
        />
      </div>
      <div class="form_class">
        <label for="#rotatex">rotatex: {{ rotatex }} deg</label>
        <input
          type="range"
          name="rotatex"
          id="rotatex"
          min="-180"
          max="180"
          v-model.number="rotatex"
        />
      </div>
      <div class="form_class">
        <label for="#rotatey">rotatey: {{ rotatey }} deg</label>
        <input
          type="range"
          name="rotatey"
          id="rotatey"
          min="-180"
          max="180"
          v-model.number="rotatey"
        />
      </div>
      <div class="form_class">
        <label for="#rotatez">rotatez: {{ rotatez }} deg</label>
        <input
          type="range"
          name="rotatez"
          id="rotatez"
          min="-180"
          max="180"
          v-model.number="rotatez"
        />
      </div>
      <div class="button_form">
        <input type="reset" value="reset" class="btn" @click.prevent="reset" />
        <input type="button" value="copy" class="btn" @click.prevent="copy" />
      </div>
    </form>
    <div id="parent-square">
      <div id="square" :style="customStyle"></div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      perspective: 150,
      rotatex: 0,
      rotatey: 0,
      rotatez: 0,
      styleObject: {
        backgroundColor: "red",
      },
    };
  },
  computed: {
    customStyle() {
      return {
        transform: `perspective(${this.perspective}px) rotateX(${this.rotatex}deg) rotateY(${this.rotatey}deg) rotateZ(${this.rotatez}deg)`,
      };
    },
  },
  methods: {
    reset() {
      this.perspective = 150;
      this.rotatex = 0;
      this.rotatey = 0;
      this.rotatez = 0;
    },
    async copy() {
      let styleToCopy = `transform: ${this.customStyle.transform}`;
      await navigator.clipboard.writeText(styleToCopy);
      alert("The style as been copied to the Clipboard.");
    },
  },
};
</script>

<style scoped>
h2 {
  text-transform: capitalize;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bolder;
}

main {
  display: flex;
  gap: 50px;
}

.form_class {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: large;
  font-weight: 600;
}

#parent-square {
  border: 1px solid black;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

#square {
  height: 150px;
  width: 150px;
  background-color: blue;
}
form {
  width: 105%;
}
.btn {
  font-size: larger;
  padding: 5px;
  margin: 5px;
}
@media (max-width: 464px) {
  main {
    display: block;
  }
  form {
    margin: 20px 0px;
  }
}
</style>
