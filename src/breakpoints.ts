export const breakpoints = {
    data () {
        return {
            viewportWidth: null,
        }
    },
    computed: {
        isViewportDesktop () {
            return this.viewportWidth >= 960
        },
        isViewportMobile () {
            return !this.isViewportDesktop
        },
        viewportName () {
            return this.isViewportDesktop ? 'desktop' : 'mobile'
        },
    },
    created () {
        this.updateViewportWidth()
    },
    mounted () {
        window.addEventListener('resize', this.updateViewportWidth)
    },
    destroyed () {
        window.removeEventListener('resize', this.updateViewportWidth)
    },
    methods: {
        updateViewportWidth () {
            this.viewportWidth = window.innerWidth
        },
    },
}
