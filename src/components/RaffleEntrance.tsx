import { useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";

interface contractAddressesInterface {
    [key: string]: string[];
}

const RaffleEntrance = () => {
    const addresses: contractAddressesInterface = contractAddresses;
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(chainIdHex!).toString();
    const raffleAddress = chainId in addresses ? addresses[chainId][0] : null;

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getEntranceFee",
        params: {},
    });

    const updateUI = async () => {
        const entranceFee = await getEntranceFee();
        console.log(entranceFee);
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    return <div></div>;
};

export default RaffleEntrance;
