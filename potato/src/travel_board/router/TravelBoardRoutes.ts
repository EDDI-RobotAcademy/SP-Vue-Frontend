// import TravelBoardRegisterPage from "@/travel_board/pages/register/TravelBoardRegisterPage.vue"
import TravelBoardListPage from "@/travel_board/pages/list/TravelBoardListPage.vue"

const TravelRoutes = [
    {
        path: '/travel_board/list', // localhost:8080/travel-board 
        name: 'TravelBoardListPage',
        component: TravelBoardListPage,
    },
    // {
    //     path: '/travel-board/register',
    //     name: 'TravelBoardRegisterPage',
    //     component: TravelBoardRegisterPage,
    // },
]

export default TravelRoutes
