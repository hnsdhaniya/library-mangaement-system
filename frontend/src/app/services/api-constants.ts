
import { environment } from '../../environments/environment';


const APIENV = {
    'UAT': {
        login: "http://localhost:3000/api/auth/login",
        getLmsStudents:"http://localhost:3000/api/auth/getLmsStudents",
        createLmsStudent:"http://localhost:3000/api/auth/createLmsStudent",
        updateLmsStudent:'http://localhost:3000/api/auth/updateLmsStudent',
        getLmsBooks:"http://localhost:3000/api/auth/getLmsBooks",
        createLmsBooks:"http://localhost:3000/api/auth/createLmsBooks",
        updateLmsBooks:"http://localhost:3000/api/auth/updateLmsBooks",
        deleteLmsBooks:"http://localhost:3000/api/auth/deleteLmsBooks",
        deleteLmsStudent:"http://localhost:3000/api/auth/deleteLmsStudent"
       
    },
    'LIVE': {
        login: "http://localhost:3000/api/auth/login",
        getLmsStudents:"http://localhost:3000/api/auth/getLmsStudents",
        createLmsStudent:"http://localhost:3000/api/auth/createLmsStudent",
        updateLmsStudent:"http://localhost:3000/api/auth/updateLmsStudent",
        getLmsBooks:"http://localhost:3000/api/auth/getLmsBooks",
        createLmsBooks:"http://localhost:3000/api/auth/createLmsBooks",
        updateLmsBooks:"http://localhost:3000/api/auth/updateLmsBooks",
        deleteLmsBooks:"http://localhost:3000/api/auth/deleteLmsBooks",
        deleteLmsStudent:"http://localhost:3000/api/auth/deleteLmsStudent"
       

    },
    live: false
}
export const apiConstant = APIENV.live ? APIENV.LIVE : APIENV.UAT;