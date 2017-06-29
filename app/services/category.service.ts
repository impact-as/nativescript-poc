import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {

    public getCategories() {
        return this.categories;
    }

    private categories: Category[] = [
        {
            "title":"Biografier",
            "id":"5910",
            "image":"/scommerce/images/strand-lille-spot.jpg?i=%7b070D5CDF-3714-4E5A-BA7B-F6CD045C2610%7d"
        },
        {
            "title":"Børnebøger",
            "id":"8110",
            "image":"/scommerce/images/puzzlespil-piger.jpg?i=%7b6C13E40A-3409-49D7-9271-FD9BE390D077%7d"
        },
        {
            "title":"Digte",
            "id":"5940",
            "image":"/scommerce/images/e-boeger2.jpg?i=%7bB3789703-6857-464F-9D2E-2C967E3EDC57%7d"
        },
        {
            "title":"Kogebøger",
            "id":"7210",
            "image":"/scommerce/images/boern-bager.jpg?i=%7bFD1114EA-5C44-46F3-9EFC-C368C33432F4%7d"
        },
        {
            "title":"Krimi og spænding",
            "id":"5960",
            "image":"/scommerce/images/sommer-stort-spot.jpg?i=%7bE457E4D2-A06B-426D-A0A8-B2DF05E29F04%7d"
        },
        {
            "title":"Krop og sjæl",
            "id":"6790",
            "image":"/scommerce/images/e-boeger.jpg?i=%7bA6313386-FFC1-4EFC-8680-FA3FBDC9BFC1%7d"
        },
        {
            "title":"Kunst og kultur",
            "id":"6420",
            "image":"/scommerce/images/braetspil-med-brikker.jpg?i=%7bB2024E34-01CE-4104-A463-8C14658A2AAE%7d"
        },
        {
            "title":"Psykologi",
            "id":"6740",
            "image":"/scommerce/images/sommerlaesning-forside.jpg?i=%7bE3F146E8-20BB-4B30-852A-2C2A37D89018%7d"
        },
        {
            "title":"Rejsebøger",
            "id":"9240",
            "image":"/scommerce/images/hat-og-sol.jpg?i=%7b1E44EDCC-D6C7-4519-A153-8424005E6258%7d"
        }
    ];
}

export class Category {
    
    public title:string;
    public image:string;
    public id:string;
    constructor(title, id, image) {
        this.title = title;
        this.id = id;
        this.image = image;
    }
}