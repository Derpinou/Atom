import { Column, Entity, PrimaryColumn } from 'typeorm';



 
@Entity({
    name: "guild"
})
export class Guild {
    @PrimaryColumn()
    id: string;

    @Column({
        default: "en-EN"
    })
    language: string;
}
