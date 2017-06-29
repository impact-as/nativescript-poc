import { Component } from '@angular/core';

@Component({
    selector:'tab-navigation',
    template:`
        <FlexboxLayout backgroundColor="black" flexDirection="row" justifyContent="space-around">
            <Button text="home" color="white" nsRouterLink="/"></Button>
            <Button text="login" color="white" nsRouterLink="/login"></Button>
            <Button text="category" color="white" nsRouterLink="/category"></Button>
            <Button text="search" color="white" nsRouterLink="/search"></Button>
        </FlexboxLayout>
    `
})
export class TabNavigationComponent {

}