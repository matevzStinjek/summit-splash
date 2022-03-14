<template>
    <!-- landing -->
    <div class="landing">
        <div class="landing__overlay"></div>
        <div class="landing__column">
            <img class="landing__logo" src="https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Flogo-text-black.png?alt=media">
            <div class="landing__presents">Presents</div>
            <div class="landing__flex">
                <div class="landing__left">
                    <div class="landing__platform">Location Based NFTs at</div>
                    <img class="landing__summit" src="https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fsummit.png?alt=media">
                    <div v-if="isViewportDesktop" class="landing__presents">Barcelona, March 22nd - 27th</div>
                    <div class="landing__button" @click="onCta">
                        <div>Discord Updates</div>
                    </div>
                </div>
                <div v-if="isViewportDesktop" class="landing__right">
                    <img class="landing__map" src="https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fmap.png?alt=media" @click="isMapOpen = true">
                </div>
            </div>
        </div>
    </div>
    <div v-if="isViewportMobile" class="landing__mobile-map">
        <div style="text-align: center; margin-bottom: 5px; font-weight: 600;" class="landing__presents">Barcelona, March 22nd - 27th</div>
        <img class="landing__map" src="https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fmap-full.png?alt=media" @click="isMapOpen = true">
    </div>

    <Modal v-if="isMapOpen" has-overlay @click="isMapOpen = false">
        <img class="zoomed-map" src="https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fmap-full.png?alt=media">
    </Modal>


    <!-- explanation -->
    <div class="explanation">
        <div class="explanation__title">How does it work?</div>
        <div v-if="isViewportDesktop" class="explanation--desktop">
            <div>
                <div v-for="slide in content" class="slide" :key="slide.title">
                    <img class="slide__img" :src="slide.url">
                    <div class="slide__title">{{ slide.title }}</div>
                    <div class="slide__description">{{ slide.description }}</div>
                </div>
            </div>
        </div>
        <div v-if="isViewportMobile" class="explanation--mobile">
            <div class="slide slide--mobile">
                <img class="slide__img" :src="spotlight.url">
                <div class="slide__title">{{ spotlight.title }}</div>
                <div class="slide__description">{{ spotlight.description }}</div>
            </div>
            <div class="indicator__container">
                <div v-for="n in 4" class="indicator" :class="{ 'indicator--on': n - 1 === spotlightIndex }"></div>
            </div>
        </div>
    </div>

    <!-- projects -->
    <div class="projects">
        <img class="projects__clouds" src="https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2FClouds.jpg?alt=media">
        <div class="projects__header">
            <img class="projects__logo landing__logo" src="https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Flogo-text-black.png?alt=media">
            <div class="projects__subtitle">Avalanche Summit NFT Drops</div>
        </div>
        <div class="projects__flex">
            <img v-for="n in 35" :src="`https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2F${n}.png?alt=media`">
        </div>
    </div>
</template>

<script lang="ts">
import Modal from './Modal.vue'
import { breakpoints } from './breakpoints'
import { defineComponent } from 'vue'

type Data = {
    content: Record<string, string>[];
    spotlightIndex: number;
    viewportWidth: number | null;
    isMapOpen: boolean;
}

export default defineComponent({
    components: {
        Modal,
    },
    mixins: [breakpoints],
    data (): Data {
        return {
            content: [],
            spotlightIndex: 0,
            viewportWidth: null,
            isMapOpen: false,
        }
    },
    computed: {
        spotlight (): Record<string, string> {
            return this.content[this.spotlightIndex]
        },
    },
    created () {
        this.content = [{
            title: 'Explore the Summit',
            description: 'Enter the Lost Worlds app to find Location Based NFTs scattered throughout the Avalanche Summit',
            url: 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fexplore.png?alt=media',
        }, {
            title: 'Visit NFT Drops',
            description: 'Travel to the different locations within the Poble to mint NFTs from over 30+ Avalanche projects',
            url: 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Flocation.png?alt=media',
        }, {
            title: 'Mint & Collect NFTs',
            description: 'Mint & Collect NFT Collectibles, or Voucher NFTs for Merch, Tickets, Tokens, and More',
            url: 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fmint.png?alt=media',
        }, {
            title: 'Sell or Redeem',
            description: 'Sell your Voucher NFTs on the marketplace or redeem them for merch and airdropped prizes ',
            url: 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fmarket.png?alt=media&',
        }]

        new Image().src = 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fexplore.png?alt=media'
        new Image().src = 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Flocation.png?alt=media'
        new Image().src = 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fmint.png?alt=media'
        new Image().src = 'https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Fmarket.png?alt=media&'

        setInterval(() => {
            this.spotlightIndex = (this.spotlightIndex + 1) % this.content.length
        }, 3000)
    },
    methods: {
        onCta () {
            window.open('https://discord.gg/g7Gr9SAHrP', "_blank")
        },
    }
})
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}
html {
    font-family: 'Source Sans Pro', sans-serif;
}
body {
    margin: 0;
}
</style>

