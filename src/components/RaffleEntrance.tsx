import { BigNumber, ContractInterface, ethers } from "ethers";
import { useEffect, useState } from "react";
import {
    chain,
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
} from "wagmi";
import { abi, contractAddresses } from "../constants";

interface contractAddressesInterface {
    [key: string]: string[];
}

const RaffleEntrance = () => {
    const { isConnected } = useAccount();
    const addresses: contractAddressesInterface = contractAddresses;
    const chainId = chain.hardhat.id;
    const raffleAddress = chainId in addresses ? addresses[chainId][0] : null;
    const [entranceFee, setEntranceFee] = useState("0");

    const { config } = usePrepareContractWrite({
        addressOrName: raffleAddress!,
        contractInterface: abi as ContractInterface,
        functionName: "enterRaffle",
        overrides: {
            value: entranceFee,
        },
        chainId: chainId,
    });

    const {
        data: entranceFeeData,
        isError,
        isLoading,
    } = useContractRead({
        ...config,
        functionName: "getEntranceFee",
    });

    useEffect(() => {
        if (entranceFeeData) {
            setEntranceFee(entranceFeeData.toString());
            console.log(entranceFee);
        }
    }, [entranceFeeData]);

    return (
        <div>
            {raffleAddress ? (
                <div>Entrance fee: {ethers.utils.formatEther(entranceFee)} ETH</div>
            ) : (
                <div>No Raffle address detected</div>
            )}
        </div>
    );
};

export default RaffleEntrance;
