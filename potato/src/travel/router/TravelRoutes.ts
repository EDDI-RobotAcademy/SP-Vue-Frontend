import TravelRegisterPage from "@/travel/pages/register/TravelRegisterPage.vue"
import TravelListPage from "@/travel/pages/list/TravelListPage.vue"
import TravelReadPage from "@/travel/pages/read/TravelReadPage.vue"

const TravelRoutes = [
    {
        path: '/travel/list',
        name: 'TravelListPage',
        component: TravelListPage,
    },
    {
        path: '/travel/register',
        name: 'TravelRegisterPage',
        component: TravelRegisterPage,
    },
    {
        path: '/travel/read/:travelId',
        name: 'TravelReadPage',
        component: TravelReadPage,
    },

]

export default TravelRoutes
