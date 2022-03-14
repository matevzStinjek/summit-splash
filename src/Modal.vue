<template>
    <div class="modal" :class="{ 'modal--overlay': hasOverlay }" @click="onClose">
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    props: {
        hasOverlay: { type: Boolean, default: false },
    },
    created () {
        document.body.style.overflow = 'hidden'
    },
    methods: {
        onClose () {
            document.body.style.overflow = 'auto'
            this.$emit('click')
        }
    },
}
</script>

<style lang="scss" scoped>
.modal {
    display: flex;
    align-content: center;
    justify-content: center;
    position: fixed;
    z-index: 50;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;

    &--overlay {
        background-color: rgba(0, 0, 0, 0.5);
    }
}
</style>