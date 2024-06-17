import TravelListPage from "@/travel/pages/list/TravelListPage.vue"
import TravelRegisterPage from "@/travel/pages/register/TravelRegisterPage.vue"


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
    }
   
]

export default TravelRoutes