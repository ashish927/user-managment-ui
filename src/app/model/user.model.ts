import {Deserializable} from './deserializable.model';

export class User implements Deserializable {
    public _id: string;
    public name: string;
    public email: string;
    public role: string;
    public status: String;
   
    
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
