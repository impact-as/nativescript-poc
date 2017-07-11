import { Component } from '@angular/core';

@Component({
    selector:'tab-navigation',
    template:`
        <FlexboxLayout backgroundColor="black" class="tab-menu" flexDirection="row" justifyContent="space-around">

            <StackLayout class="tab-icon" nsRouterLink="/home" nsRouterLinkActive="active-link" width="50">
                <Image src="~/images/home.png" width="30" height="30"></Image>
            </StackLayout>

            <StackLayout class="tab-icon" nsRouterLink="/login" nsRouterLinkActive="active-link" width="50">
                <Image src="~/images/login.png" width="30" height="30"></Image>
            </StackLayout>

            <StackLayout class="tab-icon" nsRouterLink="/category" nsRouterLinkActive="active-link" width="50">
                <Image src="~/images/category.png" width="30" height="30"></Image>
            </StackLayout>

            <StackLayout class="tab-icon" nsRouterLink="/search" nsRouterLinkActive="active-link" width="50">
                <Image src="~/images/search.png" width="30" height="30"></Image>
            </StackLayout>

            <StackLayout class="tab-icon" nsRouterLink="/find" nsRouterLinkActive="active-link" width="50">
                <Image src="~/images/find.png" width="30" height="30"></Image>
            </StackLayout>

        </FlexboxLayout>
    `
})
export class TabNavigationComponent {

}