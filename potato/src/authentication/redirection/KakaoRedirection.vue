<template>
    <div></div>
</template>

<script>
import { mapActions } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    methods: {
        ...mapActions(authenticationModule, [
            'requestAccessTokenToDjangoRedirection',
            'requestUserInfoToDjango',
            'requestAddRedisAccessTokenToDjango'
        ]),
        async setRedirectData () {
            const code = this.$route.query.code
            console.log('code:', code)
            await this.requestAccessTokenToDjangoRedirection({ code })
            const userInfo = await this.requestUserInfoToDjango()
            const email = userInfo.kakao_account.email

        }
    },
    async created () {
        await this.setRedirectData()
    }
}
</script>