import { MediaData } from "./media-data";
export class SocketJsonData {
    op:string;
    status:number;
    file_data:MediaData[];
    msg:string;
    num_data:number;
    array_data:number[];
    progress:number;
}
