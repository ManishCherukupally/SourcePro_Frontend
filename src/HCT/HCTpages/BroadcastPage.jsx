import React from 'react'
import BroadcastComp from '../HCT components/HCT Broadcast/BroadcastComp'

const BroadcastPage = () => {
    // const [auth, setAuth] = useState(false)
    // const navigate = useNavigate()
    // useEffect(() => {
    //     client.get("pagination/", {
    //         withCredentials: true,
    //         params: {
    //             page: 1
    //         }
    //     }).then((resp) => {
    //         console.log(resp.data)
    //         if (resp.data.status === 'unauthorized_user') {
    //             navigate("/hct/login")
    //         }
    //         else {
    //             setAuth(true)
    //         }
    //     })
    // })
    return (
        <div>
            {/* {auth && <BroadcastComp />} */}
            <BroadcastComp />
        </div>
    )
}

export default BroadcastPage
