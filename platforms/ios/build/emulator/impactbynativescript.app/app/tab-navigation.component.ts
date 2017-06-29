import { Component } from '@angular/core';

@Component({
    selector:'tab-navigation',
    template:`
        <FlexboxLayout backgroundColor="black" flexDirection="row">
            <Button text="home" color="white" nsRouterLink="/"></Button>
            <Button text="login" color="white" nsRouterLink="/login"></Button>
            <Button text="draewr" color="white" nsRouterLink="/drawer"></Button>
        </FlexboxLayout>
    `
})
export class TabNavigationComponent {

}