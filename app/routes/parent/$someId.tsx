//to get the parameter in https link and use it as paraneter
import { useParams } from "@remix-run/react";

export default function DynamicChild() {

    //declare const variable in page, type UseParams
    const {someId} = useParams();
    return <div>I am dynamic {someId}</div> //INSERt the parameter righjt here

}