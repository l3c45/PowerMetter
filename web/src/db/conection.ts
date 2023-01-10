import * as Realm from "realm-web";

export const app:Realm.App = new Realm.App({ id: "application-0-zqfsi" });



const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
export const collection :any = mongodb?.db("power-metter").collection("voltages");

