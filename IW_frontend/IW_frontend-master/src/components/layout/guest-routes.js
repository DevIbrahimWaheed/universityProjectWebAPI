import {React , Component } from 'react'
import { Route } from 'react-router-dom'

import GuestLayout from './guest-layout'



function GuestRoutes({children}){
        return(
            <>
            <Route  children={props =>( 
                <GuestLayout>
                    {children}
                </GuestLayout>
                )}/>

    
        </>

        )



}
export default GuestRoutes


