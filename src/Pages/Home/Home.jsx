import React from 'react'
import Layout from '../../Components/UI/Layout/Layout'
import classes from './Home.module.css'
import States from '../../Components/States/States'
import Deposit from '../../Components/Deposit/Deposit'
import Navbar from '../../Components/Menu/Navbar/Navbar'
import Menu from '../../Components/Menu/Menu'

const Home = (props) => {
    const { currentTab, setCurrentTab } = props

    return (
        <Layout>
            <div className={classes.main}>
                <States/>
                <Deposit/>
            </div>
            <div className={classes.mobile}>
                <Navbar/>
                <div className={classes.content}>
                    {currentTab === 0 && <States/>}
                    {currentTab === 1 && <Deposit/>}
                </div>
                <Menu setCurrentTab={setCurrentTab} currentTab={currentTab}/>
            </div>
        </Layout>
    )
}

export default Home