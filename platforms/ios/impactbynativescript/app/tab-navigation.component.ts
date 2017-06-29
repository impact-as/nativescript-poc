import { Component } from '@angular/core';

@Component({
    selector:'tab-navigation',
    template:`
        <FlexboxLayout backgroundColor="black" flexDirection="row" justifyContent="space-around">
            <Image src="~/images/home.png" width="20" height="20" nsRouterLink="/"></Image>
            <Image src="~/images/login.png" width="20" height="20" nsRouterLink="/login"></Image>
            <Image src="~/images/category.png" width="20" height="20" nsRouterLink="/category"></Image>
            <Image src="~/images/search.png" width="20" height="20" nsRouterLink="/search"></Image>
            <Image src="~/images/find.png" width="20" height="20" nsRouterLink="/find"></Image>
        </FlexboxLayout>
    `
})
export class TabNavigationComponent {

}