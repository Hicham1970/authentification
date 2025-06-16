import logy from "@/public/logy.png"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react';


function Nav() {
    return (
        <nav className="max-w-[1200px] w-full h-[80px] mx-auto flex items-center justify-between p-5 border-b border-gray-300">
            <div>
                <Link href="/">
                    <Image src="/logy.svg" alt="logo" width={50} height={50} />
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/signInAndUp" >
                    <Button>
                        <User />
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
