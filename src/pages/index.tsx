import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import RaffleEntrance from "../components/RaffleEntrance";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Smart Contract Raffle</title>
                <meta name="description" content="Smart contract raffle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header />

                <RaffleEntrance />
            </main>
        </div>
    );
};

export default Home;
