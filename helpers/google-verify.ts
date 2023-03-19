import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleVerify(token: string) {
    const ticket: LoginTicket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Especificamos el CLIENT_ID que google nos proporciono
        // Tambien podemos,indicar multiples CLIENT_ID como un array:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    /*     Podemos ver como se rellenan los campos,
        console.log(ticket.getPayload());
        name es nombre y apellidos
        given_name nombre
        family_name apellidos */
    
    //Lo podriamos realizar con desectructuracion y obtener los datos directamente o bien obtener el payload y coger los datos
    //const { name, given_name, family_name, picture, email }:TokenPayload | undefined = ticket.getPayload();
    const payload :TokenPayload | undefined = ticket.getPayload();

    return {
        name:payload?.name ,
        given_name:payload?.given_name,
        family_name:payload?.family_name,
        img: payload?.picture,
        email:payload?.email,
    };
}


