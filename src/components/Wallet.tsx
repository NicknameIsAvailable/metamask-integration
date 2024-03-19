"use client"

import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    Chip,
    TextField,
} from "@mui/material";
import {MetaMaskProvider, useSDK} from '@metamask/sdk-react';
import {formatAddress} from "@/utils";
import MetamaskLogo from "/public/icons/metamask.svg"
import EthLogo from "/public/icons/eth.svg"
import BNBLogo from "/public/icons/bnb.svg"

export const WalletCard = () => {
    const {sdk, connected, connecting, account, balance} = useSDK();
    const [address, setAddress] = useState<string>("")
    const [bnbBalance, setBnbBalance] = useState<any>('0');

    const getBnbBalance = async () => {
        try {
            if (!window.ethereum) {
                console.error('MetaMask is not installed.');
                return;
            }

            const bnbBalance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [window.ethereum.selectedAddress, 'latest']
            });

            setBnbBalance(bnbBalance)
        } catch (error) {
            console.error('Error fetching BNB balance:', error);
        }
    };

    const connect = async () => {
        try {
            await sdk?.connect();
            await getBnbBalance()
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    const disconnect = () => {
        if (sdk) {
            sdk.terminate();
        }
    };

    const changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }
    
    const id = "popover"

    return (
        <Card className="relative w-96 px-8 py-4 border-box">
            {connected ? (
                <div className="w-full h-full">
                    <div key="tab-1" className="flex flex-col gap-6">
                        <div className="flex gap-2 justify-between">
                            <div className="flex gap-2">
                                <Chip avatar={<Avatar alt="eth" src={EthLogo.src}/>} label={balance || 0}/>
                                <Chip avatar={<Avatar alt="bnb" src={BNBLogo.src}/>} label={bnbBalance || 0}/>
                            </div>
                            <div className="relative">
                                <Chip
                                    avatar={<Avatar alt={formatAddress(account)} src={MetamaskLogo.src}/>}
                                    label={formatAddress(account)}
                                    onDelete={disconnect}
                                />
                            </div>
                        </div>
                        <TextField onChange={changeAddress} value={address} label="Адрес транзакции"
                                   placeholder={account}/>
                        <Button disabled={address.length === 0} color="primary" size="large" variant="contained">Отправить</Button>
                    </div>
                </div>
            ) : (
                <Button className="w-full" color="primary" size="large" variant="contained" disabled={connecting} onClick={connect}>
                    Подключить кошелек
                </Button>
            )}
        </Card>
    );
};

const Wallet = () => {
    const host =
        typeof window !== "undefined" ? window.location.host : "defaultHost";

    const sdkOptions = {
        logging: {developerMode: false},
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "Next-Metamask-Boilerplate",
            url: host,
        },
    };

    return (
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <WalletCard/>
        </MetaMaskProvider>
    );
};

export default Wallet;