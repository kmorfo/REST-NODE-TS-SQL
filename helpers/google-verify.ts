import { LoginTicket, OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleVerify(token: string) {
    const ticket:LoginTicket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    //Podemos ver como se rellenan los campos, 
    //name es nombre y apellidos
    //given_name nombre
    //family_name apellidos
    console.log(ticket.getPayload());
    const { name,given_name,family_name, picture, email } = ticket.getPayload();

    return {
        name,
        given_name,
        family_name,
        img: picture,
        email,
    };
}


