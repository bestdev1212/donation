import { ethers } from 'ethers'
import { useRef, useState } from 'react'
import { Portal } from "react-portal";

import Alert from './alert';
import Button from './button'

// import { FaEthereum } from 'react-icons/fa'

const donationAddress = "0x3986FD026EBF1d20ED8B69A07c5AAAaac16B9Ef8";

const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "DonationTransferred", "type": "event" }, { "inputs": [], "name": "donate", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getTotalDonations", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];


const Card = () => {
    const amountInput = useRef<any>(null)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ show: false, success: true, amount: 0 })


    const donate = async () => {
        const amount = amountInput.current.value;
        if (amount == "" || loading) return;
        try {
            setLoading(true)

            if (window.ethereum.networkVersion != 5) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: 5 }]
                });
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(donationAddress, abi, provider);
            const contractSigner = contract.connect(signer);
            const nonce = await provider.getTransactionCount(signer.getAddress());
            const gasPrice = await provider.getGasPrice();
            const donationAmount = ethers.utils.parseEther(amount);
            const overrides = {
                gasPrice: gasPrice,
                gasLimit: 10 * 21000,
                value: donationAmount,
                nonce: nonce
            };
            const tx = await contractSigner.donate(overrides);
            await tx.wait();
            setAlert({ success: true, show: true, amount: +amount })
            console.log('success')
        } catch (err) {
            setAlert({ success: false, show: true, amount: 0 })
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return (

        <div role={"main"} className="max-w-md px-8 py-4 my-20 border-2 rounded-lg shadow-lg opacity-100 backdrop-blur bg-white/100 border-amber-500">
            <div className="flex justify-center -mt-16 md:justify-end">
                {/* <FaEthereum className='w-20 h-20 p-2 bg-white border-2 rounded-full text-amber-500 border-amber-500' /> */}
                <img className="object-cover w-20 h-20 border-2 rounded-full sepia border-amber-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsJjcUPNCDaQYUFy42i2JUM75yRNT8BShJ_gUgSd60EkqYZ4ZWLbzM1EK4g-SDlXlN-wc&usqp=CAU"
                    alt="donation"
                    aria-label='donate-ethereum'
                    title="donation"
                />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-amber-800">Donate ETH</h1>

                <div className='flex items-center my-8 space-x-2 text-amber-700'>
                    <label htmlFor="donate_number">Amount</label>
                    <input id="donate_number"
                        ref={amountInput}
                        tabIndex={-1}
                        aria-label='input donation amount'
                        title='donation amount'
                        placeholder='Input Donation Amount'
                        role={"textbox"}
                        type={"text"} className='h-8 px-2 border rounded border-amber-500'></input>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <Button title="Donate" onClick={donate} loading={loading} />
            </div>
            <Portal node={document?.getElementById("alert")}>
                <Alert showing={alert.show} success={alert.success} amount={alert.amount} />
            </Portal>

        </div >
    )
}

export default Card