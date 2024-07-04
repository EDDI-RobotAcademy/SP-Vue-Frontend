import TravelReviewRegisterPage from "@/travel_review/pages/register/TravelReviewRegisterPage.vue"
import TravelReviewListPage from "@/travel_review/pages/list/TravelReviewListPage.vue"
import TravelReviewReadPage from "@/travel_review/pages/read/TravelReviewReadPage.vue"
import TravelReviewModifyPage from "@/travel_review/pages/modify/TravelReviewModifyPage.vue"

const TravelRoutes = [
    {
        path: '/travel_review/list', // localhost:8080/travel_review 
        name: 'TravelReviewListPage',
        component: TravelReviewListPage,
    },
    {
        path: '/travel_review/register',
        name: 'TravelReviewRegisterPage',
        component: TravelReviewRegisterPage,
    },
    {
        path: '/travel_review/read/:ReviewId',
        name: 'TravelReviewReadPage',
        components: {
            default: TravelReviewReadPage,
        },
        props: {
            default: true
        }
    },
    {
        path: '/travel_review/modify/:ReviewId',
        name: 'TravelReviewModifyPage',
        components: {
            default: TravelReviewModifyPage,
        },
        props: {
            default: true
        }
    },
]

export default TravelRoutes
