import {jwtDecode} from 'jwt-decode';


export function decoder(token){
    return jwtDecode(token);
}

