<template>
    <div>Our First Sponsor</div>
</template>

<script>

export default {
    // 호텔 서버 ip
    created() {
        // window.location.href = "http://192.168.0.41:8080/";
        window.open("http://192.168.0.41:8080/")
    },
    // methods: {
    //     async waitOneMinute() {
    //         setTimeout(() => console.log("after"), 18000);
    //     }
    // },
    // mounted() {
    //     this.waitOneMinute()
    // }
};
</script>