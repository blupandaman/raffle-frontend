import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href={"/"}>
                    <a className="btn btn-ghost normal-case text-xl">Smart Contract Raffle</a>
                </Link>
            </div>
            <div className="flex-none">
                <ConnectButton />
            </div>
        </div>
    );
};

export default Header;
