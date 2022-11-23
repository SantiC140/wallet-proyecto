import { ethers } from 'ethers';
import './App.css';
import React, { useState } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';

function App() {
    let provider;
    React.useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch("https://api.blocknative.com/gasprices/blockprices", {
                headers: {
                    Authorization: "d53998b7-de1f-4408-ac06-c3c32bf2d45d"
                }
            })
            const data = await res.json()
            setGasPrice(data.estimatedBaseFees[1]["pending+2"][0].baseFee)
        }
        fetchData()
        setDefaultAccount(0)
    })
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [gasPrice, setGasPrice] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    if(window.ethereum !== undefined) {
        provider = new ethers.providers.Web3Provider(window.ethereum)
    } else {
        return(
            <>
            <h1>metamask is not installed</h1>
            <a href="https://metamask.io/download" target="_blank"> please install metamask</a>
            </>
        )
    }
  const connectwalletHandler = async () => {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const account = accounts[0];
      console.log(accounts)
      console.log(account)
      let balance = await getuserBalance(account)
      setUserBalance(Math.ceil(balance * 100) / 100)
      window.open('https://metamask.io/download/', '_blank')
}
const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    const balance = await newAccount.getBalance()
    setUserBalance(ethers.utils.formatEther(balance));
    await getuserBalance(address)
}
const getuserBalance = async (address) => {
    const balance = await provider.getBalance(address, "latest")
    setUserBalance(balance)
    return balance;
}
  
  return (
      <>
    <div className="container px-5 py-4 my-5">
        <div className="row">
            <div className="ps-lg-5 ps-sm-4 py-4 pe-3 col-md-12 d-flex flex-row align-items-center font-16 purple-color-2">
                <div className="logo me-auto"><a href="index.html"></a></div>
                <button className="connect-btn" onClick={connectwalletHandler} style={{background: userBalance ? "green" : "", color: userBalance ? "white" : "", border: userBalance ? "white" : ""}} >{userBalance ? "Connected" : "Connect Metamask"}</button>
                <i className="fas fa-search px-4"></i>
                <i className="far fa-bell px-4 notification"></i>
                <i className="fas fa-cog ps-4"></i>
                <p>{defaultAccount}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-2 d-flex flex-row flex-md-column align-items-center">
                <div className="nav-side-links grey-border my-4 mx-sm-2 mx-2 mx-md-0 font-16 square purple-color-2 round-corner-small d-flex flex-row justify-content-center align-items-center">
                    <i className="fas fa-home "></i>
                </div>
                <div className="nav-side-links my-4 mx-sm-2 mx-2 mx-md-0 font-28 square grey-border purple-color-2 round-corner-small d-flex flex-row justify-content-center align-items-center">
                <AiOutlineLineChart />    
                </div>
                <div className="nav-side-links my-4 mx-sm-2 mx-2 mx-md-0 font-16 square grey-border purple-color-2 round-corner-small d-flex flex-row justify-content-center align-items-center">
                    <i className="fas fa-chart-pie"></i>
                </div>
                <div className="nav-side-links mt-auto ms-auto ms-sm-auto my-4 mx-sm-2 mx-2 mx-md-0 font-16 square purple-bg-color white-color round-corner-small d-flex flex-row justify-content-center align-items-center">
                    <i className="fas fa-plus "></i>
                </div>
            </div>
            <div className="col-md-10">
                <div className="row">
                    <div className="col-md-5 col-sm-6">
                        <div className="p-4 d-flex flex-column purple-bg-color round-corner">
                            <span className="text-uppercase font-20 weight-600 white-color-2">Portfolio</span>
                            <span className="font-12 weight-600 white-color-2 view-all-anchor" style={{color: "lightgrey", width: "fit-content"}}>View Detailed</span>
                            <span className="font-12 weight-600 white-color-2 mt-4">Balance</span>
                            {/* <span className="font-28 weight-700 white-color">{userBalance == null ? "NOT CONNECTED" : userBalance}</span> */}
                            {/* <span className="font-14 weight-700 text-danger">-1,200.00 &nbsp; (0.02%)</span> */}
                            <div className="d-flex flex-row justify-content-between mt-4">
                                <div className="d-flex flex-column">
                            <span className="font-12 weight-300 white-color-2">Total</span>
                                    <span className="font-16 weight-600 white-color">$3,742.00</span>
                                    <span className="font-12 weight-300 white-color-2">Invested</span>
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="font-16 weight-600 white-color">$6,987.00</span>
                                    <span className="font-12 weight-300 white-color-2">Available money</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row mt-2 p-1 justify-content-center align-items-center">
                                <button className="py-2 flex-grow-1 text-uppercase font-12 weight-700 purple-color-2 grey-bg-color btn-acciones">Buy</button>
                                <button className="py-2 flex-grow-1 m-1 text-uppercase font-12 weight-700 white-color orange-bg-color btn-acciones">Send</button>
                                <button className="py-2 flex-grow-1 text-uppercase font-12 weight-700 purple-color-2 grey-bg-color btn-acciones">Exchange</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="py-3">
                            <span className="text-uppercase font-10 weight-600 grey-color-2">Fees</span>
                            <div className="d-flex flex-column round-corner grey-bg-color ps-4 py-3 mt-3 mb-4">
                                <span className="text-uppercase font-14 purple-color-2">Eth gas (Gwei)</span>
                                <span className="font-30 purple-color-2">{gasPrice}</span>
                            </div>
                            <div className="d-flex flex-column round-corner grey-bg-color ps-4 py-3 ">
                                <span className="text-uppercase font-14 purple-color-2">Transactions</span>
                                <span className="font-30 purple-color-2">0.085%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="pt-3">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase font-10 weight-600 grey-color-2">Market</th>
                                        <th className="text-end text-uppercase font-10 weight-600 purple-color-2"><a href="#" className="view-all-anchor">View All</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row justify-content-center align-items-center square round-corner-small font-20 light-orange-bg-color orange-color">
                                                    <i className="fab fa-facebook"></i>
                                                </div>
                                                <div className="d-flex flex-column ps-2">
                                                    <span className="font-14 weight-700 purple-color-2">BTC</span>
                                                    <span className="font-10 weight-400 purple-color-2">Bitcoin</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-end">
                                                <span className="font-14 weight-700 purple-color-2">64%</span>
                                                <span className="font-10 weight-400 orange-color">-1.7%</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-row ">
                                                <div className="d-flex flex-row justify-content-center align-items-center square round-corner-small light-yellow-bg-color yellow-color font-20 ">
                                                    <i className="fas fa-futbol"></i>
                                                </div>
                                                <div className="d-flex flex-column ps-2 ">
                                                    <span className="font-14 weight-700 purple-color-2 ">DAI</span>
                                                    <span className="font-10 weight-400 purple-color-2 ">Dai</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-end ">
                                                <span className="font-14 weight-700 purple-color-2 ">54%</span>
                                                <span className="font-10 weight-400 purple-color-2 ">7.4%</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-row ">
                                                <div className="d-flex flex-row justify-content-center align-items-center square round-corner-small light-teal-bg-color teal-color font-20 ">
                                                    <i className="fas fa-lira-sign "></i>
                                                </div>
                                                <div className="d-flex flex-column ps-2 ">
                                                    <span className="font-14 weight-700 purple-color-2 ">XRP</span>
                                                    <span className="font-10 weight-400 purple-color-2 ">Ripple</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-end ">
                                                <span className="font-14 weight-700 purple-color-2 ">13%</span>
                                                <span className="font-10 weight-400 orange-color ">-4.6%</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-row ">
                                                <div className="d-flex flex-row justify-content-center align-items-center square round-corner-small light-green-bg-color green-color font-20 ">
                                                    <i className="fas fa-tenge "></i>
                                                </div>
                                                <div className="d-flex flex-column ps-2 ">
                                                    <span className="font-14 weight-700 purple-color-2 ">USDT</span>
                                                    <span className="font-10 weight-400 purple-color-2 ">Tether</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-end ">
                                                <span className="font-14 weight-700 purple-color-2 ">34%</span>
                                                <span className="font-10 weight-400 purple-color-2 ">7.5%</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-8">
                        <div>
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase font-10 weight-600 grey-color-2">Transactions</th>
                                        <th className="text-uppercase font-10 weight-600 purple-color-2 text-end"><a href="#" className="view-all-anchor">View All</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row justify-content-center align-items-center orange-color square round-corner-small light-orange-bg-color font-14">
                                                    <i className="fas fa-long-arrow-alt-up"></i>
                                                </div>
                                                <div className="d-flex flex-column ps-2">
                                                    <span className="font-14 weight-700 purple-color-2">Sent CR7</span>
                                                    <span className="font-10 weight-400 purple-color-2">12 Jun, 2022</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-end">
                                                <span className=" font-16 weight-700 orange-color ">-$1,289.00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-row ">
                                                <div className="d-flex flex-row justify-content-center align-items-center square round-corner-small light-purple-bg-color purple-color-2 font-14 ">
                                                    <i className="fas fa-long-arrow-alt-down "></i>
                                                </div>
                                                <div className="d-flex flex-column ps-2 ">
                                                    <span className="font-14 weight-700 purple-color-2 ">Received USDT</span>
                                                    <span className="font-10 weight-400 purple-color-2 ">10 Jun, 2022</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-end ">
                                                <span className="font-16 weight-700 purple-color-2 ">-$1,289.00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="d-flex flex-row ">
                                                <div className="d-flex flex-row justify-content-center align-items-center square round-corner-small light-orange-bg-color orange-color font-14 ">
                                                    <i className="fas fa-long-arrow-alt-up "></i>
                                                </div>
                                                <div className="d-flex flex-column ps-2 ">
                                                    <span className="font-14 weight-700 purple-color-2 ">Sent MESS</span>
                                                    <span className="font-10 weight-400 purple-color-2 ">4 Jun, 2022</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column align-items-end ">
                                                <span className="font-16 weight-700 orange-color ">-$1,289.00</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex flex-row justify-content-between mt-2">
                            <span className="text-uppercase font-10 weight-600 grey-color-2">Security</span>
                            <span className="text-uppercase font-10 weight-600 purple-color-2 text-end"><a href="#" className="view-all-anchor">View All</a></span>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center grey-border round-corner px-4 py-3 mt-3">
                            <div>
                                <span className="d-block font-16 weight-400 purple-color-2">Identity</span>
                                <span className="d-block font-10 weight-400 purple-color-2">Disable</span>
                            </div>
                            <div className="onoffwrapper">
                                <input type="checkbox" name="toggle1" id="toggle1" className="onoff" />
                                <label htmlfor="toggle1"></label>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center grey-border round-corner px-4 py-3 mt-3">
                            <div>
                                <span className="d-block font-16 weight-400 purple-color-2">Phone</span>
                                <span className="d-block font-10 weight-400 purple-color-2">Enable</span>
                            </div>
                            <div className="onoffwrapper">
                                <input type="checkbox" name="toggle2" id="toggle2" className="onoff" checked />
                                <label htmlfor="toggle2"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </>
  );
}

export default App;
