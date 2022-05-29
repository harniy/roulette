<template>
  <main>
    <p class="title">
      Введите telegram ники начиная с символа <span>'@'</span>
    </p>
    <textarea v-model="text"></textarea>
    <div class="info">
      Всего игроков: <span>{{ allPlayers }}</span>
    </div>
    <button class="btn" :disabled="!text.length" @click="nickHandler">
      start
    </button>

    <div class="winner" v-if="winner">
      Победил игрок № {{ playerNumber + 1 }}
      <br />
      <span title="Копировать" @click="copyToClipboard">@{{ winner }}</span>
    </div>

    <div class="copy" :class="{ 'is-copy': copy }">скопировано</div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const text = ref("");
    const winner = ref("");
    const playerNumber = ref(0);
    const copy = ref(false);

    const randomize = (num: number): number => {
      return Math.floor(Math.random() * num);
    };
    return {
      text,
      winner,
      playerNumber,
      copy,
      nickHandler: () => {
        const clearString = text.value.replace(/[,.!'"]/g, "");
        const namesArray = clearString.split("@").splice(1);
        playerNumber.value = randomize(namesArray.length);
        winner.value = namesArray[playerNumber.value];
      },
      allPlayers: computed(() => {
        return text.value.split("@").splice(1).length;
      }),
      copyToClipboard: () => {
        navigator.clipboard.writeText(`@${winner.value}`);
        copy.value = true;

        setTimeout(() => {
          copy.value = false;
        }, 2000);
      },
    };
  },
});
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 80%;
  margin: 0 auto;
  text-align: left;

  .title {
    font-size: 20px;
    font-weight: 300;
    margin: 0;
    padding-top: 35px;

    span {
      font-weight: 700;
    }
  }

  .info {
    padding-bottom: 25px;
    span {
      font-weight: 700;
    }
  }

  .btn {
    margin: 0 auto;
    font-size: 30px;
    text-transform: uppercase;
    padding: 13px 23px;
    background: #00bcd4;
    color: #fff;
    border: none;
    box-shadow: 1px 3px 6px 0 rgb(0 0 0 / 22%);
    cursor: pointer;

    &:active {
      background: #0195a8;
    }

    &:disabled {
      opacity: 0.5;
      cursor: no-drop;
    }
  }
}

textarea {
  max-width: 500px;
  width: 100%;
  margin: 15px 0;
  min-height: 200px;
  height: auto;
  resize: none;
  box-shadow: 1px 3px 6px 0 #00000038;
  font-size: 18px;
}

.winner {
  padding: 35px 0;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: baseline;

  span {
    font-weight: 700;
    cursor: pointer;
    font-size: 30px;
    align-self: center;
    padding: 8px;
  }
}

.copy {
  background: #4caf50;
  color: #fff;
  text-align: center;
  width: 120px;
  padding: 15px;
  position: absolute;
  left: 50%;
  transform: translatex(-50%);
  margin-top: -55px;
  opacity: 0;
  transition: 0.5s;
}

.is-copy {
  margin-top: 15px !important;
  opacity: 1 !important;
}
</style>
