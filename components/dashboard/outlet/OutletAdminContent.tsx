import {auth} from "@/auth";
import getDecodedToken from "@/lib/lib";
import {fetchAllOutletsByUser} from "@/app/actions/outlet-actions";
import {Card} from "@/components/ui/card";
import OutletPicker from "@/components/dashboard/outlet/OutletPicker";
import {SessionProvider} from "next-auth/react";

const OutletAdminContent = async () => {
    const session = await auth();
    const user = getDecodedToken(session.accessToken);
    const outlets = await fetchAllOutletsByUser(user.userId);
    const imageStyle = {
        borderRadius: '50%',
        border: '1px solid #fff',
        backgroundPosition: "bottom"
    }
    return (
        <section>
            <Card className='relative px-4 py-3 h-[30svh]  bg-ou_bannerImg bg-no-repeat' style={{
                backgroundPosition: "bottom right",
                backgroundSize: ' 100%'
            }}>
                <SessionProvider>
                    <OutletPicker outlets={outlets}/>
                </SessionProvider>
            </Card>
        </section>
    );
};

export default OutletAdminContent;
