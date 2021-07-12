import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'



import DashboardLayout from './dashboard-layout'




function DashboardRoutes({children}){
        console.log(children)
        
        return(
            <>
           
            <Route children={props =>( 
                <DashboardLayout>
                 {children}
                </DashboardLayout>
                )}/>
         

    
        </>

        )



}
export default DashboardRoutes


