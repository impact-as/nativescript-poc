import { Component } from '@angular/core';

@Component({
    selector:'tab-navigation',
    template:`
        <FlexboxLayout backgroundColor="black" flexDirection="row" justifyContent="space-around">
            <Image src="~/images/home.png" width="40" height="40" nsRouterLink="/" nsRouterLinkActive="active-link" [nsRouterLinkActiveOptions]="{exact: true}"></Image>
            <Image src="~/images/login.png" width="40" height="40" nsRouterLink="/login" nsRouterLinkActive="active-link"></Image>
            <Image src="~/images/category.png" width="40" height="40" nsRouterLink="/category" nsRouterLinkActive="active-link"></Image>
            <Image src="~/images/search.png" width="40" height="40" nsRouterLink="/search" nsRouterLinkActive="active-link"></Image>
            <Image src="~/images/find.png" width="40" height="40" nsRouterLink="/find" nsRouterLinkActive="active-link"></Image>
        </FlexboxLayout>
    `
})
export class TabNavigationComponent {

}