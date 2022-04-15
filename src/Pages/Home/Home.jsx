import React from 'react'
import Layout from '../../Components/UI/Layout/Layout'
import classes from './Home.module.css'
import States from '../../Components/States/States'
import Deposit from '../../Components/Deposit/Deposit'
import Navbar from '../../Components/Menu/Navbar/Navbar'
import Menu from '../../Components/Menu/Menu'
import Card from '../../Components/UI/Card/Card'
import Referals from '../../Components/Referals/Referals'
import ConnectWallet from '../../Components/ConnectWallet/ConnectWallet'

const Home = (props) => {
    const { 
        currentTab, 
        setCurrentTab, 
        isOpenConnectWallet, 
        handleWallet
    } = props

    const info = {
        referal_rewards: 0,
        team: 112,
        my_referal: "",
        marketing_wallet: "0x7c8d1fsls23fjdfsajd23sda21",
        total_deposited: 32120800,
        total_users: 11000
    }

    return (
        <Layout handleWallet={handleWallet}>
            {isOpenConnectWallet && <ConnectWallet onClose={handleWallet}/>}
            <div className={classes.main}>
                <States/>
                <Deposit/>
            </div>
            <div className={classes.mobile}>
                <Navbar handleWallet={handleWallet}/>
                <div className={classes.content}>
                    {currentTab === 0 && <States/>}
                    {currentTab === 1 && <Deposit/>}
                    {currentTab === 2 && (
                        <Card>
                            <Referals info={info}/>
                        </Card>
                    )}
                </div>
                <Menu setCurrentTab={setCurrentTab} currentTab={currentTab}/>
            </div>
        </Layout>
    )
}

export default Home