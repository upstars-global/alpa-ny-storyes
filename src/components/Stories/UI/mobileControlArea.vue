<template>
    <div :class="[ 'control-area', positionClass ]" />
</template>

<script>
export default {
    name: "MobileControlArea",
    props: {
        position: {
            type: String,
            default: "left",
            validator: (value) => [ "left", "right" ].includes(value),
        },
    },
    computed: {
        positionClass() {
            return this.position === "left" ? "left" : "right";
        },
    },
};
</script>

<style scoped lang="scss">

@import "~@theme/styles";

.control-area {
  position: absolute;
  height: 100%;
  width: 50%;
  cursor: pointer;
  top: 0;
  z-index: 100;
  user-select: none;
  @include media(M) {
    display: none;
  }
}

.left {
  left: 0;
}
.right {
  left: 50%;
}

</style>
