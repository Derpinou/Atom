import { Entity, PrimaryColumn } from 'typeorm';



 
@Entity({
    name: "guild"
})
export class Guild {
    @PrimaryColumn()
    id: string;
}
