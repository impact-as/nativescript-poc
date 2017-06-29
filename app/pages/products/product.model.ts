export class ProductModel {
    Id: string;
    Name: string;
    Maker: string;
    ProductUrl: string;
    PrimaryImageUrl: string;
    SplashUrl: string;
    B2CDeliveryMethod: number;
    NumberOfReviews: number;
    ReviewScore: number;
    NotDeliverable: boolean;
    ShowOverlay: boolean;
    InAssortment: boolean;
    ItemNumber: string;
    ItemEanCode: string;
    ItemSupplierProductNumber: string;
    IsNoStock: boolean;
    IsLowStock: boolean
    IsHighStock: boolean;
    StockInHq: number;
    StockInShop: number;
    IsButtonEnabled: boolean;
    IsButtonDisabled: boolean;
    IsBuyDirect: boolean;
    ItemDistributor: string;
    ItemPublisher: string;
    ItemSupplier: string;
    PricesRaw: [
        {
            Amount: number;
            Currency: string;
            UnitId: string;
            AccountRelation: string;
            ItemRelation: string;
            FromDateTime: string;
            ToDateTime: string;
            MultiplyQty: number;
            LowestQty: number;
            Null35: boolean;
            QtyAmountFrom: number;
            QtyAmountTo: number;
            Type: number;
        }
    ];
    PricesSanitized: {
        RetailPrice: number;
        RetailPriceLabel: string;
        RetailPriceAmount: number;
        ActualPrice: string;
        ActualPriceLabel: string;
        ActualPriceAmount: number
    };
    ItemUnit: string;
    ItemStockTypeValue: string;
}