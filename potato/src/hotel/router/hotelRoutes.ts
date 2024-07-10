import HotelPage from "@/hotel/pages/hotelPage.vue"

const HotelRoutes = [
    {
        path: "/hotel",
        name: "hotelPage",
        component: HotelPage,
        beforeEnter() {
            // window.location.href = "http://192.168.0.46:8080/";
            window.open("http://192.168.0.46:8080/")
        },
    },
]

export default HotelRoutes