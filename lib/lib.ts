import {DecodedAccessToken} from "@/types/Types";
import {jwtDecode} from "jwt-decode";
export default function getDecodedToken(token:string):DecodedAccessToken{
    return jwtDecode(token);
}
