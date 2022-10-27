import { ContractInterface } from "ethers";
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
    const [entranceFee, setEntranceFee] = useState(0);

    const {
        data: entranceFeeData,
        isError,
        isLoading,
    } = useContractRead({
        addressOrName: raffleAddress!,
        contractInterface: abi as ContractInterface,
        functionName: "getEntranceFee",
        chainId: chainId,
    });

    useEffect(() => {
        if (entranceFeeData) {
            setEntranceFee(parseInt(entranceFeeData.toString()));
        }
    }, [entranceFeeData]);

    return <div className="pl-6">Entrance fee: {entranceFee}</div>;

    // const { config } = usePrepareContractWrite({
    //     addressOrName: raffleAddress!,
    //     contractInterface: abi,
    //     functionName: "enterRaffle",
    // });
};

export default RaffleEntrance;