<style scoped lang="scss">
.landing {
    background: url("https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Flanding-desktop.jpg?alt=media") no-repeat center;
    background-size: cover;
    min-height: 660px;
    position: relative;

    &__overlay {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 55.93%, rgba(0, 0, 0, 0) 100%);
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        pointer-events: none;
    }
    &__column {
        margin: auto;
        max-width: 1440px;
        padding: 30px 6vw 30px 9vw;
        position: relative;
    }
    &__logo {
        width: 280px;
        padding-bottom: 14px;
    }
    &__presents {
        font-size: 24px;
        color: white;
    }
    &__flex {
        display: flex;
    }
    &__left {
        margin-right: 9vw;
        flex: 6;
        min-width: 0;
        max-width: 460px;
    }
    &__summit {
        width: 280px;
        margin: 12px 0;
    }
    &__right {
        min-width: 0;
        flex: 4;
    }
    &__platform {
        font-size: 45px;
        font-weight: 700;
        color: white;
        text-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
        max-width: 580px;
    }
    &__button {
        cursor: pointer;
        background: #151515;
        border: 2px solid white;
        box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 227px;
        color: white;
        height: 63px;
        font-size: 24px;
        margin-top: 22px;
    }
    &__diamond {
        width: 45px;
        margin-left: 8px;
    }
    &__map {
        // box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.25);
        width: 100%;
        filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5));
        cursor: pointer;
    }
    &__mobile-map {
        padding: 0 22px;
        margin-top: -74px;
        position: relative;
    }
}
@media only screen and (max-width: 960px) {
    .landing {
        background: url("https://firebasestorage.googleapis.com/v0/b/lost-worlds-314301.appspot.com/o/summit%2Flanding-mobile.jpg?alt=media") no-repeat center;
        background-size: cover;
        min-height: 500px;

        &__logo {
            width: 194px;
        }
        &__presents {
            font-size: 18px;
        }
        &__right {
            display: none;
        }
        &__platform {
            font-size: 24px;
        }
        &__button {
            width: 161px;
            height: 49px;
            font-size: 18px;
            margin-top: 0px;
        }
        &__diamond {
            width: 32px;
        }
    }
}

.explanation {
    margin-bottom: 32px;

    &--desktop {
        margin: auto;
        width: fit-content;
        max-width: 100%;

        & > div {
            display: inline-flex;
            max-width: 100%;
            overflow-x: auto;
        }
    }
    &__title {
        font-weight: 700;
        font-size: 36px;
        text-align: center;
        color: #151515;
        margin: 32px 0;
    }
}
@media only screen and (max-width: 960px) {
    .explanation {
        &__title {
            font-size: 24px;
        }
    }
}

.slide {
    margin: 0 32px;
    width: 274px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &--mobile {
        margin: auto;

        &__img {
            height: 380px;
        }
    }
    &__img {
        height: 480px;
        width: fit-content;
        max-width: 100vw;
        object-fit: contain;
    }
    &__title {
        font-size: 18px;
        color: #151515;
        text-align: center;
        font-weight: 700;
        margin: 32px 0;
    }
    &__description {
        color: #151515;
        text-align: center;
        font-size: 18px;
    }
}

.indicator {
    border-radius: 50%;
    height: 12px;
    width: 12px;
    border: 1px solid #8D95A7;
    box-sizing: border-box;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
    
    &--on {
        background: #072443;
    }
    &__container {
        display: flex;
        justify-content: center;
        gap: 4px;
        margin-top: 30px;
    }
}

.projects {
    position: relative;
    background: linear-gradient(180deg, #5690EA 0%, #6FA9F0 100%);

    &__clouds {
        position: absolute;
        height: 700px;
        width: 100%;
        object-fit: cover;
        object-position: top;
        top: -1px;
    }
    &__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    &__logo {
        margin: auto;
        margin-top: 300px;
    }
    &__subtitle {
        color: white;
        font-size: 36px;
        text-align: center;
    }
    &__flex {
        display: grid;
        grid-template-columns: repeat(auto-fill, 300px);
        padding: 90px;
        justify-content: center;
        position: relative;

        img {
            height: 300px;
            width: 300px;
            object-fit: cover;
        }
    }
}
@media only screen and (max-width: 960px) {
    .projects {
        &__subtitle {
            font-size: 24px;
        }
    }
}
.zoomed-map {
    padding: 16px;
    object-fit: contain;
    width: 100%;
}
</style>
