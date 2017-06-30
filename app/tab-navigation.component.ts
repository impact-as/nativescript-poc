import { Component } from '@angular/core';

@Component({
    selector:'tab-navigation',
    template:`
        <FlexboxLayout backgroundColor="black" flexDirection="row" justifyContent="space-around">
            <Image class="tab-icon" src="~/images/home.png" width="30" height="30" nsRouterLink="/" nsRouterLinkActive="active-link" [nsRouterLinkActiveOptions]="{exact: true}"></Image>
            <Image class="tab-icon" src="~/images/login.png" width="30" height="30" nsRouterLink="/login" nsRouterLinkActive="active-link"></Image>
            <Image class="tab-icon" src="~/images/category.png" width="30" height="30" nsRouterLink="/category" nsRouterLinkActive="active-link"></Image>
            <Image class="tab-icon" src="~/images/search.png" width="30" height="30" nsRouterLink="/search" nsRouterLinkActive="active-link"></Image>
            <Image class="tab-icon" src="~/images/find.png" width="30" height="30" nsRouterLink="/find" nsRouterLinkActive="active-link"></Image>
        </FlexboxLayout>
    `
})
export class TabNavigationComponent {

}