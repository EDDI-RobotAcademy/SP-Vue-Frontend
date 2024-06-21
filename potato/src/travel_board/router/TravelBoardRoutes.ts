import TravelBoardRegisterPage from "@/travel_board/pages/register/TravelBoardRegisterPage.vue"
import TravelBoardListPage from "@/travel_board/pages/list/TravelBoardListPage.vue"
import TravelBoardReadPage from "@/travel_board/pages/read/TravelBoardReadPage.vue"
import TravelBoardModifyPage from "@/travel_board/pages/modify/TravelBoardModifyPage.vue"

const TravelRoutes = [
    {
        path: '/travel_board/list', // localhost:8080/travel_board 
        name: 'TravelBoardListPage',
        component: TravelBoardListPage,
    },
    {
        path: '/travel_board/register',
        name: 'TravelBoardRegisterPage',
        component: TravelBoardRegisterPage,
    },
    {
        path: '/travel_board/read/:BoardId',
        name: 'TravelBoardReadPage',
        components: {
            default: TravelBoardReadPage,
        },
        props: {
            default: true
        }
    },
    {
        path: '/travel_board/modify:BoardId',
        name: 'TravelBoardModifyPage',
        components: {
            default: TravelBoardModifyPage,
        },
        props: {
            default: true
        }
    },
]

export default TravelRoutes
